"use client"

import { AnimatePresence, AnimatePresenceProps } from "framer-motion"

interface AnimatePresenceWrapperProps extends AnimatePresenceProps {
  children: React.ReactNode
}

export default function AnimatePresenceWrapper({
  children,
  ...props
}: AnimatePresenceWrapperProps) {
  return <AnimatePresence {...props}>{children}</AnimatePresence>
}
