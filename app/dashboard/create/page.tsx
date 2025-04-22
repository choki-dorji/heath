"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import MainLayout from "@/components/layouts/main-layout"
import { PlusCircle, Trash2, Save, ArrowLeft } from "lucide-react"

export default function CreateCarePlanPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic-info")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    planName: "",
    patientName: "",
    dateOfBirth: "",
    conditions: [{ name: "", details: "" }],
    medications: [{ name: "", dosage: "", schedule: "", notes: "" }],
    allergies: "",
    emergencyContact: { name: "", relationship: "", phone: "" },
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleConditionChange = (index: number, field: string, value: string) => {
    const updatedConditions = [...formData.conditions]
    updatedConditions[index] = { ...updatedConditions[index], [field]: value }
    setFormData((prev) => ({ ...prev, conditions: updatedConditions }))
  }

  const addCondition = () => {
    setFormData((prev) => ({
      ...prev,
      conditions: [...prev.conditions, { name: "", details: "" }],
    }))
  }

  const removeCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }))
  }

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...formData.medications]
    updatedMedications[index] = { ...updatedMedications[index], [field]: value }
    setFormData((prev) => ({ ...prev, medications: updatedMedications }))
  }

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", schedule: "", notes: "" }],
    }))
  }

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare data for API
    const apiData = {
      name: formData.planName, 
      description: formData.notes, // Assuming 'notes' field maps to description
      conditions: formData.conditions.map(c => c.name), // Extract condition names
      medications: formData.medications.map(m => m.name), // Extract medication names
      // patientName: formData.patientName, // Include if API supports it
      // dateOfBirth: formData.dateOfBirth, // Include if API supports it
      // allergies: formData.allergies, // Include if API supports it
      // emergencyContact: formData.emergencyContact // Include if API supports it
    }

    try {
      const response = await fetch('/api/care-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create care plan')
      }

      toast({
        title: "Care plan created",
        description: "Your care plan has been successfully created.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Care plan creation error:", error)
      toast({
        title: "Error creating care plan",
        description: error instanceof Error ? error.message : "There was a problem creating your care plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Care Plan</CardTitle>
              <CardDescription>Complete each section to create a comprehensive care plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                    <TabsTrigger value="conditions">Conditions</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="additional-info">Additional Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic-info" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="planName">Care Plan Name</Label>
                      <Input
                        id="planName"
                        name="planName"
                        placeholder="e.g., Diabetes Management Plan"
                        value={formData.planName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        placeholder="Full name"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="conditions" className="space-y-4 mt-4">
                    {formData.conditions.map((condition, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Condition {index + 1}</h3>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => removeCondition(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`condition-name-${index}`}>Condition Name</Label>
                          <Input
                            id={`condition-name-${index}`}
                            value={condition.name}
                            onChange={(e) => handleConditionChange(index, "name", e.target.value)}
                            placeholder="e.g., Type 2 Diabetes"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`condition-details-${index}`}>Details</Label>
                          <Textarea
                            id={`condition-details-${index}`}
                            value={condition.details}
                            onChange={(e) => handleConditionChange(index, "details", e.target.value)}
                            placeholder="Additional information about the condition"
                          />
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addCondition}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Another Condition
                    </Button>
                  </TabsContent>

                  <TabsContent value="medications" className="space-y-4 mt-4">
                    {formData.medications.map((medication, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Medication {index + 1}</h3>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => removeMedication(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`medication-name-${index}`}>Medication Name</Label>
                          <Input
                            id={`medication-name-${index}`}
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                            placeholder="e.g., Metformin"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`medication-dosage-${index}`}>Dosage</Label>
                          <Input
                            id={`medication-dosage-${index}`}
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                            placeholder="e.g., 500mg"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`medication-schedule-${index}`}>Schedule</Label>
                          <Input
                            id={`medication-schedule-${index}`}
                            value={medication.schedule}
                            onChange={(e) => handleMedicationChange(index, "schedule", e.target.value)}
                            placeholder="e.g., Twice daily with meals"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`medication-notes-${index}`}>Notes</Label>
                          <Textarea
                            id={`medication-notes-${index}`}
                            value={medication.notes}
                            onChange={(e) => handleMedicationChange(index, "notes", e.target.value)}
                            placeholder="Additional notes about the medication"
                          />
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addMedication}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Another Medication
                    </Button>
                  </TabsContent>

                  <TabsContent value="additional-info" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="List any allergies or adverse reactions to medications"
                      />
                    </div>

                    <div className="space-y-4 p-4 border rounded-lg">
                      <h3 className="font-medium">Emergency Contact</h3>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Name</Label>
                        <Input
                          id="emergencyContactName"
                          value={formData.emergencyContact.name}
                          onChange={(e) => handleEmergencyContactChange("name", e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                        <Input
                          id="emergencyContactRelationship"
                          value={formData.emergencyContact.relationship}
                          onChange={(e) => handleEmergencyContactChange("relationship", e.target.value)}
                          placeholder="e.g., Spouse, Child, Friend"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                        <Input
                          id="emergencyContactPhone"
                          value={formData.emergencyContact.phone}
                          onChange={(e) => handleEmergencyContactChange("phone", e.target.value)}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any additional information that might be helpful"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <CardFooter className="flex justify-end pt-6">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Creating..." : "Create Care Plan"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 