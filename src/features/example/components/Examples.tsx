"use client"
import { AnimatePresence } from "framer-motion"

import { Example } from "@/types"

import { AnimatedExampleCard } from "./AnimatedExampleCard"

export const Examples = ({ examples }: { examples: Example[] }) => (
  <AnimatePresence mode="popLayout">
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
  </AnimatePresence>
)
