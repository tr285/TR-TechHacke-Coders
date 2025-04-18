import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TRLogo } from "@/components/tr-logo"
import { ContactButtons } from "@/components/contact-buttons"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-glow">About TR Career Predictor</h1>
        <p className="mt-2 text-muted-foreground">Learn more about our platform and mission.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-glow">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At TR Career Predictor, we're dedicated to helping students and professionals find career paths that align
            with their unique skills, interests, and educational background.
          </p>
          <p className="text-muted-foreground mb-4">
            We believe that everyone deserves to find fulfilling work that matches their abilities and passions. Our
            platform uses advanced algorithms to provide personalized career recommendations and learning resources.
          </p>
          <div className="space-y-2 mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-neon-blue-400" />
              <span>Personalized career recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-neon-purple-400" />
              <span>Skill gap analysis and learning resources</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-neon-green-400" />
              <span>Up-to-date job market trends</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-neon-orange-400" />
              <span>Free access to career insights</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <TRLogo width={300} height={300} />
        </div>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Our Approach</CardTitle>
          <CardDescription>How we help you find your ideal career path</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Data-Driven Analysis</p>
                <p className="text-sm text-muted-foreground">
                  We analyze your skills, interests, and education to match you with careers that align with your
                  profile.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Skill Gap Identification</p>
                <p className="text-sm text-muted-foreground">
                  We identify the skills you need to develop for your target careers and provide learning resources.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Market Trend Integration</p>
                <p className="text-sm text-muted-foreground">
                  We incorporate current job market trends to ensure our recommendations are relevant and timely.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Continuous Improvement</p>
                <p className="text-sm text-muted-foreground">
                  We regularly update our algorithms and data to provide the most accurate recommendations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Find Your Ideal Career?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start your career assessment today and discover the paths that match your unique profile.
        </p>
        <Link href="/predict">
          <Button size="lg">Start Assessment</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Get in touch with us</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <ContactButtons showLabels={true} />
            <p className="text-center text-muted-foreground mt-4">
              Feel free to reach out to us with any questions or feedback about our platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
