import { Router } from 'express'

import {
    PostUser,
    getAll,
    getOne,
    updateUser,
    remove,
} from '../controllers/users.controller.js'
import { createUserValidation } from '../middlewares/users/createUserValidation.js'
import { updateUserValidation } from '../middlewares/users/updateUserValidation.js'
import { paginate } from '../middlewares/paginate.js'

const router = Router()

router
    .post('/users', createUserValidation, PostUser)
    .get('/users', paginate, getAll)
    .get('/users/:id', getOne)
    .patch('/users/:id', updateUserValidation, updateUser)
    .delete('/users/:id', remove)

export { router as userRouter }
