"use client"

import { useEffect, useRef } from "react"

interface DataPoint {
  label: string
  value: number
}

interface BarChartProps {
  data: DataPoint[]
  height?: number
  color?: string
}

export function BarChart({ data, height = 200, color = "#4f46e5" }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value))
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = (chartWidth / data.length) * 0.8
    const barSpacing = (chartWidth / data.length) * 0.2

    // Draw bars
    data.forEach((point, index) => {
      const x = padding + index * (barWidth + barSpacing)
      const barHeight = (point.value / maxValue) * chartHeight
      const y = canvas.height - padding - barHeight

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, `${color}80`) // Semi-transparent color

      // Draw bar
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw value on top of bar
      ctx.textAlign = "center"
      ctx.fillStyle = "#374151"
      ctx.font = "bold 10px sans-serif"
      ctx.fillText(point.value.toString(), x + barWidth / 2, y - 5)

      // Draw label below bar
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.fillText(point.label, x + barWidth / 2, canvas.height - 5)
    })
  }, [data, height, color])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}
