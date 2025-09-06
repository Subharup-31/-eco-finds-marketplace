"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle, ShoppingCart, Package, DollarSign } from "lucide-react"
import Link from "next/link"

export function RecentActivity() {
  // Mock data - replace with real API calls
  const activities = [
    {
      id: 1,
      type: "view",
      message: 'Someone viewed your "Vintage Leather Jacket"',
      time: "2 hours ago",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "message",
      message: 'New message about "iPhone 12 Pro"',
      time: "4 hours ago",
      icon: MessageCircle,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "sale",
      message: 'You sold "Mid-Century Modern Chair" for $245',
      time: "1 day ago",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "purchase",
      message: 'You purchased "Canon EOS R5 Camera"',
      time: "2 days ago",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      id: 5,
      type: "listing",
      message: 'Your listing "Gaming Headset" went live',
      time: "3 days ago",
      icon: Package,
      color: "text-indigo-600",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-card-foreground">Recent Activity</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/activity">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
