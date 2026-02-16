import express from 'express'
const router = express.Router()

import authMiddleware from '../middlewares/auth.middleware.js'

import {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo,
} from '../controllers/todo.controller.js'

// Protected Routes
router.post('/', authMiddleware, createTodo)
router.get('/', authMiddleware, getTodos)
router.put('/:id', authMiddleware, updateTodo)
router.delete('/:id', authMiddleware, deleteTodo)

export default router
