import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed"

export async function POST() {
  try {
    const result = await seedDatabase()

    if (result.success) {
      return NextResponse.json({ message: result.message })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
