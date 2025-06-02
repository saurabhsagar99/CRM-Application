"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Wand2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NaturalLanguageSegmentsProps {
  onRulesGenerated: (rules: any[]) => void
}

export function NaturalLanguageSegments({ onRulesGenerated }: NaturalLanguageSegmentsProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const examplePrompts = [
    "Customers who haven't purchased in the last 3 months",
    "High-value customers who spent more than ₹10,000",
    "New customers who joined in the last 30 days",
    "Frequent visitors with more than 5 visits but low spending",
  ]

  const handleGenerateRules = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your audience.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai/generate-rules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate rules")
      }

      const { rules } = await response.json()
      onRulesGenerated(rules)

      toast({
        title: "Success",
        description: "Rules generated! Check the Visual Builder tab.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate rules. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Textarea
          placeholder="Describe your target audience in natural language..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <p className="text-sm text-gray-500 mt-2">Describe your audience and we'll convert it to rules using AI.</p>
      </div>

      <Button onClick={handleGenerateRules} disabled={isGenerating || !prompt.trim()} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Rules...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Rules with AI
          </>
        )}
      </Button>

      <div>
        <h4 className="text-sm font-medium mb-3">Example prompts:</h4>
        <div className="grid gap-2">
          {examplePrompts.map((example, index) => (
            <Card key={index} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-3 text-sm" onClick={() => setPrompt(example)}>
                {example}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
