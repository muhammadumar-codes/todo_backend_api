// =================== todo.model.js ===================
import mongoose from 'mongoose'

// =====*** Define Todo schema ***=====
const todoSchema = new mongoose.Schema(
  {
    // =====*** Title of the todo (required) ***=====
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // =====*** Optional description of the todo ***=====
    description: {
      type: String,
      trim: true,
    },

    // =====*** Boolean flag to check if todo is completed (default: false) ***=====
    completed: {
      type: Boolean,
      default: false,
    },

    // =====*** Reference to the user who created the todo (required) ***=====
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  // =====*** Automatically add createdAt and updatedAt timestamps ***=====
  { timestamps: true }
)

// =====*** Export Todo model ***=====
export default mongoose.model('Todo', todoSchema)
