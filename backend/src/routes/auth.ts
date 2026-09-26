import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { runAsync, getAsync } from "../config/database"
import { generateTokens } from "../utils/jwt"

const router = express.Router()

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name, whatsapp } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name are required" })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const userId = uuid()

    await runAsync(
      "INSERT INTO users (id, email, password_hash, name, whatsapp) VALUES (?, ?, ?, ?, ?)",
      [userId, email, passwordHash, name, whatsapp || null]
    )

    const { accessToken, refreshToken } = generateTokens({ userId, email })

    res.status(201).json({
      success: true,
      user: { id: userId, email, name },
      accessToken,
      refreshToken
    })
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ error: "Email already exists" })
    }
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await getAsync("SELECT * FROM users WHERE email = ?", [email])

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email
    })

    res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Logout (client-side only, just return success)
router.post("/logout", (req: Request, res: Response) => {
  res.json({ success: true, message: "Logged out" })
})

export default router
