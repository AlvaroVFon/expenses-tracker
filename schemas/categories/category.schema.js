import Joi from 'joi'
import { categoriesEnum } from '../../utils/enums/categories.js'

export const categorySchema = Joi.object({
  name: Joi.string()
    .valid(...Object.values(categoriesEnum))
    .required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
  createAt: Joi.date().default(Date.now),
  updateAt: Joi.date().default(null),
  deletedAt: Joi.date().default(null),
})
