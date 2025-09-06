import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import Link from "next/link"

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 89,
    originalPrice: 150,
    image: "/vintage-leather-jacket.png",
    rating: 4.8,
    reviews: 24,
    seller: "Sarah M.",
    condition: "Excellent",
    category: "Fashion",
  },
  {
    id: 2,
    title: "iPhone 12 Pro",
    price: 599,
    originalPrice: 999,
    image: "/placeholder-79blu.png",
    rating: 4.9,
    reviews: 18,
    seller: "Tech Store",
    condition: "Very Good",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Mid-Century Modern Chair",
    price: 245,
    originalPrice: 400,
    image: "/mid-century-modern-chair.jpg",
    rating: 4.7,
    reviews: 12,
    seller: "Home Decor Co.",
    condition: "Good",
    category: "Furniture",
  },
  {
    id: 4,
    title: "Canon EOS R5 Camera",
    price: 2899,
    originalPrice: 3899,
    image: "/canon-eos-r5-camera.jpg",
    rating: 5.0,
    reviews: 8,
    seller: "Photo Pro",
    condition: "Like New",
    category: "Photography",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked items from our trusted community sellers</p>
          </div>
          <Link href="/products">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{product.title}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-foreground">${product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>by {product.seller}</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.condition}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
