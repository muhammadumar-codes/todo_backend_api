const dotenv = require('dotenv')
const cors = require('cors')
const dns = require('dns')

const connectDB = require('./config/db')
const app = require('./app')

dotenv.config()

dns.setServers(['8.8.8.8', '8.8.4.4'])

const PORT = process.env.PORT || 5000

// CORS
app.use(
  cors({
    origin: ['http://localhost:5000', 'https://todo-fullstack-nine-tau.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

// connect database
connectDB()

// start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
})
