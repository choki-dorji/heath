import { AvatarFallback } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MainLayout from "@/components/layouts/main-layout"
import { ArrowRight, CheckCircle, Heart, Shield, Activity, Calendar, Pill, Users } from "lucide-react"

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Your Health Journey, <span className="text-primary-600">Simplified</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Access personalized care plans, expert answers to your health questions, and manage your ONCANA
                journey all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 focus-visible-ring">
                  <Link href="/questions">
                    Explore Questions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="focus-visible-ring">
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block animate-slideIn">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-wellness-100 dark:bg-wellness-900 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full"></div>
                <img
                  src="/banner.jpg?height=400&width=500"
                  alt="ONCANA platform illustration"
                  className="rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">How We Help You</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides the tools you need to manage your health effectively and stay informed about your
              care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-wellness-100 dark:bg-wellness-900">
                <CheckCircle className="h-6 w-6 text-wellness-600 dark:text-wellness-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Expert Q&A</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through categorized health questions and answers from ONCANA professionals.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-care-100 dark:bg-care-900">
                <Heart className="h-6 w-6 text-care-600 dark:text-care-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Personalized Care Plans</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and manage customized care plans tailored to your specific health needs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-purple-100 dark:bg-purple-900">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Secure Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep track of your saved questions and care plans in a secure, private dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Comprehensive Health Management</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to stay on top of your health, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-treatment-100 dark:bg-treatment-900 w-10 h-10">
                <Activity className="h-5 w-5 text-treatment-600 dark:text-treatment-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Health Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitor vital signs and health metrics to track your progress over time.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-teal-100 dark:bg-teal-900 w-10 h-10">
                <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Appointment Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Never miss an important doctor's appointment with our reminder system.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-alert-100 dark:bg-alert-900 w-10 h-10">
                <Pill className="h-5 w-5 text-alert-600 dark:text-alert-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Medication Management</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Keep track of your medications, dosages, and schedules all in one place.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-card border border-gray-100 dark:border-gray-700 card-hover">
              <div className="feature-icon-container bg-purple-100 dark:bg-purple-900 w-10 h-10">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Caregiver Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Share your health information securely with family members and caregivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have simplified their ONCANA journey.
          </p>
          <Button asChild size="lg" variant="secondary" className="focus-visible-ring">
            <Link href="/auth/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from people who have transformed their ONCANA experience with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-card border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "This platform has made managing my diabetes so much easier. I can track my medications, share my care
                plan with my doctor, and find answers to my questions all in one place."
              </p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">CD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium dark:text-white">Choki Dorji</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-card border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "As a caregiver for my mother, this tool has been invaluable. I can keep all her health information
                organized and easily share it with her ONCANA providers."
              </p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-wellness-100 dark:bg-wellness-900 text-wellness-700 dark:text-wellness-300">DW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium dark:text-white">Doeji wangmo</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-card border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The Q&A section has been so helpful for understanding my treatment options. It's like having a medical
                reference library at my fingertips."
              </p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">PK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium dark:text-white">Pema Khandu</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
