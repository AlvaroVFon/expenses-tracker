import Joi from 'joi'

export const updateCategorySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  image: Joi.string(),
}).min(1)
