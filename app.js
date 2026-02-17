// =================== app.js ===================
import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todo.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

// =====*** CORS configuration ***=====
const allowedOrigins = [
  'http://localhost:5173',
  'https://react-todo-five-ashen.vercel.app',
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)

// =====*** Body parser ***=====
app.use(express.json())

// =====*** Routes ***=====
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

// =====*** Health route ***=====
app.get('/', (req, res) => {
  res.send('Todo Backend API is running')
})

export default app
