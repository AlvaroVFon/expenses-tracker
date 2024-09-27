import { Router } from 'express'
import {
    create,
    findAll,
    findOne,
    update,
    remove,
} from '../controllers/users.controller.js'
import { createUserValidation } from '../middlewares/users/createUserValidation.js'
import { updateUserValidation } from '../middlewares/users/updateUserValidation.js'
import { paginate } from '../middlewares/paginate.js'

const router = Router()

router
    .post('/users', createUserValidation, create)
    .get('/users', paginate, findAll)
    .get('/users/:id', findOne)
    .patch('/users/:id', updateUserValidation, update)
    .delete('/users/:id', remove)

export { router as userRouter }
