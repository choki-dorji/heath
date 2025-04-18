import type { Metadata } from "next"
import MainLayout from "@/components/layouts/main-layout"
import QuestionCategories from "@/components/questions/question-categories"
import QuestionsList from "@/components/questions/questions-list"

export const metadata: Metadata = {
  title: "Health Questions | HealthCare Platform",
  description: "Browse through categorized health questions and expert answers",
}

export default function QuestionsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Health Questions</h1>
          <p className="text-gray-600 mb-8">
            Browse through our collection of health questions answered by healthcare professionals.
          </p>

          <QuestionCategories />
          <QuestionsList />
        </div>
      </div>
    </MainLayout>
  )
}
