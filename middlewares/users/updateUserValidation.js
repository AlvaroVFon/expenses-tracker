import { updateUserSchema } from '../../schemas/users/updateUser.schema.js'
import { User } from '../../models/user.js'
import BadRequestException from '../../exceptions/BadRequestException.js'
import NotFoundException from '../../exceptions/NotFoundException.js'
import { ObjectId } from 'mongodb'
import { hashPassword } from '../../helpers/hashPassword.js'

async function updateUserValidation(req, res, next) {
    const { id } = req.params

    const body = req.body

    try {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id')
        }

        const { error } = updateUserSchema.validate(body)

        if (req.body.password) {
            body.password = await hashPassword(req.body.password)
        }

        if (error) {
            throw new BadRequestException(error.message)
        }

        const userExists = await User.findById(id)

        if (!userExists) {
            throw new NotFoundException()
        }
    } catch (error) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
        })
    }

    next()
}

export { updateUserValidation }
