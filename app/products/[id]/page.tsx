import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/products/product-detail"
import { RelatedProducts } from "@/components/products/related-products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
        <div className="mt-16">
          <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
