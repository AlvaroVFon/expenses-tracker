import Joi from 'joi'
import { categoriesEnum } from '../../utils/enums/categories'

export const updateCategorySchema = Joi.object({
  name: Joi.string().valid(...Object.values(categoriesEnum)),
  description: Joi.string(),
  image: Joi.string(),
}).min(1)
