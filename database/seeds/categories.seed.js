import { Category } from '../../models/category.js'
import { categoriesEnum } from '../../utils/enums/categories.js'

async function seedCategories() {
  await clearCategories()

  const categories = Object.values(categoriesEnum).map((name) => ({
    name,
    description: `Description of ${name}`,
  }))

  const promises = categories.map((category) => {
    Category.create(category)
    console.log(`Category ${category.name} created`)
  })

  await Promise.all(promises)

  return categories
}

async function clearCategories() {
  await Category.collection.drop()
}

export { seedCategories }
