import { User } from '../models/user.js'
import NotFoundException from '../exceptions/NotFoundException.js'
import { userService } from '../services/users.service.js'
import { statusCode } from '../utils/enums/exceptions.js'

async function PostUser(req, res) {
    const { name, email, password, role } = req.body

    try {
        const user = await userService.create({ name, email, password, role })

        return res.status(201).json({
            message: 'User created',
            user: User.toPublicObject(user),
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
            data: data.map((user) => User.toPublicObject(user)),
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
        return res
            .status(error.status || statusCode.INTERNAL_SERVER_ERROR)
            .json({
                status: error.status,
                message: error.message || 'Error retrieving user',
            })
    }
}

async function updateUser(req, res) {
    const { id } = req.params

    const body = req.body

    req.body.updatedAt = new Date()

    try {
        userService.update(id, body)
        return res.json({
            status: 200,
            message: 'User updated',
        })
    } catch (error) {
        return res
            .status(error.status || statusCode.INTERNAL_SERVER_ERROR)
            .json({
                status: error.status || statusCode.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error updating user',
            })
    }
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
