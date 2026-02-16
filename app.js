import express from 'express'
import todoRoutes from './routes/todo.routes.js'
import authRoutes from './routes/auth.routes.js'

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

export default app
