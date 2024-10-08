import { roleService } from '../services/role.service.js'
import { handleError } from '../helpers/handleError.js'
import { handleResponse } from '../helpers/handleResponse.js'

async function create(req, res) {
  const { id, name } = req.body

  try {
    const role = await roleService.create({ id, name })

    await role.save()

    handleResponse({
      res,
      data: role,
      message: 'Role created successfully',
      status: 201,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function findAll(req, res) {
  const { page, limit, skip } = req.pagination

  try {
    const { roles, totalPages } = await roleService.findAll({ limit, skip })

    handleResponse({
      res,
      data: { roles, page, totalPages, limit },
      message: 'Roles found successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
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

    handleResponse({
      res,
      data: role,
      message: 'Role found successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function update(req, res) {
  try {
    const { id } = req.params
    const { name } = req.body

    const updatedRole = await roleService.update(id, name)

    handleResponse({
      res,
      data: updatedRole,
      message: 'Role updated successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

export { create, findAll, findOne, update }
