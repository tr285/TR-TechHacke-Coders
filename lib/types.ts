// Types for Career Prediction API

export interface AcademicPerformance {
  gpa?: number
  major?: string
  degree?: string
  institution?: string
  graduationYear?: number
  achievements?: string[]
}

export interface CareerRecommendation {
  field: string
  matchScore: number
  salary: number
  growthRate: number
  demandLevel: string
}

export interface SkillsAnalysis {
  relevantSkills: string[]
  inDemandSkills: string[]
  skillGaps: string[]
}

export interface LearningResource {
  type: string
  name: string
  provider: string
  duration?: string
  url: string
}

export interface UpskillingRoute {
  careerField: string
  requiredSkills: string[]
  learningPaths: {
    skill: string
    resources: LearningResource[]
  }[]
}

export interface JobMarketTrend {
  field: string
  growth: number
  demandLevel: string
}

export interface CareerPredictionResponse {
  careerRecommendations: CareerRecommendation[]
  skillsAnalysis: SkillsAnalysis
  upskillingRoutes: UpskillingRoute[]
  marketTrends: JobMarketTrend[]
}

// Types for Skills Analysis API

export interface ExtractedSkills {
  technical: string[]
  softSkills: string[]
  proficiencyLevel: string
}

export interface RequiredSkills {
  technical: string[]
  softSkills: string[]
  experience: string
}

export interface SkillsGapAnalysis {
  matchPercentage: number
  missingTechnicalSkills: string[]
  missingSoftSkills: string[]
  recommendations: {
    technicalSkillsToImprove: {
      skill: string
      resources: LearningResource[]
    }[]
    softSkillsToImprove: {
      skill: string
      resources: LearningResource[]
    }[]
  }
}

export interface SkillsAnalysisResponse {
  extractedSkills: ExtractedSkills
  requiredSkills: RequiredSkills
  skillsGapAnalysis: SkillsGapAnalysis
}

// Types for Job Market API

export interface JobInfo {
  title: string
  demand: string
  avgSalary: number
}

export interface JobMarketResponse {
  industry: string
  location: string
  growthRate: number
  topJobs: JobInfo[]
  topSkills: string[]
  locationFactor: number
  demandTrend: string
  lastUpdated: string
}

// Types for Learning Resources API

export interface LearningPathStep {
  order: number
  type: string
  title: string
}

export interface LearningResourcesResponse {
  skill: string
  level: string
  resources: LearningResource[]
  recommendedPath: {
    steps: LearningPathStep[]
  }
}

// Types for Career Path API

export interface CareerPath {
  title: string
  roles: string[]
  requiredSkills: string[]
  educationPath: string[]
  salaryRange: string
  growthOutlook: string
  matchScore: number
  learningPath: {
    skill: string
    resources: LearningResource[]
  }[]
  nextSteps: {
    type: string
    description: string
    timeframe: string
    priority: string
  }[]
  locationSpecific: {
    location: string
    demandLevel: string
    adjustedSalaryRange: string
    topEmployers: string[]
    jobMarketOutlook: string
  }
}

export interface CareerPathResponse {
  careerPaths: CareerPath[]
  timestamp: string
}

// Types for Personality Assessment API

export interface PersonalityDimension {
  name: string
  score: number
}

export interface PersonalityAssessmentResponse {
  dimensions: PersonalityDimension[]
  personalityProfile: string
  careerRecommendations: string[]
  traits: string[]
}
