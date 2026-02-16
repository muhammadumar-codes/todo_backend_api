import dotenv from 'dotenv'
const PORT = process.env.PORT || 5000
import cors from 'cors'

import dns from 'dns'
import connectDB from './config/db.js'
import app from './app.js'

dotenv.config()

dns.setServers(['8.8.8.8', '8.8.4.4'])
// Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://react-todo-five-ashen.vercel.app',
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

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
