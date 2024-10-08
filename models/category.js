import { Schema, model } from 'mongoose'
import { categoriesEnum } from '../utils/enums/categories.js'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: Object.values(categoriesEnum),
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    createAt: {
      type: Date,
      default: Date.now,
    },

    updateAt: {
      type: Date,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    statics: {
      toPublicObject(category) {
        return {
          id: category._id,
          name: category.name,
          description: category.description,
          image: category.image,
        }
      },
    },
  },
)

const Category = model('Category', categorySchema)

export { Category }
