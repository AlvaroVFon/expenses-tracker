import Joi from 'joi'

export const roleSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
})
