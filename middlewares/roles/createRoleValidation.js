import BadRequesException from '../../exceptions/BadRequestException.js'
import ConflictException from '../../exceptions/ConflictException.js'
import { Role } from '../../models/role.js'
import { roleSchema } from '../../schemas/roles/role.schema.js'
import { statusCode } from '../../utils/enums/exceptions.js'

/**
 * This middleware function validates the request body and
 * checks if the role already exists
 *
 * @returns - If error, it returns the error message and status code
 */

async function createRoleValidation(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body)

        if (error) {
            throw new BadRequesException(error.message)
        }

        const role = await Role.findOne({ name: req.body.name })

        if (role) {
            throw new ConflictException('Role already exists')
        }

        next()
    } catch (error) {
        return res
            .status(error.status || statusCode.INTERNAL_SERVER_ERROR)
            .json({
                status: error.status || statusCode.INTERNAL_SERVER_ERROR,
                message: error.message || 'Something went wrong',
            })
    }
}

export { createRoleValidation }
