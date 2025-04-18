import { NextResponse } from "next/server"

// This function handles POST requests to /api/career-path
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { academicBackground, interests, skills, personalityTraits, location } = body

    // Validate the request
    if (!academicBackground || !interests || !skills) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate career paths
    const careerPaths = await generateCareerPaths(academicBackground, interests, skills, personalityTraits, location)

    return NextResponse.json({
      careerPaths,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error generating career paths:", error)
    return NextResponse.json({ error: "Failed to generate career paths" }, { status: 500 })
  }
}

// Function to generate career paths
async function generateCareerPaths(
  academicBackground: any,
  interests: string[],
  skills: string[],
  personalityTraits: string[] = [],
  location = "global",
) {
  // REPLACE THIS: Integrate with an AI API for personalized career path generation
  // Recommended API: OpenAI API or similar AI service
  // API Key setup: Add your API key to .env.local as OPENAI_API_KEY

  try {
    // For hackathon demo, you can use this mock implementation

    // Define career clusters based on interests and skills
    const careerClusters = {
      technology: {
        paths: [
          {
            title: "Software Development",
            roles: ["Junior Developer", "Software Engineer", "Senior Developer", "Tech Lead", "CTO"],
            requiredSkills: ["Programming", "Problem Solving", "Version Control", "Testing"],
            educationPath: ["Computer Science Degree", "Coding Bootcamp", "Online Courses"],
            salaryRange: "$70,000 - $150,000+",
            growthOutlook: "Very High",
          },
          {
            title: "Data Science",
            roles: ["Data Analyst", "Data Scientist", "Machine Learning Engineer", "AI Specialist"],
            requiredSkills: ["Statistics", "Python", "Machine Learning", "Data Visualization"],
            educationPath: ["Statistics/Math Degree", "Data Science Bootcamp", "Online Specializations"],
            salaryRange: "$80,000 - $160,000+",
            growthOutlook: "Very High",
          },
          {
            title: "Cybersecurity",
            roles: ["Security Analyst", "Penetration Tester", "Security Engineer", "CISO"],
            requiredSkills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Security Tools"],
            educationPath: ["Computer Science Degree", "Security Certifications", "Specialized Training"],
            salaryRange: "$85,000 - $170,000+",
            growthOutlook: "Very High",
          },
        ],
      },
      business: {
        paths: [
          {
            title: "Marketing",
            roles: ["Marketing Coordinator", "Marketing Manager", "Digital Marketing Specialist", "CMO"],
            requiredSkills: ["Communication", "Analytics", "Social Media", "Content Creation"],
            educationPath: ["Marketing Degree", "Business Administration", "Digital Marketing Certifications"],
            salaryRange: "$50,000 - $140,000+",
            growthOutlook: "High",
          },
          {
            title: "Finance",
            roles: ["Financial Analyst", "Investment Banker", "Financial Advisor", "CFO"],
            requiredSkills: ["Financial Analysis", "Excel", "Accounting", "Risk Management"],
            educationPath: ["Finance/Accounting Degree", "MBA", "CFA Certification"],
            salaryRange: "$65,000 - $180,000+",
            growthOutlook: "Medium",
          },
          {
            title: "Project Management",
            roles: ["Project Coordinator", "Project Manager", "Program Manager", "Director of Operations"],
            requiredSkills: ["Organization", "Leadership", "Communication", "Risk Management"],
            educationPath: ["Business Degree", "PMP Certification", "Agile/Scrum Certifications"],
            salaryRange: "$60,000 - $150,000+",
            growthOutlook: "High",
          },
        ],
      },
      healthcare: {
        paths: [
          {
            title: "Nursing",
            roles: ["Registered Nurse", "Nurse Practitioner", "Nurse Manager", "Chief Nursing Officer"],
            requiredSkills: ["Patient Care", "Medical Knowledge", "Communication", "Critical Thinking"],
            educationPath: ["Nursing Degree", "Advanced Practice Degrees", "Specialization Certifications"],
            salaryRange: "$70,000 - $120,000+",
            growthOutlook: "Very High",
          },
          {
            title: "Healthcare Administration",
            roles: ["Administrative Assistant", "Department Manager", "Hospital Administrator", "CEO"],
            requiredSkills: ["Organization", "Leadership", "Healthcare Knowledge", "Business Acumen"],
            educationPath: ["Healthcare Administration Degree", "MBA in Healthcare", "Certifications"],
            salaryRange: "$60,000 - $200,000+",
            growthOutlook: "High",
          },
          {
            title: "Health Informatics",
            roles: ["Health Information Technician", "Clinical Informatics Specialist", "Health Informatics Director"],
            requiredSkills: ["Healthcare Knowledge", "Data Analysis", "IT Skills", "EHR Systems"],
            educationPath: ["Health Informatics Degree", "IT with Healthcare Focus", "Certifications"],
            salaryRange: "$65,000 - $130,000+",
            growthOutlook: "High",
          },
        ],
      },
      creative: {
        paths: [
          {
            title: "Graphic Design",
            roles: ["Junior Designer", "Graphic Designer", "Senior Designer", "Creative Director"],
            requiredSkills: ["Design Software", "Typography", "Color Theory", "Visual Communication"],
            educationPath: ["Design Degree", "Portfolio School", "Self-taught with Strong Portfolio"],
            salaryRange: "$45,000 - $120,000+",
            growthOutlook: "Medium",
          },
          {
            title: "UX/UI Design",
            roles: ["UX Researcher", "UI Designer", "UX/UI Designer", "UX Director"],
            requiredSkills: ["User Research", "Wireframing", "Prototyping", "Design Thinking"],
            educationPath: ["Design Degree", "UX Bootcamp", "HCI Courses"],
            salaryRange: "$70,000 - $150,000+",
            growthOutlook: "High",
          },
          {
            title: "Content Creation",
            roles: ["Content Writer", "Content Strategist", "Content Marketing Manager", "Editorial Director"],
            requiredSkills: ["Writing", "Editing", "SEO", "Content Strategy"],
            educationPath: ["Communications/English Degree", "Marketing Courses", "Writing Workshops"],
            salaryRange: "$50,000 - $120,000+",
            growthOutlook: "Medium",
          },
        ],
      },
    }

    // Match interests to career clusters
    const matchedClusters: string[] = []

    interests.forEach((interest) => {
      if (
        interest.toLowerCase().includes("tech") ||
        interest.toLowerCase().includes("program") ||
        interest.toLowerCase().includes("data")
      ) {
        matchedClusters.push("technology")
      }
      if (
        interest.toLowerCase().includes("business") ||
        interest.toLowerCase().includes("market") ||
        interest.toLowerCase().includes("finance")
      ) {
        matchedClusters.push("business")
      }
      if (
        interest.toLowerCase().includes("health") ||
        interest.toLowerCase().includes("care") ||
        interest.toLowerCase().includes("medical")
      ) {
        matchedClusters.push("healthcare")
      }
      if (
        interest.toLowerCase().includes("design") ||
        interest.toLowerCase().includes("art") ||
        interest.toLowerCase().includes("creat")
      ) {
        matchedClusters.push("creative")
      }
    })

    // If no matches, include all clusters
    const uniqueClusters = [...new Set(matchedClusters)]
    const clustersToUse = uniqueClusters.length > 0 ? uniqueClusters : Object.keys(careerClusters)

    // Get career paths from matched clusters
    let allPaths: any[] = []

    clustersToUse.forEach((cluster) => {
      if (careerClusters[cluster as keyof typeof careerClusters]) {
        allPaths = [...allPaths, ...careerClusters[cluster as keyof typeof careerClusters].paths]
      }
    })

    // Score paths based on skills match
    const scoredPaths = allPaths.map((path) => {
      let score = 0

      // Score based on skills match
      path.requiredSkills.forEach((skill: string) => {
        if (skills.some((userSkill) => userSkill.toLowerCase().includes(skill.toLowerCase()))) {
          score += 2
        }
      })

      // Score based on academic background match
      const academicLevel = academicBackground.level || ""
      if (
        path.educationPath.some(
          (edu: string) =>
            academicBackground.field && edu.toLowerCase().includes(academicBackground.field.toLowerCase()),
        )
      ) {
        score += 3
      }

      // Adjust for personality traits if provided
      if (personalityTraits && personalityTraits.length > 0) {
        const personalityMatch = getPersonalityMatch(path.title, personalityTraits)
        score += personalityMatch
      }

      return {
        ...path,
        matchScore: score,
      }
    })

    // Sort by score and return top 3
    const topPaths = scoredPaths.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)

    // Add learning path and next steps
    return topPaths.map((path) => ({
      ...path,
      learningPath: generateLearningPath(path, skills),
      nextSteps: generateNextSteps(path, academicBackground),
      locationSpecific: getLocationSpecificInfo(path, location),
    }))

    /* Uncomment and modify this code when you have your API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not defined");
    }
    
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a career counselor AI that provides personalized career path recommendations."
            },
            {
              role: "user",
              content: `Generate career path recommendations based on the following information:
                Academic Background: ${JSON.stringify(academicBackground)}
                Interests: ${interests.join(", ")}
                Skills: ${skills.join(", ")}
                Personality Traits: ${personalityTraits ? personalityTraits.join(", ") : "Not provided"}
                Location: ${location || "Global"}
                
                For each career path, include:
                - Title
                - Progression of roles
                - Required skills
                - Education path
                - Salary range
                - Growth outlook
                - Learning path
                - Next steps
                - Location-specific information`
            }
          ]
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
    */
  } catch (error) {
    console.error("Error generating career paths:", error)
    throw error
  }
}

// Helper function to get personality match score
function getPersonalityMatch(careerTitle: string, personalityTraits: string[]) {
  // Simple mapping of careers to personality traits
  const careerPersonalityMap: Record<string, string[]> = {
    "Software Development": ["analytical", "logical", "problem-solver", "detail-oriented"],
    "Data Science": ["analytical", "curious", "detail-oriented", "logical"],
    Cybersecurity: ["detail-oriented", "vigilant", "analytical", "ethical"],
    Marketing: ["creative", "outgoing", "persuasive", "strategic"],
    Finance: ["analytical", "detail-oriented", "logical", "risk-aware"],
    "Project Management": ["organized", "leadership", "communicative", "strategic"],
    Nursing: ["empathetic", "detail-oriented", "calm", "communicative"],
    "Healthcare Administration": ["organized", "leadership", "analytical", "communicative"],
    "Health Informatics": ["analytical", "detail-oriented", "technical", "organized"],
    "Graphic Design": ["creative", "visual", "detail-oriented", "artistic"],
    "UX/UI Design": ["empathetic", "creative", "analytical", "user-focused"],
    "Content Creation": ["creative", "communicative", "detail-oriented", "curious"],
  }

  // Get traits for this career
  const careerTraits = careerPersonalityMap[careerTitle] || []

  // Count matches
  let matchCount = 0
  personalityTraits.forEach((trait) => {
    if (careerTraits.some((careerTrait) => trait.toLowerCase().includes(careerTrait.toLowerCase()))) {
      matchCount++
    }
  })

  // Return score based on matches (0-3)
  return Math.min(3, matchCount)
}

// Helper function to generate learning path
function generateLearningPath(careerPath: any, userSkills: string[]) {
  // Identify skills gaps
  const skillsGap = careerPath.requiredSkills.filter(
    (skill: string) => !userSkills.some((userSkill) => userSkill.toLowerCase().includes(skill.toLowerCase())),
  )

  // Generate learning resources for each skill gap
  return skillsGap.map((skill: string) => ({
    skill,
    resources: [
      {
        type: "Course",
        name: `${skill} Fundamentals`,
        provider: "Coursera",
        duration: "4-6 weeks",
        url: `https://www.coursera.org/search?query=${encodeURIComponent(skill)}`,
      },
      {
        type: "Book",
        name: `Essential ${skill}`,
        author: "Various",
        url: `https://www.amazon.com/s?k=${encodeURIComponent(skill)}+career+book`,
      },
      {
        type: "Community",
        name: `${skill} Professional Network`,
        platform: "LinkedIn Groups",
        url: "https://www.linkedin.com/groups/",
      },
    ],
  }))
}

// Helper function to generate next steps
function generateNextSteps(careerPath: any, academicBackground: any) {
  const steps = []

  // Check if education needs to be completed
  const educationNeeded = careerPath.educationPath[0]
  const hasRequiredEducation =
    academicBackground.field &&
    careerPath.educationPath.some((edu: string) => edu.toLowerCase().includes(academicBackground.field.toLowerCase()))

  if (!hasRequiredEducation) {
    steps.push({
      type: "Education",
      description: `Consider pursuing ${educationNeeded}`,
      timeframe: "1-4 years",
      priority: "High",
    })
  }

  // Add skill development
  steps.push({
    type: "Skill Development",
    description: `Develop key skills in ${careerPath.requiredSkills.join(", ")}`,
    timeframe: "3-12 months",
    priority: "High",
  })

  // Add networking
  steps.push({
    type: "Networking",
    description: `Connect with professionals in ${careerPath.title} field`,
    timeframe: "Ongoing",
    priority: "Medium",
  })

  // Add entry-level position
  steps.push({
    type: "Job Search",
    description: `Apply for ${careerPath.roles[0]} positions`,
    timeframe: "3-6 months",
    priority: "Medium",
  })

  // Add certification if applicable
  if (careerPath.educationPath.some((edu: string) => edu.includes("Certification"))) {
    steps.push({
      type: "Certification",
      description: `Obtain relevant certifications for ${careerPath.title}`,
      timeframe: "3-12 months",
      priority: "Medium",
    })
  }

  return steps
}

// Helper function to get location-specific information
function getLocationSpecificInfo(careerPath: any, location: string) {
  // Simple mock function to return location-specific information
  const locations: Record<string, any> = {
    "san francisco": {
      demandLevel: "Very High",
      salaryMultiplier: 1.5,
      topEmployers: ["Google", "Apple", "Salesforce", "Uber", "Airbnb"],
    },
    "new york": {
      demandLevel: "High",
      salaryMultiplier: 1.4,
      topEmployers: ["JPMorgan Chase", "Google", "Facebook", "IBM", "Amazon"],
    },
    austin: {
      demandLevel: "High",
      salaryMultiplier: 1.1,
      topEmployers: ["Dell", "IBM", "Apple", "Amazon", "Facebook"],
    },
    seattle: {
      demandLevel: "Very High",
      salaryMultiplier: 1.3,
      topEmployers: ["Amazon", "Microsoft", "Boeing", "T-Mobile", "Expedia"],
    },
    chicago: {
      demandLevel: "Medium",
      salaryMultiplier: 1.1,
      topEmployers: ["Boeing", "United Airlines", "Walgreens", "Allstate", "McDonald's"],
    },
    global: {
      demandLevel: "Varies",
      salaryMultiplier: 1.0,
      topEmployers: ["Varies by location"],
    },
  }

  // Find the closest matching location
  const normalizedLocation = location.toLowerCase()
  const matchedLocation = Object.keys(locations).find((loc) => normalizedLocation.includes(loc)) || "global"

  const locationInfo = locations[matchedLocation]

  // Calculate adjusted salary range
  const salaryRange = careerPath.salaryRange
  const minSalary = Number.parseInt(salaryRange.split(" - ")[0].replace(/\D/g, ""))
  const maxSalary = Number.parseInt(salaryRange.split(" - ")[1].replace(/\D/g, "").replace(/\+/g, ""))

  const adjustedMinSalary = Math.round((minSalary * locationInfo.salaryMultiplier) / 1000) * 1000
  const adjustedMaxSalary = Math.round((maxSalary * locationInfo.salaryMultiplier) / 1000) * 1000

  return {
    location:
      matchedLocation === "global" ? "Global" : matchedLocation.charAt(0).toUpperCase() + matchedLocation.slice(1),
    demandLevel: locationInfo.demandLevel,
    adjustedSalaryRange: `$${adjustedMinSalary.toLocaleString()} - $${adjustedMaxSalary.toLocaleString()}+`,
    topEmployers: locationInfo.topEmployers,
    jobMarketOutlook: `${locationInfo.demandLevel} demand in this location`,
  }
}
