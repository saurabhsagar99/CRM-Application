import mongoose from "mongoose"

export interface ICampaign {
  _id?: string
  name: string
  message: string
  rules: Array<{
    id: string
    field: string
    operator: string
    value: string
    connector?: "AND" | "OR"
  }>
  audienceSize: number
  status: "draft" | "sending" | "completed" | "failed"
  sentCount: number
  failedCount: number
  createdAt: Date
  updatedAt: Date
}

const CampaignSchema = new mongoose.Schema<ICampaign>(
  {
    name: {
      type: String,
      required: [true, "Campaign name is required"],
      trim: true,
      maxlength: [200, "Campaign name cannot be more than 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Campaign message is required"],
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    rules: [
      {
        id: { type: String, required: true },
        field: { type: String, required: true },
        operator: { type: String, required: true },
        value: { type: String, required: true },
        connector: { type: String, enum: ["AND", "OR"] },
      },
    ],
    audienceSize: {
      type: Number,
      default: 0,
      min: [0, "Audience size cannot be negative"],
    },
    status: {
      type: String,
      enum: ["draft", "sending", "completed", "failed"],
      default: "draft",
    },
    sentCount: {
      type: Number,
      default: 0,
      min: [0, "Sent count cannot be negative"],
    },
    failedCount: {
      type: Number,
      default: 0,
      min: [0, "Failed count cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes
CampaignSchema.index({ status: 1 })
CampaignSchema.index({ createdAt: -1 })

export default mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema)
