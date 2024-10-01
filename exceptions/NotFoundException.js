import HttpException from './HttpException.js'
import { exceptions, statusCode } from '../utils/enums/exceptions.js'

class NotFoundException extends HttpException {
    constructor(message = exceptions.NOT_FOUND) {
        super(statusCode.NOT_FOUND, message)
    }
}

export default NotFoundException
