import { ObjectId } from 'mongodb'
import { updateRoleSchema } from '../../schemas/roles/updateRole.js'
import BadRequestException from '../../exceptions/BadRequestException.js'
import { Role } from '../../models/role.js'
import NotFoundException from '../../exceptions/NotFoundException.js'
import { handleError } from '../../helpers/handleError.js'

async function updateRoleValidation(req, res, next) {
  const { id } = req.params

  const body = req.body

  try {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id')
    }

    const { error } = updateRoleSchema.validate(body)

    if (error) {
      throw new BadRequestException(error.message)
    }

    const roleExist = await Role.findById(id)

    if (!roleExist) {
      throw new NotFoundException()
    }

    if (roleExist && roleExist._id.toString() !== id) {
      throw new BadRequestException('Role name already exists')
    }

    next()
  } catch (error) {
    handleError(res, error)
  }
}

export { updateRoleValidation }
