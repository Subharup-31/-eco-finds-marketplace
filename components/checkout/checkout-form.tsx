"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Truck, Loader2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function CheckoutForm() {
  const { user } = useAuth()
  const { clearCart, getTotalPrice } = useCart()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock payment processing - replace with real payment integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and show success
      clearCart()
      setOrderComplete(true)

      // Redirect to success page after delay
      setTimeout(() => {
        router.push("/order-success")
      }, 2000)
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="space-y-6">
        <Alert className="border-green-500/50 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Order placed successfully! Redirecting to confirmation page...</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-card-foreground">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo((prev) => ({ ...prev, fullName: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-card-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-card-foreground">
              Address
            </Label>
            <Textarea
              id="address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-card-foreground">
                City
              </Label>
              <Input
                id="city"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-card-foreground">
                State
              </Label>
              <Select
                value={shippingInfo.state}
                onValueChange={(value) => setShippingInfo((prev) => ({ ...prev, state: value }))}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-card-foreground">
                ZIP Code
              </Label>
              <Input
                id="zipCode"
                value={shippingInfo.zipCode}
                onChange={(e) => setShippingInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameOnCard" className="text-card-foreground">
              Name on Card
            </Label>
            <Input
              id="nameOnCard"
              value={paymentInfo.nameOnCard}
              onChange={(e) => setPaymentInfo((prev) => ({ ...prev, nameOnCard: e.target.value }))}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-card-foreground">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardNumber: e.target.value }))}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-card-foreground">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo((prev) => ({ ...prev, expiryDate: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-card-foreground">
                CVV
              </Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                required
                className="bg-input border-border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Order...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Complete Order
          </>
        )}
      </Button>
    </form>
  )
}
