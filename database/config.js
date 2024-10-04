import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI_LOCAL = process.env.MONGO_URI_LOCAL;

function databaseConnection() {
  return mongoose.connect(MONGO_URI_LOCAL);
}

export { databaseConnection };
