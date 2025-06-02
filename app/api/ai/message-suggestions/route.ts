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
    const { campaignType } = await request.json()

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `You are a marketing expert specializing in personalized customer communications. Generate 3 different message suggestions for campaigns.

Requirements:
- Include {name} placeholder for personalization
- Keep messages under 160 characters
- Make them engaging and action-oriented
- Include relevant offers or calls-to-action
- Return as a JSON array of strings

Campaign types and appropriate messaging:
- general: Welcome messages, product updates
- winback: Re-engage inactive customers
- highvalue: Reward loyal customers
- newcustomer: Onboard new users`,
      prompt: `Generate 3 message suggestions for a ${campaignType} campaign. Return only a JSON array of message strings.`,
    })

    let suggestions
    try {
      suggestions = JSON.parse(text)
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0])
      } else {
        // Fallback to default suggestions
        suggestions = [
          "Hi {name}, we have a special offer just for you! Get 20% off your next purchase.",
          "Hey {name}! Don't miss out on our exclusive deals tailored for valued customers like you.",
          "Hello {name}, your personalized recommendations are ready! Check them out now.",
        ]
      }
    }

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error generating message suggestions:", error)
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}
