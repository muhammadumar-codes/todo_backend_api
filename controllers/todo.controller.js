const Todo = require('../models/todo.model')

// ====* Create Todos *====
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user._id,
    })

    res.status(201).json({
      message: 'Todo created successfully',
      todo,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
// ====* Get All Todos *====
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 })

    res.status(200).json({
      count: todos.length,
      todos,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ====* Update todos *====
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params

    const todo = await Todo.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, {
      new: true,
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json({
      message: 'Todo updated',
      todo,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ====* Delete Todos *====
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id,
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json({
      message: 'Todo deleted successfully',
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
}
