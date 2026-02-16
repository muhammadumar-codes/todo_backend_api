// =================== auth.controller.js ===================

import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../utils/hash.util.js'
import { generateAccessToken } from '../utils/jwt.util.js'

// =====*** Register New User ***=====
const register = async (req, res) => {
  try {
    // =====*** Destructure user input from request body ***=====
    const { name, email, password } = req.body

    // =====*** Validate required fields ***=====
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // =====*** Normalize email to prevent duplicates ***=====
    const normalizedEmail = email.toLowerCase()

    // =====*** Check if user already exists ***=====
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // =====*** Hash password before saving to database ***=====
    const hashedPassword = await hashPassword(password)

    // =====*** Create new user in database ***=====
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    })

    // =====*** Generate JWT access token ***=====
    const token = generateAccessToken({ userId: user._id })

    // =====*** Send success response (never send password) ***=====
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    // =====*** Handle server errors ***=====
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Login User ***=====
const login = async (req, res) => {
  try {
    // =====*** Destructure email & password from request body ***=====
    const { email, password } = req.body

    // =====*** Validate required fields ***=====
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // =====*** Normalize email ***=====
    const normalizedEmail = email.toLowerCase()

    // =====*** Find user by email ***=====
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // =====*** Compare provided password with hashed password ***=====
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // =====*** Generate JWT access token ***=====
    const token = generateAccessToken({ userId: user._id })

    // =====*** Send success response ***=====
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    // =====*** Handle server errors ***=====
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Export Auth Controllers ***=====
export { register, login }
