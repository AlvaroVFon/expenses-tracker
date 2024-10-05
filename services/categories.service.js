import { Category } from '../models/category.js'

class CategoriesService {
  async create({ name, description, image = null }) {
    const category = new Category({ name, description, image })

    console.log(category)
    await category.save()
    return category
  }

  async findAll(pagination) {
    const { page, limit, skip } = pagination

    const categories = await Category.find().skip(skip).limit(limit)

    const total = await Category.countDocuments()

    const totalPages = Math.ceil(total / limit) === 0 ? 1 : Math.ceil(total / limit)

    return {
      categories,
      total,
      page,
      limit,
      totalPages,
    }
  }

  async findOne({ id }) {
    return await Category.findById(id)
  }

  async findOneByName({ name }) {
    return await Category.findOne({ name })
  }
}

export const categoriesService = new CategoriesService()
