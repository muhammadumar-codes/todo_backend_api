// =================== user.model.js ===================

import mongoose from 'mongoose'

// =====*** Define User schema with avatar fields for Cloudinary ***=====
const userSchema = new mongoose.Schema(
  {
    // User full name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User email (unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // User password (hashed)
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Avatar URL stored from Cloudinary
    avatar: {
      type: String,
      default: null,
    },

    // Cloudinary public_id (needed for delete/update)
    avatarPublicId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
)

// =====*** Export User model ***=====
export default mongoose.model('User', userSchema)
