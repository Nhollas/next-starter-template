import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "../../components/ui"
import { ExampleCardSkeleton, ExamplesGrid } from "../../features/example"

export default function Loading() {
  return (
    <section className="w-full space-y-8">
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/" className="flex flex-row items-start gap-x-2">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="/ssr-examples"
            className="flex flex-row items-start gap-x-2"
          >
            SSR Examples
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl font-medium">SSR Examples Page</h1>
      <ExamplesGrid>
        {Array.from({ length: 6 }, (_, i) => (
          <ExampleCardSkeleton className="h-full w-full" key={i} />
        ))}
      </ExamplesGrid>
    </section>
  )
}
