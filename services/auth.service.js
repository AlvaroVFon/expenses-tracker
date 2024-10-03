import jsonwebtoken from 'jsonwebtoken'
import { userService } from './users.service.js'
import NotFoundException from '../exceptions/NotFoundException.js'
import bcrypt from 'bcrypt'
import BadRequestException from '../exceptions/BadRequestException.js'
import UnauthorizedException from '../exceptions/UnauthorizedException.js'

class AuthService {
    async login(email, password) {
        const validUser = await this._validateUser(email, password)

        if (validUser) {
            return await this._generateToken(validUser.toObject())
        }

        throw new BadRequestException('Invalid Credentials')
    }

    async _validateUser(email, password) {
        try {
            const user = await userService.findOnebyEmail(email)

            if (!user) {
                throw new NotFoundException('User not found')
            }

            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            )

            if (!isValidPassword) {
                throw new BadRequestException('Invalid credentials')
            }
            return user
        } catch (error) {
            return null
        }
    }

    async _generateToken(payload) {
        try {
            return await jsonwebtoken.sign(payload, process.env.JWT_SECRET)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async verifyToken(token) {
        try {
            const verifiedToken = await jsonwebtoken.verify(
                token,
                process.env.JWT_SECRET
            )

            return verifiedToken
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }

    async decodeToken(token) {
        try {
            return await jsonwebtoken.decode(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new BadRequestException('Invalid token')
        }
    }
}

export const authService = new AuthService()
