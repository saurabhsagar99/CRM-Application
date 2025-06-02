import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

// Mock orders database
const orders: any[] = [
  {
    id: "1",
    customerId: "1",
    amount: 5000,
    status: "completed",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    customerId: "2",
    amount: 3500,
    status: "completed",
    createdAt: new Date("2023-12-20"),
  },
  {
    id: "3",
    customerId: "1",
    amount: 10000,
    status: "completed",
    createdAt: new Date("2024-01-10"),
  },
]

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")

  let filteredOrders = orders

  if (customerId) {
    filteredOrders = orders.filter((order) => order.customerId === customerId)
  }

  return NextResponse.json({ orders: filteredOrders })
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { customerId, amount, status = "completed" } = body

    if (!customerId || !amount) {
      return NextResponse.json({ error: "Customer ID and amount are required" }, { status: 400 })
    }

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      customerId,
      amount,
      status,
      createdAt: new Date(),
    }

    orders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}
