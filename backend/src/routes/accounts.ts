import express, { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { runAsync, allAsync } from "../config/database"

const router = express.Router()

// Get accounts for user
router.get("/", async (req: Request, res: Response) => {
  try {
    const accounts = await allAsync(
      "SELECT * FROM accounts WHERE user_id = ? ORDER BY created_at DESC",
      [req.userId]
    )

    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)

    res.json({
      success: true,
      data: accounts,
      totalBalance
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create account
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, type, balance, bank_id } = req.body

    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" })
    }

    const id = uuid()

    await runAsync(
      "INSERT INTO accounts (id, user_id, name, type, balance, bank_id) VALUES (?, ?, ?, ?, ?, ?)",
      [id, req.userId, name, type, balance || 0, bank_id || null]
    )

    res.status(201).json({
      success: true,
      account: { id, user_id: req.userId, name, type, balance: balance || 0, bank_id }
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
