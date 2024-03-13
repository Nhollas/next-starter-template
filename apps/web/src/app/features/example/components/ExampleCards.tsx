import AnimatePresenceWrapper from "@/app/components/animation/AnimatePresenceWrapper"

import { Example } from "../types"

import { AnimatedExampleCard } from "./animation/AnimatedExampleCard"
import { ManageExampleContainer } from "./ManageExampleContainer"

import { ExampleCardBody } from "."

export const ExampleCards = ({ examples }: { examples: Example[] }) => (
  <AnimatePresenceWrapper mode="popLayout">
    {examples.map((example) => (
      <AnimatedExampleCard
        layout
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 0.3,
          layout: { duration: 0.5 },
        }}
        key={example.id}
        example={example}
      >
        <ManageExampleContainer example={example}>
          <ExampleCardBody example={example} />
        </ManageExampleContainer>
      </AnimatedExampleCard>
    ))}
  </AnimatePresenceWrapper>
)
