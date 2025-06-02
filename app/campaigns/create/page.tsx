"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RuleBuilder } from "@/components/campaigns/rule-builder"
import { AudiencePreview } from "@/components/campaigns/audience-preview"
import { NaturalLanguageSegments } from "@/components/campaigns/natural-language-segments"
import { AIMessageSuggestions } from "@/components/campaigns/ai-message-suggestions"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Wand2, Sparkles, Target, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateCampaignPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()

  const [campaignName, setCampaignName] = useState("")
  const [message, setMessage] = useState("")
  const [rules, setRules] = useState<any[]>([])
  const [audienceSize, setAudienceSize] = useState(0)
  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState("visual")

  if (!session) {
    return <div>Please log in to create campaigns.</div>
  }

  const handleCreateCampaign = async () => {
    if (!campaignName || !message || rules.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and add at least one rule.",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: campaignName,
          message,
          rules,
          audienceSize,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Campaign created and messages are being sent!",
        })
        router.push("/campaigns")
      } else {
        throw new Error("Failed to create campaign")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wand2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Create Campaign
              </h1>
              <p className="text-gray-600 text-lg">Define your audience and create a personalized campaign message.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Campaign Details
                </CardTitle>
                <CardDescription className="text-violet-100">Basic information about your campaign</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="campaignName" className="text-sm font-semibold text-gray-700">
                    Campaign Name
                  </Label>
                  <Input
                    id="campaignName"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter campaign name"
                    className="h-12 border-2 border-gray-200 focus:border-violet-400 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Campaign Message
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi {name}, here's a special offer just for you!"
                    rows={4}
                    className="border-2 border-gray-200 focus:border-violet-400 rounded-lg resize-none"
                  />
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Use {"{name}"} to personalize messages with customer names.
                  </p>
                </div>

                <AIMessageSuggestions
                  onSuggestionSelect={(suggestion) => setMessage(suggestion)}
                  campaignType="general"
                />
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Audience Segmentation
                </CardTitle>
                <CardDescription className="text-indigo-100">Define who should receive this campaign</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger
                      value="visual"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                    >
                      Visual Builder
                    </TabsTrigger>
                    <TabsTrigger
                      value="natural"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                    >
                      Natural Language
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="visual" className="mt-6">
                    <RuleBuilder rules={rules} onRulesChange={setRules} onAudienceSizeChange={setAudienceSize} />
                  </TabsContent>

                  <TabsContent value="natural" className="mt-6">
                    <NaturalLanguageSegments
                      onRulesGenerated={(generatedRules) => {
                        setRules(generatedRules)
                        setActiveTab("visual")
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <AudiencePreview rules={rules} audienceSize={audienceSize} />

            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Launch Campaign
                </CardTitle>
                <CardDescription className="text-emerald-100">Review and send your campaign</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Button
                  onClick={handleCreateCampaign}
                  disabled={isCreating || !campaignName || !message || rules.length === 0}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Creating Campaign...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Create & Send Campaign
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
