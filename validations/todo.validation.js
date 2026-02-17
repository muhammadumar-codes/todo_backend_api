// =================== todo.validation.js ===================
import * as yup from 'yup'

// =====*** MongoDB ObjectId Regex Pattern ***=====
const objectIdRegex = /^[0-9a-fA-F]{24}$/

// =====*** Create Todo Validation Schema ***=====

export const createTodoSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(1, 'Title cannot be empty')
    .required('Title is required'),

  description: yup
    .string()
    .trim()
    .nullable()
    .max(500, 'Description cannot exceed 500 characters'),
})

// =====*** Update Todo Validation Schema ***=====

export const updateTodoSchema = yup.object({
  title: yup.string().trim().min(1, 'Title cannot be empty'),

  description: yup
    .string()
    .trim()
    .nullable()
    .max(500, 'Description cannot exceed 500 characters'),

  completed: yup.boolean().typeError('Completed must be true or false'),
})

// =====*** Validate Todo ID (Params) ***=====

export const todoIdParamSchema = yup.object({
  id: yup
    .string()
    .matches(objectIdRegex, 'Invalid Todo ID')
    .required('Todo ID is required'),
})
