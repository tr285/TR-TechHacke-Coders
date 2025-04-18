"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SalaryData {
  role: string
  salary: number
  color: string
}

interface SalaryComparisonChartProps {
  data: SalaryData[]
  title?: string
  description?: string
}

export function SalaryComparisonChart({
  data,
  title = "Salary Comparison",
  description = "Average annual salaries in ₹ lakhs",
}: SalaryComparisonChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Find max salary for scaling
    const maxSalary = Math.max(...data.map((item) => item.salary))
    const padding = 40
    const barWidth = (canvas.width - padding * 2) / data.length - 20
    const bottomPadding = 40

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, 20)
    ctx.lineTo(padding, canvas.height - bottomPadding)
    ctx.lineTo(canvas.width - padding, canvas.height - bottomPadding)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Draw horizontal grid lines
    const numGridLines = 5
    ctx.textAlign = "right"
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#6b7280"

    for (let i = 0; i <= numGridLines; i++) {
      const y = canvas.height - bottomPadding - (i * (canvas.height - bottomPadding - 20)) / numGridLines
      const value = ((i * maxSalary) / numGridLines).toFixed(0)

      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.strokeStyle = "#e5e7eb"
      ctx.stroke()

      ctx.fillText(`₹${value}L`, padding - 5, y + 4)
    }

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * ((canvas.width - padding * 2) / data.length) + 10
      const barHeight = (item.salary / maxSalary) * (canvas.height - bottomPadding - 20)
      const y = canvas.height - bottomPadding - barHeight

      // Draw bar
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add gradient
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - bottomPadding)
      gradient.addColorStop(0, item.color)
      gradient.addColorStop(1, `${item.color}80`) // Add transparency
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw role name
      ctx.save()
      ctx.translate(x + barWidth / 2, canvas.height - bottomPadding + 15)
      ctx.rotate(-Math.PI / 4) // Rotate text
      ctx.textAlign = "right"
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.fillText(item.role, 0, 0)
      ctx.restore()

      // Draw salary value on top of bar
      ctx.textAlign = "center"
      ctx.fillStyle = "#374151"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(`₹${item.salary}L`, x + barWidth / 2, y - 10)
    })
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  )
}
