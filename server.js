const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const app = require('./app')

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const PORT = process.env.PORT || 5000

// Apply CORS with explicit handling for preflight
app.use((req, res, next) => {
  // Allow from all origins (or specify your frontend URLs)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  next()
})

// Also use cors middleware as backup
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

connectDB()

app.get('/', (req, res) => {
  res.send('Todo Backend API is running ')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
