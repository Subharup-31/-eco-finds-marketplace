import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  avatar?: string
  bio?: string
  location?: string
  phone?: string
  rating: number
  totalSales: number
  totalPurchases: number
  joinedAt: Date
  lastActive: Date
  isVerified: boolean
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    privacy: {
      showEmail: boolean
      showPhone: boolean
      showLocation: boolean
    }
  }
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    location: {
      type: String,
      maxlength: 100,
      default: "",
    },
    phone: {
      type: String,
      maxlength: 20,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPurchases: {
      type: Number,
      default: 0,
      min: 0,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      privacy: {
        showEmail: { type: Boolean, default: false },
        showPhone: { type: Boolean, default: false },
        showLocation: { type: Boolean, default: true },
      },
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
UserSchema.index({ email: 1 })
UserSchema.index({ rating: -1 })

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
