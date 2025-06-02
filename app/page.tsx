"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, BarChart3, Zap, TrendingUp, Target, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LoginButton } from "@/components/auth/login-button"

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-violet-200"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-violet-600 absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-200 mb-8">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">AI-Powered CRM Platform</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Mini CRM
              <br />
              <span className="text-4xl md:text-5xl">Platform</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your customer relationships with intelligent segmentation, personalized campaigns, and
              AI-powered insights that drive real growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <LoginButton />
              <Button variant="outline" size="lg" className="group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Smart Segmentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Create precise audience segments with flexible rules and AI-powered natural language processing.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Campaign Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Send personalized messages with real-time delivery tracking and comprehensive status updates.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Get AI-generated insights and performance summaries for all your campaigns and customers.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Leverage artificial intelligence for message suggestions, audience insights, and automation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back, {session.user?.name?.split(" ")[0]}!
              </h1>
              <p className="text-gray-600 text-lg">Manage your customers, create campaigns, and track performance.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Customers</CardTitle>
              <Users className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-indigo-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Active Campaigns</CardTitle>
              <Mail className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs opacity-80">3 sent today</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Delivery Rate</CardTitle>
              <Target className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">94.2%</div>
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
              <div className="text-3xl font-bold">₹45,231</div>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +19% from campaigns
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-violet-100">Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Link href="/campaigns/create">
                <Button
                  className="w-full justify-start h-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Create New Campaign
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
              <Link href="/customers">
                <Button
                  className="w-full justify-start h-12 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Manage Customers
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button
                  className="w-full justify-start h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  View Campaign History
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-emerald-100">Latest campaign updates</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-gray-800">Holiday Sale Campaign</p>
                    <p className="text-xs text-gray-600">Sent to 856 customers • 94% delivered</p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">2h ago</div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-gray-800">Welcome Series</p>
                    <p className="text-xs text-gray-600">Sent to 124 customers • 96% delivered</p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">1d ago</div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-gray-800">Win-back Campaign</p>
                    <p className="text-xs text-gray-600">Sent to 342 customers • 91% delivered</p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">2d ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
