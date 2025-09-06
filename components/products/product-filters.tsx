"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { CATEGORIES, CONDITIONS } from "@/lib/types"
import { Filter, X } from "lucide-react"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [location, setLocation] = useState("")

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategory) params.set("category", selectedCategory)
    if (selectedConditions.length > 0) params.set("condition", selectedConditions.join(","))
    if (priceRange[0] > 0) params.set("priceMin", priceRange[0].toString())
    if (priceRange[1] < 1000) params.set("priceMax", priceRange[1].toString())
    if (location) params.set("location", location)

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedConditions([])
    setPriceRange([0, 1000])
    setLocation("")
    router.push("/products")
  }

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition])
    } else {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition))
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-card-foreground">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-card-foreground">Price Range</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Condition Filter */}
        <div className="space-y-3">
          <Label className="text-card-foreground">Condition</Label>
          <div className="space-y-2">
            {CONDITIONS.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                />
                <Label htmlFor={condition} className="text-sm text-card-foreground cursor-pointer">
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-card-foreground">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter city or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-input border-border"
          />
        </div>

        {/* Apply Filters Button */}
        <Button onClick={applyFilters} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
