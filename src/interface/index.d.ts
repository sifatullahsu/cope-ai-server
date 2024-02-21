import { JwtPayload } from 'jsonwebtoken'

export type IJwtUser = JwtPayload & {
  _id: string
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user: IJwtUser | null
    }
  }
}
