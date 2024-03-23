import { cn } from "@/app/lib/utils"
import React from "react"

type HeadingProps = {
  slot?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ slot: Slot = "h2", className, ...props }, ref) => (
    <Slot
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
)

Heading.displayName = "Heading"

export { Heading }
