"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, MapPin, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TrendsPage() {
  const searchParams = useSearchParams()
  const initialCareer = searchParams.get("career") || ""

  const [career, setCareer] = useState(initialCareer)
  const [searchCareer, setSearchCareer] = useState(initialCareer)
  const [isLoading, setIsLoading] = useState(false)
  const [trends, setTrends] = useState(null)
  const [generalTrends, setGeneralTrends] = useState(null)
  const [region, setRegion] = useState("india")

  // Fetch general trends on page load
  useEffect(() => {
    const fetchGeneralTrends = async () => {
      try {
        // Use indian-all for Indian trends
        const industryPrefix = region === "india" ? "indian-" : ""
        const response = await fetch(`/api/job-market?industry=${industryPrefix}all`)
        if (!response.ok) {
          throw new Error("Failed to fetch general trends")
        }
        const data = await response.json()
        setGeneralTrends(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchGeneralTrends()
  }, [region])

  // Fetch specific career trends if initial career is provided
  useEffect(() => {
    if (initialCareer) {
      fetchCareerTrends(initialCareer)
    }
  }, [initialCareer])

  const fetchCareerTrends = async (careerName) => {
    setIsLoading(true)
    try {
      // Add indian- prefix for Indian industries
      const industryPrefix = region === "india" ? "indian-" : ""
      const response = await fetch(`/api/job-trends?career=${encodeURIComponent(industryPrefix + careerName)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch career trends")
      }
      const data = await response.json()
      setTrends(data)
      setCareer(careerName)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchCareer.trim()) {
      fetchCareerTrends(searchCareer)
    }
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Job Market Trends</h1>
        <p className="mt-2 text-muted-foreground">Explore current job market trends and career-specific information.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Career Trends</CardTitle>
          <CardDescription>Enter a career title to see specific trends</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <Select defaultValue="india" onValueChange={(value) => setRegion(value)}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="e.g., Software Developer"
                  value={searchCareer}
                  onChange={(e) => setSearchCareer(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {trends && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{trends.career} Trends</CardTitle>
            <CardDescription>Current market information for this career</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Growth Rate</Label>
                    <span className="text-sm font-medium">{trends.growthRate}%</span>
                  </div>
                  <Progress value={trends.growthRate} className="h-2" />
                </div>
                <div>
                  <Label className="mb-2 block">Demand Level</Label>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>{trends.demand}</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Average Salary</Label>
                  <div className="text-lg font-medium">{trends.averageSalary}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Top Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {trends.topSkills &&
                      trends.topSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Top Locations</Label>
                  <div className="space-y-2">
                    {trends.topLocations &&
                      trends.topLocations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {location}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Label className="mb-2 block">Outlook</Label>
              <p className="text-muted-foreground">{trends.outlook}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {generalTrends && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Growing Careers</CardTitle>
              <CardDescription>Careers with the highest projected growth rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generalTrends.topGrowingCareers &&
                  generalTrends.topGrowingCareers.map((career, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{career.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{career.growth}% growth</span>
                        <Progress value={career.growth} className="h-2 w-[100px]" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-Demand Skills</CardTitle>
              <CardDescription>Skills that employers are looking for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {generalTrends.inDemandSkills &&
                  generalTrends.inDemandSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry Outlook</CardTitle>
              <CardDescription>Current outlook for major industries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generalTrends.industryOutlook &&
                  Object.entries(generalTrends.industryOutlook).map(([industry, outlook], index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="capitalize">{industry}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          outlook === "Very Strong" || outlook === "Strong"
                            ? "bg-green-100 text-green-800"
                            : outlook === "Moderate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {outlook}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
