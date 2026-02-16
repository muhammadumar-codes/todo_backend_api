import { validate } from '../middlewares/validate.middleware.js'
import {
  createTodoSchema,
  updateTodoSchema,
  todoIdParamSchema,
} from '../validations/todo.validation.js'

// =====*** Create Todo ***=====
router.post('/', authMiddleware, validate(createTodoSchema), createTodo)

// =====*** Get Todos (No body validation needed) ***=====
router.get('/', authMiddleware, getTodos)

// =====*** Update Todo ***=====
router.put(
  '/:id',
  authMiddleware,
  validate(todoIdParamSchema, 'params'),
  validate(updateTodoSchema),
  updateTodo
)

// =====*** Delete Todo ***=====
router.delete(
  '/:id',
  authMiddleware,
  validate(todoIdParamSchema, 'params'),
  deleteTodo
)
