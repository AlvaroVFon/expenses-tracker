import { handleError } from '../helpers/handleError.js'
import { expensesService } from '../services/expenses.service.js'

async function create(req, res) {
  try {
    const expense = req.body

    expense.user = req.user._id

    const newExpense = await expensesService.create(expense)

    console.log(newExpense)

    return res.status(201).json({
      expense: newExpense,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function findAll(req, res) {
  try {
    const pagination = req.pagination

    const { expenses, page, totalPages, perPage } = await expensesService.findAllByUser(req.user._id, pagination)

    return res.status(200).json({
      expenses,
      page,
      totalPages,
      perPage,
    })
  } catch (error) {
    handleError(res, error)
  }
}

export { create, findAll }
