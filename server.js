const app = require('./app')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config()

// CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://todo-fullstack-nine-tau.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

// middleware

// connect databasex`
connectDB()

// routes
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
