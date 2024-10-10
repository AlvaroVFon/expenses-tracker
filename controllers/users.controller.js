import { User } from '../models/user.js'
import NotFoundException from '../exceptions/NotFoundException.js'
import { userService } from '../services/users.service.js'
import { handleError } from '../helpers/handleError.js'
import { handleResponse } from '../helpers/handleResponse.js'

async function create(req, res) {
  const { name, email, password, role } = req.body

  try {
    const user = await userService.create({ name, email, password, role })

    handleResponse({
      res,
      data: User.toPublicObject(user),
      message: 'User created successfully',
      status: 201,
    })
  } catch (error) {
    return error
  }
}

async function findAll(req, res) {
  const { page, limit } = req.pagination

  const skip = (page - 1) * limit

  try {
    const { data, totalPages } = await userService.findAll({
      page,
      limit,
      skip,
    })

    handleResponse({
      res,
      data: { users: data.map((user) => User.toPublicObject(user)), page, totalPages, limit },
      message: 'Users found successfully',
      status: 200,
    })
  } catch (error) {
    return error
  }
}

async function findOne(req, res) {
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
    handleError(res, error)
  }
}

async function update(req, res) {
  const { id } = req.params

  const body = req.body

  req.body.updatedAt = new Date()

  try {
    const updatedUser = await userService.update(id, body)
    handleResponse({
      res,
      data: User.toPublicObject(updatedUser),
      message: 'User updated successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function remove(req, res) {
  const { id } = req.params

  try {
    const user = await userService.remove(id)

    handleResponse({
      res,
      data: User.toPublicObject(user),
      message: 'User removed successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function restore(req, res) {
  const { id } = req.params

  try {
    const user = await userService.restore(id)

    handleResponse({
      res,
      data: User.toPublicObject(user),
      message: 'User restored successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}
export { findAll, findOne, create, update, remove, restore }
