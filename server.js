const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const app = require('./app')

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const PORT = process.env.PORT

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-frontend-domain.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
)

connectDB()

app.get('/', (req, res) => {
  res.send('Todo Backend API is running ')
})

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
})
