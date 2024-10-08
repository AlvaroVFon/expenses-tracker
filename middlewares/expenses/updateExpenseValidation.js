import { handleError } from '../../helpers/handleError.js'
import { updateExpenseSchema } from '../../schemas/expenses/updateExpense.schema.js'
import { statusCode } from '../../utils/enums/exceptions.js'

async function updateExpenseValidation(req, res, next) {
  try {
    const { error } = updateExpenseSchema.validate(req.body)

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

export { updateExpenseValidation }
