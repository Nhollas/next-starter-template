import { Example } from "@/types"

import { AnimatedExampleCard } from "./AnimatedExampleCard"
import AnimatePresenceWrapper from "./AnimatePresenceWrapper"

export const Examples = ({ examples }: { examples: Example[] }) => (
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
        className="bg-secondary"
      />
    ))}
  </AnimatePresenceWrapper>
)
