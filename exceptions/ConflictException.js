import { exceptions, statusCode } from "../utils/enums/exceptions.js";
import HttpException from "./HttpException.js";

/**
 * This class extends the HttpException class and is used to throw
 * a Conflict Exception.
 *
 * @class ConflictException
 * @param {string} message - The error message
 */
class ConflictException extends HttpException {
  constructor(message = exceptions.CONFLICT) {
    super(statusCode.CONFLICT, message);
  }
}

export default ConflictException;
