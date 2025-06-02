"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Mail, Calendar, Sparkles } from "lucide-react"

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [insights, setInsights] = useState<string[]>([])
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

  const mockData = {
    totalCampaigns: 12,
    totalCustomers: 1234,
    avgDeliveryRate: 94.2,
    totalRevenue: 245231,
    campaignsByMonth: [
      { month: "Jan", campaigns: 3, delivered: 2856 },
      { month: "Feb", campaigns: 2, delivered: 1890 },
      { month: "Mar", campaigns: 4, delivered: 3420 },
      { month: "Apr", campaigns: 3, delivered: 2670 },
    ],
    topPerformingCampaigns: [
      { name: "Holiday Sale", deliveryRate: 96.8, audience: 856 },
      { name: "Welcome Series", deliveryRate: 94.2, audience: 124 },
      { name: "Win-back Campaign", deliveryRate: 91.3, audience: 342 },
    ],
    customerSegments: [
      { segment: "High Value", count: 89, percentage: 7.2 },
      { segment: "Frequent Buyers", count: 234, percentage: 19.0 },
      { segment: "New Customers", count: 345, percentage: 28.0 },
      { segment: "Inactive", count: 566, percentage: 45.8 },
    ],
  }

  const generateAIInsights = async () => {
    setIsGeneratingInsights(true)

    try {
      const response = await fetch("/api/ai/campaign-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: mockData }),
      })

      if (response.ok) {
        const { insights: aiInsights } = await response.json()
        setInsights(aiInsights)
      }
    } catch (error) {
      console.error("Error generating insights:", error)
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  if (!session) {
    return <div>Please log in to view analytics.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Insights and performance metrics for your campaigns</p>
        </div>
        <Button onClick={generateAIInsights} disabled={isGeneratingInsights}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isGeneratingInsights ? "Generating..." : "Generate AI Insights"}
        </Button>
      </div>

      {insights.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-600" />
              AI-Generated Insights
            </CardTitle>
            <CardDescription>Smart analysis of your campaign performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                >
                  <p className="text-sm text-blue-900">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.avgDeliveryRate}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+19% from campaigns</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="customers">Customer Segments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
                <CardDescription>Based on delivery rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.topPerformingCampaigns.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-gray-500">{campaign.audience} customers</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{campaign.deliveryRate}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Campaign Activity</CardTitle>
                <CardDescription>Campaigns sent and messages delivered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.campaignsByMonth.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{month.month}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{month.campaigns} campaigns</p>
                        <p className="text-xs text-gray-500">{month.delivered.toLocaleString()} delivered</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segmentation</CardTitle>
              <CardDescription>Distribution of customers by segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.customerSegments.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{segment.segment}</span>
                      <span className="text-sm text-gray-500">
                        {segment.count} customers ({segment.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Key metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">+24%</p>
                  <p className="text-sm text-gray-600">Campaign engagement</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">+12%</p>
                  <p className="text-sm text-gray-600">Customer growth</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">+19%</p>
                  <p className="text-sm text-gray-600">Revenue impact</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
