"use client"

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/layouts/main-layout"
import { PlusCircle, FileText, Bookmark, Settings, Share2, Edit, Trash2, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for care plans
const mockCarePlans = [
  {
    id: "plan1",
    name: "Diabetes Management Plan",
    createdAt: "2023-10-15",
    updatedAt: "2023-11-02",
    conditions: ["Type 2 Diabetes", "Hypertension"],
    medications: 4,
  },
  {
    id: "plan2",
    name: "Heart Health Plan",
    createdAt: "2023-09-20",
    updatedAt: "2023-10-25",
    conditions: ["Coronary Artery Disease", "High Cholesterol"],
    medications: 3,
  },
]

// Mock data for saved questions
const mockSavedQuestions = [
  {
    id: "q1",
    question: "What are the common symptoms of diabetes?",
    category: "symptoms",
    savedAt: "2023-10-28",
  },
  {
    id: "q2",
    question: "How often should I check my blood pressure?",
    category: "monitoring",
    savedAt: "2023-11-05",
  },
  {
    id: "q3",
    question: "What are the recommended dietary guidelines for heart health?",
    category: "nutrition",
    savedAt: "2023-11-10",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("care-plans")
  const [carePlans, setCarePlans] = useState(mockCarePlans)
  const [savedQuestions, setSavedQuestions] = useState(mockSavedQuestions)

  const deletePlan = (id: string) => {
    setCarePlans(carePlans.filter((plan) => plan.id !== id))
    toast({
      title: "Care plan deleted",
      description: "The care plan has been successfully removed.",
    })
  }

  const downloadCarePlan = (id: string) => {
    // In a real app, this would download the care plan
    toast({
      title: "Downloading care plan",
      description: "The care plan will be downloaded shortly.",
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
                            <span className="text-gray-600">{plan.medications}</span>
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
              </TabsContent>

              <TabsContent value="saved-questions">
                <div className="grid grid-cols-1 gap-4">
                  {savedQuestions.map((question) => (
                    <Card key={question.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{question.question}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {question.category}
                              </span>
                              <span className="ml-2">Saved on {new Date(question.savedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
