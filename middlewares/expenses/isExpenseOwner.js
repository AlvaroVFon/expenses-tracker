import { handleError } from '../../helpers/handleError'
import { Expense } from '../../models/expense'

async function isExpenseOwner(req, res, next) {
  try {
    const { user } = req.body

    const expenseUser = Expense.findById(req.params.id).user

    if (user !== expenseUser) {
      return res.status(403).json({
        message: 'You are not the owner of this expense',
      })
    }

    next()
  } catch (error) {
    handleError(res, error)
  }
}

export { isExpenseOwner }
