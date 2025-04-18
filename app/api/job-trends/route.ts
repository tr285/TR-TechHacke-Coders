import { NextResponse } from "next/server"

// This function handles GET requests to /api/job-trends
export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const career = searchParams.get("career") || ""

    // Get job market trends
    const trends = getJobMarketTrends(career)

    return NextResponse.json(trends)
  } catch (error) {
    console.error("Error fetching job trends:", error)
    return NextResponse.json({ error: "Failed to fetch job trends" }, { status: 500 })
  }
}

// Function to get job market trends
function getJobMarketTrends(career) {
  // Simple database of job market trends
  const allTrends = {
    "Software Developer": {
      growth: 22,
      demand: "Very High",
      topSkills: ["JavaScript", "React", "Node.js", "Python", "Cloud Computing"],
      topLocations: ["San Francisco", "Seattle", "New York", "Austin", "Boston"],
      averageSalary: "$95,000",
      outlook:
        "The demand for software developers is expected to grow 22% by 2030, much faster than average. Remote work opportunities are abundant.",
    },
    "Data Scientist": {
      growth: 31,
      demand: "Very High",
      topSkills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
      topLocations: ["San Francisco", "New York", "Seattle", "Boston", "Chicago"],
      averageSalary: "$105,000",
      outlook:
        "Data science is one of the fastest-growing fields with a projected 31% growth by 2030. Companies across all industries are seeking data professionals.",
    },
    "UX Designer": {
      growth: 13,
      demand: "High",
      topSkills: ["User Research", "Wireframing", "Figma", "Adobe XD", "Prototyping"],
      topLocations: ["San Francisco", "New York", "Seattle", "Austin", "Los Angeles"],
      averageSalary: "$85,000",
      outlook:
        "UX design continues to grow in importance as companies focus on user experience. The field is projected to grow 13% by 2030.",
    },
    "Digital Marketer": {
      growth: 10,
      demand: "Medium",
      topSkills: ["Social Media", "SEO", "Content Marketing", "Analytics", "Email Marketing"],
      topLocations: ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami"],
      averageSalary: "$75,000",
      outlook:
        "Digital marketing continues to evolve with new platforms and technologies. The field is projected to grow 10% by 2030.",
    },
    "Project Manager": {
      growth: 8,
      demand: "Medium",
      topSkills: ["Agile", "Scrum", "Communication", "Leadership", "Risk Management"],
      topLocations: ["New York", "Chicago", "San Francisco", "Atlanta", "Dallas"],
      averageSalary: "$90,000",
      outlook: "Project management remains important across industries with a steady growth projection of 8% by 2030.",
    },
    "indian-Software Developer": {
      growth: 25,
      demand: "Very High",
      topSkills: ["JavaScript", "React", "Node.js", "Python", "Cloud Computing"],
      topLocations: ["Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Chennai"],
      averageSalary: "₹12,00,000",
      outlook:
        "The demand for software developers in India is growing rapidly with a 25% annual increase. Major tech hubs like Bangalore and Hyderabad offer numerous opportunities.",
    },
    "indian-Data Scientist": {
      growth: 35,
      demand: "Very High",
      topSkills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
      topLocations: ["Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Mumbai"],
      averageSalary: "₹15,00,000",
      outlook:
        "Data science is one of the fastest-growing fields in India with a projected 35% growth. Companies across all industries are seeking data professionals.",
    },
  }

  // If a specific career is requested, return its trends
  if (career && allTrends[career]) {
    return {
      career: career.replace("indian-", ""),
      ...allTrends[career],
      timestamp: new Date().toISOString(),
    }
  }

  // Otherwise, return general trends for all careers
  return {
    topGrowingCareers: [
      { title: "Data Scientist", growth: 31 },
      { title: "Software Developer", growth: 22 },
      { title: "Cybersecurity Analyst", growth: 33 },
      { title: "Healthcare Professional", growth: 16 },
      { title: "UX Designer", growth: 13 },
    ],
    inDemandSkills: [
      "Programming",
      "Data Analysis",
      "Cloud Computing",
      "Artificial Intelligence",
      "Digital Marketing",
      "Cybersecurity",
    ],
    industryOutlook: {
      technology: "Very Strong",
      healthcare: "Strong",
      finance: "Moderate",
      retail: "Changing",
      manufacturing: "Evolving",
    },
    timestamp: new Date().toISOString(),
  }
}
