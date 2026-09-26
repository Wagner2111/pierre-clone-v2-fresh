import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

declare global {
  namespace Express {
    interface Request {
      userId?: string
      email?: string
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" })
  }

  const token = authHeader.slice(7)
  const payload = verifyToken(token)

  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }

  req.userId = payload.userId
  req.email = payload.email
  next()
}
