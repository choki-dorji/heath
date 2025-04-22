import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import NextAUthSession from "@/sessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ONCANA Platform",
  description: "A comprehensive ONCANA platform for patients and caregivers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {/* <NextAUthSession> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        
      {/* </NextAUthSession> */}
      </body>
    </html>
  )
}
