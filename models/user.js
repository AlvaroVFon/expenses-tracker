import { Schema, model } from 'mongoose'
import { redis } from '../database/redis.js'
import { Logger } from './logger.js'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
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
    deletedAt: {
      type: Date,
      default: null,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    expenses: {
      type: [Schema.Types.ObjectId],
      ref: 'Expense',
      default: [],
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
  },
  {
    statics: {
      toPublicObject(user) {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        }
      },
      async findOneByEmail({ email }) {
        return await this.findOne({ email }).where('deletedAt', null)
      },
    },
  },
)

userSchema.post('save', function (doc) {
  Logger.info('User saved', doc)
})

userSchema.post('save', async function (doc) {
  await redis.set(doc._id.toString(), JSON.stringify(doc), 'EX', process.env.REDIS_TTL)
})

userSchema.post('updateOne', async function (doc) {
  await redis.set(doc._id.toString(), JSON.stringify(doc), 'EX', process.env.REDIS_TTL)
})

userSchema.post('deleteOne', async function (doc) {
  await redis.del(doc._id.toString())
})

const User = model('User', userSchema)

export { User }
