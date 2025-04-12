// this file for  prediction carrer 
import { NextResponse } from "next/server"

// This function handles POST requests to /api/predict-career
export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { interests, skills, education } = body

    // Validate the request
    if (!interests || !skills || !education) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate career recommendations based on inputs
    const recommendations = generateCareerRecommendations(interests, skills, education)

    // Generate skill gaps and learning paths
    const skillGaps = identifySkillGaps(recommendations, skills)

    return NextResponse.json({
      recommendations,
      skillGaps,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing career prediction:", error)
    return NextResponse.json({ error: "Failed to process career prediction" }, { status: 500 })
  }
}

// Function to generate career recommendations
function generateCareerRecommendations(interests, skills, education) {
  // Simple career database with required skills and education
  const careers = [
    {
      title: "Software Developer",
      requiredSkills: ["programming", "problem solving", "javascript", "html", "css"],
      recommendedEducation: ["Computer Science", "Information Technology", "Software Engineering"],
      averageSalary: "$95,000",
      growthOutlook: "High",
    },
    {
      title: "Data Scientist",
      requiredSkills: ["statistics", "python", "machine learning", "data analysis", "sql"],
      recommendedEducation: ["Computer Science", "Statistics", "Mathematics"],
      averageSalary: "$105,000",
      growthOutlook: "Very High",
    },
    {
      title: "UX Designer",
      requiredSkills: ["design", "user research", "wireframing", "prototyping", "creativity"],
      recommendedEducation: ["Design", "Psychology", "Human-Computer Interaction"],
      averageSalary: "$85,000",
      growthOutlook: "Medium",
    },
    {
      title: "Digital Marketer",
      requiredSkills: ["social media", "content creation", "analytics", "seo", "communication"],
      recommendedEducation: ["Marketing", "Communications", "Business"],
      averageSalary: "$75,000",
      growthOutlook: "Medium",
    },
    {
      title: "Project Manager",
      requiredSkills: ["organization", "leadership", "communication", "planning", "teamwork"],
      recommendedEducation: ["Business", "Management", "Engineering"],
      averageSalary: "$90,000",
      growthOutlook: "Medium",
    },
  ]

  // Calculate match score for each career
  const scoredCareers = careers.map((career) => {
    let score = 0

    // Check for matching skills
    career.requiredSkills.forEach((skill) => {
      if (skills.some((userSkill) => userSkill.toLowerCase().includes(skill))) {
        score += 2
      }
    })

    // Check for matching interests
    interests.forEach((interest) => {
      if (career.requiredSkills.some((skill) => skill.includes(interest.toLowerCase()))) {
        score += 1
      }
    })

    // Check for matching education
    if (career.recommendedEducation.some((edu) => education.toLowerCase().includes(edu.toLowerCase()))) {
      score += 3
    }

    return {
      ...career,
      matchScore: score,
    }
  })

  // Sort by match score and return top 3
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
    .map((career) => ({
      title: career.title,
      matchScore: career.matchScore,
      averageSalary: career.averageSalary,
      growthOutlook: career.growthOutlook,
      description: `A career in ${career.title} involves using skills like ${career.requiredSkills.join(", ")}.`,
    }))
}

// Function to identify skill gaps
function identifySkillGaps(recommendations, userSkills) {
  // Simple database of learning resources
  const learningResources = {
    programming: [
      {
        name: "Introduction to Programming",
        provider: "Codecademy",
        url: "https://www.codecademy.com/learn/introduction-to-programming",
      },
      {
        name: "Programming Fundamentals",
        provider: "edX",
        url: "https://www.edx.org/search?q=programming+fundamentals",
      },
    ],
    python: [
      { name: "Learn Python", provider: "Codecademy", url: "https://www.codecademy.com/learn/learn-python-3" },
      { name: "Python for Everybody", provider: "Coursera", url: "https://www.coursera.org/specializations/python" },
    ],
    javascript: [
      {
        name: "JavaScript Basics",
        provider: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      },
      {
        name: "JavaScript Essential Training",
        provider: "LinkedIn Learning",
        url: "https://www.linkedin.com/learning/javascript-essential-training",
      },
    ],
    design: [
      {
        name: "Intro to UX Design",
        provider: "Coursera",
        url: "https://www.coursera.org/learn/ux-design-fundamentals",
      },
      { name: "Design Basics", provider: "Udemy", url: "https://www.udemy.com/topic/graphic-design/" },
    ],
    "data analysis": [
      {
        name: "Data Analysis with Python",
        provider: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
      },
      { name: "Data Analysis Fundamentals", provider: "edX", url: "https://www.edx.org/search?q=data+analysis" },
    ],
  }

  const skillGaps = []

  // For each recommended career
  recommendations.forEach((career) => {
    // Get the original career data with required skills
    const careerData = {
      "Software Developer": ["programming", "javascript", "html", "css"],
      "Data Scientist": ["python", "statistics", "data analysis", "machine learning"],
      "UX Designer": ["design", "user research", "wireframing", "prototyping"],
      "Digital Marketer": ["social media", "content creation", "analytics", "seo"],
      "Project Manager": ["organization", "leadership", "communication", "planning"],
    }

    const requiredSkills = careerData[career.title] || []

    // Find skills the user is missing
    const missingSkills = requiredSkills.filter(
      (skill) => !userSkills.some((userSkill) => userSkill.toLowerCase().includes(skill)),
    )

    // For each missing skill, find learning resources
    const learningPaths = missingSkills.map((skill) => {
      const resources = learningResources[skill] || [
        { name: `Learn ${skill}`, provider: "Coursera", url: `https://www.coursera.org/search?query=${skill}` },
      ]

      return {
        skill,
        resources: resources.slice(0, 2), // Return up to 2 resources per skill
      }
    })

    if (learningPaths.length > 0) {
      skillGaps.push({
        careerTitle: career.title,
        missingSkills,
        learningPaths,
      })
    }
  })

  return skillGaps
}
