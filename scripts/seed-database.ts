import connectDB from "../lib/mongodb"
import User from "../lib/models/User"
import Product from "../lib/models/Product"
import Order from "../lib/models/Order"
import bcrypt from "bcryptjs"

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Connect to MongoDB
    await connectDB()
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    await Order.deleteMany({})
    console.log("🗑️ Cleared existing data")

    // Create sample users
    const hashedPassword = await bcrypt.hash("password123", 10)

    const users = await User.insertMany([
      {
        name: "Sarah Mitchell",
        email: "sarah@example.com",
        password: hashedPassword,
        avatar: "/avatars/sarah.jpg",
        bio: "Sustainable fashion enthusiast and vintage collector. Love finding unique pieces!",
        location: "New York, NY",
        phone: "+1-555-0101",
        rating: 4.8,
        totalSales: 23,
        totalPurchases: 15,
        isVerified: true,
        preferences: {
          notifications: { email: true, push: true, sms: false },
          privacy: { showEmail: false, showPhone: false, showLocation: true },
        },
      },
      {
        name: "Tech Store NYC",
        email: "techstore@example.com",
        password: hashedPassword,
        avatar: "/avatars/techstore.jpg",
        bio: "Professional electronics dealer. All items tested and guaranteed.",
        location: "San Francisco, CA",
        phone: "+1-555-0102",
        rating: 4.9,
        totalSales: 156,
        totalPurchases: 8,
        isVerified: true,
        preferences: {
          notifications: { email: true, push: true, sms: true },
          privacy: { showEmail: true, showPhone: true, showLocation: true },
        },
      },
      {
        name: "Home Decor Co.",
        email: "homedecor@example.com",
        password: hashedPassword,
        avatar: "/avatars/homedecor.jpg",
        bio: "Curated home decor and furniture. Specializing in mid-century modern pieces.",
        location: "Austin, TX",
        phone: "+1-555-0103",
        rating: 4.7,
        totalSales: 89,
        totalPurchases: 12,
        isVerified: true,
        preferences: {
          notifications: { email: true, push: false, sms: false },
          privacy: { showEmail: false, showPhone: true, showLocation: true },
        },
      },
      {
        name: "Photo Pro",
        email: "photopro@example.com",
        password: hashedPassword,
        avatar: "/avatars/photopro.jpg",
        bio: "Professional photographer selling high-quality camera equipment.",
        location: "Los Angeles, CA",
        phone: "+1-555-0104",
        rating: 5.0,
        totalSales: 45,
        totalPurchases: 3,
        isVerified: true,
        preferences: {
          notifications: { email: true, push: true, sms: false },
          privacy: { showEmail: false, showPhone: false, showLocation: true },
        },
      },
      {
        name: "John Buyer",
        email: "john@example.com",
        password: hashedPassword,
        avatar: "/avatars/john.jpg",
        bio: "Love finding great deals on quality items!",
        location: "Chicago, IL",
        phone: "+1-555-0105",
        rating: 4.5,
        totalSales: 5,
        totalPurchases: 28,
        isVerified: false,
        preferences: {
          notifications: { email: true, push: true, sms: false },
          privacy: { showEmail: false, showPhone: false, showLocation: true },
        },
      },
    ])

    console.log(`✅ Created ${users.length} users`)

    // Create sample products
    const products = await Product.insertMany([
      {
        title: "Vintage Leather Jacket",
        description:
          "Beautiful vintage leather jacket in excellent condition. Perfect for fall and winter. Genuine leather with classic styling that never goes out of fashion. This piece has been well-maintained and shows minimal wear.",
        price: 89,
        originalPrice: 150,
        images: ["/vintage-leather-jacket.png", "/leather-jacket-2.jpg", "/leather-jacket-3.jpg"],
        category: "Fashion",
        condition: "Excellent",
        sellerId: users[0]._id,
        location: "New York, NY",
        tags: ["vintage", "leather", "jacket", "fashion", "outerwear"],
        views: 245,
        likes: [users[4]._id],
        shipping: {
          available: true,
          cost: 15,
          methods: ["standard", "express"],
        },
        negotiable: true,
      },
      {
        title: "iPhone 12 Pro - 128GB Unlocked",
        description:
          "iPhone 12 Pro in very good condition. 128GB storage, unlocked to all carriers. Includes original box, charger, and screen protector already applied. Battery health at 89%. No cracks or major scratches.",
        price: 599,
        originalPrice: 999,
        images: ["/placeholder-79blu.png", "/iphone-box.jpg", "/iphone-back.jpg"],
        category: "Electronics",
        condition: "Very Good",
        sellerId: users[1]._id,
        location: "San Francisco, CA",
        tags: ["iphone", "apple", "smartphone", "unlocked", "128gb"],
        views: 189,
        likes: [users[0]._id, users[4]._id],
        shipping: {
          available: true,
          cost: 12,
          methods: ["standard", "express", "overnight"],
        },
        negotiable: false,
      },
      {
        title: "Mid-Century Modern Lounge Chair",
        description:
          "Authentic mid-century modern lounge chair with original upholstery. A true collector's piece that would look great in any home. Features solid walnut frame and high-quality fabric. Some minor wear consistent with age.",
        price: 245,
        originalPrice: 400,
        images: ["/mid-century-modern-chair.jpg", "/chair-side.jpg", "/chair-detail.jpg"],
        category: "Home & Garden",
        condition: "Good",
        sellerId: users[2]._id,
        location: "Austin, TX",
        tags: ["furniture", "mid-century", "chair", "vintage", "walnut"],
        views: 156,
        likes: [users[0]._id],
        dimensions: {
          length: 30,
          width: 28,
          height: 32,
          weight: 25,
        },
        shipping: {
          available: true,
          cost: 45,
          methods: ["standard"],
        },
        negotiable: true,
      },
      {
        title: "Canon EOS R5 Camera Body",
        description:
          "Professional camera in like-new condition. Perfect for photography enthusiasts and professionals. Includes original packaging, battery, charger, and strap. Shutter count under 5,000. No scratches or damage.",
        price: 2899,
        originalPrice: 3899,
        images: ["/canon-eos-r5-camera.jpg", "/camera-back.jpg", "/camera-box.jpg"],
        category: "Photography",
        condition: "Like New",
        sellerId: users[3]._id,
        location: "Los Angeles, CA",
        tags: ["camera", "canon", "photography", "professional", "mirrorless"],
        views: 298,
        likes: [users[1]._id, users[4]._id],
        shipping: {
          available: true,
          cost: 25,
          methods: ["standard", "express", "overnight"],
        },
        negotiable: true,
      },
      {
        title: "Nintendo Switch OLED Console",
        description:
          "Nintendo Switch OLED model in excellent condition. Includes dock, Joy-Con controllers, and all original accessories. Screen protector applied since day one. Perfect for gaming on the go or at home.",
        price: 299,
        originalPrice: 349,
        images: ["/nintendo-switch.jpg", "/switch-dock.jpg", "/switch-games.jpg"],
        category: "Gaming",
        condition: "Excellent",
        sellerId: users[0]._id,
        location: "New York, NY",
        tags: ["nintendo", "switch", "gaming", "console", "oled"],
        views: 178,
        likes: [users[4]._id],
        shipping: {
          available: true,
          cost: 18,
          methods: ["standard", "express"],
        },
        negotiable: false,
      },
      {
        title: "Vintage Polaroid Camera",
        description:
          "Classic Polaroid instant camera from the 1970s. Fully functional and tested. Comes with leather case and instruction manual. Perfect for vintage photography enthusiasts or collectors.",
        price: 125,
        originalPrice: 200,
        images: ["/polaroid-camera.jpg", "/polaroid-case.jpg", "/polaroid-manual.jpg"],
        category: "Photography",
        condition: "Good",
        sellerId: users[3]._id,
        location: "Los Angeles, CA",
        tags: ["polaroid", "vintage", "camera", "instant", "film"],
        views: 134,
        likes: [],
        shipping: {
          available: true,
          cost: 12,
          methods: ["standard"],
        },
        negotiable: true,
      },
    ])

    console.log(`✅ Created ${products.length} products`)

    // Create sample orders
    const orders = await Order.insertMany([
      {
        buyerId: users[4]._id,
        sellerId: users[0]._id,
        productId: products[4]._id, // Nintendo Switch
        status: "delivered",
        totalAmount: 317, // 299 + 18 shipping
        shippingCost: 18,
        paymentMethod: "card",
        paymentStatus: "paid",
        shippingAddress: {
          fullName: "John Buyer",
          street: "123 Main St",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA",
          phone: "+1-555-0105",
        },
        trackingNumber: "TRK123456789",
        confirmedAt: new Date("2024-01-10"),
        shippedAt: new Date("2024-01-11"),
        deliveredAt: new Date("2024-01-13"),
      },
      {
        buyerId: users[0]._id,
        sellerId: users[1]._id,
        productId: products[1]._id, // iPhone
        status: "shipped",
        totalAmount: 611, // 599 + 12 shipping
        shippingCost: 12,
        paymentMethod: "paypal",
        paymentStatus: "paid",
        shippingAddress: {
          fullName: "Sarah Mitchell",
          street: "456 Broadway Ave",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
          phone: "+1-555-0101",
        },
        trackingNumber: "TRK987654321",
        confirmedAt: new Date("2024-01-14"),
        shippedAt: new Date("2024-01-15"),
      },
      {
        buyerId: users[4]._id,
        sellerId: users[2]._id,
        productId: products[2]._id, // Chair
        status: "confirmed",
        totalAmount: 290, // 245 + 45 shipping
        shippingCost: 45,
        paymentMethod: "card",
        paymentStatus: "paid",
        shippingAddress: {
          fullName: "John Buyer",
          street: "123 Main St",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA",
          phone: "+1-555-0105",
        },
        confirmedAt: new Date("2024-01-16"),
      },
    ])

    console.log(`✅ Created ${orders.length} orders`)

    console.log("🎉 Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`   Users: ${users.length}`)
    console.log(`   Products: ${products.length}`)
    console.log(`   Orders: ${orders.length}`)
    console.log("\n🔐 Test Login Credentials:")
    console.log("   Email: sarah@example.com")
    console.log("   Password: password123")
    console.log("\n   Email: john@example.com")
    console.log("   Password: password123")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    process.exit(0)
  }
}

// Run the seed function
seedDatabase()
