import { expenseSchema } from '../../schemas/expenses/expense.schema.js'
import { handleError } from '../../helpers/handleError.js'
import { statusCode } from '../../utils/enums/exceptions.js'

async function createExpenseValidation(req, res, next) {
  try {
    const { error } = expenseSchema.validate(req.body)

    if (error) {
      handleError(res, {
        status: statusCode.BAD_REQUEST,
        message: error.message,
      })
    }

    next()
  } catch (error) {
    handleError(res, error)
  }
}

export { createExpenseValidation }
