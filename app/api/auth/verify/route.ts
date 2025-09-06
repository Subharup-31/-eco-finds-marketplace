import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }

      const user = await User.findById(decoded.userId).select("-password")
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      await User.findByIdAndUpdate(user._id, { lastActive: new Date() })

      const userResponse = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        location: user.location,
        rating: user.rating,
        totalSales: user.totalSales,
        totalPurchases: user.totalPurchases,
        isVerified: user.isVerified,
      }

      return NextResponse.json({
        user: userResponse,
        message: "Token verified",
      })
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
