import { seedUsers } from './users.seed.js'
import { seedRoles } from './roles.seed.js'
import { databaseConnection } from '../../database/config.js'

/**
 *Clears the database and seeds it with the seeders provided
 *
 * @param {*} databaseConnection - Connection to the database
 * @param {*} seeders - Array of seeders
 */

async function seed(databaseConnection, seeders) {
  try {
    await databaseConnection()

    await Promise.all(seeders.map((seeder) => seeder()))

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed(databaseConnection, [seedRoles, seedUsers])

export { seed }
