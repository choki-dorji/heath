"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Bookmark, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock questions data
const questionsData = [
  {
    id: "q1",
    category: "diagnosis",
    question: "What tests are used to diagnose heart disease?",
    answer:
      "Several tests can be used to diagnose heart disease, including electrocardiograms (ECG/EKG), echocardiograms, stress tests, cardiac CT scans, and blood tests that check for certain enzymes or proteins that indicate heart damage. Your doctor will determine which tests are appropriate based on your symptoms and risk factors.",
    bookmarked: false,
  },
  {
    id: "q2",
    category: "treatments",
    question: "What are the common treatments for type 2 diabetes?",
    answer:
      "Common treatments for type 2 diabetes include lifestyle changes (diet, exercise, weight management), oral medications (like metformin), injectable medications (such as GLP-1 receptor agonists), and insulin therapy in some cases. Treatment plans are individualized based on blood sugar levels, overall health, and other factors.",
    bookmarked: false,
  },
  {
    id: "q3",
    category: "side-effects",
    question: "What are common side effects of blood pressure medications?",
    answer:
      "Common side effects of blood pressure medications can include dizziness, fatigue, headache, and swelling in the ankles. Different classes of blood pressure medications have different side effect profiles. ACE inhibitors may cause a dry cough, while calcium channel blockers might cause constipation. Always discuss any side effects with your healthcare provider.",
    bookmarked: false,
  },
  {
    id: "q4",
    category: "wellbeing",
    question: "How much physical activity is recommended for heart health?",
    answer:
      "For heart health, adults should aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, plus muscle-strengthening activities on 2 or more days per week. Even small amounts of physical activity are beneficial, and it's important to reduce sedentary time.",
    bookmarked: false,
  },
  {
    id: "q5",
    category: "diagnosis",
    question: "What symptoms might indicate a thyroid problem?",
    answer:
      "Symptoms that might indicate a thyroid problem include unexplained weight changes, fatigue, sensitivity to cold or heat, changes in heart rate, muscle weakness, sleep problems, and mood changes. Hypothyroidism (underactive thyroid) and hyperthyroidism (overactive thyroid) have different symptom patterns. Blood tests measuring thyroid hormone levels can help diagnose thyroid conditions.",
    bookmarked: false,
  },
]

export default function QuestionsList() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState(questionsData)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleBookmark = (id: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, bookmarked: !q.bookmarked } : q)))

    const question = questions.find((q) => q.id === id)

    if (question) {
      toast({
        title: question.bookmarked ? "Question removed from bookmarks" : "Question bookmarked",
        description: question.bookmarked
          ? "The question has been removed from your saved items."
          : "The question has been added to your saved items.",
      })
    }
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "diagnosis":
        return "category-badge-diagnosis"
      case "treatments":
        return "category-badge-treatment"
      case "side-effects":
        return "category-badge-side-effects"
      case "wellbeing":
        return "category-badge-wellbeing"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 focus-visible-ring"
          aria-label="Search questions"
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No questions found matching your search.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredQuestions.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border rounded-md mb-4 overflow-hidden shadow-sm hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`category-badge ${getCategoryBadgeClass(item.category)} mr-2`}>
                      {item.category}
                    </span>
                  </div>
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-1 h-8 w-8 shrink-0 focus-visible-ring"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleBookmark(item.id)
                  }}
                  aria-label={item.bookmarked ? "Remove bookmark" : "Bookmark question"}
                >
                  <Bookmark
                    className={`h-5 w-5 ${item.bookmarked ? "fill-primary-600 text-primary-600" : "text-gray-400"}`}
                  />
                  <span className="sr-only">{item.bookmarked ? "Remove bookmark" : "Bookmark question"}</span>
                </Button>
              </div>
              <AccordionContent className="px-4 pb-4 pt-0 text-gray-700">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
