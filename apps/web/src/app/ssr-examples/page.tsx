import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui"
import {
  ExampleCardBody,
  ExampleCardContainer,
  ExamplesGrid,
  getExamples,
} from "@/features/example"
import { ExampleClient } from "@/lib/clients/example-client"

export default async function SSRPAGE() {
  const examples = await getExamples(ExampleClient)

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
            href="/ssg-examples"
            className="flex flex-row items-start gap-x-2"
          >
            SSG Examples
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl font-medium">SSR Examples Page</h1>
      <ExamplesGrid>
        {examples.map((example) => (
          <ExampleCardContainer key={example.id} example={example}>
            <ExampleCardBody example={example} />
          </ExampleCardContainer>
        ))}
      </ExamplesGrid>
    </section>
  )
}
