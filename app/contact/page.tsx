import Link from "next/link"
import { ArrowLeft, Phone, Mail, MapPin, Globe, Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TRLogo } from "@/components/tr-logo"

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-glow">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-neon-blue-900/80 to-dark-900/90 border-none shadow-neon-blue">
          <CardHeader>
            <CardTitle className="text-glow">Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-blue-600 to-neon-purple-600 hover:from-neon-blue-500 hover:to-neon-purple-500 border-none"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-neon-purple-900/80 to-dark-900/90 border-none shadow-neon-purple">
            <CardHeader>
              <CardTitle className="text-glow-purple">Contact Information</CardTitle>
              <CardDescription>Reach out to us directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-blue-900/50">
                  <Phone className="h-5 w-5 text-neon-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href="tel:7420812179" className="text-sm text-neon-blue-400 hover:underline">
                    7420812179
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-purple-900/50">
                  <Mail className="h-5 w-5 text-neon-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:goretukaram62@gmail.com" className="text-sm text-neon-purple-400 hover:underline">
                    goretukaram62@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-green-900/50">
                  <Instagram className="h-5 w-5 text-neon-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Instagram</p>
                  <a
                    href="https://instagram.com/tuka_r_gore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neon-green-400 hover:underline"
                  >
                    @tuka_r_gore
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-orange-900/50">
                  <MapPin className="h-5 w-5 text-neon-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">123 Career Street, Tech City</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-blue-900/50">
                  <Globe className="h-5 w-5 text-neon-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <p className="text-sm text-muted-foreground">www.trcareerpredictor.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neon-blue-900/80 via-neon-purple-900/80 to-neon-blue-900/80 border-none">
            <CardHeader>
              <CardTitle className="text-glow">TR Career Predictor</CardTitle>
              <CardDescription>Helping you find your ideal career path</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <TRLogo width={150} height={150} className="mb-4" />
              <p className="text-muted-foreground text-center">
                Our mission is to help students and professionals find career paths that align with their skills,
                interests, and education. We use advanced algorithms to provide personalized recommendations and
                learning resources.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
