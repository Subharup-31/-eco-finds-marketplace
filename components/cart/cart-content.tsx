"use client"

import { useCart } from "@/lib/cart-context"
import { CartItemCard } from "./cart-item-card"
import { CartSummary } from "./cart-summary"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export function CartContent() {
  const { items, getTotalItems, getTotalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Discover amazing sustainable products and add them to your cart</p>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Cart Items ({getTotalItems()})</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
