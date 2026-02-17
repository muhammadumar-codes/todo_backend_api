// =================== server.js ===================
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import app from './app.js'
// import dns from 'dns'

dotenv.config()

const PORT = process.env.PORT || 5000

// dns.setServers(['8.8.8.8', '8.8.4.4'])

connectDB()

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
