// =================== todo.controller.js ===================
import Todo from '../models/todo.model.js'

// =====*** Create New Todo ***=====
const createTodo = async (req, res) => {
  try {
    // =====*** Destructure title & description from request body ***=====
    const { title, description } = req.body

    // =====*** Validate that title is provided ***=====
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    // =====*** Create todo associated with logged-in user ***=====
    const todo = await Todo.create({
      title,
      description,
      user: req.user._id,
    })

    // =====*** Send success response with created todo ***=====
    res.status(201).json({
      message: 'Todo created successfully',
      todo,
    })
  } catch (error) {
    // =====*** Handle server errors ***=====
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Get All Todos for Logged-in User ***=====
const getTodos = async (req, res) => {
  try {
    // =====*** Fetch todos for user and sort by creation date descending ***=====
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    })

    // =====*** Send todos with count ***=====
    res.status(200).json({
      count: todos.length,
      todos,
    })
  } catch (error) {
    // =====*** Handle server errors ***=====
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Update Todo by ID ***=====
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params

    // =====*** Find todo by ID and user, then update ***=====
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true } // return updated document
    )

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    // =====*** Send success response with updated todo ***=====
    res.status(200).json({
      message: 'Todo updated',
      todo,
    })
  } catch (error) {
    // =====*** Handle server errors ***=====
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Delete Todo by ID ***=====
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params

    // =====*** Find todo by ID and user, then delete ***=====
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    // =====*** Send success response after deletion ***=====
    res.status(200).json({
      message: 'Todo deleted successfully',
    })
  } catch (error) {
    // =====*** Handle server errors ***=====
    res.status(500).json({ message: 'Server error' })
  }
}

export { createTodo, getTodos, updateTodo, deleteTodo }
