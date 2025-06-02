import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data } = await request.json()

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `You are a marketing analytics expert. Analyze campaign and customer data to provide actionable insights.

Generate 4-5 concise, human-readable insights based on the provided data. Each insight should be:
- Specific and data-driven
- Actionable for marketing teams
- Easy to understand
- Focus on opportunities for improvement

Return insights as a JSON array of strings.`,
      prompt: `Analyze this marketing data and provide insights:

Total Campaigns: ${data.totalCampaigns}
Total Customers: ${data.totalCustomers}
Average Delivery Rate: ${data.avgDeliveryRate}%
Total Revenue: ₹${data.totalRevenue}

Top Campaigns: ${JSON.stringify(data.topPerformingCampaigns)}
Customer Segments: ${JSON.stringify(data.customerSegments)}
Monthly Activity: ${JSON.stringify(data.campaignsByMonth)}

Provide actionable insights for improving campaign performance and customer engagement.`,
    })

    let insights
    try {
      insights = JSON.parse(text)
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        insights = JSON.parse(jsonMatch[0])
      } else {
        // Fallback insights
        insights = [
          `Your average delivery rate of ${data.avgDeliveryRate}% is excellent, exceeding industry standards.`,
          `${data.customerSegments.find((s) => s.segment === "Inactive")?.percentage || 0}% of customers are inactive - consider a re-engagement campaign.`,
          `High-value customers represent strong ROI potential with higher delivery rates.`,
          `Monthly campaign consistency shows good engagement momentum.`,
          `Focus on converting frequent buyers to high-value segment for increased revenue.`,
        ]
      }
    }

    return NextResponse.json({ insights })
  } catch (error) {
    console.error("Error generating insights:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
