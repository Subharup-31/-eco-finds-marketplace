"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Share2, Star, MapPin, Eye, ShoppingCart, MessageCircle, Check } from "lucide-react"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const { addToCart, isInCart } = useCart()

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 3000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[selectedImageIndex] || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-96 lg:h-[500px] object-cover"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {discountPercentage}% off
            </Badge>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{product.category}</Badge>
            <Badge variant="outline">{product.condition}</Badge>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.sellerRating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{product.views} views</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Seller Info */}
        <Card className="bg-muted/50 border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-card-foreground">Sold by {product.sellerName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.sellerRating}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {showAddedMessage && (
          <Alert className="border-green-500/50 text-green-600">
            <Check className="h-4 w-4" />
            <AlertDescription>Item added to cart successfully!</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isInCart(product.id) ? "In Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message Seller
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        <Separator />

        {/* Product Description */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Product Tags */}
        {product.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Product Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Listed</span>
              <span className="text-foreground">{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Condition</span>
              <span className="text-foreground">{product.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span className="text-foreground">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
