"use client"

import { useEffect, useRef } from "react"

interface DataPoint {
  label: string
  value: number
}

interface AreaChartProps {
  data: DataPoint[]
  height?: number
  color?: string
}

export function AreaChart({ data, height = 200, color = "#7c3aed" }: AreaChartProps) {
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

    // Draw area chart
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)

    // Draw points and connect them
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1 || 1)
      const y = canvas.height - padding - (point.value / maxValue) * chartHeight
      ctx.lineTo(x, y)
    })

    // Complete the path to create area
    ctx.lineTo(padding + chartWidth, canvas.height - padding)
    ctx.closePath()

    // Fill area
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, `${color}80`) // Semi-transparent color
    gradient.addColorStop(1, `${color}10`) // Very transparent color
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line on top of area
    ctx.beginPath()
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1 || 1)
      const y = canvas.height - padding - (point.value / maxValue) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1 || 1)
      const y = canvas.height - padding - (point.value / maxValue) * chartHeight
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    data.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1 || 1)
      ctx.fillText(point.label, x, canvas.height - 5)
    })
  }, [data, height, color])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}
