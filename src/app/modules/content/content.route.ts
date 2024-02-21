import { Router } from 'express'
import { validateUser } from '../../middlewares/validateUser'
import { ContentController as controller } from './content.controller'

const router = Router()

router.get('/', controller.getAllData)
router.get('/:id', controller.getData)
router.post('/', validateUser(), controller.createData)

export const ContentRoute = router
