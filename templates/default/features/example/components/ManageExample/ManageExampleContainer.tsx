"use client"
import { motion } from "framer-motion"

import { Form } from "@/components/ui"
import { Example } from "@/types"

import { useUpdateExampleMutation } from "../../api/updateExample"
import {
  UpdateExampleFormValues,
  useEditExampleForm,
} from "../../hooks/useEditExampleForm"
import AnimatePresenceWrapper from "../AnimatePresenceWrapper"

import { ActionsFooter } from "./ActionsFooter"
import { AnimatedEditExample } from "./AnimatedEditExample"

export const ManageExampleContainer = ({
  children,
  example,
}: {
  children: React.ReactNode
  example: Example
}) => {
  const form = useEditExampleForm(example)
  const { watch } = form

  const { mutateAsync } = useUpdateExampleMutation(() => {
    form.setValue("isOpen", false)
    form.reset({ ...watch() })
  })

  const isOpen = form.watch("isOpen")

  const handleSubmit = async (values: UpdateExampleFormValues) => {
    await mutateAsync({ ...example, ...values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex grow flex-col"
      >
        <AnimatePresenceWrapper mode="popLayout">
          {isOpen ? (
            <AnimatedEditExample
              form={form}
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 0.5,
              }}
            />
          ) : (
            <motion.div
              layout
              className="flex h-full flex-col"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 0.5,
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresenceWrapper>
        <ActionsFooter example={example} />
      </form>
    </Form>
  )
}
