"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  Users,
  Mail,
  Calendar,
  Sparkles,
  Target,
  Zap,
  Crown,
  Activity,
  PieChart,
} from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Analytics
              </h1>
              <p className="text-gray-600 text-lg">Insights and performance metrics for your campaigns</p>
            </div>
          </div>
          <Button
            onClick={generateAIInsights}
            disabled={isGeneratingInsights}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isGeneratingInsights ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Generating...
              </>
            ) : (
              "Generate AI Insights"
            )}
          </Button>
        </div>

        {/* AI Insights */}
        {insights.length > 0 && (
          <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription className="text-violet-100">Smart analysis of your campaign performance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 rounded-xl border-2 border-violet-200 hover:border-violet-300 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-violet-900 font-medium leading-relaxed">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Campaigns</CardTitle>
              <Mail className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.totalCampaigns}</div>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +3 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-indigo-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Customers</CardTitle>
              <Users className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.totalCustomers.toLocaleString()}</div>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Avg Delivery Rate</CardTitle>
              <Target className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.avgDeliveryRate}%</div>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Revenue Impact</CardTitle>
              <Zap className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{mockData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +19% from campaigns
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-8">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 p-1 rounded-xl shadow-lg">
            <TabsTrigger
              value="campaigns"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg px-6 py-2 font-medium"
            >
              Campaign Performance
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2 font-medium"
            >
              Customer Segments
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6 py-2 font-medium"
            >
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Top Performing Campaigns
                  </CardTitle>
                  <CardDescription className="text-emerald-100">Based on delivery rates</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockData.topPerformingCampaigns.map((campaign, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 hover:border-emerald-300 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{campaign.name}</p>
                            <p className="text-sm text-gray-600">{campaign.audience} customers</p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-3 py-1 font-semibold">
                          {campaign.deliveryRate}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Monthly Campaign Activity
                  </CardTitle>
                  <CardDescription className="text-indigo-100">Campaigns sent and messages delivered</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockData.campaignsByMonth.map((month, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-800">{month.month}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-indigo-700">{month.campaigns} campaigns</p>
                          <p className="text-sm text-indigo-600">{month.delivered.toLocaleString()} delivered</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-8">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Customer Segmentation
                </CardTitle>
                <CardDescription className="text-indigo-100">Distribution of customers by segment</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {mockData.customerSegments.map((segment, index) => {
                    const colors = [
                      "from-violet-500 to-purple-600",
                      "from-emerald-500 to-green-600",
                      "from-blue-500 to-indigo-600",
                      "from-amber-500 to-orange-600",
                    ]
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 bg-gradient-to-r ${colors[index]} rounded-full`}></div>
                            <span className="font-semibold text-gray-800">{segment.segment}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {segment.count} ({segment.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`bg-gradient-to-r ${colors[index]} h-3 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${segment.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-8">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription className="text-violet-100">Key metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 hover:border-emerald-300 transition-colors duration-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-emerald-600 mb-2">+24%</p>
                    <p className="text-emerald-700 font-medium">Campaign engagement</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-300 transition-colors duration-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-2">+12%</p>
                    <p className="text-blue-700 font-medium">Customer growth</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 hover:border-purple-300 transition-colors duration-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600 mb-2">+19%</p>
                    <p className="text-purple-700 font-medium">Revenue impact</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
