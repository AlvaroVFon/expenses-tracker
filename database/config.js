import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI //eslint-disable-line

function databaseConnection() {
    return mongoose.connect(MONGO_URI)
}

export { databaseConnection }
