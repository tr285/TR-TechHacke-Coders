import Link from "next/link"
import { ArrowRight, Bot, Cpu, LineChart, Phone, Mail, Sparkles, Zap, Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TRLogo } from "@/components/tr-logo"
import { ContactButtons } from "@/components/contact-buttons"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="font-bold text-2xl text-primary animate-glow">TR</div>
            <span className="hidden md:inline-block font-semibold">Career Path Predictor</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/predict" className="text-sm font-medium">
              Predict Career
            </Link>
            <Link href="/trends" className="text-sm font-medium">
              Job Trends
            </Link>
            <Link href="/ai-job-assistant" className="text-sm font-medium">
              AI Assistant
            </Link>
            <Link href="/ai-insights" className="text-sm font-medium">
              AI Insights
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ContactButtons size="sm" showLabels={false} />
            </div>
            <Link href="/predict">
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-blue-600 to-neon-purple-600 hover:from-neon-blue-500 hover:to-neon-purple-500 border-none"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-glow">
                    Discover Your Ideal <span className="text-primary">Career Path</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our AI-powered platform evaluates your skills, interests, and education to suggest the most suitable
                    career paths and upskilling routes for the Indian job market.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/predict">
                    <Button
                      size="lg"
                      className="gap-1 bg-gradient-to-r from-neon-blue-600 to-neon-purple-600 hover:from-neon-blue-500 hover:to-neon-purple-500 border-none"
                    >
                      Start Assessment <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/ai-job-assistant">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-neon-blue-500 text-neon-blue-500 hover:bg-neon-blue-950"
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      AI Assistant
                    </Button>
                  </Link>
                  <Link href="/trends">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-neon-purple-500 text-neon-purple-500 hover:bg-neon-purple-950"
                    >
                      <LineChart className="mr-2 h-4 w-4" />
                      Job Trends
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue-500 to-neon-purple-500 rounded-lg blur-md opacity-75 animate-pulse"></div>
                  <TRLogo width={500} height={400} className="relative rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-neon-blue-900/50 px-3 py-1 text-sm text-neon-blue-500 mb-2">
                  <Sparkles className="inline-block h-4 w-4 mr-1" /> AI-Powered
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-glow">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform uses advanced algorithms to match your profile with career opportunities
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue-600 to-neon-blue-800 text-white text-2xl font-bold shadow-neon-blue">
                  1
                </div>
                <h3 className="text-xl font-bold text-glow">Enter Your Information</h3>
                <p className="text-muted-foreground">
                  Tell us about your interests, skills, and educational background.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple-600 to-neon-purple-800 text-white text-2xl font-bold shadow-neon-purple">
                  2
                </div>
                <h3 className="text-xl font-bold text-glow-purple">Get Personalized Recommendations</h3>
                <p className="text-muted-foreground">Receive career suggestions that match your unique profile.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-green-600 to-neon-green-800 text-white text-2xl font-bold shadow-neon-green">
                  3
                </div>
                <h3 className="text-xl font-bold text-glow-green">Explore Learning Paths</h3>
                <p className="text-muted-foreground">
                  Discover the skills you need to develop and resources to help you learn them.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background relative">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-neon-purple-900/50 px-3 py-1 text-sm text-neon-purple-500 mb-2">
                  <Cpu className="inline-block h-4 w-4 mr-1" /> New Feature
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-glow-purple">
                  AI Job Assistant
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Chat with our AI assistant to get personalized job insights and career advice
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-glow-purple">Ask Anything About Careers</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-neon-purple-500 flex items-center justify-center rounded-full bg-neon-purple-900/50">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="font-medium text-neon-purple-400">Real-time Job Market Insights</span>
                      <p className="text-sm text-muted-foreground">
                        Get the latest information on job trends, salaries, and opportunities
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-neon-purple-500 flex items-center justify-center rounded-full bg-neon-purple-900/50">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="font-medium text-neon-purple-400">Personalized Career Advice</span>
                      <p className="text-sm text-muted-foreground">
                        Receive tailored recommendations based on your skills and interests
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-neon-purple-500 flex items-center justify-center rounded-full bg-neon-purple-900/50">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="font-medium text-neon-purple-400">Skill Development Guidance</span>
                      <p className="text-sm text-muted-foreground">
                        Learn which skills to develop for your target career path
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-neon-purple-500 flex items-center justify-center rounded-full bg-neon-purple-900/50">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="font-medium text-neon-purple-400">Indian Market Specialization</span>
                      <p className="text-sm text-muted-foreground">
                        Focused on the unique aspects of the Indian job market
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/ai-job-assistant">
                    <Button className="bg-gradient-to-r from-neon-purple-600 to-neon-blue-600 hover:from-neon-purple-500 hover:to-neon-blue-500 border-none">
                      Try AI Assistant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple-500 to-neon-blue-500 rounded-lg blur-md opacity-75 animate-pulse"></div>
                <Card className="relative border-none bg-gradient-to-br from-neon-purple-900/80 to-neon-blue-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bot className="h-5 w-5 text-neon-purple-400" />
                      AI Job Assistant
                    </CardTitle>
                    <CardDescription className="text-gray-300">Ask me anything about careers in India</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-neon-purple-800/50 p-3 rounded-lg text-white text-sm">
                      What are the highest paying tech jobs in Bangalore?
                    </div>
                    <div className="bg-neon-blue-800/50 p-3 rounded-lg text-white text-sm">
                      The highest paying tech jobs in Bangalore are:
                      <ol className="list-decimal pl-5 mt-2 space-y-1">
                        <li>AI/ML Engineer (₹18-35 LPA)</li>
                        <li>Cloud Architect (₹20-40 LPA)</li>
                        <li>DevOps Engineer (₹15-30 LPA)</li>
                        <li>Data Scientist (₹15-28 LPA)</li>
                        <li>Blockchain Developer (₹14-25 LPA)</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-glow">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the tools that will help you find your ideal career path
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-gradient-to-br from-neon-blue-900/80 to-dark-900/90 border-none shadow-neon-blue">
                <CardHeader>
                  <CardTitle className="text-glow">Career Prediction</CardTitle>
                  <CardDescription>Find careers that match your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our algorithm analyzes your skills, interests, and education to recommend careers with the highest
                    match score. Each recommendation includes salary information and growth outlook.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-neon-purple-900/80 to-dark-900/90 border-none shadow-neon-purple">
                <CardHeader>
                  <CardTitle className="text-glow-purple">Skill Gap Analysis</CardTitle>
                  <CardDescription>Identify skills you need to develop</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We identify the skills you need to develop for your target careers and provide learning resources to
                    help you acquire them, including courses, tutorials, and books.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-neon-green-900/80 to-dark-900/90 border-none shadow-neon-green">
                <CardHeader>
                  <CardTitle className="text-glow-green">Job Market Trends</CardTitle>
                  <CardDescription>Stay informed about industry demands</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access up-to-date information about job market trends, including growth rates, in-demand skills, and
                    top locations for different careers.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-neon-orange-900/80 to-dark-900/90 border-none">
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Develop the skills you need</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get personalized recommendations for courses, tutorials, and other resources to help you develop the
                    skills needed for your target careers.
                  </p>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2 bg-gradient-to-br from-neon-blue-900/80 via-neon-purple-900/80 to-neon-blue-900/80 border-none">
                <CardHeader>
                  <CardTitle className="text-glow">AI-Powered Insights</CardTitle>
                  <CardDescription>Get intelligent career guidance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes the Indian job market to provide personalized insights, salary trends in
                    Indian Rupees, and region-specific career opportunities across major Indian cities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-glow">
                  Ready to Find Your Ideal Career?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your career assessment today and discover the paths that match your unique profile.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/predict">
                  <Button
                    size="lg"
                    className="gap-1 bg-gradient-to-r from-neon-blue-600 to-neon-purple-600 hover:from-neon-blue-500 hover:to-neon-purple-500 border-none"
                  >
                    Start Assessment <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl text-primary animate-glow">TR</div>
            <span className="text-sm text-muted-foreground">Career Path Predictor</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <a href="tel:7420812179" className="flex items-center hover:text-neon-blue-400 transition-colors">
              <Phone className="mr-2 h-4 w-4" />
              <span>7420812179</span>
            </a>
            <a
              href="mailto:goretukaram62@gmail.com"
              className="flex items-center hover:text-neon-purple-400 transition-colors"
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>goretukaram62@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/tuka_r_gore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-neon-green-400 transition-colors"
            >
              <Instagram className="mr-2 h-4 w-4" />
              <span>@tuka_r_gore</span>
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 TR Career Path Predictor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
