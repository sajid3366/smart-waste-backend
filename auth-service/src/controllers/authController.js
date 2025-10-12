import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

// 🧾 Signup Controller
export const signup = async (req, res) => {
  try {
    const { full_name, address, email, role, phone, password } = req.body

    // ✅ Check duplicates by email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = new User({
      full_name,
      address,
      email,
      role,
      phone,
      password: hashed
    })

    await user.save()
    res.json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

// 🔐 Login Controller (by phone)
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body

    const user = await User.findOne({ phone })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
