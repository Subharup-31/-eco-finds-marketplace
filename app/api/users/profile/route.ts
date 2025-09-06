import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      rating: user.rating,
      totalSales: user.totalSales,
      totalPurchases: user.totalPurchases,
      joinedAt: user.joinedAt.toISOString(),
      lastActive: user.lastActive.toISOString(),
      isVerified: user.isVerified,
      preferences: user.preferences,
    }

    return NextResponse.json(userResponse)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password
    delete updates.email
    delete updates.rating
    delete updates.totalSales
    delete updates.totalPurchases

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { ...updates, lastActive: new Date() },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      rating: user.rating,
      totalSales: user.totalSales,
      totalPurchases: user.totalPurchases,
      joinedAt: user.joinedAt.toISOString(),
      lastActive: user.lastActive.toISOString(),
      isVerified: user.isVerified,
      preferences: user.preferences,
    }

    return NextResponse.json({
      user: userResponse,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
