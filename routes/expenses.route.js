import { Router } from 'express'

import { create, findAll, findAllByCategory, findOne, remove, update } from '../controllers/expenses.controller.js'
import { createExpenseValidation } from '../middlewares/expenses/createExpenseValidation.js'
import { paginate } from '../middlewares/paginate.js'
import { updateExpenseValidation } from '../middlewares/expenses/updateExpenseValidation.js'

const router = Router()

router
  .post('/', createExpenseValidation, create)
  .get('/', paginate, findAll)
  .get('/:id', findOne)
  .get('/:category', paginate, findAllByCategory)
  .patch('/:id', updateExpenseValidation, update)
  .patch(':id/remove', remove)

export { router as expensesRouter }
