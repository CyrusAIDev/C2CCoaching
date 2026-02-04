import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  children: React.ReactNode
  href: string
  size?: "sm" | "default" | "lg"
  className?: string
}

export function CTAButton({ children, href, size = "default", className }: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    default: "px-8 py-6 text-base",
    lg: "px-10 py-6 text-lg",
  }

  return (
    <Link
      href={href}
      className={cn(
        "bg-c2c-teal hover:bg-c2c-teal/90 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-[0_0_25px_rgba(58,166,168,0.3)] inline-block text-center",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Link>
  )
}
