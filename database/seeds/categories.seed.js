import { Category } from '../../models/category.js'
import { categoriesEnum } from '../../utils/enums/categories.js'

async function seedCategories() {
  try {
    await clearCategories()

    const categories = Object.values(categoriesEnum).map((name) => ({
      name,
      description: `Description of ${name}`,
    }))

    const promises = categories.map(async (category) => {
      await Category.create(category)
      console.log(`Category ${category.name} created`)
    })

    await Promise.all(promises)

    return categories
  } catch (error) {
    console.error(error)
  }
}

async function clearCategories() {
  await Category.collection.drop()
  console.log('Categories deleted')
}

export { seedCategories }
