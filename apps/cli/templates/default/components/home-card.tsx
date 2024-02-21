import { Layout } from "lucide-react"
import Link from "next/link"

import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card"

export function HomeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nextjs Starter Template</CardTitle>
        <CardDescription>
          Start building your project without faff.
        </CardDescription>
        <CardDescription>{new Date().toDateString()}</CardDescription>
        <Button variant="outline" asChild>
          <Link
            href="/csr-examples"
            className="ml-auto flex flex-row items-start gap-x-2"
          >
            <Layout className="h-4 w-4" />
            Example Page
          </Link>
        </Button>
      </CardHeader>
    </Card>
  )
}
