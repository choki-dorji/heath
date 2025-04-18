"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import MainLayout from "@/components/layouts/main-layout"
import { ArrowLeft, Plus, LineChart, Activity, Heart, Droplets, Weight } from "lucide-react"

// Mock health data
const mockHealthData = {
  bloodPressure: [
    { date: "2023-11-01", systolic: 120, diastolic: 80 },
    { date: "2023-11-03", systolic: 118, diastolic: 78 },
    { date: "2023-11-05", systolic: 122, diastolic: 82 },
    { date: "2023-11-07", systolic: 119, diastolic: 79 },
    { date: "2023-11-09", systolic: 121, diastolic: 81 },
  ],
  bloodGlucose: [
    { date: "2023-11-01", value: 95, timing: "Fasting" },
    { date: "2023-11-03", value: 120, timing: "After meal" },
    { date: "2023-11-05", value: 98, timing: "Fasting" },
    { date: "2023-11-07", value: 115, timing: "After meal" },
    { date: "2023-11-09", value: 97, timing: "Fasting" },
  ],
  weight: [
    { date: "2023-11-01", value: 165 },
    { date: "2023-11-05", value: 164 },
    { date: "2023-11-09", value: 163.5 },
  ],
}

export default function HealthTrackerPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("blood-pressure")

  // Blood pressure form state
  const [bpForm, setBpForm] = useState({
    systolic: "",
    diastolic: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Blood glucose form state
  const [glucoseForm, setGlucoseForm] = useState({
    value: "",
    timing: "Fasting",
    date: new Date().toISOString().split("T")[0],
  })

  // Weight form state
  const [weightForm, setWeightForm] = useState({
    value: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleBPSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Blood pressure reading added",
      description: `Recorded ${bpForm.systolic}/${bpForm.diastolic} mmHg for ${new Date(bpForm.date).toLocaleDateString()}`,
    })
    setBpForm({
      systolic: "",
      diastolic: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleGlucoseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Blood glucose reading added",
      description: `Recorded ${glucoseForm.value} mg/dL (${glucoseForm.timing}) for ${new Date(glucoseForm.date).toLocaleDateString()}`,
    })
    setGlucoseForm({
      value: "",
      timing: "Fasting",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Weight reading added",
      description: `Recorded ${weightForm.value} lbs for ${new Date(weightForm.date).toLocaleDateString()}`,
    })
    setWeightForm({
      value: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="section-title">Health Tracker</h1>
            <p className="section-description">
              Monitor and record your health metrics to track your progress over time.
            </p>
          </div>

          <Tabs defaultValue="blood-pressure" onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="blood-pressure" className="flex items-center justify-center">
                <Heart className="mr-2 h-4 w-4" />
                Blood Pressure
              </TabsTrigger>
              <TabsTrigger value="blood-glucose" className="flex items-center justify-center">
                <Droplets className="mr-2 h-4 w-4" />
                Blood Glucose
              </TabsTrigger>
              <TabsTrigger value="weight" className="flex items-center justify-center">
                <Weight className="mr-2 h-4 w-4" />
                Weight
              </TabsTrigger>
            </TabsList>

            {/* Blood Pressure Tab */}
            <TabsContent value="blood-pressure" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Blood Pressure History</CardTitle>
                    <CardDescription>Your recent blood pressure readings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                      <LineChart className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Blood pressure chart will appear here</span>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Recent Readings</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Systolic
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Diastolic
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mockHealthData.bloodPressure.map((reading, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(reading.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {reading.systolic} mmHg
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {reading.diastolic} mmHg
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Normal
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Reading</CardTitle>
                    <CardDescription>Record your blood pressure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBPSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bp-date">Date</Label>
                        <Input
                          id="bp-date"
                          type="date"
                          value={bpForm.date}
                          onChange={(e) => setBpForm({ ...bpForm, date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="systolic">Systolic (mmHg)</Label>
                        <Input
                          id="systolic"
                          type="number"
                          placeholder="120"
                          value={bpForm.systolic}
                          onChange={(e) => setBpForm({ ...bpForm, systolic: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                        <Input
                          id="diastolic"
                          type="number"
                          placeholder="80"
                          value={bpForm.diastolic}
                          onChange={(e) => setBpForm({ ...bpForm, diastolic: e.target.value })}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Reading
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500">
                    <p>Normal range: Less than 120/80 mmHg</p>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Blood Glucose Tab */}
            <TabsContent value="blood-glucose" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Blood Glucose History</CardTitle>
                    <CardDescription>Your recent blood glucose readings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                      <LineChart className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Blood glucose chart will appear here</span>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Recent Readings</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Reading
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Timing
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mockHealthData.bloodGlucose.map((reading, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(reading.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {reading.value} mg/dL
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.timing}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Normal
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Reading</CardTitle>
                    <CardDescription>Record your blood glucose level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGlucoseSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="glucose-date">Date</Label>
                        <Input
                          id="glucose-date"
                          type="date"
                          value={glucoseForm.date}
                          onChange={(e) => setGlucoseForm({ ...glucoseForm, date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="glucose-value">Blood Glucose (mg/dL)</Label>
                        <Input
                          id="glucose-value"
                          type="number"
                          placeholder="95"
                          value={glucoseForm.value}
                          onChange={(e) => setGlucoseForm({ ...glucoseForm, value: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="glucose-timing">Timing</Label>
                        <select
                          id="glucose-timing"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={glucoseForm.timing}
                          onChange={(e) => setGlucoseForm({ ...glucoseForm, timing: e.target.value })}
                        >
                          <option value="Fasting">Fasting</option>
                          <option value="Before meal">Before meal</option>
                          <option value="After meal">After meal</option>
                          <option value="Bedtime">Bedtime</option>
                        </select>
                      </div>

                      <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Reading
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500">
                    <p>Normal fasting range: 70-99 mg/dL</p>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Weight Tab */}
            <TabsContent value="weight" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Weight History</CardTitle>
                    <CardDescription>Your recent weight measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                      <LineChart className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Weight chart will appear here</span>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Recent Readings</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Weight
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Change
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mockHealthData.weight.map((reading, index) => {
                              const prevReading = index > 0 ? mockHealthData.weight[index - 1].value : reading.value
                              const change = reading.value - prevReading
                              const changeText =
                                change === 0 ? "No change" : change > 0 ? `+${change} lbs` : `${change} lbs`
                              const changeClass =
                                change === 0
                                  ? "bg-gray-100 text-gray-800"
                                  : change > 0
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"

                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(reading.date).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {reading.value} lbs
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {index === 0 ? (
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                        Baseline
                                      </span>
                                    ) : (
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${changeClass}`}
                                      >
                                        {changeText}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Reading</CardTitle>
                    <CardDescription>Record your weight</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleWeightSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight-date">Date</Label>
                        <Input
                          id="weight-date"
                          type="date"
                          value={weightForm.date}
                          onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight-value">Weight (lbs)</Label>
                        <Input
                          id="weight-value"
                          type="number"
                          step="0.1"
                          placeholder="165"
                          value={weightForm.value}
                          onChange={(e) => setWeightForm({ ...weightForm, value: e.target.value })}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Reading
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500">
                    <p>Track your weight regularly for the best results</p>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-primary-50 border border-primary-100 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">Health Insights</h3>
                <p className="text-gray-600">
                  Regular tracking of your health metrics can help you and your healthcare provider make better
                  decisions about your care. Aim to record your measurements at consistent times for the most accurate
                  trends.
                </p>
              </div>
              <Button asChild className="shrink-0 mt-4 md:mt-0">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
