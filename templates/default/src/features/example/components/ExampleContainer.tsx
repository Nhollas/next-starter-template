"use client"

import { useExampleQuery } from "../api"

import {
  ExampleCardError,
  ExampleCardNotFound,
  ExampleCardSkeleton,
  ExampleCard,
} from "./ExampleCard"

export function ExampleContainer({ exampleId }: { exampleId: string }) {
  const { isLoading, isError, data: example } = useExampleQuery(exampleId)

  if (isLoading) {
    return <ExampleCardSkeleton />
  }

  if (isError) {
    return <ExampleCardError />
  }

  if (!example) {
    return <ExampleCardNotFound />
  }

  return <ExampleCard example={example} className="bg-secondary" />
}
