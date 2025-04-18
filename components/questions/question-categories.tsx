"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Pill, AlertCircle, Heart } from "lucide-react"

const categories = [
  { id: "all", label: "All Questions", icon: null },
  { id: "diagnosis", label: "Diagnosis", icon: Stethoscope, color: "purple" },
  { id: "treatments", label: "Treatments", icon: Pill, color: "treatment" },
  { id: "side-effects", label: "Side Effects", icon: AlertCircle, color: "alert" },
  { id: "wellbeing", label: "Wellbeing", icon: Heart, color: "wellness" },
]

export default function QuestionCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="mb-8">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start md:justify-center p-1 h-auto">
          {categories.map((category) => {
            const Icon = category.icon
            const colorClass = category.color ? `${category.color}-600` : "primary-600"
            const bgColorClass = category.color ? `${category.color}-100` : "primary-100"

            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={`flex items-center px-4 py-2 whitespace-nowrap focus-visible-ring ${
                  activeCategory === category.id
                    ? `bg-${bgColorClass} text-${colorClass}`
                    : "text-gray-600 hover:text-primary-600"
                }`}
                aria-label={`Filter by ${category.label}`}
              >
                {Icon && (
                  <Icon className={`mr-2 h-4 w-4 ${activeCategory === category.id ? `text-${colorClass}` : ""}`} />
                )}
                {category.label}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
    </div>
  )
}
