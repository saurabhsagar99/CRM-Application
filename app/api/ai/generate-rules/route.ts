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
    const { prompt } = await request.json()

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `You are an expert in customer segmentation. Convert natural language descriptions into structured rules.

Available fields:
- totalSpend (number): Customer's total spending amount
- visits (number): Number of times customer visited
- lastPurchase (date): Date of last purchase  
- createdAt (date): When customer account was created

Available operators:
- gt: Greater than
- gte: Greater than or equal
- lt: Less than
- lte: Less than or equal
- eq: Equal to
- days_ago: Days ago (for date fields)

Return a JSON array of rule objects with this structure:
{
  "id": "unique_id",
  "field": "fieldName",
  "operator": "operatorName", 
  "value": "value",
  "connector": "AND" | "OR" (optional, not for first rule)
}

Example input: "Customers who spent more than 10000 and visited less than 3 times"
Example output: [
  {"id": "1", "field": "totalSpend", "operator": "gt", "value": "10000"},
  {"id": "2", "field": "visits", "operator": "lt", "value": "3", "connector": "AND"}
]`,
      prompt: `Convert this customer segment description to rules: "${prompt}"`,
    })

    let rules
    try {
      rules = JSON.parse(text)
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        rules = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Could not parse AI response")
      }
    }

    return NextResponse.json({ rules })
  } catch (error) {
    console.error("Error generating rules:", error)
    return NextResponse.json({ error: "Failed to generate rules" }, { status: 500 })
  }
}
