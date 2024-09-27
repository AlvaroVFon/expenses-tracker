import Joi from 'joi'
import { rolesEnum } from '../../helpers/rolesEnum.js'

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
        .valid(...Object.values(rolesEnum))
        .required(),
})
