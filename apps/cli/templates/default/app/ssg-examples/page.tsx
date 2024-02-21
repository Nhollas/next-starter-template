import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { serverClient } from "@/lib/clients";

import { Button } from "@/components/ui";
import { ExampleCard, ExamplesGrid, getExamples } from "@/features/example";

export default async function SSGPAGE() {
  const examples = await getExamples(serverClient);

  return (
    <section className="w-full space-y-8">
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link
            href="/ssr-examples"
            className="flex flex-row items-start gap-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            SSR Examples
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl font-medium">SSG Examples Page</h1>
      <ExamplesGrid>
        {examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </ExamplesGrid>
    </section>
  );
}
