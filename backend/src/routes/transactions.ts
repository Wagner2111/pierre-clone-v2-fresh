import express, { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { runAsync, allAsync } from "../config/database"

const router = express.Router()

// Get transactions for user
router.get("/", async (req: Request, res: Response) => {
  try {
    const { type, category } = req.query
    let sql = "SELECT * FROM transactions WHERE user_id = ?"
    const params: any[] = [req.userId]

    if (type) {
      sql += " AND type = ?"
      params.push(type)
    }

    if (category) {
      sql += " AND category LIKE ?"
      params.push(`%${category}%`)
    }

    sql += " ORDER BY date DESC"

    const transactions = await allAsync(sql, params)

    res.json({
      success: true,
      data: transactions,
      total: transactions.length
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create transaction
router.post("/", async (req: Request, res: Response) => {
  try {
    const { value, type, category, description, account, date } = req.body

    if (!value || !type || !category || !description || !date) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const id = uuid()

    await runAsync(
      "INSERT INTO transactions (id, user_id, value, type, category, description, account, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, req.userId, value, type, category, description, account || null, date]
    )

    res.status(201).json({
      success: true,
      transaction: { id, user_id: req.userId, value, type, category, description, account, date }
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
