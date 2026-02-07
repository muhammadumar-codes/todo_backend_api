const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const PORT = process.env.PORT || 5000

// Create Express app
const app = express()

// ===================== CORS CONFIGURATION =====================
// MUST BE THE VERY FIRST MIDDLEWARE
const corsOptions = {
  origin: '*', // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
    'X-Auth-Token',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
}

// Apply CORS middleware
app.use(cors(corsOptions))

// Handle preflight requests explicitly
app.options('*', cors(corsOptions))

// Add manual CORS headers as backup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token',
  )
  res.header('Access-Control-Expose-Headers', 'Content-Range, X-Content-Range')
  res.header('Access-Control-Allow-Credentials', 'true')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      status: 'OK',
      message: 'Preflight request successful',
    })
  }

  next()
})

// ===================== BODY PARSERS =====================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ===================== CONNECT DATABASE =====================
connectDB()

// ===================== IMPORT ROUTES =====================
// Import your routes AFTER CORS middleware
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todos')

// ===================== ROUTES =====================
app.get('/', (req, res) => {
  res.json({
    message: 'Todo Backend API is running',
    endpoints: {
      auth: '/api/auth',
      todos: '/api/todos',
    },
    timestamp: new Date().toISOString(),
  })
})

// Add a CORS test endpoint
app.get('/api/cors-test', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working!',
    timestamp: new Date().toISOString(),
    allowedOrigin: '*',
    yourOrigin: req.headers.origin || 'No origin header',
  })
})

// ===================== API ROUTES =====================
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

// ===================== ERROR HANDLING =====================
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ===================== START SERVER =====================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📡 CORS enabled for all origins`)
  console.log(`🔗 Test CORS: https://todo-backend-api-two.vercel.app/api/cors-test`)
})

// Export for Vercel
module.exports = app
