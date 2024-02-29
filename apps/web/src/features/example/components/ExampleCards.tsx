import { Example } from "../types"

import { AnimatedExampleCardContainer } from "./AnimatedExampleCardContainer"
import AnimatePresenceWrapper from "./AnimatePresenceWrapper"
import { ManageExampleContainer } from "./ManageExample"

import { ExampleCardBody } from "."

export const ExampleCards = ({ examples }: { examples: Example[] }) => (
  <AnimatePresenceWrapper mode="popLayout">
    {examples.map((example) => (
      <AnimatedExampleCardContainer
        layout
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 0.3,
          layout: { duration: 0.5 },
        }}
        key={example.id}
        example={example}
        className="bg-secondary"
      >
        <ManageExampleContainer example={example}>
          <ExampleCardBody example={example} />
        </ManageExampleContainer>
      </AnimatedExampleCardContainer>
    ))}
  </AnimatePresenceWrapper>
)
