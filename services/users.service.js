import BadRequestException from '../exceptions/BadRequestException.js'
import { hashPassword } from '../helpers/hashPassword.js'
import { User } from '../models/user.js'
import { ObjectId } from 'mongodb'
import { redis } from '../database/redis.js'
import { Logger } from '../models/logger.js'
import NotFoundException from '../exceptions/NotFoundException.js'
import { Role } from '../models/role.js'

export class UserService {
  async create({ name, email, password, role }) {
    const roleId = await Role.findOne({ name: role }).select('_id')

    const user = new User({
      name,
      email,
      password: await hashPassword(password),
      role: roleId,
    })

    try {
      await user.save()
      return user.populate('role')
    } catch (error) {
      Logger.error(error.message, error.stack)
      throw error
    }
  }

  async findAll({ limit = 5, skip }) {
    const totalUsers = await User.countDocuments()

    const totalPages = Math.ceil(totalUsers / limit) === 0 ? 1 : Math.ceil(totalUsers / limit)

    const users = await User.find().limit(parseInt(limit)).skip(skip).populate('role')

    return {
      data: users,
      totalPages,
    }
  }

  async findOne({ id }) {
    if (ObjectId.isValid(id) === false) {
      throw new BadRequestException('Invalid ID')
    }

    const redisUser = await redis.get(id)

    if (redisUser) {
      return JSON.parse(redisUser)
    }

    const user = await User.findOne({ _id: id, deletedAt: null }).populate('role')

    if (user) {
      redis.set(user._id.toString(), JSON.stringify(user), 'EX', process.env.REDIS_TTL)
    }

    return user.populate('role')
  }

  async findOnebyEmail(email) {
    const user = await User.findOneByEmail({ email })
    return user
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data)
  }

  async remove(id) {
    const user = await User.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async restore(id) {
    const user = await User.findByIdAndUpdate(id, { deletedAt: null }).where('deletedAt').ne(null)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async addExpense(userId, expenseId) {
    const user = await User.findByIdAndUpdate(userId, { $push: { expenses: expenseId } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}

export const userService = new UserService()
