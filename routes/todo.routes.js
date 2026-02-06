const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth.middleware')
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo.controller')

// Protected Routes

router.post('/', authMiddleware, createTodo)
router.get('/', authMiddleware, getTodos)
router.put('/:id', authMiddleware, updateTodo)
router.delete('/:id', authMiddleware, deleteTodo)

module.exports = router
