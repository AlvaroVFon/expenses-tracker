import BadRequestException from '../exceptions/BadRequestException.js'
import { hashPassword } from '../helpers/hashPassword.js'
import { User } from '../models/user.js'
import { ObjectId } from 'mongodb'
import { redis } from '../database/redis.js'
import { Logger } from '../models/logger.js'
import NotFoundException from '../exceptions/NotFoundException.js'

export class UserService {
    async create({ name, email, password, role }) {
        const user = new User({
            name,
            email,
            password: await hashPassword(password),
            role,
        })

        try {
            await user.save()
            return user
        } catch (error) {
            Logger.error(error.message, error.stack)
            throw error
        }
    }

    async findAll({ limit = 5, skip }) {
        const totalUsers = await User.countDocuments()

        const totalPages =
            Math.ceil(totalUsers / limit) === 0
                ? 1
                : Math.ceil(totalUsers / limit)

        const users = await User.find().limit(parseInt(limit)).skip(skip)

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

        const user = await User.findOne({ _id: id, deletedAt: null })

        if (user) {
            redis.set(user._id.toString(), JSON.stringify(user), 'EX', 1800)
        }

        return user
    }

    async findOnebyEmail(email) {
        const user = User.findOne({
            email: email,
        })

        return user
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data)
    }

    async remove(id) {
        const user = await User.findOneAndUpdate(
            { _id: id, deletedAt: null },
            {
                deletedAt: new Date(),
            }
        )

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async restore(id) {
        const user = await User.findByIdAndUpdate(id, { deletedAt: null })
        if (!user) {
            throw NotFoundException('User not found')
        }
    }
}

export const userService = new UserService()
