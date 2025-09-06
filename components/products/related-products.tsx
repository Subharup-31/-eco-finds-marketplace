"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${category.toLowerCase()}&limit=4`)
        const data = await response.json()

        if (response.ok) {
          // Filter out current product
          const relatedProducts = data.products.filter((p: Product) => p.id !== currentProductId)
          setProducts(relatedProducts.slice(0, 4))
        }
      } catch (error) {
        console.error("Error fetching related products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [category, currentProductId])

  if (loading || products.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
