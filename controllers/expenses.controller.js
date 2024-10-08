import { handleError } from '../helpers/handleError.js'
import { Expense } from '../models/expense.js'
import { categoriesService } from '../services/categories.service.js'
import { expensesService } from '../services/expenses.service.js'

async function create(req, res) {
  try {
    const expense = req.body

    expense.user = req.user._id

    const newExpense = await expensesService.create(expense)

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

async function findAllByCategory(req, res) {
  try {
    const { user, pagination } = req
    const { category } = req.params

    const categoryId = await categoriesService.findOneIdByName({ name: category })
    const { expenses, totalPages, page, perPage } = await expensesService.findAllByCategoryAndUser(
      user._id,
      categoryId,
      pagination,
    )

    return res.status(200).json({
      expenses: expenses.map((expense) => Expense.toPublicObject(expense)),
      page,
      totalPages,
      perPage,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function update(req, res) {
  try {
    const { id } = req.params

    const expense = req.body

    const updatedExpense = await expensesService.update({ id, expense })

    return res.status(200).json({
      message: 'Expense updated successfully',
      expense: Expense.toPublicObject(updatedExpense),
    })
  } catch (error) {
    handleError(res, error)
  }
}

export { create, findAll, findAllByCategory, update }
