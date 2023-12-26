"use client"

import { useExampleQuery } from "../api"

import {
  ExampleCardError,
  ExampleCardNotFound,
  ExampleCardSkeleton,
  ExampleCard,
} from "./ExampleCard"

export function ExampleContainer({ exampleId }: { exampleId: string }) {
  const { isLoading, isError, data } = useExampleQuery(exampleId)

  if (isLoading) {
    return <ExampleCardSkeleton />
  }

  if (isError) {
    return <ExampleCardError />
  }

  if (!data) {
    return <ExampleCardNotFound />
  }

  return <ExampleCard example={data} className="bg-secondary" />
}
