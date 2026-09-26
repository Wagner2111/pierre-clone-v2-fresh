import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initializeDatabase } from "./config/database"
import { authMiddleware } from "./middleware/auth"
import authRoutes from "./routes/auth"
import transactionRoutes from "./routes/transactions"
import accountRoutes from "./routes/accounts"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}))
app.use(express.json())

// Initialize database
initializeDatabase()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/transactions", authMiddleware, transactionRoutes)
app.use("/api/accounts", authMiddleware, accountRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Pierre Backend is running" })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Database: SQLite (./pierre.db)`)
})
