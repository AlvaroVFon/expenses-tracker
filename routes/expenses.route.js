import { Router } from 'express'

import { create, findAll } from '../controllers/expenses.controller.js'
import { createExpenseValidation } from '../middlewares/expenses/createExpenseValidation.js'
import { paginate } from '../middlewares/paginate.js'

const router = Router()

router.post('/', createExpenseValidation, create).get('/', paginate, findAll)

export { router as expensesRouter }
