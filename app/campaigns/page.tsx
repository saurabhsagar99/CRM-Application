"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Mail, TrendingUp, Clock, Send, CheckCircle, XCircle, Zap, Target, Calendar } from "lucide-react"
import Link from "next/link"

export default function CampaignsPage() {
  const { data: session } = useSession()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (session) {
      fetchCampaigns()
    }
  }, [session])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns")
      if (response.ok) {
        const data = await response.json()
        setCampaigns(data.campaigns)
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
          icon: CheckCircle,
          label: "Completed",
        }
      case "sending":
        return {
          color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
          icon: Send,
          label: "Sending",
        }
      case "failed":
        return {
          color: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
          icon: XCircle,
          label: "Failed",
        }
      default:
        return {
          color: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
          icon: Clock,
          label: "Draft",
        }
    }
  }

  if (!session) {
    return <div>Please log in to view campaigns.</div>
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
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
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
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Campaigns
              </h1>
              <p className="text-gray-600 text-lg">Manage and track your marketing campaigns</p>
            </div>
          </div>
          <Link href="/campaigns/create">
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6">
              <Plus className="mr-2 h-5 w-5" />
              Create Campaign
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium">Total Campaigns</p>
                  <p className="text-3xl font-bold">{campaigns.length}</p>
                </div>
                <Mail className="h-8 w-8 text-violet-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Messages Sent</p>
                  <p className="text-3xl font-bold">12,456</p>
                </div>
                <Send className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Delivery Rate</p>
                  <p className="text-3xl font-bold">94.2%</p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Active Campaigns</p>
                  <p className="text-3xl font-bold">{campaigns.filter((c) => c.status === "sending").length}</p>
                </div>
                <Zap className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-2 border-gray-200 focus:border-violet-400 rounded-xl bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 p-1 rounded-xl shadow-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6 py-2 font-medium"
            >
              All Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg px-6 py-2 font-medium"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg px-6 py-2 font-medium"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredCampaigns.length === 0 ? (
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No campaigns yet</h3>
                  <p className="text-gray-600 mb-8 text-lg">Get started by creating your first campaign</p>
                  <Link href="/campaigns/create">
                    <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Campaign
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredCampaigns.map((campaign) => {
                const statusConfig = getStatusConfig(campaign.status)
                const StatusIcon = statusConfig.icon
                return (
                  <Card
                    key={campaign.id}
                    className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Mail className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                              {campaign.name}
                              <Badge className={`${statusConfig.color} border-0 px-3 py-1 font-medium`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="text-gray-600 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Created {new Date(campaign.createdAt).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            {campaign.audienceSize?.toLocaleString() || 0}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">audience size</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Sent</p>
                            <p className="text-xl font-bold text-emerald-700">{campaign.sentCount || 0}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <XCircle className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Failed</p>
                            <p className="text-xl font-bold text-red-700">{campaign.failedCount || 0}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Target className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Success Rate</p>
                            <p className="text-xl font-bold text-blue-700">
                              {campaign.sentCount && campaign.audienceSize
                                ? Math.round((campaign.sentCount / campaign.audienceSize) * 100)
                                : 0}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Campaign Message:
                        </p>
                        <p className="text-gray-600 leading-relaxed">{campaign.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="active">
            {filteredCampaigns
              .filter((c) => c.status === "sending")
              .map((campaign) => (
                <Card
                  key={campaign.id}
                  className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      {campaign.name}
                    </CardTitle>
                    <CardDescription className="text-blue-100">Currently sending messages...</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>Progress</span>
                        <span>
                          {campaign.sentCount || 0} / {campaign.audienceSize || 0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              campaign.sentCount && campaign.audienceSize
                                ? (campaign.sentCount / campaign.audienceSize) * 100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed">
            {filteredCampaigns
              .filter((c) => c.status === "completed")
              .map((campaign) => (
                <Card
                  key={campaign.id}
                  className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      {campaign.name}
                    </CardTitle>
                    <CardDescription className="text-emerald-100">
                      Completed {new Date(campaign.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                        <div className="text-3xl font-bold text-emerald-600">{campaign.sentCount || 0}</div>
                        <div className="text-sm text-emerald-700 font-medium">Sent</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
                        <div className="text-3xl font-bold text-red-600">{campaign.failedCount || 0}</div>
                        <div className="text-sm text-red-700 font-medium">Failed</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                        <div className="text-3xl font-bold text-blue-600">
                          {campaign.sentCount && campaign.audienceSize
                            ? Math.round((campaign.sentCount / campaign.audienceSize) * 100)
                            : 0}
                          %
                        </div>
                        <div className="text-sm text-blue-700 font-medium">Success Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
