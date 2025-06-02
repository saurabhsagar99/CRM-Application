"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Clock, Target, Zap } from "lucide-react"

interface AudiencePreviewProps {
  rules: any[]
  audienceSize: number
}

export function AudiencePreview({ rules, audienceSize }: AudiencePreviewProps) {
  const totalCustomers = 1234
  const percentage = totalCustomers > 0 ? ((audienceSize / totalCustomers) * 100).toFixed(1) : "0"

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Audience Preview
        </CardTitle>
        <CardDescription className="text-blue-100">Estimated audience based on your rules</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border-2 border-blue-100">
          <div className="relative">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {audienceSize.toLocaleString()}
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-sm text-blue-700 mb-3">customers will receive this campaign</div>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 px-3 py-1">
            {percentage}% of total audience
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <span className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Expected delivery rate
            </span>
            <span className="font-bold text-green-700">~90%</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
            <span className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              Estimated delivery time
            </span>
            <span className="font-bold text-orange-700">2-5 minutes</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
            <span className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-violet-500 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              Engagement potential
            </span>
            <span className="font-bold text-purple-700">High</span>
          </div>
        </div>

        {rules.length === 0 && (
          <div className="text-center p-6 text-gray-500 text-sm bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            Add rules to see audience preview
          </div>
        )}
      </CardContent>
    </Card>
  )
}
