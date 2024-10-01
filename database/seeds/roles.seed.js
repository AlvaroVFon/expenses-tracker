import { roleService } from '../../services/role.service.js'
import { Role } from '../../models/role.js'

async function seedRoles(roles) {
    try {
        await clearRoles()

        for (const role of roles) {
            await roleService.create(role)

            console.log(`Role ${role.name} created`)
        }
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
