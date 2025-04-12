import { NextResponse } from "next/server";

// POST request handler
export async function POST(request) {
  try {
    const body = await request.json();
    const { academicPerformance, interests, location } = body;

    if (!academicPerformance || !interests || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const jobMarketData = await fetchJobMarketData(location);
    const skillsAnalysis = analyzeSkills(interests, jobMarketData);
    const careerRecommendations = generateCareerRecommendations(academicPerformance, interests, jobMarketData);
    const upskillingRoutes = generateUpskillingRoutes(careerRecommendations, skillsAnalysis);

    return NextResponse.json({
      careerRecommendations,
      skillsAnalysis,
      upskillingRoutes,
      marketTrends: jobMarketData.trends,
    });
  } catch (error) {
    console.error("Error processing career prediction:", error);
    return NextResponse.json({ error: "Failed to process career prediction" }, { status: 500 });
  }
}

// Mock job market data
async function fetchJobMarketData(location) {
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
      "Cybersecurity": 110000,
    },
  };
}

// Analyze skills
function analyzeSkills(interests, jobMarketData) {
  const skillsMap = {
    programming: ["JavaScript", "Python", "Java", "React", "Node.js"],
    design: ["UI/UX", "Figma", "Adobe XD", "Graphic Design"],
    business: ["Project Management", "Marketing", "Sales", "Communication"],
    science: ["Data Analysis", "Research", "Statistics", "Machine Learning"],
    writing: ["Content Creation", "Copywriting", "Technical Writing"],
  };

  const relevantSkills = [];

  interests.forEach((interest) => {
    const category = Object.keys(skillsMap).find((key) =>
      interest.toLowerCase().includes(key)
    );
    if (category) {
      relevantSkills.push(...skillsMap[category]);
    }
  });

  const inDemandSkills = relevantSkills.filter((skill) =>
    jobMarketData.topSkills.includes(skill)
  );

  return {
    relevantSkills: [...new Set(relevantSkills)],
    inDemandSkills: [...new Set(inDemandSkills)],
    skillGaps: jobMarketData.topSkills.filter(
      (skill) => !relevantSkills.includes(skill)
    ).slice(0, 5),
  };
}

// Generate career recommendations
function generateCareerRecommendations(academicPerformance, interests, jobMarketData) {
  const careerFields = Object.keys(jobMarketData.averageSalaries);

  const matchedCareers = careerFields.map((field) => {
    let matchScore = 0;

    interests.forEach((interest) => {
      if (field.toLowerCase().includes(interest.toLowerCase())) {
        matchScore += 2;
      }
    });

    const fieldTrend = jobMarketData.trends.find((trend) => trend.field === field);

    if (fieldTrend) {
      matchScore += fieldTrend.growth / 10;
    }

    return {
      field,
      matchScore,
      salary: jobMarketData.averageSalaries[field],
      growthRate: fieldTrend?.growth || 0,
      demandLevel: fieldTrend?.demandLevel || "Medium",
    };
  });

  return matchedCareers.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}

// Generate upskilling routes
function generateUpskillingRoutes(careerRecommendations, skillsAnalysis) {
  return careerRecommendations.map((career) => {
    const skillsToLearn = skillsAnalysis.skillGaps.slice(0, 3);

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
    };
  });
}
