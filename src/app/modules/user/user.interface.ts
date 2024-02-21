import { JwtPayload, Secret } from 'jsonwebtoken'
import { Model } from 'mongoose'

export type IUser = {
  name: string
  email: string
  scheduleHour: number
  password: string
}

export type IUserModel = {
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
  createToken(paylod: Record<string, unknown>, secret: string, expireTime: string): string
  verifyToken(token: string, secret: Secret): JwtPayload
} & Model<IUser>
