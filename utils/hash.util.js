// =================== hash.util.js ===================
import bcrypt from 'bcrypt'

// =====*** Hash plain text password using bcrypt ***=====
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12) // 12 rounds of salt
}

// =====*** Compare plain password with hashed password ***=====
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}
