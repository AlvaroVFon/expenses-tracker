import { categoriesService } from '../services/categories.service.js'
import { handleError } from '../helpers/handleError.js'
import { Category } from '../models/category.js'
import { handleResponse } from '../helpers/handleResponse.js'

async function create(req, res) {
  try {
    const { name, description, image = null } = req.body
    const category = await categoriesService.create({ name, description, image })
    handleResponse({
      res,
      data: Category.toPublicObject(category),
      message: 'Category created successfully',
      status: 201,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function findAll(req, res) {
  try {
    const { categories, page, totalPages, limit } = await categoriesService.findAll(req.pagination)
    handleResponse({
      res,
      data: { categories: categories.map((category) => Category.toPublicObject(category)), page, totalPages, limit },
      message: 'Categories found successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params
    const category = await categoriesService.findOne({ id })
    handleResponse({
      res,
      data: Category.toPublicObject(category),
      message: 'Category found successfully',
      status: 200,
    })
  } catch (error) {
    handleError(res, error)
  }
}

export { create, findOne, findAll }
