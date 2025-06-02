"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Chrome, Sparkles } from "lucide-react"

export function LoginButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      size="lg"
      className="group relative bg-white hover:bg-gray-50 text-gray-900 border-2 border-violet-200 hover:border-violet-300 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <Chrome className="mr-3 h-6 w-6 text-violet-600" />
      Sign in with Google
      <Sparkles className="ml-3 h-5 w-5 text-violet-500 group-hover:rotate-12 transition-transform duration-300" />
    </Button>
  )
}
