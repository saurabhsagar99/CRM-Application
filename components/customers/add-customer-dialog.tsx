"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Sparkles } from "lucide-react"

interface AddCustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCustomerAdded: () => void
}

export function AddCustomerDialog({ open, onOpenChange, onCustomerAdded }: AddCustomerDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    totalSpend: "",
    visits: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          totalSpend: Number.parseFloat(formData.totalSpend) || 0,
          visits: Number.parseInt(formData.visits) || 0,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Customer added successfully!",
        })
        setFormData({ name: "", email: "", totalSpend: "", visits: "" })
        onCustomerAdded()
      } else {
        throw new Error("Failed to add customer")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add customer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-md border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Add New Customer
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter the customer details below to add them to your database.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter customer name"
                required
                className="h-12 border-2 border-gray-200 focus:border-violet-400 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
                required
                className="h-12 border-2 border-gray-200 focus:border-violet-400 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalSpend" className="text-sm font-semibold text-gray-700">
                  Total Spend (₹)
                </Label>
                <Input
                  id="totalSpend"
                  type="number"
                  value={formData.totalSpend}
                  onChange={(e) => setFormData((prev) => ({ ...prev, totalSpend: e.target.value }))}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-violet-400 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visits" className="text-sm font-semibold text-gray-700">
                  Number of Visits
                </Label>
                <Input
                  id="visits"
                  type="number"
                  value={formData.visits}
                  onChange={(e) => setFormData((prev) => ({ ...prev, visits: e.target.value }))}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-violet-400 rounded-lg"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-12 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Add Customer
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
