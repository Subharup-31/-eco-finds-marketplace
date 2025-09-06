"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, X, Leaf, LogOut, Settings, Package } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            EcoFinds
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search sustainable products..." className="pl-10 bg-muted border-border" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <Link href="/sell" className="text-foreground hover:text-primary transition-colors">
              Sell
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                  {getTotalItems()}
                </Badge>
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-listings" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      My Listings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search sustainable products..." className="pl-10 bg-muted border-border" />
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2">
                <Link href="/products" className="text-foreground hover:text-primary transition-colors py-2">
                  Browse Products
                </Link>
                <Link href="/sell" className="text-foreground hover:text-primary transition-colors py-2">
                  Sell Items
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors py-2">
                  About Us
                </Link>

                {user ? (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border">
                    <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors py-2">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="text-foreground hover:text-primary transition-colors py-2">
                      Profile Settings
                    </Link>
                    <Link href="/my-listings" className="text-foreground hover:text-primary transition-colors py-2">
                      My Listings
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="justify-start p-0 h-auto text-destructive hover:text-destructive"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}

                <Button variant="ghost" size="sm" className="relative justify-start p-0 h-auto" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    <Badge className="ml-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                      {getTotalItems()}
                    </Badge>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
