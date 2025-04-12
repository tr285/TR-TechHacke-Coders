// this file for persnallity assistment 

import { NextResponse } from "next/server";

// This function handles POST requests to /api/personality-assessment
export async function POST(request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Missing or invalid answers array" }, { status: 400 });
    }

    const results = processPersonalityAssessment(answers);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error processing personality assessment:", error);
    return NextResponse.json({ error: "Failed to process personality assessment" }, { status: 500 });
  }
}

function processPersonalityAssessment(answers) {
  try {
    const dimensions = [
      { name: "Analytical", score: 0 },
      { name: "Creative", score: 0 },
      { name: "Practical", score: 0 },
      { name: "Social", score: 0 },
      { name: "Leadership", score: 0 },
    ];

    answers.forEach((answer) => {
      const { questionId, value } = answer;

      const questionMap = {
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
      };

      const dimensionsToUpdate = questionMap[questionId] || [];
      dimensionsToUpdate.forEach((dim) => {
        const dimension = dimensions.find((d) => d.name === dim);
        if (dimension) {
          dimension.score += value;
        }
      });
    });

    const maxPossibleScore = 25;
    dimensions.forEach((dim) => {
      dim.score = Math.min(100, Math.round((dim.score / maxPossibleScore) * 100));
    });

    const sortedDimensions = [...dimensions].sort((a, b) => b.score - a.score);
    const primaryTrait = sortedDimensions[0].name;
    const secondaryTrait = sortedDimensions[1].name;

    const personalityProfile = generatePersonalityProfile(primaryTrait, secondaryTrait);
    const careerRecommendations = generateCareerRecommendations(sortedDimensions);

    return {
      dimensions: sortedDimensions,
      personalityProfile,
      careerRecommendations,
      traits: [primaryTrait, secondaryTrait, ...getPersonalityTraits(primaryTrait, secondaryTrait)],
    };
  } catch (error) {
    console.error("Error processing personality assessment:", error);
    throw error;
  }
}

function generatePersonalityProfile(primaryTrait, secondaryTrait) {
  const profiles = {
    Analytical: {
      Creative: "You are a logical thinker with a creative edge...",
      Practical: "You have a methodical and pragmatic approach...",
      Social: "You combine analytical thinking with strong interpersonal skills...",
      Leadership: "You have a strategic mind with leadership capabilities...",
    },
    Creative: {
      Analytical: "You have an innovative mind balanced with logical thinking...",
      Practical: "You combine creativity with a hands-on approach...",
      Social: "You have a creative spirit with strong people skills...",
      Leadership: "You are an innovative visionary with leadership abilities...",
    },
    Practical: {
      Analytical: "You have a pragmatic approach supported by analytical skills...",
      Creative: "You combine hands-on skills with creative thinking...",
      Social: "You have a practical mindset with strong interpersonal skills...",
      Leadership: "You are a practical leader who gets things done...",
    },
    Social: {
      Analytical: "You combine people skills with analytical thinking...",
      Creative: "You have strong interpersonal skills paired with creativity...",
      Practical: "You combine people skills with a practical approach...",
      Leadership: "You are a people-oriented leader...",
    },
    Leadership: {
      Analytical: "You are a strategic leader with analytical skills...",
      Creative: "You are an innovative leader who inspires others...",
      Practical: "You are a results-oriented leader...",
      Social: "You are a people-focused leader...",
    },
  };

  return (
    profiles[primaryTrait]?.[secondaryTrait] ||
    "You have a unique combination of traits that gives you versatility across different types of work."
  );
}

function getPersonalityTraits(primaryTrait, secondaryTrait) {
  const traitMap = {
    Analytical: ["logical", "detail-oriented", "systematic", "objective", "critical-thinker"],
    Creative: ["innovative", "imaginative", "original", "artistic", "visionary"],
    Practical: ["hands-on", "efficient", "organized", "reliable", "resourceful"],
    Social: ["empathetic", "communicative", "collaborative", "supportive", "personable"],
    Leadership: ["decisive", "motivating", "strategic", "confident", "influential"],
  };

  const primaryTraits = traitMap[primaryTrait] || [];
  const secondaryTraits = traitMap[secondaryTrait] || [];

  return [...primaryTraits.slice(0, 3), ...secondaryTraits.slice(0, 2)];
}

function generateCareerRecommendations(dimensions) {
  const careerMap = {
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
  };

  const topDimensions = dimensions.slice(0, 3);
  const recommendations = [];

  recommendations.push(...careerMap[topDimensions[0].name].slice(0, 3));
  recommendations.push(...careerMap[topDimensions[1].name].slice(0, 2));
  recommendations.push(careerMap[topDimensions[2].name][0]);

  return [...new Set(recommendations)];
}
