import { Schema, model } from 'mongoose'

export const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

const Role = model('Role', RoleSchema)

export { Role }
