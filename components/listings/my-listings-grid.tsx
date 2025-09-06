"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, MoreHorizontal, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function MyListingsGrid() {
  // Mock data - replace with real API calls
  const [listings] = useState([
    {
      id: "1",
      title: "Vintage Leather Jacket",
      price: 89,
      status: "active",
      views: 245,
      likes: 18,
      image: "/vintage-leather-jacket.png",
      createdAt: "2024-01-15",
      category: "Fashion",
    },
    {
      id: "2",
      title: "iPhone 12 Pro",
      price: 599,
      status: "active",
      views: 189,
      likes: 24,
      image: "/placeholder-79blu.png",
      createdAt: "2024-01-14",
      category: "Electronics",
    },
    {
      id: "3",
      title: "Gaming Headset",
      price: 45,
      status: "sold",
      views: 156,
      likes: 12,
      image: "/gaming-headset.png",
      createdAt: "2024-01-10",
      category: "Gaming",
    },
    {
      id: "4",
      title: "Vintage Camera",
      price: 120,
      status: "draft",
      views: 0,
      likes: 0,
      image: "/vintage-camera.png",
      createdAt: "2024-01-16",
      category: "Photography",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "sold":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your Items</h2>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
          <Link href="/sell">Add New Listing</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="bg-card border-border overflow-hidden">
            <div className="relative">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-2 left-2 ${getStatusColor(listing.status)}`}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/products/${listing.id}`} className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Listing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/sell/edit/${listing.id}`} className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{listing.title}</h3>

              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-lg font-bold text-foreground">${listing.price}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{listing.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{listing.likes}</span>
                  </div>
                </div>
                <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                <Link href={`/sell/edit/${listing.id}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                <Link href={`/products/${listing.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
