"use client"
import { CopyPlus } from "lucide-react"

import { Example } from "@/types"

import { useDuplicateExampleMutation } from "../../api"

import { AnimatedActionButton } from "./AnimatedActionButton"

export const DuplicateExampleButton = ({ example }: { example: Example }) => {
  const { mutate, isPending } = useDuplicateExampleMutation()

  return (
    <AnimatedActionButton
      layout
      variant="outline"
      type="button"
      disabled={isPending}
      className="aspect-square h-10"
      onClick={() => mutate(example)}
    >
      <CopyPlus className="h-5 w-5 flex-shrink-0" />
      <span className="sr-only">Duplicate</span>
    </AnimatedActionButton>
  )
}