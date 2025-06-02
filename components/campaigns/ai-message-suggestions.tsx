"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Loader2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIMessageSuggestionsProps {
  onSuggestionSelect: (message: string) => void
  campaignType: string
}

export function AIMessageSuggestions({ onSuggestionSelect, campaignType }: AIMessageSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateSuggestions = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai/message-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignType }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate suggestions")
      }

      const { suggestions: newSuggestions } = await response.json()
      setSuggestions(newSuggestions)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate message suggestions.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "Message copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy message.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Wand2 className="h-4 w-4" />
          AI Message Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={generateSuggestions} disabled={isGenerating} variant="outline" size="sm" className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-3 w-3" />
              Generate Message Ideas
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm flex-1">{suggestion}</p>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(suggestion)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" onClick={() => onSuggestionSelect(suggestion)} className="h-6 px-2 text-xs">
                      Use
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
