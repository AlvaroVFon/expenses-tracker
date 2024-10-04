import { exceptions, statusCode } from '../utils/enums/exceptions.js'
import HttpException from './HttpException.js'

/**
 * This class extends the HttpException class and is used to throw
 * a Bad Request Exception.
 *
 * @class BadRequesException
 * @param {string} message - The error message
 
 */
class BadRequestException extends HttpException {
  constructor(message = exceptions.BAD_REQUEST) {
    super(statusCode.BAD_REQUEST, message)
  }
}

export default BadRequestException
