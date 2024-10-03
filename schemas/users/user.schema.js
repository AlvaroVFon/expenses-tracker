import Joi from 'joi'
import { rolesEnum } from '../../utils/enums/roles.js'

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .required(),
    password: Joi.string().required(),
    role: Joi.string()
        .valid(...Object.values(rolesEnum))
        .required(),
})
