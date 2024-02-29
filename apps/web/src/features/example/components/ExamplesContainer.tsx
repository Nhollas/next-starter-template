"use client"

import { useExamplesQuery } from "../api/getExamples"

import { ExampleCardError, ExampleCardSkeleton } from "./ExampleCardContainer"
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
