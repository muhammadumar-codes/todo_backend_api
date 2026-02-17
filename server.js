// =================== server.js ===================
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import app from './app.js'
import dns from 'dns'

// =====*** Load environment variables from .env file ***=====
dotenv.config()

// =====*** Server port from env or default 5000 ***=====
const PORT = process.env.PORT || 5000

// =====*** Set DNS servers for production reliability ***=====
dns.setServers(['8.8.8.8', '8.8.4.4'])

// =====*** Allowed origins for CORS ***=====
const allowedOrigins = [
  'http://localhost:5173',
  'https://react-todo-five-ashen.vercel.app',
]

// =====*** CORS configuration (preflight safe) ***=====
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true)

      // allow only whitelisted origins
      if (allowedOrigins.includes(origin)) return callback(null, true)

      // reject others
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true, // allow cookies & authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
  })
)

// =====*** Connect to MongoDB ***=====
connectDB()

// =====*** Start Express server ***=====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
