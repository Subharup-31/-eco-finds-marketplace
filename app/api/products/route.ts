import { type NextRequest, NextResponse } from "next/server"
import type { ProductFilters } from "@/lib/types"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/Product"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const filters: ProductFilters = {
      category: searchParams.get("category") || undefined,
      condition: searchParams.get("condition")?.split(",") || undefined,
      priceMin: searchParams.get("priceMin") ? Number.parseInt(searchParams.get("priceMin")!) : undefined,
      priceMax: searchParams.get("priceMax") ? Number.parseInt(searchParams.get("priceMax")!) : undefined,
      location: searchParams.get("location") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy: (searchParams.get("sortBy") as any) || "newest",
    }

    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const query: any = { status: "active" }

    if (filters.category) {
      query.category = new RegExp(filters.category, "i")
    }

    if (filters.condition && filters.condition.length > 0) {
      query.condition = { $in: filters.condition }
    }

    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      query.price = {}
      if (filters.priceMin !== undefined) query.price.$gte = filters.priceMin
      if (filters.priceMax !== undefined) query.price.$lte = filters.priceMax
    }

    if (filters.location) {
      query.location = new RegExp(filters.location, "i")
    }

    if (filters.search) {
      query.$text = { $search: filters.search }
    }

    let sort: any = {}
    switch (filters.sortBy) {
      case "oldest":
        sort = { createdAt: 1 }
        break
      case "price-low":
        sort = { price: 1 }
        break
      case "price-high":
        sort = { price: -1 }
        break
      case "popular":
        sort = { views: -1 }
        break
      case "newest":
      default:
        sort = { createdAt: -1 }
        break
    }

    let productsQuery = Product.find(query).populate("sellerId", "name rating location").sort(sort)

    if (limit) {
      productsQuery = productsQuery.limit(limit)
    }

    const products = await productsQuery.exec()

    const transformedProducts = products.map((product) => ({
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
      views: product.views,
      likes: product.likes.length,
    }))

    return NextResponse.json({
      products: transformedProducts,
      total: transformedProducts.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
