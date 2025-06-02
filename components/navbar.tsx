"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Users, Mail, BarChart3, LogOut, Settings, Sparkles } from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Mini CRM
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-violet-50 hover:text-violet-700 transition-all duration-200"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/customers"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
            >
              <Users className="h-4 w-4" />
              <span>Customers</span>
            </Link>
            <Link
              href="/campaigns"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Campaigns</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-amber-700 transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full ring-2 ring-violet-200 hover:ring-violet-300 transition-all duration-200"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border-violet-200" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-3 border-b border-violet-100">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-semibold text-gray-800">{session.user?.name}</p>
                <p className="w-[200px] truncate text-sm text-gray-600">{session.user?.email}</p>
              </div>
            </div>
            <DropdownMenuItem className="hover:bg-violet-50 focus:bg-violet-50">
              <Settings className="mr-2 h-4 w-4 text-violet-600" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="hover:bg-red-50 focus:bg-red-50 text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
