// =================== user.model.js ===================
import mongoose from 'mongoose'

// =====*** Define User schema ***=====
const userSchema = new mongoose.Schema(
  {
    // =====*** User's full name (required) ***=====
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =====*** User email (required, unique, lowercase) ***=====
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // =====*** User password (required, min length 6) ***=====
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  // =====*** Automatically add createdAt and updatedAt timestamps ***=====
  { timestamps: true }
)

// =====*** Export User model ***=====
export default mongoose.model('User', userSchema)
