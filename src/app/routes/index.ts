import express from 'express'
import { ContentRoute } from '../modules/content/content.route'
import { UserRoute } from '../modules/user/user.route'

const AppRouter = express.Router()

AppRouter.use('/api/v1/users', UserRoute)
AppRouter.use('/api/v1/contents', ContentRoute)

export default AppRouter
