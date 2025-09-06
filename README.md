# EcoFinds - Sustainable Second-Hand Marketplace

A full-stack marketplace application for buying and selling second-hand items with a focus on sustainability and community.

## 🌱 Features

- **User Authentication**: JWT-based signup/login with secure password hashing
- **Product Management**: Full CRUD operations with categories, search, and filtering
- **User Dashboard**: Profile management, listings overview, and purchase history
- **Shopping Cart**: Persistent cart with checkout process
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database**: MongoDB with Mongoose ODM for data persistence

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Hook Form + Zod validation

**Backend:**
- Next.js API Routes
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ecofinds-marketplace
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecofinds
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofinds
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # App Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

4. **Database Setup**
   
   Initialize and seed the database:
   \`\`\`bash
   # Test database connection
   npm run db:init
   
   # Populate with sample data
   npm run db:seed
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### Users
- Personal information and preferences
- Authentication credentials
- Seller ratings and statistics
- Privacy and notification settings

### Products
- Product details and images
- Category and condition information
- Seller information and location
- Views, likes, and engagement metrics
- Shipping and negotiation options

### Orders
- Purchase transactions
- Payment and shipping information
- Order status tracking
- Buyer and seller references

## 🔐 Test Accounts

After running the seed script, you can use these test accounts:

**Seller Account:**
- Email: `sarah@example.com`
- Password: `password123`

**Buyer Account:**
- Email: `john@example.com`
- Password: `password123`

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Products
- `GET /api/products` - List products with filtering
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create new product (authenticated)
- `PUT /api/products/[id]` - Update product (authenticated)
- `DELETE /api/products/[id]` - Delete product (authenticated)

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)

## 🎨 Design System

The application uses a sustainable color palette:
- **Primary**: Purple (#8B5CF6) - Trust and premium feel
- **Secondary**: Emerald (#10B981) - Sustainability and growth
- **Accent**: Amber (#F59E0B) - Energy and optimism
- **Neutrals**: Slate grays for text and backgrounds

## 🔧 Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:init      # Initialize database connection
npm run db:seed      # Seed database with sample data
\`\`\`

## 📁 Project Structure

\`\`\`
ecofinds-marketplace/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── dashboard/         # User dashboard
│   └── ...
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── products/         # Product components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...
├── lib/                  # Utilities and configurations
│   ├── models/           # MongoDB models
│   ├── mongodb.ts        # Database connection
│   └── ...
├── scripts/              # Database scripts
│   ├── init-database.ts  # Database initialization
│   └── seed-database.ts  # Sample data seeding
└── public/               # Static assets
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌍 Sustainability Focus

EcoFinds promotes sustainable consumption by:
- Extending product lifecycles through resale
- Reducing waste and environmental impact
- Building a community around conscious consumption
- Encouraging local transactions to reduce shipping

---

**Happy sustainable shopping! 🌱**
