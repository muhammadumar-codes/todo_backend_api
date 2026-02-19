// =====*** Import Cloudinary SDK ***=====
import { v2 as cloudinary } from 'cloudinary'

// =====*** Configure Cloudinary using environment variables ***=====
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// =====*** Export the configured Cloudinary instance ***=====
export default cloudinary
