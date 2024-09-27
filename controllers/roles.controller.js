import { Role } from '../models/role.js'
import { roleSchema } from '../schemas/roles/role.schema.js'

async function create(req, res) {
    const { id, name } = req.body

    const { error } = roleSchema.validate({ id, name })

    if (error) {
        return res.status(400).json({
            message: error.message,
        })
    }

    const role = new Role({ id, name })

    try {
        const roleExists = await Role.findOne({ name })

        if (roleExists) {
            return res.status(400).json({
                message: 'Role already exists',
            })
        }

        await role.save()

        res.status(201).json({
            message: 'Role created',
            role,
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
        const totalRoles = await Role.countDocuments()

        const totalPages =
            Math.ceil(totalRoles / limit) === 0
                ? 1
                : Math.ceil(totalRoles / limit)

        const roles = await Role.find().limit(limit).skip(skip)

        res.json({
            data: roles,
            page: parseInt(page),
            limit,
            totalPages,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving roles',
            error,
        })
    }
}

export { create, findAll }
