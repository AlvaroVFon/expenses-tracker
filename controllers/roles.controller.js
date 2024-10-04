import { roleService } from '../services/role.service.js'
import { statusCode } from '../utils/enums/exceptions.js'
import { handleError } from '../helpers/handleError.js'

async function create(req, res) {
  const { id, name } = req.body

  try {
    const role = await roleService.create({ id, name })

    await role.save()

    res.status(201).json({
      message: 'Role created',
      role,
    })
  } catch (error) {
    return res.status(error.status || statusCode.INTERNAL_SERVER_ERROR).json({
      status: error.status || statusCode.INTERNAL_SERVER_ERROR,
      message: error.message || 'Something went wrong',
    })
  }
}

async function findAll(req, res) {
  const { page, limit, skip } = req.pagination

  try {
    const { data, totalPages } = await roleService.findAll({ limit, skip })

    res.json({
      data: data,
      page: parseInt(page),
      limit,
      totalPages,
    })
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving roles',
      error,
    })
  }
}

async function findOne(req, res) {
  const { id } = req.params

  try {
    const role = await roleService.findOne({ id })

    if (!role) {
      return res.status(404).json({
        message: 'Role not found',
      })
    }

    res.json(role)
  } catch (error) {
    res.status(error.status || statusCode.INTERNAL_SERVER_ERROR).json({
      status: error.status || statusCode.INTERNAL_SERVER_ERROR,
      message: error.message || 'Error retrieving role',
    })
  }
}

async function update(req, res) {
  try {
    const { id } = req.params
    const { name } = req.body

    await roleService.update(id, name)

    res.json({
      status: 200,
      message: 'Role updated',
    })
  } catch (error) {
    handleError(res, error)
  }
}

export { create, findAll, findOne, update }
