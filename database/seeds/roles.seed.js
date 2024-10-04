import { roleService } from '../../services/role.service.js'
import { Role } from '../../models/role.js'
import { roles } from '../factories/role.factory.js'

async function seedRoles() {
  try {
    await clearRoles()

    const createRoles = roles.map(async (role) => {
      await roleService.create(role)
      console.log(`Role ${role.name} created`)
    })

    await Promise.all(createRoles)
  } catch (error) {
    console.error(error)
  }
}

async function clearRoles() {
  try {
    await Role.collection.drop()
    console.log('Roles deleted')
  } catch (error) {
    console.error(error)
  }
}

export { seedRoles }
