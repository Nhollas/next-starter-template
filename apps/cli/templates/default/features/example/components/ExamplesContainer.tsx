"use client";

import { useExamplesQuery } from "../api/getExamples";

import { ExampleCardError, ExampleCardSkeleton } from "./ExampleCard";
import { Examples } from "./Examples";

export function ExamplesContainer() {
  const { isError, isLoading, data: examples } = useExamplesQuery();

  if (isLoading) {
    return Array.from({ length: 6 }, (_, i) => (
      <ExampleCardSkeleton className="h-full w-full" key={i} />
    ));
  }

  if (isError) {
    return <ExampleCardError />;
  }

  if (!examples) {
    return <div>Not Found...</div>;
  }

  return <Examples examples={examples} />;
}
