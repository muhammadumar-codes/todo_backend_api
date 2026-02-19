import multer from 'multer'

// =====*** Use memory storage (files stored in buffer, not on disk) ***=====
const storage = multer.memoryStorage()

// =====*** Configure multer upload settings ***=====
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
})

// =====*** Export upload middleware for routes ***=====
export default upload
