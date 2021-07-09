import { User } from '../entities/User'
import { MyContext } from '../types'
import {
    Resolver,
    Field,
    Mutation,
    Arg,
    Ctx,
    ObjectType,
    Query,
    FieldResolver,
    Root,
} from 'type-graphql'
import argon2 from 'argon2'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants'
import { UsernamePasswordInput } from './UsernamePasswordInput'
import { validateRegister } from '../util/validate'
import { sendEmail } from '../util/sendEmail'
import { v4 } from 'uuid'
import { getConnection } from 'typeorm'

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver(User)
export class UserResolver {
    @FieldResolver()
    email(@Root() user: User, @Ctx() { req }: MyContext) {
        if (req.session.userId === user.id) return user.email
        return ''
    }
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { redisClient, req }: MyContext
    ): Promise<UserResponse> {
        if (newPassword.length <= 3) {
            return {
                errors: [
                    { field: 'newPassword', message: 'too short password' },
                ],
            }
        }
        const key = FORGOT_PASSWORD_PREFIX + token
        const userId = await redisClient.get(key)
        if (!userId) {
            return { errors: [{ field: 'token', message: 'token Expired' }] }
        }
        const userIdNum = parseInt(userId)
        const user = await User.findOne(userIdNum)
        if (!user)
            return { errors: [{ field: 'token', message: 'User Deleted' }] }

        await User.update(
            { id: userIdNum },
            {
                password: await argon2.hash(newPassword),
            }
        )
        await redisClient.del(key)
        req.session.userId = user.id
        return { user }
    }
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redisClient }: MyContext
    ) {
        const person = await User.findOne({ where: { email } })
        if (!person) return true
        const token = v4()
        await redisClient.set(
            FORGOT_PASSWORD_PREFIX + token,
            person.id,
            'ex',
            1000 * 60 * 60 * 24 * 3
        )

        await sendEmail(
            email,
            `<a href='http://localhost:3000/change-password/${token}'>Reset Password</a>`
        )
        return true
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext) {
        if (!req.session.userId) return null
        return User.findOne(req.session.userId)
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        console.log('Hello')
        const errors = validateRegister(options)
        if (errors) return { errors }
        const hashedPassword = await argon2.hash(options.password)
        let user
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: options.username,
                    password: hashedPassword,
                    email: options.email,
                })
                .returning('*')
                .execute()
            console.log('result', result)
            user = result.raw[0]
        } catch (err) {
            console.log(err)
            if (err.code == '23505')
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username already taken',
                        },
                    ],
                }
        }
        req.session.userId = user?.id
        return { user }
    }
    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes('@')
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }
        )
        // console.log(user)
        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: 'incorrect username/password',
                    },
                ],
            }
        }
        // console.log(user)
        const verifyPassword = await argon2.verify(user.password, password)
        if (!verifyPassword) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'incorrect password',
                    },
                ],
            }
        }
        // e.log(verifyPassword)
        req.session.userId = user.id
        return { user }
    }
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME)
                if (err) {
                    console.log(err)
                    resolve(false)
                    return
                }
                resolve(true)
            })
        )
    }
}
