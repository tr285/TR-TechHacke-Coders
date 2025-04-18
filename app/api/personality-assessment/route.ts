import { NextResponse } from "next/server"

// This function handles POST requests to /api/personality-assessment
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { answers } = body

    // Validate the request
    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Missing or invalid answers array" }, { status: 400 })
    }

    // Process the personality assessment
    const results = processPersonalityAssessment(answers)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error processing personality assessment:", error)
    return NextResponse.json({ error: "Failed to process personality assessment" }, { status: 500 })
  }
}

// Function to process personality assessment
function processPersonalityAssessment(answers: any[]) {
  // REPLACE THIS: Integrate with a personality assessment API
  // Recommended API: OpenAI API or specialized personality assessment API
  // API Key setup: Add your API key to .env.local as PERSONALITY_API_KEY

  try {
    // For hackathon demo, you can use this mock implementation

    // Define personality dimensions
    const dimensions = [
      { name: "Analytical", score: 0 },
      { name: "Creative", score: 0 },
      { name: "Practical", score: 0 },
      { name: "Social", score: 0 },
      { name: "Leadership", score: 0 },
    ]

    // Simple scoring system based on answer values
    answers.forEach((answer) => {
      // Each answer should have a questionId and a value (1-5)
      const { questionId, value } = answer

      // Map question IDs to dimensions (simplified for demo)
      const questionMap: Record<string, string[]> = {
        q1: ["Analytical"],
        q2: ["Creative"],
        q3: ["Practical"],
        q4: ["Social"],
        q5: ["Leadership"],
        q6: ["Analytical", "Practical"],
        q7: ["Creative", "Social"],
        q8: ["Leadership", "Social"],
        q9: ["Analytical", "Creative"],
        q10: ["Practical", "Leadership"],
      }

      // Update scores for relevant dimensions
      const dimensionsToUpdate = questionMap[questionId] || []
      dimensionsToUpdate.forEach((dim) => {
        const dimension = dimensions.find((d) => d.name === dim)
        if (dimension) {
          dimension.score += value
        }
      })
    })

    // Normalize scores to percentages
    const maxPossibleScore = 25 // Assuming 5 questions per dimension with max value 5
    dimensions.forEach((dim) => {
      dim.score = Math.min(100, Math.round((dim.score / maxPossibleScore) * 100))
    })

    // Sort dimensions by score (highest first)
    const sortedDimensions = [...dimensions].sort((a, b) => b.score - a.score)

    // Determine primary and secondary traits
    const primaryTrait = sortedDimensions[0].name
    const secondaryTrait = sortedDimensions[1].name

    // Generate personality profile
    const personalityProfile = generatePersonalityProfile(primaryTrait, secondaryTrait)

    // Generate career recommendations based on personality
    const careerRecommendations = generateCareerRecommendations(sortedDimensions)

    return {
      dimensions: sortedDimensions,
      personalityProfile,
      careerRecommendations,
      traits: [primaryTrait, secondaryTrait, ...getPersonalityTraits(primaryTrait, secondaryTrait)],
    }

    /* Uncomment and modify this code when you have your API key
    const apiKey = process.env.PERSONALITY_API_KEY;
    if (!apiKey) {
      throw new Error("PERSONALITY_API_KEY is not defined");
    }
    
    const response = await fetch(
      "https://api.example.com/personality-assessment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey
        },
        body: JSON.stringify({ answers })
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error("Error processing personality assessment:", error)
    throw error
  }
}

// Helper function to generate personality profile
function generatePersonalityProfile(primaryTrait: string, secondaryTrait: string) {
  // Define profiles for each trait combination
  const profiles: Record<string, Record<string, string>> = {
    Analytical: {
      Creative:
        "You are a logical thinker with a creative edge. You excel at analyzing problems and finding innovative solutions. You likely enjoy work that combines systematic thinking with opportunities for innovation.",
      Practical:
        "You have a methodical and pragmatic approach to problem-solving. You excel at detailed analysis and implementing practical solutions. You likely prefer work that requires precision and has tangible outcomes.",
      Social:
        "You combine analytical thinking with strong interpersonal skills. You excel at understanding complex systems and explaining them to others. You likely enjoy work that involves both analysis and collaboration.",
      Leadership:
        "You have a strategic mind with leadership capabilities. You excel at analyzing situations and guiding others toward solutions. You likely enjoy work that involves decision-making and directing projects.",
    },
    Creative: {
      Analytical:
        "You have an innovative mind balanced with logical thinking. You excel at generating original ideas that are also practical and feasible. You likely enjoy work that allows you to design new solutions within structured frameworks.",
      Practical:
        "You combine creativity with a hands-on approach. You excel at turning ideas into reality and finding innovative solutions to everyday problems. You likely enjoy work that involves both design and implementation.",
      Social:
        "You have a creative spirit with strong people skills. You excel at collaborative innovation and inspiring others. You likely enjoy work that involves group creativity and sharing ideas.",
      Leadership:
        "You are an innovative visionary with leadership abilities. You excel at inspiring others with your creative ideas and leading projects in new directions. You likely enjoy work that allows you to guide creative initiatives.",
    },
    Practical: {
      Analytical:
        "You have a pragmatic approach supported by analytical skills. You excel at implementing effective solutions based on careful analysis. You likely enjoy work that requires both planning and execution.",
      Creative:
        "You combine hands-on skills with creative thinking. You excel at finding innovative yet practical solutions to problems. You likely enjoy work that allows you to improve existing systems with new ideas.",
      Social:
        "You have a practical mindset with strong interpersonal skills. You excel at implementing solutions while working effectively with others. You likely enjoy collaborative work with tangible outcomes.",
      Leadership:
        "You are a practical leader who gets things done. You excel at guiding teams toward efficient and effective solutions. You likely enjoy work that involves managing projects and resources.",
    },
    Social: {
      Analytical:
        "You combine people skills with analytical thinking. You excel at understanding both people and systems. You likely enjoy work that involves analyzing social dynamics or explaining complex ideas to others.",
      Creative:
        "You have strong interpersonal skills paired with creativity. You excel at collaborative innovation and understanding others' needs. You likely enjoy work that involves group creativity and communication.",
      Practical:
        "You combine people skills with a practical approach. You excel at working with others to implement effective solutions. You likely enjoy collaborative work with tangible outcomes.",
      Leadership:
        "You are a people-oriented leader. You excel at understanding team dynamics and motivating others. You likely enjoy work that involves building and leading teams.",
    },
    Leadership: {
      Analytical:
        "You are a strategic leader with analytical skills. You excel at making data-driven decisions and guiding others based on careful analysis. You likely enjoy work that involves directing projects and analyzing outcomes.",
      Creative:
        "You are an innovative leader who inspires others. You excel at guiding creative initiatives and encouraging new ideas. You likely enjoy work that involves leading teams in creative directions.",
      Practical:
        "You are a results-oriented leader. You excel at guiding teams toward efficient and effective solutions. You likely enjoy work that involves managing projects and achieving tangible outcomes.",
      Social:
        "You are a people-focused leader. You excel at understanding team dynamics and motivating others. You likely enjoy work that involves building relationships and guiding teams toward shared goals.",
    },
  }

  // Return the profile for this trait combination
  return (
    profiles[primaryTrait]?.[secondaryTrait] ||
    "You have a unique combination of traits that gives you versatility across different types of work. Your specific strengths will help you excel in roles that align with your personal interests and values."
  )
}

// Helper function to get personality traits
function getPersonalityTraits(primaryTrait: string, secondaryTrait: string) {
  // Define traits associated with each personality dimension
  const traitMap: Record<string, string[]> = {
    Analytical: ["logical", "detail-oriented", "systematic", "objective", "critical-thinker"],
    Creative: ["innovative", "imaginative", "original", "artistic", "visionary"],
    Practical: ["hands-on", "efficient", "organized", "reliable", "resourceful"],
    Social: ["empathetic", "communicative", "collaborative", "supportive", "personable"],
    Leadership: ["decisive", "motivating", "strategic", "confident", "influential"],
  }

  // Combine traits from primary and secondary dimensions
  const primaryTraits = traitMap[primaryTrait] || []
  const secondaryTraits = traitMap[secondaryTrait] || []

  // Return a mix of traits (3 from primary, 2 from secondary)
  return [...primaryTraits.slice(0, 3), ...secondaryTraits.slice(0, 2)]
}

// Helper function to generate career recommendations
function generateCareerRecommendations(dimensions: any[]) {
  // Define career recommendations for each personality dimension
  const careerMap: Record<string, string[]> = {
    Analytical: ["Data Scientist", "Software Engineer", "Financial Analyst", "Research Scientist", "Business Analyst"],
    Creative: ["UX/UI Designer", "Content Creator", "Marketing Specialist", "Product Designer", "Art Director"],
    Practical: [
      "Project Manager",
      "Operations Manager",
      "Civil Engineer",
      "Healthcare Administrator",
      "Supply Chain Manager",
    ],
    Social: [
      "Human Resources Specialist",
      "Customer Success Manager",
      "Social Worker",
      "Teacher/Trainer",
      "Community Manager",
    ],
    Leadership: ["Product Manager", "Team Lead", "Entrepreneur", "Program Director", "Executive"],
  }

  // Get top 3 dimensions
  const topDimensions = dimensions.slice(0, 3)

  // Generate recommendations based on top dimensions
  const recommendations: string[] = []

  // Add recommendations from top dimension
  recommendations.push(...careerMap[topDimensions[0].name].slice(0, 3))

  // Add recommendations from second dimension
  recommendations.push(...careerMap[topDimensions[1].name].slice(0, 2))

  // Add one recommendation from third dimension
  recommendations.push(careerMap[topDimensions[2].name][0])

  // Return unique recommendations
  return [...new Set(recommendations)]
}
