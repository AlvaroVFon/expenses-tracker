import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { router } from '../routes/index.route.js'
import { userRouter } from '../routes/users.route.js'
import { databaseConnection } from '../database/config.js'
import { rolesRouter } from '../routes/roles.route.js'
import { AuthRouter } from '../routes/auth.route.js'
import { authGuard } from '../middlewares/auth/AuthGuard.js'
import { categoriesRouter } from '../routes/categories.route.js'
import { expensesRouter } from '../routes/expenses.route.js'
config()

class Server {
  port = process.env.SERVER_PORT

  constructor() {
    this.app = express()
    this.middlwares()
    this.database()
    this.routes()
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }

  middlwares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  async database() {
    databaseConnection()
  }

  routes() {
    this.app.use(router)
    this.app.use(AuthRouter)
    this.app.use(authGuard)
    this.app.use('/users', userRouter)
    this.app.use('/roles', rolesRouter)
    this.app.use('/categories', categoriesRouter)
    this.app.use('/expenses', expensesRouter)
  }
}

export const server = new Server()
