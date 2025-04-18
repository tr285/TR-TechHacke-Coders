"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Briefcase, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [formData, setFormData] = useState({
    interests: "",
    skills: "",
    education: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Convert comma-separated strings to arrays
      const interests = formData.interests.split(",").map((item) => item.trim())
      const skills = formData.skills.split(",").map((item) => item.trim())
      const education = formData.education
      const location = "India" // Set default location to India

      // Call the API
      const response = await fetch("/api/predict-career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interests,
          skills,
          education,
          location,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to predict career")
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
      // You could set an error state here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Career Path Prediction</h1>
        <p className="mt-2 text-muted-foreground">Enter your information to get personalized career recommendations.</p>
      </div>

      {!results ? (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Tell us about your interests, skills, and educational background for the Indian job market.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  name="interests"
                  placeholder="Enter your interests separated by commas (e.g., technology, problem solving, creativity)"
                  value={formData.interests}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="Enter your skills separated by commas (e.g., javascript, html, design)"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  name="education"
                  placeholder="Enter your field of study (e.g., Computer Science)"
                  value={formData.education}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select defaultValue="India">
                  <SelectTrigger id="location">
                    <SelectValue placeholder="India" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi NCR</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Analyzing..." : "Predict Career Paths"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="space-y-8">
          <Tabs defaultValue="recommendations">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommendations">
                <Briefcase className="mr-2 h-4 w-4" />
                Career Recommendations
              </TabsTrigger>
              <TabsTrigger value="skills">
                <GraduationCap className="mr-2 h-4 w-4" />
                Skill Gaps & Learning
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recommendations" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.recommendations.map((career, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>{career.title}</CardTitle>
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {career.matchScore}/10 Match
                        </div>
                      </div>
                      <CardDescription>{career.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-1 text-sm font-medium">Average Salary</h4>
                          <p className="text-sm text-muted-foreground">{career.averageSalary}</p>
                        </div>
                        <div>
                          <h4 className="mb-1 text-sm font-medium">Growth Outlook</h4>
                          <p className="text-sm text-muted-foreground">{career.growthOutlook}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(`/trends?career=${encodeURIComponent(career.title)}`, "_blank")}
                        >
                          View Job Trends
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="skills" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {results.skillGaps.map((gap, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Skills for {gap.careerTitle}</CardTitle>
                      <CardDescription>Skills you need to develop for this career</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Missing Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {gap.missingSkills.map((skill, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Learning Resources</h4>
                          {gap.learningPaths.map((path, i) => (
                            <div key={i} className="space-y-2">
                              <h5 className="text-sm font-medium flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                {path.skill}
                              </h5>
                              <div className="space-y-2 pl-6">
                                {path.resources.map((resource, j) => (
                                  <div key={j} className="text-sm">
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      {resource.name} ({resource.provider})
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setResults(null)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button onClick={() => window.print()}>Save Results</Button>
          </div>
        </div>
      )}
    </div>
  )
}
