// =================== server.js ===================
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import app from './app.js'

// =====*** Load environment variables from .env file ***=====
dotenv.config()

// =====*** Server port from env or default 5000 ***=====
const PORT = process.env.PORT || 5000

// =====*** Allowed origins for CORS ***=====
const allowedOrigins = [
  'http://localhost:5173',
  'https://react-todo-five-ashen.vercel.app',
]

// =====*** CORS configuration to allow only allowed origins ***=====
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

// =====*** Connect to MongoDB ***=====
connectDB()

// =====*** Start Express server ***=====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
