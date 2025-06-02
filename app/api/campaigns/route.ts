import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import connectDB from "@/lib/mongodb"
import Campaign from "@/models/Campaign"
import Customer from "@/models/Customer"
import CommunicationLog from "@/models/CommunicationLog"

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()

    const campaigns = await Campaign.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      campaigns: campaigns.map((campaign) => ({
        ...campaign,
        id: campaign._id.toString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()

    const { name, message, rules, audienceSize } = await request.json()

    if (!name || !message || !rules || rules.length === 0) {
      return NextResponse.json({ error: "Name, message, and rules are required" }, { status: 400 })
    }

    const newCampaign = new Campaign({
      name,
      message,
      rules,
      audienceSize,
      status: "sending",
      sentCount: 0,
      failedCount: 0,
    })

    const savedCampaign = await newCampaign.save()

    // Start message delivery simulation
    setTimeout(async () => {
      await simulateMessageDelivery(savedCampaign._id.toString(), audienceSize, message)
    }, 1000)

    return NextResponse.json(
      {
        ...savedCampaign.toObject(),
        id: savedCampaign._id.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating campaign:", error)

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function simulateMessageDelivery(campaignId: string, audienceSize: number, message: string) {
  try {
    await connectDB()

    const campaign = await Campaign.findById(campaignId)
    if (!campaign) return

    // Get customers based on campaign rules (simplified - you can implement complex rule evaluation)
    const customers = await Customer.find({}).limit(audienceSize).lean()

    let sentCount = 0
    let failedCount = 0

    for (const customer of customers) {
      // Simulate 90% success rate
      const isSuccess = Math.random() > 0.1
      const personalizedMessage = message.replace("{name}", customer.name)

      // Create communication log entry
      const logEntry = new CommunicationLog({
        campaignId,
        customerId: customer._id.toString(),
        customerName: customer.name,
        customerEmail: customer.email,
        message: personalizedMessage,
        status: isSuccess ? "sent" : "failed",
        sentAt: new Date(),
      })

      await logEntry.save()

      if (isSuccess) {
        sentCount++
      } else {
        failedCount++
      }

      // Simulate delivery delay
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // Update campaign status
    await Campaign.findByIdAndUpdate(campaignId, {
      status: "completed",
      sentCount,
      failedCount,
    })

    console.log(`Campaign ${campaignId} completed: ${sentCount} sent, ${failedCount} failed`)
  } catch (error) {
    console.error("Error in message delivery simulation:", error)

    // Update campaign status to failed
    await Campaign.findByIdAndUpdate(campaignId, {
      status: "failed",
    })
  }
}
