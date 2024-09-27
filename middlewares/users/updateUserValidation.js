import { updateUserSchema } from '../../schemas/users/updateUser.schema.js'
import { User } from '../../models/user.js'

async function updateUserValidation(req, res, next) {
    const { id } = req.params

    const body = req.body

    const { error } = updateUserSchema.validate(body)

    if (error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    try {
        const userExists = await User.findById(id)

        if (!userExists) {
            return res.status(404).json({
                message: 'User not found',
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }

    next()
}

export { updateUserValidation }
