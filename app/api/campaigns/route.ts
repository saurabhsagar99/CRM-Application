import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

// Mock campaigns database
const campaigns: any[] = []
const communicationLogs: any[] = []

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Sort campaigns by creation date (most recent first)
  const sortedCampaigns = campaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({ campaigns: sortedCampaigns })
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, message, rules, audienceSize } = await request.json()

    const campaignId = Math.random().toString(36).substr(2, 9)
    const campaign = {
      id: campaignId,
      name,
      message,
      rules,
      audienceSize,
      status: "sending",
      createdAt: new Date(),
      sentCount: 0,
      failedCount: 0,
    }

    campaigns.push(campaign)

    // Simulate message delivery
    setTimeout(async () => {
      await simulateMessageDelivery(campaignId, audienceSize, message)
    }, 1000)

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}

async function simulateMessageDelivery(campaignId: string, audienceSize: number, message: string) {
  const campaign = campaigns.find((c) => c.id === campaignId)
  if (!campaign) return

  // Mock customer data for delivery simulation
  const mockCustomers = Array.from({ length: audienceSize }, (_, i) => ({
    id: `customer_${i + 1}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
  }))

  let sentCount = 0
  let failedCount = 0

  for (const customer of mockCustomers) {
    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1
    const personalizedMessage = message.replace("{name}", customer.name)

    // Create communication log entry
    const logEntry = {
      id: Math.random().toString(36).substr(2, 9),
      campaignId,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      message: personalizedMessage,
      status: isSuccess ? "sent" : "failed",
      sentAt: new Date(),
    }

    communicationLogs.push(logEntry)

    if (isSuccess) {
      sentCount++
    } else {
      failedCount++
    }

    // Simulate delivery receipt API call
    await simulateDeliveryReceipt(logEntry)
  }

  // Update campaign status
  campaign.status = "completed"
  campaign.sentCount = sentCount
  campaign.failedCount = failedCount
}

async function simulateDeliveryReceipt(logEntry: any) {
  // Simulate delay for delivery receipt
  setTimeout(() => {
    // In a real implementation, this would be called by the vendor API
    // For now, we just log the delivery
    console.log(`Delivery receipt: ${logEntry.status} for ${logEntry.customerEmail}`)
  }, Math.random() * 2000)
}
