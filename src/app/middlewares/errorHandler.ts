import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'

type IErrorMessages = {
  path: string | number
  message: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let status = 500
  let message = 'Something went wrong.'
  let errorMessages: IErrorMessages[] = []
  const stack = error.stack

  if (error instanceof mongoose.Error.CastError) {
    const simplified = handleCastError(error)
    status = simplified.status
    message = simplified.message
    errorMessages = simplified.errorMessages
  } else if (error instanceof mongoose.Error.ValidationError) {
    const simplified = handleValidationError(error)
    status = simplified.status
    message = simplified.message
    errorMessages = simplified.errorMessages
  } else if (error instanceof Error) {
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  }

  res.status(status).json({
    success: false,
    message,
    errorMessages,
    stack
  })
}

export default errorHandler

const handleCastError = (error: mongoose.Error.CastError) => {
  const errorMessages = [
    {
      path: error.path,
      message: 'Invalid Object ID'
    }
  ]

  return {
    status: 400,
    message: 'Cast Error',
    errorMessages
  }
}

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorMessages = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message
      }
    }
  )

  return {
    status: 400,
    message: 'Validation Error',
    errorMessages
  }
}
