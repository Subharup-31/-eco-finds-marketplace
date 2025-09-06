import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  _id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  condition: "Like New" | "Excellent" | "Very Good" | "Good" | "Fair"
  sellerId: mongoose.Types.ObjectId
  location: string
  status: "active" | "sold" | "draft" | "archived"
  tags: string[]
  views: number
  likes: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
  soldAt?: Date
  soldTo?: mongoose.Types.ObjectId
  dimensions?: {
    length?: number
    width?: number
    height?: number
    weight?: number
  }
  shipping: {
    available: boolean
    cost?: number
    methods: string[]
  }
  negotiable: boolean
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: [
        "Fashion",
        "Electronics",
        "Home & Garden",
        "Books",
        "Gaming",
        "Photography",
        "Sports",
        "Toys",
        "Automotive",
        "Other",
      ],
    },
    condition: {
      type: String,
      required: true,
      enum: ["Like New", "Excellent", "Very Good", "Good", "Fair"],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["active", "sold", "draft", "archived"],
      default: "active",
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    soldAt: {
      type: Date,
    },
    soldTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      weight: Number,
    },
    shipping: {
      available: {
        type: Boolean,
        default: true,
      },
      cost: {
        type: Number,
        min: 0,
      },
      methods: [
        {
          type: String,
          enum: ["pickup", "standard", "express", "overnight"],
        },
      ],
    },
    negotiable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
ProductSchema.index({ sellerId: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ status: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ createdAt: -1 })
ProductSchema.index({ views: -1 })
ProductSchema.index({ title: "text", description: "text", tags: "text" })

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
