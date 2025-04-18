import { NextResponse } from "next/server"

// This function handles GET requests to /api/ai/insights
export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    // Validate the request
    if (!query) {
      return NextResponse.json({ error: "Missing required query parameter" }, { status: 400 })
    }

    // Generate mock insights based on the query
    const insights = generateMockInsights(query)

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error generating AI insights:", error)
    return NextResponse.json({ error: "Failed to generate AI insights" }, { status: 500 })
  }
}

// Function to generate mock insights
function generateMockInsights(query: string) {
  // Normalize query
  const normalizedQuery = query.toLowerCase()

  // Generate different insights based on query keywords
  let salaryRange = "₹8,00,000 - ₹15,00,000"
  let growthRate = 15
  let demandLevel = "High"

  if (
    normalizedQuery.includes("software") ||
    normalizedQuery.includes("developer") ||
    normalizedQuery.includes("engineer")
  ) {
    salaryRange = "₹10,00,000 - ₹25,00,000"
    growthRate = 22
    demandLevel = "Very High"
  } else if (
    normalizedQuery.includes("data") ||
    normalizedQuery.includes("scientist") ||
    normalizedQuery.includes("analyst")
  ) {
    salaryRange = "₹12,00,000 - ₹28,00,000"
    growthRate = 28
    demandLevel = "Very High"
  } else if (normalizedQuery.includes("design") || normalizedQuery.includes("ux") || normalizedQuery.includes("ui")) {
    salaryRange = "₹8,00,000 - ₹18,00,000"
    growthRate = 18
    demandLevel = "High"
  } else if (normalizedQuery.includes("market") || normalizedQuery.includes("sales")) {
    salaryRange = "₹6,00,000 - ₹15,00,000"
    growthRate = 12
    demandLevel = "Medium"
  } else if (normalizedQuery.includes("finance") || normalizedQuery.includes("account")) {
    salaryRange = "₹7,00,000 - ₹20,00,000"
    growthRate = 10
    demandLevel = "Medium"
  }

  // Generate mock data for charts
  const regionalDemand = {
    Bangalore: Math.floor(Math.random() * 1000) + 500,
    Mumbai: Math.floor(Math.random() * 800) + 300,
    "Delhi NCR": Math.floor(Math.random() * 700) + 300,
    Hyderabad: Math.floor(Math.random() * 600) + 200,
    Pune: Math.floor(Math.random() * 500) + 200,
  }

  const skillsDemand = {
    "Technical Skills": Math.floor(Math.random() * 100) + 50,
    Communication: Math.floor(Math.random() * 80) + 40,
    "Problem Solving": Math.floor(Math.random() * 70) + 40,
    Leadership: Math.floor(Math.random() * 60) + 30,
    Teamwork: Math.floor(Math.random() * 50) + 30,
  }

  const jobTypeDistribution = [
    { label: "Full-time", value: Math.floor(Math.random() * 70) + 30 },
    { label: "Contract", value: Math.floor(Math.random() * 30) + 10 },
    { label: "Part-time", value: Math.floor(Math.random() * 20) + 5 },
    { label: "Freelance", value: Math.floor(Math.random() * 15) + 5 },
  ]

  const experienceLevelDistribution = [
    { label: "Entry", value: Math.floor(Math.random() * 40) + 20 },
    { label: "Mid", value: Math.floor(Math.random() * 50) + 30 },
    { label: "Senior", value: Math.floor(Math.random() * 30) + 20 },
    { label: "Lead", value: Math.floor(Math.random() * 20) + 10 },
  ]

  const companySizeDistribution = [
    { label: "Startup", value: Math.floor(Math.random() * 30) + 10 },
    { label: "SMB", value: Math.floor(Math.random() * 40) + 20 },
    { label: "Mid-size", value: Math.floor(Math.random() * 50) + 30 },
    { label: "Enterprise", value: Math.floor(Math.random() * 40) + 20 },
  ]

  return {
    query,
    salaryRange,
    growthRate,
    demandLevel,
    regionalDemand,
    skillsDemand,
    jobTypeDistribution,
    experienceLevelDistribution,
    companySizeDistribution,
    timestamp: new Date().toISOString(),
  }
}
