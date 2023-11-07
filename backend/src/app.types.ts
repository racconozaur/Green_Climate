import { Request } from 'express'
import { User } from '@prisma/client'

export interface IAuthUser extends User {
  jwt_id: string
}

export interface RequestWithUser<T> extends Request {
  user: T
}
