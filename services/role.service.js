import { Role } from '../models/role.js'
import BadRequesException from '../exceptions/BadRequestException.js'
import { isObjectIdOrHexString } from 'mongoose'
import NotFoundException from '../exceptions/NotFoundException.js'

export class RoleService {
  async create({ name }) {
    const role = new Role({
      name,
    })

    try {
      await role.save()
      return role
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll({ limit = 5, skip }) {
    const totalRoles = await Role.countDocuments()

    const totalPages = Math.ceil(totalRoles / limit) === 0 ? 1 : Math.ceil(totalRoles / limit)

    const roles = await Role.find().limit(parseInt(limit)).skip(skip)

    return {
      roles,
      totalPages,
    }
  }

  async findOne({ id }) {
    if (isObjectIdOrHexString(id) === false) {
      throw new BadRequesException('Invalid ID')
    }

    const role = await Role.findById(id)

    return role
  }

  async update(id, name) {
    const role = await Role.findOneAndUpdate({ _id: id }, { name })

    if (!role) {
      throw new NotFoundException('Role not found')
    }

    return role
  }
}

export const roleService = new RoleService()
