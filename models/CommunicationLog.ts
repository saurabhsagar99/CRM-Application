import mongoose from "mongoose"

export interface ICommunicationLog {
  _id?: string
  campaignId: string
  customerId: string
  customerName: string
  customerEmail: string
  message: string
  status: "sent" | "failed" | "pending"
  sentAt: Date
  createdAt: Date
}

const CommunicationLogSchema = new mongoose.Schema<ICommunicationLog>(
  {
    campaignId: {
      type: String,
      required: [true, "Campaign ID is required"],
      ref: "Campaign",
    },
    customerId: {
      type: String,
      required: [true, "Customer ID is required"],
      ref: "Customer",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["sent", "failed", "pending"],
      default: "pending",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes
CommunicationLogSchema.index({ campaignId: 1 })
CommunicationLogSchema.index({ customerId: 1 })
CommunicationLogSchema.index({ status: 1 })
CommunicationLogSchema.index({ sentAt: -1 })

export default mongoose.models.CommunicationLog ||
  mongoose.model<ICommunicationLog>("CommunicationLog", CommunicationLogSchema)
