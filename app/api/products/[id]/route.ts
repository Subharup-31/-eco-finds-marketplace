import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/Product"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const product = await Product.findById(params.id).populate("sellerId", "name rating location")

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    await Product.findByIdAndUpdate(params.id, { $inc: { views: 1 } })

    const transformedProduct = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: product.category,
      condition: product.condition,
      sellerId: product.sellerId._id.toString(),
      sellerName: product.sellerId.name,
      sellerRating: product.sellerId.rating,
      location: product.location,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      status: product.status,
      tags: product.tags,
      views: product.views + 1, // Include the incremented view count
      likes: product.likes.length,
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
