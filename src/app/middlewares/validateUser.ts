import { NextFunction, Request, Response } from 'express'

export const validateUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) next()
      else throw new Error('Unauthorized access.')
    } catch (error) {
      next(error)
    }
  }
}
