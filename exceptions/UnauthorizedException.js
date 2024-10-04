import HttpException from "./HttpException.js";
import { exceptions } from "../utils/enums/exceptions.js";
import { statusCode } from "../utils/enums/exceptions.js";

/**
 * UnauthorizedException
 * @extends {HttpException}
 *
 */

class UnauthorizedException extends HttpException {
  constructor(message = exceptions.UNAUTHORIZED) {
    super(statusCode.UNAUTHORIZED, message);
  }
}

export default UnauthorizedException;
