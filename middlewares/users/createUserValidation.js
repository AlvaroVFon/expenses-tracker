import { userSchema } from '../../schemas/users/user.schema.js'
import { User } from '../../models/user.js'

async function createUserValidation(req, res, next) {
    const { name, email, password, role } = req.body

    const { error } = userSchema.validate({
        name,
        email,
        password,
        role,
    })

    if (error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    try {
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists',
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }

    next()
}

export { createUserValidation }
