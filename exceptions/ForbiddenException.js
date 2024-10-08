import { exceptions, statusCode } from '../utils/enums/exceptions.js'
import HttpException from './HttpException.js'

class ForbiddenException extends HttpException {
  constructor(message = exceptions.FORBIDDEN) {
    super(statusCode.FORBIDDEN, message)
  }
}

export default ForbiddenException
