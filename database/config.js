import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL

function databaseConnection() {
  return mongoose.connect(MONGO_URI)
}

export { databaseConnection }
