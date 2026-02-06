const express = require('express')

const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')

const app = express()

// body parser
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

// health check
app.get('/', (req, res) => {
  res.send('Todo Backend API is running ')
})

module.exports = app
