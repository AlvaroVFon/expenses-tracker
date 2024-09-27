import { Schema, model } from 'mongoose'

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
            enum: ['superadmin', 'admin', 'user'],
            ref: 'Role',
            required: true,
        },
    },
    {
        methods: {
            toPublicObject() {
                return {
                    id: this._id,
                    name: this.name,
                    email: this.email,
                    role: this.role,
                }
            },
        },
    }
)

const User = model('User', userSchema)

export { User }
