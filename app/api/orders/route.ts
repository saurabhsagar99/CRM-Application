import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("customerId")

    let query = {}
    if (customerId) {
      query = { customerId }
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      orders: orders.map((order) => ({
        ...order,
        id: order._id.toString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
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

    const body = await request.json()
    const { customerId, amount, status = "completed" } = body

    if (!customerId || !amount) {
      return NextResponse.json({ error: "Customer ID and amount are required" }, { status: 400 })
    }

    const newOrder = new Order({
      customerId,
      amount,
      status,
    })

    const savedOrder = await newOrder.save()

    return NextResponse.json(
      {
        ...savedOrder.toObject(),
        id: savedOrder._id.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating order:", error)

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
