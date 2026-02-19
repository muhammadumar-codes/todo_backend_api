import User from '../models/user.model.js'
import { comparePassword, hashPassword } from '../utils/hash.util.js'
import { generateAccessToken } from '../utils/jwt.util.js'
import cloudinary from '../config/cloudinary.js'
import streamifier from 'streamifier'

// =====*** Register New User with optional Cloudinary avatar ***=====
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const normalizedEmail = email.toLowerCase()

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await hashPassword(password)

    let imageUrl = null
    let avatarPublicId = null

    // =====*** Upload avatar to Cloudinary if provided ***=====
    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'users',
              resource_type: 'image',
              transformation: [{ width: 300, height: 300, crop: 'fill' }],
            },
            (error, result) => {
              if (result) resolve(result)
              else reject(error)
            }
          )

          // Convert buffer to stream and pipe to Cloudinary
          streamifier.createReadStream(req.file.buffer).pipe(stream)
        })

      const result = await uploadFromBuffer()
      imageUrl = result.secure_url
      avatarPublicId = result.public_id
    }

    // =====*** Create user in DB ***=====
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      avatar: imageUrl,
      avatarPublicId,
    })

    // =====*** Generate JWT token ***=====
    const token = generateAccessToken({ userId: user._id })

    // =====*** Send response ***=====
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Login User ***=====
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const normalizedEmail = email.toLowerCase()

    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateAccessToken({ userId: user._id })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// =====*** Export controllers ***=====
export { register, login }
