import type { ReactNode } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SessionProvider } from "next-auth/react"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
