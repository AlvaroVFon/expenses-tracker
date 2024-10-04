import { Schema, model } from 'mongoose'
import { logLevels } from '../utils/enums/logLevels.js'

const loggerSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
      enum: [...Object.values(logLevels)],
    },

    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    statics: {
      async info(message, stack = null) {
        return await this.create({
          message,
          level: logLevels.INFO,
          timestamp: new Date(),
          stack,
        })
      },
      error(message, stack = null) {
        return this.create({
          message,
          level: logLevels.ERROR,
          timestamp: new Date(),
          stack,
        })
      },
      warn(message, stack = null) {
        return this.create({
          message,
          level: logLevels.WARN,
          timestamp: new Date(),
          stack,
        })
      },
      debug(message, stack = null) {
        return this.create({
          message,
          level: logLevels.DEBUG,
          timestamp: new Date(),
          stack,
        })
      },
    },

    methods: {
      getErrors() {
        this.find({ level: logLevels.ERROR })
      },
    },
  },
)

const Logger = model('Log', loggerSchema)

export { Logger }
