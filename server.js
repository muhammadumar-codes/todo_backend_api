const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./config/db')

dotenv.config()

const app = express()

// Parse JSON
app.use(express.json())

// Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://react-todo-five-henna.vercel.app',
]

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

connectDB()

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todos', require('./routes/todo.routes'))

// Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 Todo Backend API is running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
