// =================== db.js ===================
import mongoose from 'mongoose'

// =====*** Connect to MongoDB ***=====
const connectDB = async () => {
  try {
    // =====*** Connect using MONGO_URI from environment variables ***=====
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // =====*** Log successful connection ***=====
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`)
  } catch (error) {
    // =====*** Handle connection errors and exit process ***=====
    console.error('MongoDB connection failed')
    console.error(error.message)
    process.exit(1)
  }
}

export default connectDB
