import { Expense } from '../models/expense.js'
import { categoriesService } from './categories.service.js'
import { userService } from './users.service.js'

class ExpensesService {
  async create(expense) {
    const categoryObjectId = await categoriesService.findOneByName({ name: expense.category })

    const newExpense = {
      ...expense,
      category: categoryObjectId._id,
    }

    const createdExpense = await Expense.create(newExpense)

    await userService.addExpense(expense.user, createdExpense._id)

    return Expense.toPublicObject(newExpense)
  }

  async findAll(pagination) {
    const { page, limit, skip } = pagination

    const total = await Expense.countDocuments()

    const totalPages = Math.ceil(total / limit) === 0 ? 1 : Math.ceil(total / limit)

    const expenses = await Expense.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'category',
          select: 'name',
        },
        {
          path: 'user',
          select: 'name email',
        },
      ])

    return {
      expenses,
      page,
      totalPages,
      perPage: limit,
    }
  }

  async findAllByUser(userId, pagination) {
    const { page, limit, skip } = pagination

    const total = await Expense.countDocuments().where('user').equals(userId)

    const totalPages = Math.ceil(total / limit) === 0 ? 1 : Math.ceil(total / limit)

    const expenses = await Expense.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .where('user')
      .equals(userId)
      .populate([
        {
          path: 'category',
          select: 'name',
        },
        {
          path: 'user',
          select: 'name email',
        },
      ])

    return {
      expenses,
      page,
      totalPages,
      perPage: limit,
    }
  }

  async findOne(id) {
    const expense = await Expense.findById(id)

    return Expense.toPublicObject(expense)
  }

  async findOneByCategoryName(category) {
    return await Expense.find({ category: category })
  }
}

export const expensesService = new ExpensesService()
