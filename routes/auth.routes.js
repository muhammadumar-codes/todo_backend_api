// =================== auth.routes.js ===================
import express from 'express'
const router = express.Router()

import { register, login, getAllUsers } from '../controllers/auth.controller.js'

// =====*** Register new user ***=====
router.post('/register', register)

// =====*** Login existing user ***=====
router.post('/login', login)

// =====*** Get all users (for admin or testing) ***=====
router.get('/users', getAllUsers)

export default router
