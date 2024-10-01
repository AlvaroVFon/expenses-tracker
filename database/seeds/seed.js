import { users } from '../factories/users.factory.js'
import { roles } from '../factories/role.factory.js'
import { seedUsers } from './users.seed.js'
import { seedRoles } from './roles.seed.js'
import { databaseConnection } from '../../database/config.js'

async function seed() {
    try {
        await databaseConnection()
        await seedUsers(users)
        await seedRoles(roles)

        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

seed()

export { seed }
