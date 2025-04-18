import { NextResponse } from "next/server"

// This function handles POST requests to /api/career-prediction
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { academicPerformance, interests, location } = body

    // Validate the request
    if (!academicPerformance || !interests || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get job market data from external API
    const jobMarketData = await fetchJobMarketData(location)

    // Analyze skills based on interests and market trends
    const skillsAnalysis = analyzeSkills(interests, jobMarketData)

    // Generate career recommendations
    const careerRecommendations = generateCareerRecommendations(academicPerformance, interests, jobMarketData)

    // Generate upskilling routes
    const upskillingRoutes = generateUpskillingRoutes(careerRecommendations, skillsAnalysis)

    return NextResponse.json({
      careerRecommendations,
      skillsAnalysis,
      upskillingRoutes,
      marketTrends: jobMarketData.trends,
    })
  } catch (error) {
    console.error("Error processing career prediction:", error)
    return NextResponse.json({ error: "Failed to process career prediction" }, { status: 500 })
  }
}

// Function to fetch job market data from external API
async function fetchJobMarketData(location: string) {
  // REPLACE THIS: Integrate with a real job market API
  // Recommended API: RapidAPI's Job Market Data or LinkedIn API
  // API Key setup: Add your API key to .env.local as JOB_MARKET_API_KEY

  try {
    // For hackathon demo, you can use this mock data if API isn't set up yet
    return {
      trends: [
        { field: "Software Development", growth: 22, demandLevel: "High" },
        { field: "Data Science", growth: 28, demandLevel: "Very High" },
        { field: "UX/UI Design", growth: 15, demandLevel: "Medium" },
        { field: "Digital Marketing", growth: 18, demandLevel: "High" },
        { field: "Cybersecurity", growth: 32, demandLevel: "Very High" },
      ],
      topSkills: [
        "JavaScript",
        "Python",
        "Data Analysis",
        "Cloud Computing",
        "Machine Learning",
        "UI/UX",
        "Project Management",
      ],
      averageSalaries: {
        "Software Development": 95000,
        "Data Science": 105000,
        "UX/UI Design": 85000,
        "Digital Marketing": 75000,
        Cybersecurity: 110000,
      },
    }

    /* Uncomment and modify this code when you have your API key
    const apiKey = process.env.JOB_MARKET_API_KEY;
    if (!apiKey) {
      throw new Error("JOB_MARKET_API_KEY is not defined");
    }
    
    const response = await fetch(
      `https://api.example.com/job-market?location=${encodeURIComponent(location)}`,
      {
        headers: {
          "X-API-Key": apiKey
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error("Error fetching job market data:", error)
    throw error
  }
}

// Function to analyze skills based on interests and market trends
function analyzeSkills(interests: string[], jobMarketData: any) {
  // REPLACE THIS: Integrate with a skills analysis API
  // Recommended API: OpenAI API for skills matching or LinkedIn Skills API
  // API Key setup: Add your API key to .env.local as SKILLS_API_KEY

  // For hackathon demo, you can use this mock implementation
  const skillsMap: Record<string, string[]> = {
    programming: ["JavaScript", "Python", "Java", "React", "Node.js"],
    design: ["UI/UX", "Figma", "Adobe XD", "Graphic Design"],
    business: ["Project Management", "Marketing", "Sales", "Communication"],
    science: ["Data Analysis", "Research", "Statistics", "Machine Learning"],
    writing: ["Content Creation", "Copywriting", "Technical Writing"],
  }

  const relevantSkills: string[] = []
  interests.forEach((interest) => {
    const category = Object.keys(skillsMap).find((key) => interest.toLowerCase().includes(key))

    if (category) {
      relevantSkills.push(...skillsMap[category])
    }
  })

  // Match with market trends
  const inDemandSkills = relevantSkills.filter((skill) => jobMarketData.topSkills.includes(skill))

  return {
    relevantSkills: [...new Set(relevantSkills)],
    inDemandSkills: [...new Set(inDemandSkills)],
    skillGaps: jobMarketData.topSkills.filter((skill) => !relevantSkills.includes(skill)).slice(0, 5),
  }
}

// Function to generate career recommendations
function generateCareerRecommendations(academicPerformance: any, interests: string[], jobMarketData: any) {
  // REPLACE THIS: Integrate with a career recommendation API
  // Recommended API: OpenAI API for personalized recommendations
  // API Key setup: Add your API key to .env.local as OPENAI_API_KEY

  // For hackathon demo, you can use this mock implementation
  const careerFields = Object.keys(jobMarketData.averageSalaries)

  // Simple matching algorithm based on interests and market trends
  const matchedCareers = careerFields.map((field) => {
    // Calculate a simple match score
    let matchScore = 0

    // Check if any interest keywords match the field
    interests.forEach((interest) => {
      if (field.toLowerCase().includes(interest.toLowerCase())) {
        matchScore += 2
      }
    })

    // Add points for high growth fields
    const fieldTrend = jobMarketData.trends.find((trend: any) => trend.field === field)

    if (fieldTrend) {
      matchScore += fieldTrend.growth / 10
    }

    return {
      field,
      matchScore,
      salary: jobMarketData.averageSalaries[field],
      growthRate: fieldTrend?.growth || 0,
      demandLevel: fieldTrend?.demandLevel || "Medium",
    }
  })

  // Sort by match score and return top 3
  return matchedCareers.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)
}

// Function to generate upskilling routes
function generateUpskillingRoutes(careerRecommendations: any[], skillsAnalysis: any) {
  // REPLACE THIS: Integrate with a learning resources API
  // Recommended API: Coursera API, Udemy API, or edX API
  // API Key setup: Add your API key to .env.local as LEARNING_API_KEY

  // For hackathon demo, you can use this mock implementation
  return careerRecommendations.map((career) => {
    // Identify skills to develop for this career
    const skillsToLearn = skillsAnalysis.skillGaps.slice(0, 3)

    return {
      careerField: career.field,
      requiredSkills: skillsToLearn,
      learningPaths: skillsToLearn.map((skill) => ({
        skill,
        resources: [
          {
            type: "Course",
            name: `Introduction to ${skill}`,
            provider: "Coursera",
            duration: "4 weeks",
            url: `https://www.coursera.org/search?query=${encodeURIComponent(skill)}`,
          },
          {
            type: "Tutorial",
            name: `${skill} for Beginners`,
            provider: "YouTube",
            duration: "2 hours",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill)}+tutorial`,
          },
        ],
      })),
    }
  })
}
