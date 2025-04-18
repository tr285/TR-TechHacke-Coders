import { Phone, Mail, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactButtonsProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showLabels?: boolean
  className?: string
}

export function ContactButtons({
  variant = "outline",
  size = "default",
  showLabels = true,
  className = "",
}: ContactButtonsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a href="tel:7420812179" target="_blank" rel="noopener noreferrer">
        <Button variant={variant} size={size} className="group">
          <Phone className="h-4 w-4 mr-2 group-hover:text-neon-blue-400 transition-colors" />
          {showLabels && <span>7420812179</span>}
        </Button>
      </a>

      <a href="mailto:goretukaram62@gmail.com" target="_blank" rel="noopener noreferrer">
        <Button variant={variant} size={size} className="group">
          <Mail className="h-4 w-4 mr-2 group-hover:text-neon-purple-400 transition-colors" />
          {showLabels && <span>Email</span>}
        </Button>
      </a>

      <a href="https://instagram.com/tuka_r_gore" target="_blank" rel="noopener noreferrer">
        <Button variant={variant} size={size} className="group">
          <Instagram className="h-4 w-4 mr-2 group-hover:text-neon-green-400 transition-colors" />
          {showLabels && <span>Instagram</span>}
        </Button>
      </a>
    </div>
  )
}
