import { Logger } from '../models/logger.js'
import { statusCode } from '../utils/enums/exceptions.js'

async function handleError(res, error) {
    Logger.error(error.message, error.stack)
    return res.status(error.status || statusCode.INTERNAL_SERVER_ERROR).json({
        status: error.status || statusCode.INTERNAL_SERVER_ERROR,
        message: error.message || 'Something went wrong',
    })
}

export { handleError }
