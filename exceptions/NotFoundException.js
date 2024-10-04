import HttpException from './HttpException.js'
import { exceptions, statusCode } from '../utils/enums/exceptions.js'

/**
 * This class extends the HttpException class and is used to throw
 * a Not Found Exception.
 *
 * @class NotFoundException
 * @param {string} message - The error message
 */
class NotFoundException extends HttpException {
  constructor(message = exceptions.NOT_FOUND) {
    super(statusCode.NOT_FOUND, message)
  }
}

export default NotFoundException
