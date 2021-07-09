import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { COOKIE_NAME, __prod__ } from './constants'
const cors = require('cors')
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'
import path from 'path'
import { Updoot } from './entities/Up'
import { createUserLoader } from './util/createUserLoader'
import { createUpdootLoader } from './util/createUpdootLoader'

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        database: 'hyber',
        username: 'postgres',
        password: 'postgres',
        entities: [User, Post, Updoot],
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, './migrations/*')],
    })
    await conn.runMigrations()
    // await Post.delete({})
    const app = express()
    app.set('trust proxy', 1)
    let RedisStore = connectRedis(session)
    let redisClient = new redis({
        host: 'localhost',
        password: 'sOmE_sEcUrE_pAsS',
    })
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    )
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ client: redisClient, disableTouch: true }),
            saveUninitialized: false,
            secret: 'hhwosowghowjdoaownz',
            cookie: {
                maxAge: 1000 * 3600 * 24 * 120,
                secure: __prod__,
                httpOnly: true,
                sameSite: 'lax',
            },
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redisClient,
            userLoader: createUserLoader(),
            updootLoader: createUpdootLoader(),
        }),
    })
    apolloServer.applyMiddleware({ app, cors: false })
    app.use('/', (_, res) => {
        res.status(200).json({
            hello: 'World',
        })
    })
    app.listen(4000, () => {
        console.log('app listensing on port 4000')
    })
}

main().catch((err) => {
    console.error(err)
})
console.log('hello there')
