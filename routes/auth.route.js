import { Router } from 'express'
import { getUserFromToken, login } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login).get('/me', getUserFromToken)

export { router as AuthRouter }
