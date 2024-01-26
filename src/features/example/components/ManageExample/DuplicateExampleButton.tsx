"use client"
import { CopyPlus } from "lucide-react"

import { Button } from "@/components/ui"
import { Example } from "@/types"

import { useDuplicateExampleMutation } from "../../api"

export const DuplicateExampleButton = ({ example }: { example: Example }) => {
  const { mutate, isPending } = useDuplicateExampleMutation(() =>
    console.log("duped"),
  )

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isPending}
      className="aspect-square h-11"
      onClick={() => mutate(example)}
    >
      <CopyPlus className="h-6 w-6 flex-shrink-0" />
      <span className="sr-only">Duplicate</span>
    </Button>
  )
}
