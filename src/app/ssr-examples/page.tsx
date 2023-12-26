import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui"
import { ExampleCard, ExamplesGrid, getExamples } from "@/features/example"
import { exampleClient } from "@/lib/clients"

export default async function SSRPAGE() {
  const examples = await getExamples(exampleClient)

  return (
    <section className="w-full space-y-8">
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link
            href="/csr-examples"
            className="flex flex-row items-start gap-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            CSR Examples
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="/design-system"
            className="flex flex-row items-start gap-x-2"
          >
            <ArrowRight className="h-4 w-4" />
            Design System
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl font-medium">SSR Examples Page</h1>
      <ExamplesGrid>
        {examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </ExamplesGrid>
    </section>
  )
}
