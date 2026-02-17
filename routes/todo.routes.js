// =================== todo.routes.js ===================
import express from 'express'
const router = express.Router()

import authMiddleware from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller.js'

import {
  createTodoSchema,
  updateTodoSchema,
  todoIdParamSchema,
} from '../validations/todo.validation.js'

// =====*** Create Todo (Validate Body) ***=====
router.post('/', authMiddleware, validate(createTodoSchema), createTodo)

// =====*** Get Todos (No body validation needed) ***=====
router.get('/', authMiddleware, getTodos)

// =====*** Update Todo (Validate Params + Body) ***=====
router.put(
  '/:id',
  authMiddleware,
  validate(todoIdParamSchema, 'params'),
  validate(updateTodoSchema),
  updateTodo
)

// =====*** Delete Todo (Validate Params) ***=====
router.delete(
  '/:id',
  authMiddleware,
  validate(todoIdParamSchema, 'params'),
  deleteTodo
)

export default router
