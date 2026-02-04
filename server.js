const express = require('express')
const dotenv = require('dotenv')

const connectDB = require('./config/db')

dotenv.config()

const app = express()

// connect databasex`
connectDB()

// routes
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
