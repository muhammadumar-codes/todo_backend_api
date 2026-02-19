// =================== auth.routes.js ===================
import express from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import upload from '../middlewares/upload.middleware.js'
import { registerSchema, loginSchema } from '../validations/auth.validation.js'

const router = express.Router()

// =====*** Register New User (with optional avatar upload) ***=====
router.post(
  '/register',
  upload.single('avatar'), // Multer middleware, field name must match frontend
  validate(registerSchema), // Yup validation middleware
  register // Controller
)

// =====*** Login User ***=====
router.post('/login', validate(loginSchema), login)

export default router
