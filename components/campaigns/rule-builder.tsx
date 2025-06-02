"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"

interface Rule {
  id: string
  field: string
  operator: string
  value: string
  connector?: "AND" | "OR"
}

interface RuleBuilderProps {
  rules: Rule[]
  onRulesChange: (rules: Rule[]) => void
  onAudienceSizeChange: (size: number) => void
}

const fieldOptions = [
  { value: "totalSpend", label: "Total Spend" },
  { value: "visits", label: "Number of Visits" },
  { value: "lastPurchase", label: "Last Purchase" },
  { value: "createdAt", label: "Account Created" },
]

const operatorOptions = [
  { value: "gt", label: "Greater than" },
  { value: "gte", label: "Greater than or equal" },
  { value: "lt", label: "Less than" },
  { value: "lte", label: "Less than or equal" },
  { value: "eq", label: "Equal to" },
  { value: "days_ago", label: "Days ago" },
]

export function RuleBuilder({ rules, onRulesChange, onAudienceSizeChange }: RuleBuilderProps) {
  const [localRules, setLocalRules] = useState<Rule[]>(rules)

  useEffect(() => {
    setLocalRules(rules)
  }, [rules])

  useEffect(() => {
    // Calculate audience size based on rules
    // This is a simplified calculation - in a real app, you'd query your database
    const baseSize = 1234 // Total customers
    const reductionFactor = Math.max(0.1, 1 - localRules.length * 0.3)
    const estimatedSize = Math.floor(baseSize * reductionFactor)
    onAudienceSizeChange(estimatedSize)
  }, [localRules, onAudienceSizeChange])

  const addRule = () => {
    const newRule: Rule = {
      id: Math.random().toString(36).substr(2, 9),
      field: "",
      operator: "",
      value: "",
      connector: localRules.length > 0 ? "AND" : undefined,
    }
    const updatedRules = [...localRules, newRule]
    setLocalRules(updatedRules)
    onRulesChange(updatedRules)
  }

  const updateRule = (id: string, updates: Partial<Rule>) => {
    const updatedRules = localRules.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule))
    setLocalRules(updatedRules)
    onRulesChange(updatedRules)
  }

  const removeRule = (id: string) => {
    const updatedRules = localRules.filter((rule) => rule.id !== id)
    // Update connectors for remaining rules
    if (updatedRules.length > 0) {
      updatedRules[0].connector = undefined
    }
    setLocalRules(updatedRules)
    onRulesChange(updatedRules)
  }

  const updateConnector = (id: string, connector: "AND" | "OR") => {
    updateRule(id, { connector })
  }

  return (
    <div className="space-y-4">
      {localRules.map((rule, index) => (
        <div key={rule.id}>
          {index > 0 && (
            <div className="flex justify-center my-2">
              <div className="flex gap-2">
                <Button
                  variant={rule.connector === "AND" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConnector(rule.id, "AND")}
                >
                  AND
                </Button>
                <Button
                  variant={rule.connector === "OR" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConnector(rule.id, "OR")}
                >
                  OR
                </Button>
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Select value={rule.field} onValueChange={(value) => updateRule(rule.id, { field: value })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={rule.operator} onValueChange={(value) => updateRule(rule.id, { operator: value })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operatorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Enter value"
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                  className="flex-1"
                />

                <Button variant="outline" size="icon" onClick={() => removeRule(rule.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      <Button onClick={addRule} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Rule
      </Button>

      {localRules.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Preview:</h4>
          <div className="flex flex-wrap gap-2">
            {localRules.map((rule, index) => (
              <div key={rule.id} className="flex items-center gap-1">
                {index > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {rule.connector}
                  </Badge>
                )}
                <Badge variant="outline">
                  {fieldOptions.find((f) => f.value === rule.field)?.label || rule.field}{" "}
                  {operatorOptions.find((o) => o.value === rule.operator)?.label || rule.operator} {rule.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
