import { Router } from 'express'

import {
  create,
  findAll,
  findAllByCategory,
  findOne,
  remove,
  restore,
  update,
} from '../controllers/expenses.controller.js'
import { createExpenseValidation } from '../middlewares/expenses/createExpenseValidation.js'
import { paginate } from '../middlewares/paginate.js'
import { updateExpenseValidation } from '../middlewares/expenses/updateExpenseValidation.js'
import { isExpenseOwner } from '../middlewares/expenses/isExpenseOwner.js'

const router = Router()

router
  .post('/', createExpenseValidation, create)
  .get('/', paginate, findAll)
  .get('/:id', findOne)
  .get('/:category', paginate, findAllByCategory)
  .patch('/:id', isExpenseOwner, updateExpenseValidation, update)
  .delete('/remove/:id', isExpenseOwner, remove)
  .patch('/restore/:id', isExpenseOwner, restore)

export { router as expensesRouter }
