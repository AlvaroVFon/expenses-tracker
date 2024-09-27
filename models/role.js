import { Schema, model } from 'mongoose'

export const RoleSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
})

const Role = model('Role', RoleSchema)

export { Role }
