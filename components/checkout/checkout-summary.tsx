"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { Package } from "lucide-react"
import Image from "next/image"

export function CheckoutSummary() {
  const { items, getTotalItems, getTotalPrice } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="flex-shrink-0">
                <Image
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.title}
                  width={60}
                  height={60}
                  className="w-15 h-15 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-card-foreground line-clamp-2">{item.product.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {item.product.condition}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                </div>
                <div className="text-sm font-semibold text-foreground mt-1">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({getTotalItems()} items)</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground">${tax.toFixed(2)}</span>
          </div>

          {shipping === 0 && (
            <div className="text-xs text-green-600 font-medium">🎉 Free shipping on orders over $50!</div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">${total.toFixed(2)}</span>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2">
          By placing this order, you agree to our Terms of Service and Privacy Policy
        </div>
      </CardContent>
    </Card>
  )
}
