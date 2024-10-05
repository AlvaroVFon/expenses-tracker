import { categorySchema } from '../../schemas/categories/category.schema.js'
import { handleError } from '../../helpers/handleError.js'
import { categoriesService } from '../../services/categories.service.js'
import { statusCode } from '../../utils/enums/exceptions.js'
import ConflictException from '../../exceptions/ConflictException.js'

async function createCategoryValidation(req, res, next) {
  try {
    const { error } = categorySchema.validate(req.body)

    if (error) {
      return handleError(res, {
        status: statusCode.CONFLICT,
        message: error.message,
      })
    }

    const { name } = req.body

    const categoryExist = await categoriesService.findOneByName({ name })

    if (categoryExist) {
      throw new ConflictException('Category already exists')
    }

    next()
  } catch (error) {
    return handleError(res, error)
  }
}

export { createCategoryValidation }
