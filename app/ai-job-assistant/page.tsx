"use client"

import Link from "next/link"
import { ArrowLeft, Cpu, Database, LineChart, Sparkles, Zap } from "lucide-react"

import { JobTrendsChatbot } from "@/components/job-trends-chatbot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TRLogo } from "@/components/tr-logo"
import { ContactButtons } from "@/components/contact-buttons"

export default function AIJobAssistantPage() {
  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-glow">AI Job Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Get personalized job insights and career advice powered by advanced AI
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <JobTrendsChatbot />
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-neon-blue-900 to-neon-purple-900 border-none shadow-neon-blue">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon-blue-400" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription className="text-gray-300">Advanced analysis of the Indian job market</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-200">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-neon-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Real-time job market trends and analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="h-5 w-5 text-neon-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Data from thousands of Indian companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <LineChart className="h-5 w-5 text-neon-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Salary insights across different regions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cpu className="h-5 w-5 text-neon-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Skill demand forecasting and recommendations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neon-purple-900 to-neon-blue-900 border-none shadow-neon-purple">
            <CardHeader>
              <CardTitle className="text-white">Example Questions</CardTitle>
              <CardDescription className="text-gray-300">Try asking our AI assistant about:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md bg-neon-purple-800/50 p-3 text-sm text-white">
                  What are the top skills for data scientists in India?
                </div>
                <div className="rounded-md bg-neon-purple-800/50 p-3 text-sm text-white">
                  How much do software engineers earn in Bangalore?
                </div>
                <div className="rounded-md bg-neon-purple-800/50 p-3 text-sm text-white">
                  What are the fastest growing tech careers in Mumbai?
                </div>
                <div className="rounded-md bg-neon-purple-800/50 p-3 text-sm text-white">
                  Which certifications are most valuable for cybersecurity in India?
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neon-blue-900 via-dark-900 to-neon-purple-900 border-none">
            <CardHeader>
              <CardTitle className="text-white">TR Career Predictor</CardTitle>
              <CardDescription className="text-gray-300">Powered by advanced AI technology</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <TRLogo width={120} height={120} className="mb-4" />
              <div className="mt-4">
                <ContactButtons variant="ghost" showLabels={false} className="justify-center" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
