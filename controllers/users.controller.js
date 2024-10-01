import { User } from '../models/user.js'
import NotFoundException from '../exceptions/NotFoundException.js'
import { userService } from '../services/users.service.js'

async function PostUser(req, res) {
    const { name, email, password, role } = req.body

    try {
        const user = await userService.create({ name, email, password, role })

        return res.status(201).json({
            message: 'User created',
            user: user.toPublicObject(),
        })
    } catch (error) {
        return error
    }
}

async function getAll(req, res) {
    const { page, limit } = req.pagination

    const skip = (page - 1) * limit

    try {
        const { data, totalPages } = await userService.findAll({
            page,
            limit,
            skip,
        })

        return res.json({
            data: data.map((user) => user.toPublicObject()),
            page: parseInt(page),
            limit,
            totalPages,
        })
    } catch (error) {
        return error
    }
}

async function getOne(req, res) {
    const { id } = req.params

    try {
        const user = await userService.findOne({ id })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return res.json({
            user: User.toPublicObject(user),
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status).json({
            message: error.message,
        })
    }
}

async function updateUser(req, res) {
    const { id } = req.params

    const body = req.body

    req.body.updatedAt = new Date()

    await User.findByIdAndUpdate(id, body)

    const updatedUser = await User.findById(id)

    return res.json({
        message: 'User updated',
        user: updatedUser.toPublicObject(),
    })
}

async function remove(req, res) {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)

    return res.json({
        message: 'User deleted',
        user,
    })
}
export { getAll, getOne, PostUser, updateUser, remove }
