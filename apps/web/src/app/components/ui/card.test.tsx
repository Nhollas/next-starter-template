import { render, screen } from "@/test/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "."

const components = [
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
]

describe("Card.tsx component tests", () => {
  test("Components are compounded, ordered, and render content correctly.", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>CardTitle</CardTitle>
          <CardDescription>CardDescription</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>,
    )
  })
})

test.each(components)("passes down native HTML attributes", (Component) => {
  const testId = "test-id"
  const className = "test-class"
  const id = "test-id"

  render(
    <Component id={id} data-testid={testId} className={className}>
      Test Content
    </Component>,
  )

  const element = screen.getByTestId(testId)

  expect(element).toHaveClass(className)
  expect(element).toHaveAttribute("id", id)
  expect(screen.getByText("Test Content")).toBeInTheDocument()
})
