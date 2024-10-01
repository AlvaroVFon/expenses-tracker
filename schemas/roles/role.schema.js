import Joi from 'joi'
import { rolesEnum } from '../../utils/enums/roles.js'

export const roleSchema = Joi.object({
    name: Joi.string()
        .required()
        .valid(...Object.values(rolesEnum)),
})
