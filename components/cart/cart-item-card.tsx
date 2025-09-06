"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

interface CartItemCardProps {
  item: {
    id: string
    product: {
      id: string
      title: string
      price: number
      images: string[]
      condition: string
      sellerName: string
    }
    quantity: number
    addedAt: string
  }
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    updateQuantity(item.product.id, newQuantity)
  }

  const handleRemove = () => {
    removeFromCart(item.product.id)
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Link href={`/products/${item.product.id}`}>
              <Image
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.title}
                width={120}
                height={120}
                className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link
                  href={`/products/${item.product.id}`}
                  className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {item.product.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {item.product.condition}
                  </Badge>
                  <span className="text-sm text-muted-foreground">by {item.product.sellerName}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>

                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                  className="w-16 text-center bg-input border-border"
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-foreground">${(item.product.price * quantity).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">${item.product.price} each</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
