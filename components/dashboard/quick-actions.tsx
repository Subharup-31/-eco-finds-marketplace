"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, Heart, Settings, MessageCircle, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "List New Item",
      description: "Sell something new",
      icon: Plus,
      href: "/sell",
      variant: "default" as const,
    },
    {
      title: "My Listings",
      description: "Manage your items",
      icon: Package,
      href: "/my-listings",
      variant: "outline" as const,
    },
    {
      title: "Saved Items",
      description: "View your wishlist",
      icon: Heart,
      href: "/saved",
      variant: "outline" as const,
    },
    {
      title: "Messages",
      description: "Chat with buyers",
      icon: MessageCircle,
      href: "/messages",
      variant: "outline" as const,
    },
    {
      title: "Analytics",
      description: "View your stats",
      icon: BarChart3,
      href: "/analytics",
      variant: "outline" as const,
    },
    {
      title: "Settings",
      description: "Account settings",
      icon: Settings,
      href: "/profile",
      variant: "outline" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-card-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action) => {
            const IconComponent = action.icon
            return (
              <Button key={action.title} variant={action.variant} className="w-full justify-start h-auto p-4" asChild>
                <Link href={action.href}>
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                </Link>
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Items Sold</span>
              <span className="font-semibold text-foreground">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Revenue</span>
              <span className="font-semibold text-foreground">$450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Profile Views</span>
              <span className="font-semibold text-foreground">234</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">Success Rate</span>
                <span className="font-bold text-primary">94%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
