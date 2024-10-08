import NotFoundException from '../exceptions/NotFoundException.js'
import { handleError } from '../helpers/handleError.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { Expense } from '../models/expense.js'
import { categoriesService } from '../services/categories.service.js'
import { expensesService } from '../services/expenses.service.js'

async function create(req, res) {
  try {
    const expense = req.body

    expense.user = req.user._id

    const newExpense = await expensesService.create(expense)

    handleResponse({
      res,
      data: Expense.toPublicObject(newExpense),
      message: 'Expense created successfully',
      status: 201,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function findAll(req, res) {
  try {
    const pagination = req.pagination
    const user = req.user

    const { expenses, page, totalPages, perPage } = await expensesService.findAllByUser(user._id, pagination)

    handleResponse({
      res,
      data: { expenses: expenses.map((expense) => Expense.toPublicObject(expense)), page, totalPages, perPage },
      message: 'Expenses found successfully',
      status: 200,
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

    handleResponse({
      res,
      data: { expenses: expenses.map((expense) => Expense.toPublicObject(expense)), page, totalPages, perPage },
      message: 'Expenses found successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params

    const expense = await expensesService.findOne(id)

    handleResponse({ res, data: expense, message: 'Expense found successfully', status: 200 })
  } catch (error) {
    handleResponse(res, error)
  }
}

async function update(req, res) {
  try {
    const { id } = req.params

    const expense = req.body

    const updatedExpense = await expensesService.update({ id, expense })

    handleResponse({
      res,
      data: Expense.toPublicObject(updatedExpense),
      message: 'Expense updated successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params

    const removedExpense = await expensesService.remove(id)

    if (!removedExpense) {
      throw new NotFoundException('Expense not found')
    }

    handleResponse({
      res,
      data: Expense.toPublicObject(removedExpense),
      message: 'Expense removed successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function restore(req, res) {
  try {
    const { id } = req.params

    const restoredExpense = await expensesService.restore(id)

    if (!restoredExpense) {
      throw new NotFoundException('Expense not found')
    }

    handleResponse({
      res,
      data: Expense.toPublicObject(restoredExpense),
      message: 'Expense restored successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

export { create, findAll, findAllByCategory, findOne, update, remove, restore }
