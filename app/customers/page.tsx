"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Download,
  Upload,
  Users,
  TrendingUp,
  Star,
  Crown,
  ArrowLeft,
  ArrowRight,
  Filter,
} from "lucide-react"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"

export default function CustomersPage() {
  const { data: session } = useSession()
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    if (session) {
      fetchCustomers()
    }
  }, [session, currentPage, searchTerm])

  const fetchCustomers = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchTerm,
      })

      const response = await fetch(`/api/customers?${params}`)
      if (response.ok) {
        const data = await response.json()
        setCustomers(data.customers)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCustomerAdded = () => {
    fetchCustomers()
    setShowAddDialog(false)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const getCustomerSegment = (customer: any) => {
    if (customer.totalSpend > 20000)
      return {
        label: "VIP",
        color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        icon: Crown,
      }
    if (customer.totalSpend > 10000)
      return {
        label: "High Value",
        color: "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
        icon: Star,
      }
    if (customer.visits > 5)
      return {
        label: "Frequent",
        color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
        icon: TrendingUp,
      }
    return {
      label: "Standard",
      color: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
      icon: Users,
    }
  }

  if (!session) {
    return <div>Please log in to view customers.</div>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-96"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Customers
              </h1>
              <p className="text-gray-600 text-lg">Manage your customer database and view insights</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
            >
              <Upload className="mr-2 h-4 w-4 text-indigo-600" />
              Import
            </Button>
            <Button
              variant="outline"
              className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
            >
              <Download className="mr-2 h-4 w-4 text-emerald-600" />
              Export
            </Button>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium">Total Customers</p>
                  <p className="text-3xl font-bold">1,234</p>
                </div>
                <Users className="h-8 w-8 text-violet-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">High Value</p>
                  <p className="text-3xl font-bold">89</p>
                </div>
                <Star className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">VIP Customers</p>
                  <p className="text-3xl font-bold">23</p>
                </div>
                <Crown className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Active This Month</p>
                  <p className="text-3xl font-bold">567</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-2 border-gray-200 focus:border-violet-400 rounded-xl bg-white/80 backdrop-blur-sm"
            />
          </div>
          <Button
            variant="outline"
            className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 h-12 px-6"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Customer Table */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Database
            </CardTitle>
            <CardDescription className="text-indigo-100">Total customers: {customers.length}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700 py-4">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-700">Total Spend</TableHead>
                    <TableHead className="font-semibold text-gray-700">Visits</TableHead>
                    <TableHead className="font-semibold text-gray-700">Last Purchase</TableHead>
                    <TableHead className="font-semibold text-gray-700">Segment</TableHead>
                    <TableHead className="font-semibold text-gray-700">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => {
                    const segment = getCustomerSegment(customer)
                    const SegmentIcon = segment.icon
                    return (
                      <TableRow key={customer.id} className="hover:bg-gray-50/80 transition-colors duration-200">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {customer.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-800">{formatCurrency(customer.totalSpend)}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-gray-700">{customer.visits}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">{formatDate(customer.lastPurchase)}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${segment.color} border-0 px-3 py-1 font-medium`}>
                            <SegmentIcon className="h-3 w-3 mr-1" />
                            {segment.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">{formatDate(customer.createdAt)}</span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 p-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <AddCustomerDialog open={showAddDialog} onOpenChange={setShowAddDialog} onCustomerAdded={handleCustomerAdded} />
      </div>
    </div>
  )
}
