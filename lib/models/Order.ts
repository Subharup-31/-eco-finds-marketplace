import mongoose, { type Document, Schema } from "mongoose"

export interface IOrder extends Document {
  _id: string
  buyerId: mongoose.Types.ObjectId
  sellerId: mongoose.Types.ObjectId
  productId: mongoose.Types.ObjectId
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "disputed"
  totalAmount: number
  shippingCost: number
  paymentMethod: "card" | "paypal" | "cash" | "other"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: {
    fullName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone?: string
  }
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  confirmedAt?: Date
  shippedAt?: Date
  deliveredAt?: Date
  cancelledAt?: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "disputed"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "cash", "other"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: String,
    },
    trackingNumber: String,
    notes: {
      type: String,
      maxlength: 500,
    },
    confirmedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
OrderSchema.index({ buyerId: 1 })
OrderSchema.index({ sellerId: 1 })
OrderSchema.index({ productId: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
