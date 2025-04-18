"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, RefreshCw, Sparkles } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function JobTrendsChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI career assistant. Ask me about job trends, skills in demand, or career advice for the Indian market.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Generate AI response
      const prompt = `
        You are an AI career assistant specializing in the Indian job market. 
        Provide helpful, accurate, and concise information about job trends, skills in demand, 
        career paths, and professional development in India.
        
        User query: ${input}
        
        Respond with specific information about the Indian job market when relevant, including:
        - Salary ranges in Indian Rupees (₹)
        - Top companies in India for specific roles
        - Skills in high demand in the Indian market
        - Regional job market differences (e.g., Bangalore vs Mumbai vs Delhi)
        - Educational and certification paths relevant in India
        
        Keep responses concise, informative, and focused on providing actionable insights.
      `

      let responseText = ""

      try {
        // Try to use OpenAI if API key is available
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: prompt,
          maxTokens: 500,
        })
        responseText = text
      } catch (apiError) {
        console.error("OpenAI API error:", apiError)
        // Fallback response if API key is missing or API call fails
        responseText = generateFallbackResponse(input)
      }

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: responseText }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please try again later or check if the OpenAI API key is configured correctly.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to generate fallback responses when API is unavailable
  const generateFallbackResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase()

    // Check for common career-related questions and provide static responses
    if (lowercaseQuery.includes("data scientist") || lowercaseQuery.includes("data science")) {
      return `Data Science is one of the fastest-growing fields in India with a projected 35% annual growth rate. 
      
Top skills for data scientists in India include:
- Python programming
- Machine Learning algorithms
- SQL and database knowledge
- Data visualization (Tableau/Power BI)
- Statistical analysis

The salary range for data scientists in India is typically ₹6,00,000 - ₹20,00,000 for entry to mid-level positions, with senior roles commanding ₹20,00,000 - ₹40,00,000+.

Top companies hiring data scientists in India include:
- Amazon
- Microsoft
- Flipkart
- Mu Sigma
- TCS
- Wipro
- IBM India`
    }

    if (
      lowercaseQuery.includes("software") ||
      lowercaseQuery.includes("developer") ||
      lowercaseQuery.includes("engineer")
    ) {
      return `Software Engineering continues to be in high demand across India with a 25% annual growth rate.

The salary range for software engineers in India varies by location:
- Bangalore: ₹8,00,000 - ₹25,00,000
- Mumbai: ₹7,00,000 - ₹22,00,000
- Delhi NCR: ₹7,00,000 - ₹20,00,000
- Hyderabad: ₹7,50,000 - ₹23,00,000
- Pune: ₹6,50,000 - ₹19,00,000

Top skills in demand:
- Full-stack development
- Cloud technologies (AWS, Azure)
- React/Angular/Vue.js
- Node.js
- DevOps and CI/CD
- Microservices architecture

Major employers include TCS, Infosys, Wipro, HCL, Amazon, Microsoft, Google, and numerous startups.`
    }

    if (lowercaseQuery.includes("bangalore") || lowercaseQuery.includes("bengaluru")) {
      return `Bangalore (Bengaluru) is India's tech hub with the highest concentration of tech jobs and typically offers the highest salaries in the country.

Key industries: IT services, Product development, Startups, R&D centers

Top employers in Bangalore:
- Amazon
- Microsoft
- Google
- Flipkart
- Infosys
- Wipro
- IBM
- Intel
- Samsung R&D

Average tech salaries in Bangalore are 15-20% higher than other Indian cities, with software engineers earning ₹8,00,000 - ₹25,00,000 depending on experience and specialization.`
    }

    // Default response for other queries
    return `I'm currently operating in offline mode due to API configuration issues.

Here are some general insights about the Indian job market:

- The IT sector continues to be the largest employer for skilled professionals
- Emerging fields like AI, Data Science, and Cloud Computing show 30%+ annual growth
- Bangalore, Hyderabad, and Pune are the top tech hubs with the highest salaries
- Startups are creating numerous opportunities in fintech, edtech, and healthtech
- Remote work opportunities have increased by 40% since 2020

For more specific information, please try again later when the API connection is restored.`
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Job Trends Assistant
        </CardTitle>
        <CardDescription className="text-gray-200">
          Ask about career trends, skills, and opportunities in the Indian job market
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div
              className={`flex max-w-[80%] rounded-lg p-4 ${
                message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted text-foreground"
              }`}
            >
              <div className="mr-3 flex-shrink-0">
                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex max-w-[80%] rounded-lg p-4 bg-muted">
              <div className="mr-3">
                <Bot className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask about job trends, skills, or career advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
