export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  condition: "Like New" | "Excellent" | "Very Good" | "Good" | "Fair"
  sellerId: string
  sellerName: string
  sellerRating: number
  location: string
  createdAt: string
  updatedAt: string
  status: "active" | "sold" | "draft"
  tags: string[]
  views: number
  likes: number
}

export interface ProductFilters {
  category?: string
  condition?: string[]
  priceMin?: number
  priceMax?: number
  location?: string
  search?: string
  sortBy?: "newest" | "oldest" | "price-low" | "price-high" | "popular"
}

export const CATEGORIES = [
  "Fashion",
  "Electronics",
  "Home & Garden",
  "Books",
  "Gaming",
  "Photography",
  "Sports",
  "Toys",
  "Automotive",
  "Other",
] as const

export const CONDITIONS = ["Like New", "Excellent", "Very Good", "Good", "Fair"] as const
