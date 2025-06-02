import mongoose from "mongoose"

export interface IOrder {
  _id?: string
  customerId: string
  amount: number
  status: "pending" | "completed" | "failed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    customerId: {
      type: String,
      required: [true, "Customer ID is required"],
      ref: "Customer",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes
OrderSchema.index({ customerId: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
