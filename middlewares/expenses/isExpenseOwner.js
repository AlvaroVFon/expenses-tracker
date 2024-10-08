import ForbiddenException from '../../exceptions/ForbiddenException.js'
import { handleError } from '../../helpers/handleError.js'
import { Expense } from '../../models/expense.js'

async function isExpenseOwner(req, res, next) {
  try {
    const { user } = req

    const expenseUser = await Expense.findById(req.params.id).select('user')

    if (user._id.toString() !== expenseUser.user.toString()) {
      throw new ForbiddenException()
    }

    next()
  } catch (error) {
    handleError(res, error)
  }
}

export { isExpenseOwner }
