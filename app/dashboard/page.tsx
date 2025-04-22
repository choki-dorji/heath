"use client"

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/layouts/main-layout"
import { PlusCircle, FileText, Bookmark, Settings, Share2, Edit, Trash2, Download, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CarePlan {
  id: string
  name: string
  description?: string
  conditions: string[]
  medications: string[]
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("care-plans")
  const [carePlans, setCarePlans] = useState<CarePlan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCarePlans()
  }, [])

  const fetchCarePlans = async () => {
    try {
      const response = await fetch('/api/care-plans')
      if (!response.ok) {
        throw new Error('Failed to fetch care plans')
      }
      const data = await response.json()
      setCarePlans(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load care plans",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deletePlan = async (id: string) => {
    try {
      const response = await fetch(`/api/care-plans/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete care plan')
      }

      setCarePlans(carePlans.filter((plan) => plan.id !== id))
      toast({
        title: "Care plan deleted",
        description: "The care plan has been successfully removed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete care plan",
        variant: "destructive",
      })
    }
  }

  const downloadCarePlan = (id: string) => {
    // In a real app, this would download the care plan
    toast({
      title: "Downloading care plan",
      description: "The care plan will be downloaded shortly.",
    })
  }

  const sendMail = async (id: string) => {
    toast({
      title: "Coming Soon",
      description: "Email functionality will be available soon.",
    })
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your care plans and saved questions.</p>
              </div>
              <Button asChild className="mt-4 md:mt-0">
                <Link href="/dashboard/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Plan
                </Link>
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="care-plans">Care Plans</TabsTrigger>
                <TabsTrigger value="saved-questions">Saved FAQs</TabsTrigger>
              </TabsList>

              <TabsContent value="care-plans">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  </div>
                ) : carePlans.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">No care plans found. Create your first care plan to get started.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {carePlans.map((plan) => (
                      <Card key={plan.id}>
                        <CardHeader className="pb-2">
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            Created: {new Date(plan.createdAt).toLocaleDateString()} • Updated: {new Date(plan.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">Conditions:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {plan.conditions.map((condition, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {condition}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Medications:</span>{" "}
                              <span className="text-gray-600">{plan.medications.length}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex space-x-2">
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/dashboard/${plan.id}`}>View</Link>
                            </Button>
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/dashboard/${plan.id}/edit`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => sendMail(plan.id)}>
                              <Mail className="h-4 w-4 mr-1" />
                              Send Mail
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => downloadCarePlan(plan.id)}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => deletePlan(plan.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved-questions">
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No saved questions yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
