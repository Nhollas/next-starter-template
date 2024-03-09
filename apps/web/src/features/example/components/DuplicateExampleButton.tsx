"use client"
import { CopyPlus, RotateCw } from "lucide-react"
import { useEffect, useState } from "react"

import { useDuplicateExampleMutation } from "../api"
import { Example } from "../types"

import { AnimatedActionButton } from "./animation/AnimatedActionButton"

export const DuplicateExampleButton = ({ example }: { example: Example }) => {
  const [newExampleId, setNewExampleId] = useState<string | undefined>(
    undefined,
  )
  const { mutate, isPending } = useDuplicateExampleMutation(
    (duplicatedExample) => setNewExampleId(duplicatedExample.id),
  )

  useEffect(() => {
    if (newExampleId) {
      scrollToDuplicatedExample(newExampleId)
    }
  }, [newExampleId])

  return (
    <AnimatedActionButton
      layout
      variant="outline"
      type="button"
      disabled={isPending}
      className="aspect-square h-10"
      onClick={() => mutate(example)}
    >
      {isPending ? (
        <RotateCw className="h-5 w-5 flex-shrink-0 animate-spin" />
      ) : (
        <>
          <CopyPlus className="h-5 w-5 flex-shrink-0" />
          <span className="sr-only">Duplicate</span>
        </>
      )}
    </AnimatedActionButton>
  )
}

function scrollToDuplicatedExample(newExampleId: string) {
  const element = document.getElementById(newExampleId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}
