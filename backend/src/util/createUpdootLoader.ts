import DataLoader from 'dataloader'
import { Updoot } from '../entities/Up'

export const createUpdootLoader = () =>
    new DataLoader<{ userId: number; postId: number }, Updoot | null>(
        async (keys) => {
            const updoots = await Updoot.findByIds(keys as any)
            const updootToUserId: Record<string, Updoot> = {}
            updoots.forEach((u) => {
                updootToUserId[`${u.userId}${u.postId}`] = u
            })
            const returnVaule = keys.map(
                (key) => updootToUserId[`${key.userId}${key.postId}`]
            )
            console.log('return Value', returnVaule)
            return returnVaule
        }
    )
