import { exceptions, statusCode } from '../utils/enums/exceptions.js'
import HttpException from './HttpException.js'

class BadRequesException extends HttpException {
    constructor(message = exceptions.BAD_REQUEST) {
        super(statusCode.BAD_REQUEST, message)
    }
}

export default BadRequesException
