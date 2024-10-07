import { handleError } from '../../helpers/handleError.js'
import { Expense } from '../../models/expense.js'
import { exceptions, statusCode } from '../../utils/enums/exceptions.js'

//TODO: Implement isExpenseOwner middleware and test it
async function isExpenseOwner(req, res, next) {
  try {
    const { user } = req

    const expenseUser = Expense.findById(req.params.id).user

    if (user !== expenseUser) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: exceptions.UNAUTHORIZED,
      })
    }

    next()
  } catch (error) {
    handleError(res, error)
  }
}

export { isExpenseOwner }
