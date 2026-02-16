// =================== todo.routes.js ===================
import express from 'express'
const router = express.Router()

import authMiddleware from '../middlewares/auth.middleware.js'

import {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo,
} from '../controllers/todo.controller.js'

// =====*** Protected route: Create new todo ***=====
router.post('/', authMiddleware, createTodo)

// =====*** Protected route: Get all todos of logged-in user ***=====
router.get('/', authMiddleware, getTodos)

// =====*** Protected route: Update todo by ID ***=====
router.put('/:id', authMiddleware, updateTodo)

// =====*** Protected route: Delete todo by ID ***=====
router.delete('/:id', authMiddleware, deleteTodo)

export default router
