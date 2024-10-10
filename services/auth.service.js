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
      return await this._generateToken(validUser)
    }
    throw new BadRequestException('Invalid Credentials')
  }

  async _validateUser(email, password) {
    const user = await userService.findOnebyEmail(email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      throw new UnauthorizedException(
        `User is locked, try again in ${(user.lockUntil - Date.now()) / (1000 * 60)} minutes`,
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (isValidPassword) {
      this.unlockOrResetAttemps(user)
      return user
    }

    this.incrementFailedLoginAttempts(user)

    throw new BadRequestException('Invalid Credentials')
  }

  async _generateToken(payload) {
    try {
      return jsonwebtoken.sign(payload._doc, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async verifyToken(token) {
    try {
      const verifiedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)

      return verifiedToken
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }

  async decodeToken(token) {
    try {
      return jsonwebtoken.decode(token, process.env.JWT_SECRET)
    } catch (error) {
      throw new BadRequestException('Invalid token')
    }
  }

  async incrementFailedLoginAttempts(user) {
    user.failedLoginAttempts += 1

    if (user.failedLoginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
      this.lockUser(user)
    }

    await user.save()
  }

  lockUser(user) {
    user.lockUntil = Date.now() + parseInt(process.env.LOCK_TIME)
  }

  unlockOrResetAttemps(user) {
    user.lockUntil = null
    user.failedLoginAttempts = 0
  }
}

export const authService = new AuthService()
