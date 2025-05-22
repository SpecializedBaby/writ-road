"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface BaseProps {
  children: ReactNode
  href?: string
  variant?: "primary" | "outline"
  className?: string
}

// Наследуем ВСЕ стандартные props кнопки (включая onClick, disabled, etc.)
type NativeButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonProps = BaseProps & NativeButtonProps

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props // остальные HTML-атрибуты (onClick, disabled и т.п.)
}: ButtonProps) {
  const buttonClasses = `btn ${variant === "primary" ? "btn-primary" : "btn-outline"} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}
