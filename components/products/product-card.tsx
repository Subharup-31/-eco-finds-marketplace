import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, MapPin } from "lucide-react"
import type { Product } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
        >
          <Heart className="w-4 h-4" />
        </Button>
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">{discountPercentage}% off</Badge>
        )}
        <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
          {product.condition}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.sellerRating}</span>
          <span className="text-sm text-muted-foreground">• {product.views} views</span>
        </div>

        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{product.title}</h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>by {product.sellerName}</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{product.location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
