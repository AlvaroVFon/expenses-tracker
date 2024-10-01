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
            async info(message) {
                return await this.create({
                    message,
                    level: logLevels.INFO,
                    timestamp: new Date(),
                })
            },
            error(message) {
                return this.create({
                    message,
                    level: logLevels.ERROR,
                    timestamp: new Date(),
                })
            },
            warn(message) {
                return this.create({
                    message,
                    level: logLevels.WARN,
                    timestamp: new Date(),
                })
            },
            debug(message) {
                return this.create({
                    message,
                    level: logLevels.DEBUG,
                    timestamp: new Date(),
                })
            },
        },

        methods: {
            getErrors() {
                this.find({ level: logLevels.ERROR })
            },
        },
    }
)

const Logger = model('Log', loggerSchema)

export { Logger }
