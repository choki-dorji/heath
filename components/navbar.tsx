"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, User, LogOut, Heart, Activity } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Update state
    setIsLoggedIn(false)
    setUser(null)
    
    // Redirect to auth page
    router.push('/auth')
  }

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "FAQs", href: "/questions" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <div className="flex items-center">
          <Link href="/" className="flex items-center" aria-label="ONCANA Platform Home">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 mr-2">
              <Heart className="h-5 w-5 text-primary-600" />
            </div>
            <span className="text-primary-600 font-bold text-xl">ONC</span>
            <span className="text-gray-800 font-bold text-xl">ANA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-10 space-x-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors focus-visible-ring ${
                  isActive(link.href)
                    ? "text-primary-600 border-b-2 border-primary-500"
                    : "text-gray-600 hover:text-primary-600"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/health-tracker"
                className="hidden md:flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 focus-visible-ring"
                aria-label="Health Tracker"
              >
                <Activity className="h-5 w-5 mr-1" />
                <span className="hidden lg:inline">Health Tracker</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full focus-visible-ring"
                    aria-label="User menu"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/auth">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium ${
                      isActive(link.href)
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {!isLoggedIn && (
                  <>
                    <Link
                      href="/auth"
                      className="text-base font-medium text-gray-600 hover:text-primary-600"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth"
                      className="text-base font-medium text-primary-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
