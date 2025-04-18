# Simple Career Path Predictor API

This is a beginner-friendly API for predicting career paths based on a user's interests, skills, and education.

## API Endpoints

### 1. Predict Career

**Endpoint:** `POST /api/predict-career`

Predicts career paths based on user input.

**Request Body:**
\`\`\`json
{
  "interests": ["technology", "problem solving", "creativity"],
  "skills": ["javascript", "html", "design"],
  "education": "Computer Science"
}
\`\`\`

**Response:**
\`\`\`json
{
  "recommendations": [
    {
      "title": "Software Developer",
      "matchScore": 7,
      "averageSalary": "$95,000",
      "growthOutlook": "High",
      "description": "A career in Software Developer involves using skills like programming, problem solving, javascript, html, css."
    },
    ...
  ],
  "skillGaps": [
    {
      "careerTitle": "Software Developer",
      "missingSkills": ["css"],
      "learningPaths": [
        {
          "skill": "css",
          "resources": [
            {
              "name": "Learn CSS",
              "provider": "Codecademy",
              "url": "https://www.codecademy.com/learn/learn-css"
            },
            ...
          ]
        }
      ]
    },
    ...
  ],
  "timestamp": "2023-04-15T12:00:00Z"
}
\`\`\`

### 2. Job Trends

**Endpoint:** `GET /api/job-trends?career=Software%20Developer`

Gets job market trends for a specific career or general trends.

**Query Parameters:**
- `career` (optional): The career to get trends for

**Response (for a specific career):**
\`\`\`json
{
  "career": "Software Developer",
  "growth": 22,
  "demand": "Very High",
  "topSkills": ["JavaScript", "React", "Node.js", "Python", "Cloud Computing"],
  "topLocations": ["San Francisco", "Seattle", "New York", "Austin", "Boston"],
  "averageSalary": "$95,000",
  "outlook": "The demand for software developers is expected to grow 22% by 2030, much faster than average. Remote work opportunities are abundant.",
  "timestamp": "2023-04-15T12:00:00Z"
}
\`\`\`

**Response (general trends):**
\`\`\`json
{
  "topGrowingCareers": [
    { "title": "Data Scientist", "growth": 31 },
    ...
  ],
  "inDemandSkills": [
    "Programming",
    "Data Analysis",
    ...
  ],
  "industryOutlook": {
    "technology": "Very Strong",
    "healthcare": "Strong",
    ...
  },
  "timestamp": "2023-04-15T12:00:00Z"
}
\`\`\`

## How to Use

1. **Add these files to your Next.js project**
2. **Call the API endpoints from your frontend**

See `example-request.js` for examples of how to call these endpoints from your frontend code.

## For Your Hackathon

This simple API provides a good starting point for your hackathon project. It includes:

1. Career prediction based on user input
2. Skill gap analysis with learning resources
3. Job market trends

You can focus on building a nice frontend to display this information to users.

## Future Enhancements

After your hackathon, you could enhance this API by:

1. Connecting to real job market APIs
2. Adding more sophisticated matching algorithms
3. Implementing user accounts to save results
4. Adding more detailed career information

### 3. Job Market Data

**Endpoint:** `GET /api/job-market?location=San%20Francisco&industry=technology`

Provides job market data for a specific location and industry.

**Query Parameters:**
- `location` (optional): Geographic location (defaults to "global")
- `industry` (optional): Industry sector (defaults to "all")

**Response:**
\`\`\`json
{
  "industry": "technology",
  "location": "San Francisco, CA",
  "growthRate": 15,
  "topJobs": [
    {
      "title": "Software Developer",
      "demand": "Very High",
      "avgSalary": 95000
    },
    ...
  ],
  "topSkills": ["Cloud Computing", "AI/ML", "DevOps", "Cybersecurity", "JavaScript"],
  "locationFactor": 1.5,
  "demandTrend": "Increasing",
  "lastUpdated": "2023-04-15T12:00:00Z"
}
\`\`\`

### 4. Learning Resources

**Endpoint:** `GET /api/learning-resources?skill=Python&level=beginner`

Provides learning resources for a specific skill and proficiency level.

**Query Parameters:**
- `skill` (required): The skill to find resources for
- `level` (optional): Proficiency level (beginner, intermediate, advanced)

**Response:**
\`\`\`json
{
  "skill": "Python",
  "level": "beginner",
  "resources": [
    {
      "type": "Course",
      "title": "Python for Beginners",
      "provider": "Coursera",
      "url": "https://www.coursera.org/...",
      "duration": "4 weeks",
      "rating": "4.7",
      "cost": "Free"
    },
    ...
  ],
  "recommendedPath": {
    "steps": [
      {
        "order": 1,
        "type": "Article",
        "title": "Introduction to Python"
      },
      ...
    ]
  }
}
\`\`\`

### 5. Career Path

**Endpoint:** `POST /api/career-path`

Generates detailed career paths based on academic background, interests, skills, and personality traits.

**Request Body:**
\`\`\`json
{
  "academicBackground": {
    "field": "Computer Science",
    "level": "Bachelor's"
  },
  "interests": ["programming", "data analysis", "problem solving"],
  "skills": ["JavaScript", "HTML", "CSS", "Python"],
  "personalityTraits": ["analytical", "detail-oriented", "creative"],
  "location": "Seattle"
}
\`\`\`

**Response:**
\`\`\`json
{
  "careerPaths": [
    {
      "title": "Software Development",
      "roles": ["Junior Developer", "Software Engineer", "Senior Developer", "Tech Lead", "CTO"],
      "requiredSkills": ["Programming", "Problem Solving", "Version Control", "Testing"],
      "educationPath": ["Computer Science Degree", "Coding Bootcamp", "Online Courses"],
      "salaryRange": "$70,000 - $150,000+",
      "growthOutlook": "Very High",
      "matchScore": 8,
      "learningPath": [...],
      "nextSteps": [...],
      "locationSpecific": {
        "location": "Seattle",
        "demandLevel": "Very High",
        "adjustedSalaryRange": "$91,000 - $195,000+",
        "topEmployers": ["Amazon", "Microsoft", "Boeing", "T-Mobile", "Expedia"],
        "jobMarketOutlook": "Very High demand in this location"
      }
    },
    ...
  ],
  "timestamp": "2023-04-15T12:00:00Z"
}
\`\`\`

### 6. Personality Assessment

**Endpoint:** `POST /api/personality-assessment`

Processes personality assessment answers and provides insights and career recommendations.

**Request Body:**
\`\`\`json
{
  "answers": [
    { "questionId": "q1", "value": 4 },
    { "questionId": "q2", "value": 3 },
    ...
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "dimensions": [
    { "name": "Analytical", "score": 85 },
    { "name": "Creative", "score": 70 },
    ...
  ],
  "personalityProfile": "You are a logical thinker with a creative edge. You excel at analyzing problems and finding innovative solutions...",
  "careerRecommendations": [
    "Data Scientist",
    "Software Engineer",
    "UX/UI Designer",
    ...
  ],
  "traits": [
    "Analytical",
    "Creative",
    "logical",
    "detail-oriented",
    "systematic",
    "innovative",
    "imaginative"
  ]
}
\`\`\`

## API Integration

To integrate with this API:

1. **Required API Keys:**
   - For job market data: Add `JOB_MARKET_API_KEY` to your environment variables
   - For skills analysis: Add `SKILLS_API_KEY` to your environment variables
   - For career recommendations: Add `OPENAI_API_KEY` to your environment variables
   - For learning resources: Add `LEARNING_API_KEY` to your environment variables
   - For resume parsing: Add `RESUME_PARSER_API_KEY` to your environment variables
   - For personality assessment: Add `PERSONALITY_API_KEY` to your environment variables

2. **Environment Setup:**
   - Create a `.env.local` file in your project root
   - Add your API keys in the format: `KEY_NAME=your_api_key_here`

3. **Frontend Integration:**
   - Make fetch requests to these endpoints from your frontend
   - Handle the responses to display the data in your UI

## Recommended APIs for Integration

For a production version, consider integrating with these APIs:

1. **Job Market Data:**
   - LinkedIn API
   - Indeed API
   - RapidAPI's Job Market Data

2. **Skills Analysis:**
   - OpenAI API for skills matching
   - LinkedIn Skills API

3. **Career Recommendations:**
   - OpenAI API for personalized recommendations

4. **Learning Resources:**
   - Coursera API
   - Udemy API
   - edX API

5. **Resume Parsing:**
   - Affinda Resume Parser API
   - OpenAI API

6. **Personality Assessment:**
   - OpenAI API or specialized personality assessment API

## Notes for Hackathon Presentation

For your hackathon presentation, you can:

1. Use the mock implementations provided in the code
2. Focus on demonstrating the user flow and potential impact
3. Highlight how the system connects education, skills, and job market data
4. Discuss future enhancements and integrations

The API is designed to be easily extended with real data sources after the hackathon.
