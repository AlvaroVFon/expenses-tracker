import { User } from '../models/user.js'
import { hashPassword } from '../helpers/hashPassword.js'

async function create(req, res) {
    const { name, email, password, role } = req.body

    const user = new User({
        name,
        email,
        password: await hashPassword(password),
        role,
    })

    try {
        await user.save()

        return res.status(201).json({
            message: 'User created',
            user: user.toPublicObject(),
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}

async function findAll(req, res) {
    const { page, limit, skip } = req.pagination

    try {
        const totalUsers = await User.countDocuments()

        const totalPages =
            Math.ceil(totalUsers / limit) === 0
                ? 1
                : Math.ceil(totalUsers / limit)

        const users = await User.find()
            .limit(limit * 1)
            .skip(skip)

        return res.json({
            data: users.map((user) => user.toPublicObject()),
            page: parseInt(page),
            limit,
            totalPages,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving users',
            error,
        })
    }
}

async function findOne(req, res) {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            })
        }

        return res.json({
            data: 'Get one user',
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving user',
            error,
        })
    }
}

async function update(req, res) {
    const { id } = req.params

    const body = req.body

    req.body.updatedAt = new Date()

    const user = await User.findByIdAndUpdate(id, body)

    return res.json({
        message: 'User updated',
        user,
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
export { findAll, findOne, create, update, remove }
