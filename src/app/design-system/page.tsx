import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui"
import { ExampleCard, ExamplesGrid } from "@/features/example"
import { exampleGenerator } from "@/test/data-generators"

export default async function DesignSystem() {
  const colors = [
    "border",
    "input",
    "ring",
    "background",
    "foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "destructive",
    "destructive-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "popover",
    "popover-foreground",
    "card",
    "card-foreground",
  ]

  return (
    <section className="w-full space-y-8">
      <Button variant="outline" asChild>
        <Link
          href="/csr-examples"
          className="ml-auto flex flex-row items-start gap-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          CSR Examples
        </Link>
      </Button>
      <h1 className="bg text-2xl font-medium">Design System Page</h1>
      <ExamplesGrid>
        {colors.map((color) => (
          <ExampleCard
            key={color}
            example={exampleGenerator({ title: color, description: "" })}
            className={`bg-${color}`}
          />
        ))}
      </ExamplesGrid>
    </section>
  )
}
