// =================== auth.middleware.js ===================
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// =====*** Middleware to protect routes and authenticate users ***=====
const authMiddleware = async (req, res, next) => {
  try {
    // =====*** Get the Authorization header from request ***=====
    const authHeader = req.headers.authorization

    // =====*** Check if header exists and starts with 'Bearer' ***=====
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided',
      })
    }

    // =====*** Extract token from header ***=====
    const token = authHeader.split(' ')[1]

    // =====*** Verify JWT token using secret key ***=====
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // =====*** Find user by ID from token and exclude password field ***=====
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      })
    }

    // =====*** Attach user to request object for next middleware/controllers ***=====
    req.user = user

    // =====*** Call next middleware/controller ***=====
    next()
  } catch (error) {
    // =====*** Handle invalid or expired token errors ***=====
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

export default authMiddleware
