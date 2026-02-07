const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')



const connectDB = require('./config/db')






// Load env variables
dotenv.config()


const app = express()


// Parse JSON
app.use(express.json())

// CORS config (Frontend access)
app.use(
  cors({
    origin: [
      'http://localhost:5173',          // React local (Vite)
      'http://localhost:3000',          // React CRA (optional)
      'https://react-todo-phi-dusky.vercel.app', // Deployed frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)


connectDB()

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todos', require('./routes/todo.routes'))

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Todo Backend API is running')
})

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
