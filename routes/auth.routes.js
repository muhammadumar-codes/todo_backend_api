// =================== auth.routes.js ===================
import express from 'express'
const router = express.Router()

import { register, login } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'

import { registerSchema, loginSchema } from '../validations/auth.validation.js'
// =====*** Register new user ***=====
router.post('/register', validate(registerSchema), register)

// =====*** Login existing user ***=====
router.post('/login', validate(loginSchema), login)

export default router
