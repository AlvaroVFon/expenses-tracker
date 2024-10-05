import { Schema, model } from 'mongoose'
import { paymentMethods } from '../utils/enums/paymentMethods.js'

const expenseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(paymentMethods),
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    statics: {
      toPublicObject(expense) {
        return {
          id: expense._id,
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
          category: expense.category.name,
          paymentMethod: expense.paymentMethod,
          user: expense.user,
          isRecurring: expense.isRecurring,
          notes: expense.notes,
        }
      },
    },
  },
)

const Expense = model('Expense', expenseSchema)

export { Expense }
