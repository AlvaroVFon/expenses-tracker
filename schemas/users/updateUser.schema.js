import Joi from 'joi'
import { rolesEnum } from '../../utils/enums/roles.js'

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(30),
  role: Joi.string().valid(...Object.values(rolesEnum)),
}).min(1)
