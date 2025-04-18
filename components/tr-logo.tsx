import type { CSSProperties } from "react"

interface TRLogoProps {
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
}

export function TRLogo({ width = 200, height = 200, className = "", style = {} }: TRLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br from-neon-blue-800 to-neon-purple-800 rounded-lg overflow-hidden ${className}`}
      style={{ width, height, ...style }}
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-blue-500/20 to-neon-purple-500/20"></div>

      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue-500/0 via-neon-blue-500/30 to-neon-blue-500/0 opacity-50 animate-pulse"></div>

      <div className="relative z-10 text-center">
        <div className="text-6xl font-bold text-white">
          <span className="text-neon-blue-400 animate-glow">T</span>
          <span className="text-neon-purple-400 animate-glow">R</span>
        </div>
        <div className="text-xs text-white/80 mt-2 font-medium tracking-wider">CAREER PREDICTOR</div>
      </div>
    </div>
  )
}
