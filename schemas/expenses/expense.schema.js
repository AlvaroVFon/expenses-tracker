import Joi from 'joi'

export const expenseSchema = Joi.object({
  description: Joi.string(),
  amount: Joi.number().required(),
  date: Joi.date().required(),
  category: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  user: Joi.string().optional(),
  isRecurring: Joi.boolean().required(),
  notes: Joi.string(),
})
