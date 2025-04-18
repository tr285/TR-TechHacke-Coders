import { NextResponse } from "next/server"

// This function handles GET requests to /api/job-market
export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "global"
    const industry = searchParams.get("industry") || "all"

    // Fetch job market data
    const marketData = await getJobMarketData(location, industry)

    return NextResponse.json(marketData)
  } catch (error) {
    console.error("Error fetching job market data:", error)
    return NextResponse.json({ error: "Failed to fetch job market data" }, { status: 500 })
  }
}

// Function to get job market data
async function getJobMarketData(location: string, industry: string) {
  try {
    // For hackathon demo, you can use this mock data
    const industries = {
      technology: {
        growthRate: 15,
        topJobs: [
          { title: "Software Developer", demand: "Very High", avgSalary: 95000 },
          { title: "Data Scientist", demand: "High", avgSalary: 105000 },
          { title: "Cloud Architect", demand: "High", avgSalary: 120000 },
          { title: "DevOps Engineer", demand: "High", avgSalary: 110000 },
          { title: "Cybersecurity Analyst", demand: "Very High", avgSalary: 100000 },
        ],
        topSkills: ["Cloud Computing", "AI/ML", "DevOps", "Cybersecurity", "JavaScript"],
      },
      "indian-technology": {
        growthRate: 18,
        topJobs: [
          { title: "Software Developer", demand: "Very High", avgSalary: 1200000 },
          { title: "Data Scientist", demand: "High", avgSalary: 1500000 },
          { title: "Cloud Architect", demand: "High", avgSalary: 2000000 },
          { title: "DevOps Engineer", demand: "High", avgSalary: 1800000 },
          { title: "Cybersecurity Analyst", demand: "Very High", avgSalary: 1600000 },
        ],
        topSkills: ["Cloud Computing", "AI/ML", "DevOps", "Cybersecurity", "JavaScript"],
      },
      "indian-healthcare": {
        growthRate: 15,
        topJobs: [
          { title: "Medical Officer", demand: "Very High", avgSalary: 1000000 },
          { title: "Healthcare Administrator", demand: "High", avgSalary: 1200000 },
          { title: "Pharmacist", demand: "High", avgSalary: 800000 },
          { title: "Medical Technologist", demand: "Medium", avgSalary: 600000 },
          { title: "Nursing Specialist", demand: "High", avgSalary: 900000 },
        ],
        topSkills: [
          "Patient Care",
          "Medical Knowledge",
          "Healthcare Management",
          "Clinical Research",
          "Electronic Health Records",
        ],
      },
      "indian-finance": {
        growthRate: 12,
        topJobs: [
          { title: "Financial Analyst", demand: "High", avgSalary: 1000000 },
          { title: "Investment Banker", demand: "Medium", avgSalary: 2000000 },
          { title: "Chartered Accountant", demand: "High", avgSalary: 1200000 },
          { title: "Risk Manager", demand: "High", avgSalary: 1500000 },
          { title: "Financial Planner", demand: "Medium", avgSalary: 900000 },
        ],
        topSkills: [
          "Financial Analysis",
          "Risk Management",
          "Investment Management",
          "Accounting",
          "Financial Modeling",
        ],
      },
      "indian-all": {
        growthRate: 14,
        topJobs: [
          { title: "Software Developer", demand: "Very High", avgSalary: 1200000 },
          { title: "Medical Officer", demand: "Very High", avgSalary: 1000000 },
          { title: "Data Scientist", demand: "High", avgSalary: 1500000 },
          { title: "Financial Analyst", demand: "High", avgSalary: 1000000 },
          { title: "Digital Marketing Specialist", demand: "High", avgSalary: 800000 },
        ],
        topSkills: ["Digital Literacy", "Data Analysis", "Communication", "Problem Solving", "Project Management"],
      },
      healthcare: {
        growthRate: 18,
        topJobs: [
          { title: "Registered Nurse", demand: "Very High", avgSalary: 75000 },
          { title: "Healthcare Administrator", demand: "High", avgSalary: 85000 },
          { title: "Physical Therapist", demand: "High", avgSalary: 90000 },
          { title: "Medical Technologist", demand: "Medium", avgSalary: 65000 },
          { title: "Physician Assistant", demand: "High", avgSalary: 115000 },
        ],
        topSkills: [
          "Patient Care",
          "Electronic Health Records",
          "Medical Terminology",
          "Healthcare Management",
          "Clinical Research",
        ],
      },
      finance: {
        growthRate: 10,
        topJobs: [
          { title: "Financial Analyst", demand: "High", avgSalary: 85000 },
          { title: "Investment Banker", demand: "Medium", avgSalary: 120000 },
          { title: "Financial Advisor", demand: "Medium", avgSalary: 90000 },
          { title: "Risk Manager", demand: "High", avgSalary: 100000 },
          { title: "Accountant", demand: "Medium", avgSalary: 75000 },
        ],
        topSkills: [
          "Financial Analysis",
          "Risk Management",
          "Investment Management",
          "Accounting",
          "Financial Modeling",
        ],
      },
      all: {
        growthRate: 12,
        topJobs: [
          { title: "Software Developer", demand: "Very High", avgSalary: 95000 },
          { title: "Registered Nurse", demand: "Very High", avgSalary: 75000 },
          { title: "Data Scientist", demand: "High", avgSalary: 105000 },
          { title: "Financial Analyst", demand: "High", avgSalary: 85000 },
          { title: "Digital Marketing Specialist", demand: "High", avgSalary: 70000 },
        ],
        topSkills: ["Data Analysis", "Digital Literacy", "Project Management", "Communication", "Problem Solving"],
      },
    }

    // Get data for the requested industry or default to "all"
    const industryData = industries[industry as keyof typeof industries] || industries.all

    // Add location-specific information
    const locationInfo = getLocationInfo(location)

    // Check if this is an Indian industry
    const isIndianIndustry = industry.startsWith("indian-")
    const displayIndustry = isIndianIndustry ? industry.replace("indian-", "") : industry

    // Format salary based on region
    const formattedJobs = industryData.topJobs.map((job) => ({
      ...job,
      avgSalary: isIndianIndustry ? formatIndianCurrency(job.avgSalary) : `$${job.avgSalary.toLocaleString()}`,
    }))

    // Add top growing careers for the general trends
    const topGrowingCareers = [
      { title: "Data Scientist", growth: isIndianIndustry ? 35 : 31 },
      { title: "Software Developer", growth: isIndianIndustry ? 25 : 22 },
      { title: "Cybersecurity Analyst", growth: isIndianIndustry ? 30 : 33 },
      { title: "Healthcare Professional", growth: isIndianIndustry ? 18 : 16 },
      { title: "UX Designer", growth: isIndianIndustry ? 15 : 13 },
    ]

    // Add in-demand skills
    const inDemandSkills = isIndianIndustry
      ? [
          "Programming",
          "Data Analysis",
          "Cloud Computing",
          "Artificial Intelligence",
          "Digital Marketing",
          "Cybersecurity",
        ]
      : ["Data Analysis", "Digital Literacy", "Project Management", "Communication", "Problem Solving"]

    // Add industry outlook
    const industryOutlook = {
      technology: isIndianIndustry ? "Very Strong" : "Strong",
      healthcare: "Strong",
      finance: "Moderate",
      retail: "Changing",
      manufacturing: "Evolving",
    }

    return {
      industry: displayIndustry === "all" ? "All Industries" : displayIndustry,
      location: isIndianIndustry ? "India" : locationInfo.name,
      growthRate: industryData.growthRate,
      topJobs: formattedJobs,
      topSkills: industryData.topSkills,
      locationFactor: isIndianIndustry ? 1.0 : locationInfo.factor,
      demandTrend: "Increasing",
      currency: isIndianIndustry ? "INR (₹)" : "USD ($)",
      topGrowingCareers,
      inDemandSkills,
      industryOutlook,
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error getting job market data:", error)
    throw error
  }
}

// Function to get location information
function getLocationInfo(location: string) {
  // Simple mock function to return location-specific information
  const locations: Record<string, any> = {
    "san francisco": { name: "San Francisco, CA", factor: 1.5 },
    "new york": { name: "New York, NY", factor: 1.4 },
    austin: { name: "Austin, TX", factor: 1.1 },
    seattle: { name: "Seattle, WA", factor: 1.3 },
    chicago: { name: "Chicago, IL", factor: 1.1 },
    global: { name: "Global", factor: 1.0 },
  }

  // Find the closest matching location
  const normalizedLocation = location.toLowerCase()
  const matchedLocation = Object.keys(locations).find((loc) => normalizedLocation.includes(loc))

  return matchedLocation ? locations[matchedLocation] : { name: location, factor: 1.0 }
}

// Helper function to format currency in Indian format
function formatIndianCurrency(amount) {
  // Convert to Indian format (e.g., ₹10,00,000)
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formatter.format(amount)
}
