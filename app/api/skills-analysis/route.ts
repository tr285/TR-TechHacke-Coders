import { NextResponse } from "next/server"

// This function handles POST requests to /api/skills-analysis
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { resume, jobTitle } = body

    // Validate the request
    if (!resume || !jobTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Analyze resume and extract skills
    const extractedSkills = await extractSkillsFromResume(resume)

    // Get required skills for the job title
    const requiredSkills = await getRequiredSkillsForJob(jobTitle)

    // Compare skills and identify gaps
    const skillsGapAnalysis = analyzeSkillsGap(extractedSkills, requiredSkills)

    return NextResponse.json({
      extractedSkills,
      requiredSkills,
      skillsGapAnalysis,
    })
  } catch (error) {
    console.error("Error processing skills analysis:", error)
    return NextResponse.json({ error: "Failed to process skills analysis" }, { status: 500 })
  }
}

// Function to extract skills from resume
async function extractSkillsFromResume(resume: string) {
  // REPLACE THIS: Integrate with a resume parsing API
  // Recommended API: Affinda Resume Parser API or OpenAI API
  // API Key setup: Add your API key to .env.local as RESUME_PARSER_API_KEY

  try {
    // For hackathon demo, you can use this simple keyword extraction
    const skillKeywords = [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "React",
      "Angular",
      "Vue",
      "Node.js",
      "Express",
      "MongoDB",
      "SQL",
      "PostgreSQL",
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Git",
      "Agile",
      "Scrum",
      "Project Management",
      "UI/UX",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Data Analysis",
      "Machine Learning",
      "AI",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "NLP",
      "Computer Vision",
      "Statistics",
      "R",
      "MATLAB",
    ]

    const extractedSkills = skillKeywords.filter((skill) => resume.toLowerCase().includes(skill.toLowerCase()))

    return {
      technical: extractedSkills,
      softSkills: detectSoftSkills(resume),
      proficiencyLevel: "Intermediate", // Mock value
    }

    /* Uncomment and modify this code when you have your API key
    const apiKey = process.env.RESUME_PARSER_API_KEY;
    if (!apiKey) {
      throw new Error("RESUME_PARSER_API_KEY is not defined");
    }
    
    const response = await fetch(
      "https://api.example.com/resume-parser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey
        },
        body: JSON.stringify({ resume })
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.skills;
    */
  } catch (error) {
    console.error("Error extracting skills from resume:", error)
    throw error
  }
}

// Function to detect soft skills from resume text
function detectSoftSkills(resume: string) {
  const softSkillKeywords = [
    "Communication",
    "Teamwork",
    "Leadership",
    "Problem Solving",
    "Critical Thinking",
    "Time Management",
    "Adaptability",
    "Creativity",
    "Collaboration",
    "Emotional Intelligence",
    "Conflict Resolution",
  ]

  return softSkillKeywords.filter((skill) => resume.toLowerCase().includes(skill.toLowerCase()))
}

// Function to get required skills for a job title
async function getRequiredSkillsForJob(jobTitle: string) {
  // REPLACE THIS: Integrate with a job skills API
  // Recommended API: LinkedIn API or Indeed API
  // API Key setup: Add your API key to .env.local as JOB_SKILLS_API_KEY

  try {
    // For hackathon demo, you can use this mock implementation
    const jobSkillsMap: Record<string, any> = {
      "software developer": {
        technical: ["JavaScript", "HTML", "CSS", "React", "Node.js", "Git"],
        softSkills: ["Problem Solving", "Teamwork", "Communication"],
        experience: "1-3 years",
      },
      "data scientist": {
        technical: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
        softSkills: ["Critical Thinking", "Communication", "Problem Solving"],
        experience: "2-4 years",
      },
      "ux designer": {
        technical: ["Figma", "Adobe XD", "UI/UX", "Wireframing", "Prototyping"],
        softSkills: ["Creativity", "Empathy", "Communication"],
        experience: "1-3 years",
      },
      "product manager": {
        technical: ["Product Development", "Agile", "Scrum", "Market Research"],
        softSkills: ["Leadership", "Communication", "Strategic Thinking"],
        experience: "3-5 years",
      },
    }

    // Find the closest matching job title
    const normalizedJobTitle = jobTitle.toLowerCase()
    const matchedJob = Object.keys(jobSkillsMap).find((job) => normalizedJobTitle.includes(job))

    if (matchedJob) {
      return jobSkillsMap[matchedJob]
    }

    // Default response if no match found
    return {
      technical: ["Problem Solving", "Critical Thinking", "Computer Skills"],
      softSkills: ["Communication", "Teamwork", "Adaptability"],
      experience: "Entry level",
    }

    /* Uncomment and modify this code when you have your API key
    const apiKey = process.env.JOB_SKILLS_API_KEY;
    if (!apiKey) {
      throw new Error("JOB_SKILLS_API_KEY is not defined");
    }
    
    const response = await fetch(
      `https://api.example.com/job-skills?title=${encodeURIComponent(jobTitle)}`,
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
    console.error("Error getting required skills for job:", error)
    throw error
  }
}

// Function to analyze skills gap
function analyzeSkillsGap(extractedSkills: any, requiredSkills: any) {
  const missingTechnicalSkills = requiredSkills.technical.filter(
    (skill: string) => !extractedSkills.technical.includes(skill),
  )

  const missingSoftSkills = requiredSkills.softSkills.filter(
    (skill: string) => !extractedSkills.softSkills.includes(skill),
  )

  const matchPercentage = Math.round(
    (1 -
      (missingTechnicalSkills.length + missingSoftSkills.length) /
        (requiredSkills.technical.length + requiredSkills.softSkills.length)) *
      100,
  )

  return {
    matchPercentage,
    missingTechnicalSkills,
    missingSoftSkills,
    recommendations: generateRecommendations(missingTechnicalSkills, missingSoftSkills),
  }
}

// Function to generate recommendations for skill development
function generateRecommendations(missingTechnicalSkills: string[], missingSoftSkills: string[]) {
  const technicalRecommendations = missingTechnicalSkills.map((skill) => ({
    skill,
    resources: [
      {
        type: "Course",
        name: `Learn ${skill}`,
        provider: "Udemy",
        url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(skill)}`,
      },
      {
        type: "Tutorial",
        name: `${skill} Fundamentals`,
        provider: "freeCodeCamp",
        url: `https://www.freecodecamp.org/news/search?query=${encodeURIComponent(skill)}`,
      },
    ],
  }))

  const softSkillRecommendations = missingSoftSkills.map((skill) => ({
    skill,
    resources: [
      {
        type: "Article",
        name: `Developing ${skill}`,
        provider: "LinkedIn Learning",
        url: `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(skill)}`,
      },
      {
        type: "Book",
        name: `Mastering ${skill}`,
        author: "Various Authors",
        url: `https://www.goodreads.com/search?q=${encodeURIComponent(skill)}`,
      },
    ],
  }))

  return {
    technicalSkillsToImprove: technicalRecommendations,
    softSkillsToImprove: softSkillRecommendations,
  }
}
