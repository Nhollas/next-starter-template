"use client"

import { useExamplesQuery } from "@/app/features/example"

import { ExampleCardError, ExampleCardSkeleton } from "./ExampleCard"
import { ExampleCards } from "./ExampleCards"

export function ExamplesContainer() {
  const { isError, isLoading, data: examples } = useExamplesQuery()

  if (isLoading) {
    return Array.from({ length: 6 }, (_, i) => (
      <ExampleCardSkeleton className="h-full w-full" key={i} />
    ))
  }

  if (isError) {
    return <ExampleCardError />
  }

  if (!examples) {
    return <div>Not Found...</div>
  }

  return <ExampleCards examples={examples} />
}
