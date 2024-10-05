import { categoriesService } from '../services/categories.service.js'
import { handleError } from '../helpers/handleError.js'
import { Category } from '../models/category.js'

async function create(req, res) {
  try {
    const { name, description, image = null } = req.body
    const category = await categoriesService.create({ name, description, image })
    res.status(201).json({
      status: 201,
      category: Category.toPublicObject(category),
    })
  } catch (error) {
    return handleError(res, error)
  }
}

async function findAll(req, res) {
  try {
    const { categories, page, totalPages, limit } = await categoriesService.findAll(req.pagination)
    res.status(200).json({
      status: 200,
      categories: categories.map((category) => Category.toPublicObject(category)),
      page,
      totalPages,
      perPage: limit,
    })
  } catch (error) {
    return handleError(res, error)
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params
    const category = await categoriesService.findOne({ id })
    res.status(200).json({
      status: 200,
      category,
    })
  } catch (error) {
    return handleError(res, error)
  }
}

export { create, findOne, findAll }
