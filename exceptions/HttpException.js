/**
 * HttpException class that extends the Error class.
 * This class is used to throw an Http Exception.
 *
 * @class HttpException
 * @param {number} status - The status code of the error
 * @param {string} message - The error message
 */

class HttpException extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        this.message = message
    }
}

export default HttpException
