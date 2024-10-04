import Joi from 'joi'
import { rolesEnum } from '../../utils/enums/roles.js'

export const updateRoleSchema = Joi.object({
  name: Joi.string()
    .required()
    .valid(...Object.values(rolesEnum)),
}).min(1)
