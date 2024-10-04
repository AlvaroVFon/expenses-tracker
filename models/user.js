import { Schema, model } from "mongoose";
import { redis } from "../database/redis.js";
import { Logger } from "./logger.js";

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
      type: String,
      enum: ["superadmin", "admin", "user"],
      ref: "Role",
      required: true,
    },
  },
  {
    statics: {
      toPublicObject(user) {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    },
  },
);

userSchema.post("save", function (doc) {
  Logger.info("User saved", doc);
});

userSchema.post("save", async function (doc) {
  await redis.set(doc._id.toString(), JSON.stringify(doc), "EX", 1800);
});

userSchema.post("updateOne", async function (doc) {
  await redis.set(doc._id.toString(), JSON.stringify(doc), "EX", 1800);
});

userSchema.post("deleteOne", async function (doc) {
  await redis.del(doc._id.toString());
});

const User = model("User", userSchema);

export { User };
