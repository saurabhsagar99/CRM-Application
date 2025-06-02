import mongoose from "mongoose"

export interface ICustomer {
  _id?: string
  name: string
  email: string
  totalSpend: number
  visits: number
  lastPurchase: Date
  createdAt: Date
  updatedAt: Date
}

const CustomerSchema = new mongoose.Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    totalSpend: {
      type: Number,
      default: 0,
      min: [0, "Total spend cannot be negative"],
    },
    visits: {
      type: Number,
      default: 0,
      min: [0, "Visits cannot be negative"],
    },
    lastPurchase: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for better query performance
CustomerSchema.index({ email: 1 })
CustomerSchema.index({ totalSpend: -1 })
CustomerSchema.index({ visits: -1 })
CustomerSchema.index({ createdAt: -1 })

export default mongoose.models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema)
