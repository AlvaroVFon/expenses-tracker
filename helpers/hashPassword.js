import bcrypt from 'bcrypt'

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error(error)
    }
}

export { hashPassword }
