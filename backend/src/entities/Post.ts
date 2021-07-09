import { Field, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Updoot } from './Up'
import { User } from './User'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    title!: string

    @Field(() => Int, { nullable: true })
    voteStatus: number | null

    @Field()
    @Column()
    creatorId: number

    @Field()
    @Column()
    text!: string

    @Field()
    @Column({ type: 'int', default: 0 })
    points!: number

    // @OneToMany(() => Updoot, (updoot) => updoot.post)
    // updoots: Updoot[]
    @Field()
    @ManyToOne(() => User, (user) => user.posts)
    creator: User

    @Field()
    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
