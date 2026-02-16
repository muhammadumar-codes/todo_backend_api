// =================== jwt.util.js ===================
import jwt from 'jsonwebtoken'

// =====*** Generate JWT access token ***=====
export const generateAccessToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}
