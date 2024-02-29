import { forwardRef } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui"
import { cn } from "@/lib/utils"

import { Example } from "../types"

import { ManageExampleContainer } from "./ManageExample"

export const ExampleCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    example: Example
  }
>(({ className, example }, ref) => (
  <Card
    ref={ref}
    className={cn("flex flex-col", className)}
    data-testid={`example-card-${example.id}`}
    id={example.id}
  >
    <ManageExampleContainer example={example}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
          {example.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="overflow-scroll">
          {example.description}
        </CardDescription>
      </CardContent>
    </ManageExampleContainer>
  </Card>
))

ExampleCard.displayName = "ExampleCard"

export const ExampleCardError = ({ className }: { className?: string }) => {
  return <div className={cn(" bg-destructive", className)}>Error...</div>
}

export const ExampleCardNotFound = ({ className }: { className?: string }) => {
  return <div className={cn("bg-warning ", className)}>Not Found...</div>
}

export const ExampleCardSkeleton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn("aspect-square bg-accent", className)} />
}
