// =================== app.js ===================
import express from 'express'
import todoRoutes from './routes/todo.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

// =====*** Body parser middleware to parse JSON requests ***=====
app.use(express.json())

// =====*** Auth routes ***=====
app.use('/api/auth', authRoutes)

// =====*** Todo routes ***=====
app.use('/api/todos', todoRoutes)

// =====*** Health check route to test if server is running ***=====
app.get('/', (req, res) => {
  res.send('Todo Backend API is running ')
})

export default app
