import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      //className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}
      className={`bg-white mt-8 rounded-lg shadow-md border-l-4 border-teal-700 ${className || ''}`}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`p-6 ${className || ''}`}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardContent }