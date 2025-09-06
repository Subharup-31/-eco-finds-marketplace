"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, CreditCard } from "lucide-react"
import Link from "next/link"

export function CartSummary() {
  const { items, getTotalItems, getTotalPrice } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items ({getTotalItems()})</span>
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

        <div className="space-y-3 pt-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg" asChild>
            <Link href="/checkout">
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            asChild
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2">Secure checkout powered by EcoFinds</div>
      </CardContent>
    </Card>
  )
}
