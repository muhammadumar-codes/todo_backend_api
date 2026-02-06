const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://todo-fullstack-nine-tau.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

//  Public routes
app.use('/api/auth', authRoutes)

// Protected routes
app.use('/api/todos', todoRoutes)

app.get('/', (req, res) => {
  res.send('Todo Backend API is running 🚀')
})

module.exports = app
