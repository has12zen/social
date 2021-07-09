import DataLoader from 'dataloader'
import { User } from '../entities/User'

export const createUserLoader = () =>
    new DataLoader<number, User>(async (userIds) => {
        const users = await User.findByIds(userIds as number[])
        const userIdToUser: Record<number, User> = {}
        users.forEach((u) => {
            userIdToUser[u.id] = u
        })

        const returnVaule = userIds.map((userId) => userIdToUser[userId])
        // console.log('return Value', returnVaule)
        return returnVaule
    })
