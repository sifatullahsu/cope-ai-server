import { Router } from 'express'
import { UserController as controller } from './user.controller'

const router = Router()

router.get('/', controller.getAllData)
router.get('/:id', controller.getData)
router.patch('/:id', controller.updateData)
router.post('/', controller.createData)
router.post('/auth/login', controller.login)

export const UserRoute = router
