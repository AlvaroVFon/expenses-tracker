import { exceptions, statusCode } from '../utils/enums/exceptions.js'
import HttpException from './HttpException.js'

class ConflictException extends HttpException {
    constructor(message = exceptions.CONFLICT) {
        super(statusCode.CONFLICT, message)
    }
}

export default ConflictException
