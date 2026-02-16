import express from 'express'
const router = express.Router()

import { register, login, getAllUsers } from '../controllers/auth.controller.js'

router.post('/register', register)
router.post('/login', login)
router.get('/users', getAllUsers) //

export default router
