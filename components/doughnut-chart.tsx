"use client"

import { useEffect, useRef } from "react"

interface DataPoint {
  label: string
  value: number
}

interface DoughnutChartProps {
  data: DataPoint[]
  height?: number
  colors?: string[]
}

export function DoughnutChart({
  data,
  height = 200,
  colors = ["#4f46e5", "#7c3aed", "#8b5cf6", "#a855f7", "#d946ef"],
}: DoughnutChartProps) {
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

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8
    const innerRadius = radius * 0.6 // For doughnut hole

    // Draw doughnut segments
    let startAngle = -Math.PI / 2 // Start from top
    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.value) / total
      const endAngle = startAngle + sliceAngle

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Fill with color
      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Draw inner circle to create doughnut hole
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()
      ctx.fillStyle = "#ffffff"
      ctx.fill()

      // Calculate position for label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 1.2
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      // Draw label line
      ctx.beginPath()
      const lineStartX = centerX + Math.cos(labelAngle) * radius
      const lineStartY = centerY + Math.sin(labelAngle) * radius
      const lineEndX = centerX + Math.cos(labelAngle) * (radius * 1.1)
      const lineEndY = centerY + Math.sin(labelAngle) * (radius * 1.1)
      ctx.moveTo(lineStartX, lineStartY)
      ctx.lineTo(lineEndX, lineEndY)
      ctx.strokeStyle = colors[index % colors.length]
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw label
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "#374151"
      ctx.textAlign = labelX > centerX ? "left" : "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.label} (${Math.round((item.value / total) * 100)}%)`, labelX, labelY)

      // Update start angle for next segment
      startAngle = endAngle
    })

    // Draw center text
    ctx.font = "bold 14px sans-serif"
    ctx.fillStyle = "#374151"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Total", centerX, centerY - 10)
    ctx.font = "bold 16px sans-serif"
    ctx.fillText(total.toString(), centerX, centerY + 10)
  }, [data, height, colors])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}
