import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev_refresh_secret"

export interface JWTPayload {
  userId: string
  email: string
}

export function generateTokens(payload: JWTPayload) {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  })

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d"
  })

  return { accessToken, refreshToken }
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
  } catch {
    return null
  }
}
