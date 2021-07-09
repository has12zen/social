import { Field, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { Updoot } from './Up'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({ unique: true })
    username!: string
    @Field()
    @Column({ unique: true })
    email!: string
    @Column()
    password!: string

    // @OneToMany(() => Updoot, (updoot) => updoot.user)
    // updoots: Updoot[]

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[]

    @Field()
    @CreateDateColumn({ type: 'date' })
    createdAt: Date
    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
