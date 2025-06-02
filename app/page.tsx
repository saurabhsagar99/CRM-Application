"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Mail,
  BarChart3,
  Zap,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Star,
  Crown,
  Activity,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { LoginButton } from "@/components/auth/login-button"

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-400/30 to-purple-600/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-indigo-400/30 to-blue-600/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-violet-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-violet-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Sparkles className="h-8 w-8 text-violet-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Loading your CRM...
          </h2>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Enhanced background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>

          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-violet-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-32 w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-violet-200 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-violet-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-violet-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-semibold text-violet-700">AI-Powered CRM Platform</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                Mini CRM
              </span>
              <br />
              <span className="text-5xl md:text-6xl bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your customer relationships with{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold">
                intelligent segmentation
              </span>
              , personalized campaigns, and{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent font-bold">
                AI-powered insights
              </span>{" "}
              that drive real growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <LoginButton />
             
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Enhanced feature cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="group hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 border-0 bg-white/90 backdrop-blur-md hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">Smart Segmentation</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 text-center leading-relaxed">
                  Create precise audience segments with flexible rules and AI-powered natural language processing for
                  targeted campaigns.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 border-0 bg-white/90 backdrop-blur-md hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">Campaign Delivery</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 text-center leading-relaxed">
                  Send personalized messages with real-time delivery tracking, comprehensive status updates, and
                  automated workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border-0 bg-white/90 backdrop-blur-md hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 text-center leading-relaxed">
                  Get AI-generated insights, performance summaries, and detailed analytics for all your campaigns and
                  customer interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 border-0 bg-white/90 backdrop-blur-md hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 text-center leading-relaxed">
                  Leverage artificial intelligence for message suggestions, audience insights, predictive analytics, and
                  smart automation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Social proof section */}
          <div className="mt-24 text-center">
            <p className="text-gray-500 text-lg font-medium mb-8">Trusted by growing businesses worldwide</p>
            <div className="flex justify-center items-center gap-12 opacity-60">
              <div className="w-24 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
              <div className="w-28 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
              <div className="w-20 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
              <div className="w-32 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <p className="text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back, {session.user?.name?.split(" ")[0]}!
              </p>
    <p className="text-5xl"> 👋</p>
            
              <p className="text-gray-600 text-xl font-medium mt-2">
                Ready to supercharge your customer relationships today?
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced stats cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium opacity-90">Total Customers</CardTitle>
              <div className="relative">
                <Users className="h-6 w-6 opacity-80" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black mb-1">1,234</div>
              <p className="text-xs opacity-80 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-indigo-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium opacity-90">Active Campaigns</CardTitle>
              <div className="relative">
                <Mail className="h-6 w-6 opacity-80" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black mb-1">8</div>
              <p className="text-xs opacity-80 font-medium">3 sent today</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium opacity-90">Delivery Rate</CardTitle>
              <div className="relative">
                <Target className="h-6 w-6 opacity-80" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-bounce"></div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black mb-1">94.2%</div>
              <p className="text-xs opacity-80 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                +2.1% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium opacity-90">Revenue Impact</CardTitle>
              <div className="relative">
                <Zap className="h-6 w-6 opacity-80" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black mb-1">₹45,231</div>
              <p className="text-xs opacity-80 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                +19% from campaigns
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Enhanced Quick Actions */}
          <Card className="border-0 bg-white/90 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardTitle className="flex items-center gap-3 text-xl font-bold relative z-10">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="text-violet-100 relative z-10">Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6 relative z-10">
              <Link href="/campaigns/create">
                <Button className="w-full justify-start h-16 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold group">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  Create New Campaign
                  <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/customers">
                <Button className="w-full justify-start h-16 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold group">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Users className="h-5 w-5" />
                  </div>
                  Manage Customers
                  <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/analytics">
                <Button className="w-full justify-start h-16 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold group">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  View Analytics
                  <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enhanced Recent Activity */}
          <Card className="border-0 bg-white/90 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardTitle className="flex items-center gap-3 text-xl font-bold relative z-10">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                Recent Activity
              </CardTitle>
              <CardDescription className="text-emerald-100 relative z-10">Latest campaign updates</CardDescription>
            </CardHeader>
            <CardContent className="p-8 relative z-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-105 group">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-gray-800">Holiday Sale Campaign</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Crown className="h-3 w-3 text-amber-500" />
                      Sent to 856 customers • 94% delivered
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full font-medium border">2h ago</div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 group">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-gray-800">Welcome Series</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      Sent to 124 customers • 96% delivered
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full font-medium border">1d ago</div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 hover:scale-105 group">
                  <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-gray-800">Win-back Campaign</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Target className="h-3 w-3 text-red-500" />
                      Sent to 342 customers • 91% delivered
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full font-medium border">2d ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
