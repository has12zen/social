import DataLoader from 'dataloader'
import { Request, Response } from 'express'
import { Session } from 'express-session'
import { Redis } from 'ioredis'
import { createUpdootLoader } from './util/createUpdootLoader'
import { createUserLoader } from './util/createUserLoader'

export type MyContext = {
    req: Request & {
        session?: Session & { userId: number | undefined }
    }
    redisClient: Redis
    res: Response
    userLoader: ReturnType<typeof createUserLoader>
    updootLoader: ReturnType<typeof createUpdootLoader>
}
