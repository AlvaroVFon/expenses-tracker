import Joi from 'joi'
import { paymentMethods } from '../../utils/enums/paymentMethods.js'

export const updateExpenseSchema = Joi.object({
  description: Joi.string(),
  amount: Joi.number().min(0.01),
  date: Joi.date(),
  category: Joi.string().min(3).max(50),
  paymentMethod: Joi.string().valid(...Object.values(paymentMethods)),
  isRecurring: Joi.boolean(),
  notes: Joi.string(),
}).min(1)
