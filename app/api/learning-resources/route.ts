import { NextResponse } from "next/server"

// This function handles GET requests to /api/learning-resources
export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url)
    const skill = searchParams.get("skill")
    const level = searchParams.get("level") || "beginner"

    // Validate the request
    if (!skill) {
      return NextResponse.json({ error: "Missing required 'skill' parameter" }, { status: 400 })
    }

    // Fetch learning resources
    const resources = await getLearningResources(skill, level)

    return NextResponse.json(resources)
  } catch (error) {
    console.error("Error fetching learning resources:", error)
    return NextResponse.json({ error: "Failed to fetch learning resources" }, { status: 500 })
  }
}

// Function to get learning resources
async function getLearningResources(skill: string, level: string) {
  // REPLACE THIS: Integrate with a learning resources API
  // Recommended API: Coursera API, Udemy API, or edX API
  // API Key setup: Add your API key to .env.local as LEARNING_API_KEY

  try {
    // For hackathon demo, you can use this mock data
    const resourceTypes = ["Course", "Tutorial", "Book", "Article", "Video"]
    const providers = {
      Course: ["Coursera", "Udemy", "edX", "LinkedIn Learning", "Pluralsight"],
      Tutorial: ["freeCodeCamp", "W3Schools", "MDN Web Docs", "TutorialsPoint", "GeeksforGeeks"],
      Book: ["O'Reilly", "Manning", "Packt", "Apress", "No Starch Press"],
      Article: ["Medium", "Dev.to", "Smashing Magazine", "HackerNoon", "CSS-Tricks"],
      Video: ["YouTube", "Udemy", "Pluralsight", "Frontend Masters", "egghead.io"],
    }

    // Generate mock resources
    const resources = []

    for (const type of resourceTypes) {
      // Get random providers for this resource type
      const typeProviders = providers[type as keyof typeof providers]
      const numResources = Math.floor(Math.random() * 3) + 1 // 1-3 resources per type

      for (let i = 0; i < numResources; i++) {
        const provider = typeProviders[Math.floor(Math.random() * typeProviders.length)]

        resources.push({
          type,
          title: `${level.charAt(0).toUpperCase() + level.slice(1)} ${skill} ${type}`,
          provider,
          url: getResourceUrl(skill, type, provider),
          level,
          duration: getResourceDuration(type),
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
          cost: getResourceCost(type, provider),
        })
      }
    }

    return {
      skill,
      level,
      resources,
      recommendedPath: {
        steps: [
          { order: 1, type: "Article", title: `Introduction to ${skill}` },
          { order: 2, type: "Course", title: `${skill} Fundamentals` },
          { order: 3, type: "Tutorial", title: `Building with ${skill}` },
          { order: 4, type: "Project", title: `${skill} Practical Application` },
        ],
      },
    }

    /* Uncomment and modify this code when you have your API key
    const apiKey = process.env.LEARNING_API_KEY;
    if (!apiKey) {
      throw new Error("LEARNING_API_KEY is not defined");
    }
    
    const response = await fetch(
      `https://api.example.com/learning-resources?skill=${encodeURIComponent(skill)}&level=${encodeURIComponent(level)}`,
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
    console.error("Error getting learning resources:", error)
    throw error
  }
}

// Helper function to get resource URL
function getResourceUrl(skill: string, type: string, provider: string) {
  const urls: Record<string, string> = {
    Coursera: `https://www.coursera.org/search?query=${encodeURIComponent(skill)}`,
    Udemy: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(skill)}`,
    edX: `https://www.edx.org/search?q=${encodeURIComponent(skill)}`,
    "LinkedIn Learning": `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(skill)}`,
    Pluralsight: `https://www.pluralsight.com/search?q=${encodeURIComponent(skill)}`,
    freeCodeCamp: `https://www.freecodecamp.org/news/search?query=${encodeURIComponent(skill)}`,
    W3Schools: `https://www.w3schools.com/search/search.php?q=${encodeURIComponent(skill)}`,
    "MDN Web Docs": `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(skill)}`,
    TutorialsPoint: `https://www.tutorialspoint.com/index.htm?search=${encodeURIComponent(skill)}`,
    GeeksforGeeks: `https://www.geeksforgeeks.org/search?q=${encodeURIComponent(skill)}`,
    Medium: `https://medium.com/search?q=${encodeURIComponent(skill)}`,
    "Dev.to": `https://dev.to/search?q=${encodeURIComponent(skill)}`,
    "Smashing Magazine": `https://www.smashingmagazine.com/search/?q=${encodeURIComponent(skill)}`,
    HackerNoon: `https://hackernoon.com/search?query=${encodeURIComponent(skill)}`,
    "CSS-Tricks": `https://css-tricks.com/?s=${encodeURIComponent(skill)}`,
    YouTube: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill)}+tutorial`,
    "Frontend Masters": `https://frontendmasters.com/search/?q=${encodeURIComponent(skill)}`,
    "egghead.io": `https://egghead.io/q/${encodeURIComponent(skill)}`,
  }

  return (
    urls[provider] ||
    `https://www.google.com/search?q=${encodeURIComponent(skill)}+${encodeURIComponent(type)}+${encodeURIComponent(provider)}`
  )
}

// Helper function to get resource duration
function getResourceDuration(type: string) {
  switch (type) {
    case "Course":
      return `${Math.floor(Math.random() * 8) + 4} weeks`
    case "Tutorial":
      return `${Math.floor(Math.random() * 120) + 30} minutes`
    case "Book":
      return `${Math.floor(Math.random() * 400) + 200} pages`
    case "Article":
      return `${Math.floor(Math.random() * 20) + 5} minutes`
    case "Video":
      return `${Math.floor(Math.random() * 120) + 10} minutes`
    default:
      return "Varies"
  }
}

// Helper function to get resource cost
function getResourceCost(type: string, provider: string) {
  const freeProbability = 0.3 // 30% chance of being free

  if (
    Math.random() < freeProbability ||
    provider === "freeCodeCamp" ||
    provider === "W3Schools" ||
    provider === "MDN Web Docs" ||
    provider === "YouTube"
  ) {
    return "Free"
  }

  switch (type) {
    case "Course":
      return `$${Math.floor(Math.random() * 150) + 50}`
    case "Tutorial":
      return Math.random() < 0.7 ? "Free" : `$${Math.floor(Math.random() * 30) + 10}`
    case "Book":
      return `$${Math.floor(Math.random() * 50) + 20}`
    case "Article":
      return Math.random() < 0.8 ? "Free" : `$${Math.floor(Math.random() * 10) + 5}`
    case "Video":
      return Math.random() < 0.6 ? "Free" : `$${Math.floor(Math.random() * 20) + 10}`
    default:
      return "Varies"
  }
}
