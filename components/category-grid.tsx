import { Card, CardContent } from "@/components/ui/card"
import { Shirt, Smartphone, Home, Book, Gamepad2, Camera } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Fashion",
    icon: Shirt,
    count: "2.5K+ items",
    href: "/products?category=fashion",
  },
  {
    name: "Electronics",
    icon: Smartphone,
    count: "1.8K+ items",
    href: "/products?category=electronics",
  },
  {
    name: "Home & Garden",
    icon: Home,
    count: "3.2K+ items",
    href: "/products?category=home",
  },
  {
    name: "Books",
    icon: Book,
    count: "1.2K+ items",
    href: "/products?category=books",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: "800+ items",
    href: "/products?category=gaming",
  },
  {
    name: "Photography",
    icon: Camera,
    count: "600+ items",
    href: "/products?category=photography",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of pre-loved items across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
