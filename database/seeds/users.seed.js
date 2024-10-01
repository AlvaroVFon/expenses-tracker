import { userService } from '../../services/users.service.js'
import { User } from '../../models/user.js'

async function seedUsers(users) {
    try {
        await clearUsers()

        for (const user of users) {
            await userService.create(user)

            console.log(`User ${user.name} created`)
        }
    } catch (error) {
        console.error(error)
    }
}

async function clearUsers() {
    try {
        await User.collection.drop()
        console.log('Users deleted')
    } catch (error) {
        console.error(error)
    }
}

export { seedUsers }
