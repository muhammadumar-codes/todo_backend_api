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
    origin: ['http://localhost:5173', 'https://react-todo-phi-dusky.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

connectDB()

app.get('/', (req, res) => {
  res.send('Todo Backend API is running ')
})

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
})
