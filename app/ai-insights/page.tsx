"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Import the chart components
import { AreaChart } from "@/components/area-chart"
import { BarChart } from "@/components/bar-chart"
import { DoughnutChart } from "@/components/doughnut-chart"
import { SalaryComparisonChart } from "@/components/salary-comparison-chart"

export default function AIInsightsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInsights = async () => {
      if (!query) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/ai/insights?q=${encodeURIComponent(query)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setInsights(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/ai-insights?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold">AI-Powered Career Insights</h1>
        <p className="mt-2 text-muted-foreground">
          Get detailed insights about careers in the Indian job market using our AI data mining technology.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Career Insights</CardTitle>
          <CardDescription>Enter a job title, skill, or industry to get AI-generated insights</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="e.g., Software Developer, Data Science, UX Design"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : <Search className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      ) : insights ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Insights for "{query}"</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Salary Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{insights.salaryRange}</div>
                  <p className="text-sm text-muted-foreground mt-1">Annual salary in India</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{insights.growthRate}%</div>
                  <p className="text-sm text-muted-foreground mt-1">Annual growth in job postings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Demand Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{insights.demandLevel}</div>
                  <p className="text-sm text-muted-foreground mt-1">Current market demand</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Regional Demand</CardTitle>
                <CardDescription>Job opportunities by city</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.regionalDemand &&
                    Object.entries(insights.regionalDemand).map(([region, count]) => (
                      <div key={region} className="flex justify-between items-center">
                        <Badge variant="outline">{region}</Badge>
                        <span className="text-sm font-medium">{count} jobs</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Demand</CardTitle>
                <CardDescription>Most valued skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.skillsDemand &&
                    Object.entries(insights.skillsDemand).map(([skill, count]) => (
                      <div key={skill} className="flex justify-between items-center">
                        <Badge variant="outline">{skill}</Badge>
                        <span className="text-sm font-medium">{count} mentions</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Type Distribution</CardTitle>
                <CardDescription>Types of employment</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                {insights.jobTypeDistribution && <DoughnutChart data={insights.jobTypeDistribution} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Level</CardTitle>
                <CardDescription>Jobs by experience requirement</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                {insights.experienceLevelDistribution && <BarChart data={insights.experienceLevelDistribution} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Size</CardTitle>
                <CardDescription>Jobs by company size</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                {insights.companySizeDistribution && <AreaChart data={insights.companySizeDistribution} />}
              </CardContent>
            </Card>
          </div>

          <SalaryComparisonChart
            data={[
              {
                role: "Entry Level",
                salary: Math.round(Number.parseInt(insights.salaryRange.replace(/[^\d]/g, "")) / 100000) * 0.7,
                color: "#4f46e5",
              },
              {
                role: "Mid Level",
                salary: Math.round(Number.parseInt(insights.salaryRange.replace(/[^\d]/g, "")) / 100000),
                color: "#7c3aed",
              },
              {
                role: "Senior Level",
                salary: Math.round(Number.parseInt(insights.salaryRange.replace(/[^\d]/g, "")) / 100000) * 1.5,
                color: "#8b5cf6",
              },
              {
                role: "Lead",
                salary: Math.round(Number.parseInt(insights.salaryRange.replace(/[^\d]/g, "")) / 100000) * 2,
                color: "#a855f7",
              },
              {
                role: "Director",
                salary: Math.round(Number.parseInt(insights.salaryRange.replace(/[^\d]/g, "")) / 100000) * 3,
                color: "#d946ef",
              },
            ]}
            title="Career Progression Salary Trends"
            description="Estimated salary by experience level in ₹ lakhs per annum"
          />
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Enter a job title, skill, or industry in the search box above to get AI-powered insights.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
