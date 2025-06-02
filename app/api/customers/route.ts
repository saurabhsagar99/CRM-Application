import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

// Mock database
const customers: any[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    totalSpend: 15000,
    visits: 5,
    lastPurchase: new Date("2024-01-15"),
    createdAt: new Date("2023-06-01"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    totalSpend: 8500,
    visits: 3,
    lastPurchase: new Date("2023-12-20"),
    createdAt: new Date("2023-05-15"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    totalSpend: 25000,
    visits: 12,
    lastPurchase: new Date("2024-01-28"),
    createdAt: new Date("2023-03-10"),
  },
]

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""

  let filteredCustomers = customers

  if (search) {
    filteredCustomers = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  const total = filteredCustomers.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

  return NextResponse.json({
    customers: paginatedCustomers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, email, totalSpend, visits } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const newCustomer = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      totalSpend: totalSpend || 0,
      visits: visits || 0,
      lastPurchase: new Date(),
      createdAt: new Date(),
    }

    customers.push(newCustomer)

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}
