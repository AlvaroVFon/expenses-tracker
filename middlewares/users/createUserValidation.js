import { userSchema } from "../../schemas/users/user.schema.js";
import { User } from "../../models/user.js";
import ConflictException from "../../exceptions/ConflictException.js";
import BadRequesException from "../../exceptions/BadRequestException.js";
import { handleError } from "../../helpers/handleError.js";

/**
 * This middleware function validates the request body and
 * checks if the user already exists
 *
 * @returns - If error, it returns the error message and status code
 */
async function createUserValidation(req, res, next) {
  const { name, email, password, role } = req.body;

  try {
    const { error } = userSchema.validate({
      name,
      email,
      password,
      role,
    });

    if (error) {
      throw new BadRequesException(error.message);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new ConflictException();
    }
  } catch (error) {
    handleError(res, error);
  }

  next();
}

export { createUserValidation };
