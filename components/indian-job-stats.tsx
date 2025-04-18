import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Building, MapPin } from "lucide-react"

interface JobStatsProps {
  title?: string
  description?: string
  stats: {
    growthRate: number
    totalJobs: number
    topEmployers: string[]
    topCities: string[]
  }
}

export function IndianJobStats({
  title = "Indian Job Market Statistics",
  description = "Current trends and opportunities",
  stats,
}: JobStatsProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-saffron-500 to-peacock-500 text-white">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-saffron-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-saffron-500 mb-2" />
            <span className="text-2xl font-bold text-saffron-700">{stats.growthRate}%</span>
            <span className="text-sm text-muted-foreground text-center">Annual Growth Rate</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-peacock-50 rounded-lg">
            <Users className="h-8 w-8 text-peacock-500 mb-2" />
            <span className="text-2xl font-bold text-peacock-700">{stats.totalJobs.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground text-center">New Jobs This Year</span>
          </div>

          <div className="col-span-2 mt-2">
            <div className="flex items-start mb-4">
              <Building className="h-5 w-5 text-saffron-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Top Employers</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {stats.topEmployers.map((employer, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-saffron-100 px-2.5 py-0.5 text-xs font-medium text-saffron-800"
                    >
                      {employer}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-peacock-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Top Cities</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {stats.topCities.map((city, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-peacock-100 px-2.5 py-0.5 text-xs font-medium text-peacock-800"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
