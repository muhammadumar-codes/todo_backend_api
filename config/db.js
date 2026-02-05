const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
  try {
    var conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(' MongoDB connection failed')
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
