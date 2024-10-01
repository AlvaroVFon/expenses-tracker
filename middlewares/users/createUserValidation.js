import { userSchema } from '../../schemas/users/user.schema.js'
import { User } from '../../models/user.js'
import ConflictException from '../../exceptions/ConflictException.js'
import BadRequesException from '../../exceptions/BadRequestException.js'
import { statusCode } from '../../utils/enums/exceptions.js'

async function createUserValidation(req, res, next) {
    const { name, email, password, role } = req.body

    try {
        const { error } = userSchema.validate({
            name,
            email,
            password,
            role,
        })
        if (error) {
            throw new BadRequesException(error.message)
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            throw new ConflictException()
        }
    } catch (error) {
        return res
            .status(error.status || statusCode.INTERNAL_SERVER_ERROR)
            .json({
                status: error.status || statusCode.INTERNAL_SERVER_ERROR,
                message: error.message || 'Something went wrong',
            })
    }

    next()
}

export { createUserValidation }
