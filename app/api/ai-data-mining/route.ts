import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// This function handles POST requests to /api/ai-data-mining
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { query, location = "India", sector } = body

    // Validate the request
    if (!query) {
      return NextResponse.json({ error: "Missing required query parameter" }, { status: 400 })
    }

    // Use AI to generate insights about the Indian job market
    const insights = await generateAIInsights(query, location, sector)

    // Get Indian job market data
    const marketData = await getIndianJobMarketData(sector)

    return NextResponse.json({
      insights,
      marketData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing AI data mining request:", error)
    return NextResponse.json({ error: "Failed to process AI data mining request" }, { status: 500 })
  }
}

// Function to generate AI insights using OpenAI
async function generateAIInsights(query: string, location: string, sector?: string) {
  try {
    // Use OpenAI to generate insights
    const prompt = `
      Generate detailed insights about the following career-related query in the Indian job market:
      
      Query: ${query}
      Location: ${location}
      ${sector ? `Sector: ${sector}` : ""}
      
      Please provide:
      1. Current job market trends in India for this query
      2. Salary ranges in Indian Rupees (₹)
      3. Skills in high demand
      4. Growth projections for the next 3-5 years
      5. Top companies hiring in India
      6. Regional differences in demand (e.g., Bangalore vs Mumbai vs Delhi)
      
      Format the response as JSON with the following structure:
      {
        "summary": "Brief summary of insights",
        "salaryRange": "Salary range in ₹",
        "demandLevel": "Current demand level",
        "growthProjection": "Growth projection percentage",
        "topSkills": ["skill1", "skill2", "skill3"],
        "topCompanies": ["company1", "company2", "company3"],
        "regionalInsights": {
          "bangalore": "Insight for Bangalore",
          "mumbai": "Insight for Mumbai",
          "delhi": "Insight for Delhi",
          "hyderabad": "Insight for Hyderabad",
          "pune": "Insight for Pune"
        }
      }
    `

    // For production, use the OpenAI API
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    // Parse the response as JSON
    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating AI insights:", error)

    // Fallback response if AI generation fails
    return {
      summary: "Unable to generate AI insights at this time. Please try again later.",
      salaryRange: "₹5,00,000 - ₹15,00,000",
      demandLevel: "Medium",
      growthProjection: "10-15%",
      topSkills: ["Problem Solving", "Communication", "Technical Skills"],
      topCompanies: ["TCS", "Infosys", "Wipro"],
      regionalInsights: {
        bangalore: "Tech hub with many opportunities",
        mumbai: "Financial center with diverse roles",
        delhi: "Government and private sector roles",
        hyderabad: "Growing tech center",
        pune: "Emerging tech and manufacturing hub",
      },
    }
  }
}

// Function to get Indian job market data
async function getIndianJobMarketData(sector?: string) {
  // Mock data for Indian job market
  const sectors = {
    technology: {
      growthRate: 18,
      topJobs: [
        { title: "Software Developer", demand: "Very High", avgSalary: 1200000 },
        { title: "Data Scientist", demand: "High", avgSalary: 1500000 },
        { title: "Cloud Architect", demand: "High", avgSalary: 2000000 },
        { title: "DevOps Engineer", demand: "High", avgSalary: 1800000 },
        { title: "Cybersecurity Analyst", demand: "Very High", avgSalary: 1600000 },
      ],
      topSkills: ["Cloud Computing", "AI/ML", "DevOps", "Cybersecurity", "JavaScript"],
      topCities: ["Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Chennai"],
      topEmployers: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra"],
    },
    healthcare: {
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
      topCities: ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata"],
      topEmployers: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Manipal Hospitals", "AIIMS"],
    },
    finance: {
      growthRate: 12,
      topJobs: [
        { title: "Financial Analyst", demand: "High", avgSalary: 1000000 },
        { title: "Investment Banker", demand: "Medium", avgSalary: 2000000 },
        { title: "Chartered Accountant", demand: "High", avgSalary: 1200000 },
        { title: "Risk Manager", demand: "High", avgSalary: 1500000 },
        { title: "Financial Planner", demand: "Medium", avgSalary: 900000 },
      ],
      topSkills: ["Financial Analysis", "Risk Management", "Investment Management", "Accounting", "Financial Modeling"],
      topCities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
      topEmployers: ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra Bank"],
    },
    education: {
      growthRate: 10,
      topJobs: [
        { title: "Teacher", demand: "High", avgSalary: 600000 },
        { title: "Professor", demand: "Medium", avgSalary: 1000000 },
        { title: "Educational Consultant", demand: "Medium", avgSalary: 800000 },
        { title: "Instructional Designer", demand: "Medium", avgSalary: 700000 },
        { title: "Education Administrator", demand: "Medium", avgSalary: 900000 },
      ],
      topSkills: [
        "Teaching",
        "Curriculum Development",
        "Educational Technology",
        "Student Assessment",
        "Classroom Management",
      ],
      topCities: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
      topEmployers: ["CBSE Schools", "ICSE Schools", "State Universities", "IITs", "IIMs"],
    },
    all: {
      growthRate: 14,
      topJobs: [
        { title: "Software Developer", demand: "Very High", avgSalary: 1200000 },
        { title: "Medical Officer", demand: "Very High", avgSalary: 1000000 },
        { title: "Data Scientist", demand: "High", avgSalary: 1500000 },
        { title: "Financial Analyst", demand: "High", avgSalary: 1000000 },
        { title: "Digital Marketing Specialist", demand: "High", avgSalary: 800000 },
      ],
      topSkills: ["Digital Literacy", "Data Analysis", "Communication", "Problem Solving", "Project Management"],
      topCities: ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"],
      topEmployers: ["TCS", "Infosys", "Wipro", "HCL", "Reliance"],
    },
  }

  // Get data for the requested sector or default to "all"
  const sectorData = sectors[sector as keyof typeof sectors] || sectors.all

  // Add Indian-specific information
  return {
    sector: sector === "all" ? "All Sectors" : sector,
    country: "India",
    currency: "INR (₹)",
    growthRate: sectorData.growthRate,
    topJobs: sectorData.topJobs.map((job) => ({
      ...job,
      avgSalary: formatIndianCurrency(job.avgSalary),
    })),
    topSkills: sectorData.topSkills,
    topCities: sectorData.topCities,
    topEmployers: sectorData.topEmployers,
    economicOutlook: "Positive with steady growth",
    lastUpdated: new Date().toISOString(),
  }
}

// Helper function to format currency in Indian format
function formatIndianCurrency(amount: number): string {
  // Convert to Indian format (e.g., 10,00,000)
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formatter.format(amount)
}
