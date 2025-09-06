import connectDB from "../lib/mongodb"
import User from "../lib/models/User"
import Product from "../lib/models/Product"
import Order from "../lib/models/Order"

async function initDatabase() {
  try {
    console.log("🚀 Initializing database connection...")

    // Connect to MongoDB
    await connectDB()
    console.log("✅ Connected to MongoDB successfully!")

    // Test collections
    const userCount = await User.countDocuments()
    const productCount = await Product.countDocuments()
    const orderCount = await Order.countDocuments()

    console.log("\n📊 Current Database Status:")
    console.log(`   Users: ${userCount}`)
    console.log(`   Products: ${productCount}`)
    console.log(`   Orders: ${orderCount}`)

    if (userCount === 0 && productCount === 0 && orderCount === 0) {
      console.log("\n💡 Database is empty. Run the seed script to populate with sample data:")
      console.log("   npm run seed")
    } else {
      console.log("\n✅ Database is ready and contains data!")
    }
  } catch (error) {
    console.error("❌ Database initialization failed:", error)

    if (error.message.includes("MONGODB_URI")) {
      console.log("\n🔧 Setup Instructions:")
      console.log("1. Create a MongoDB database (local or cloud)")
      console.log("2. Add MONGODB_URI to your environment variables")
      console.log("3. Example: MONGODB_URI=mongodb://localhost:27017/ecofinds")
      console.log("   Or: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecofinds")
    }
  } finally {
    process.exit(0)
  }
}

// Run the init function
initDatabase()
