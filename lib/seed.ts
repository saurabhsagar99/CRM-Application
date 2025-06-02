import connectDB from "./mongodb"
import Customer from "@/models/Customer"
import Campaign from "@/models/Campaign"
import Order from "@/models/Order"

export async function seedDatabase() {
  try {
    await connectDB()

    // Clear existing data
    await Customer.deleteMany({})
    await Campaign.deleteMany({})
    await Order.deleteMany({})

    // Seed customers
    const customers = [
      {
        name: "John Doe",
        email: "john@example.com",
        totalSpend: 15000,
        visits: 5,
        lastPurchase: new Date("2024-01-15"),
        createdAt: new Date("2023-06-01"),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        totalSpend: 8500,
        visits: 3,
        lastPurchase: new Date("2023-12-20"),
        createdAt: new Date("2023-05-15"),
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        totalSpend: 25000,
        visits: 12,
        lastPurchase: new Date("2024-01-28"),
        createdAt: new Date("2023-03-10"),
      },
      {
        name: "Alice Brown",
        email: "alice@example.com",
        totalSpend: 12000,
        visits: 8,
        lastPurchase: new Date("2024-01-20"),
        createdAt: new Date("2023-04-05"),
      },
      {
        name: "Charlie Wilson",
        email: "charlie@example.com",
        totalSpend: 3500,
        visits: 2,
        lastPurchase: new Date("2023-11-15"),
        createdAt: new Date("2023-08-20"),
      },
    ]

    const createdCustomers = await Customer.insertMany(customers)
    console.log(`Seeded ${createdCustomers.length} customers`)

    // Seed orders
    const orders = [
      {
        customerId: createdCustomers[0]._id.toString(),
        amount: 5000,
        status: "completed",
        createdAt: new Date("2024-01-15"),
      },
      {
        customerId: createdCustomers[1]._id.toString(),
        amount: 3500,
        status: "completed",
        createdAt: new Date("2023-12-20"),
      },
      {
        customerId: createdCustomers[0]._id.toString(),
        amount: 10000,
        status: "completed",
        createdAt: new Date("2024-01-10"),
      },
    ]

    const createdOrders = await Order.insertMany(orders)
    console.log(`Seeded ${createdOrders.length} orders`)

    console.log("Database seeded successfully!")
    return { success: true, message: "Database seeded successfully!" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, error: error.message }
  }
}
