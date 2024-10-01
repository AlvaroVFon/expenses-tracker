import BadRequesException from '../exceptions/BadRequestException.js'
import { hashPassword } from '../helpers/hashPassword.js'
import { User } from '../models/user.js'
import { ObjectId } from 'mongodb'
import { redis } from '../database/redis.js'

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
            await redis.set(
                user._id.toString(),
                JSON.stringify(user),
                'EX',
                3600
            )
            return user
        } catch (error) {
            throw new Error(error)
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
            throw new BadRequesException('Invalid ID')
        }

        const redisUser = await redis.get(id)

        if (redisUser) {
            return JSON.parse(redisUser)
        }

        const user = await User.findById(id)

        return user
    }
}

export const userService = new UserService()
