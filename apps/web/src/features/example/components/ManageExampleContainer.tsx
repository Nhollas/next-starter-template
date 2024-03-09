"use client"
import { motion } from "framer-motion"
import { useState } from "react"

import AnimatePresenceWrapper from "@/components/animation/AnimatePresenceWrapper"
import { CardFooter, Form } from "@/components/ui"

import { useUpdateExampleMutation } from "../api/updateExample"
import {
  EditExampleForm,
  useEditExampleForm,
} from "../hooks/useEditExampleForm"
import { Example } from "../types"

import { AnimatedEditExample } from "./animation/AnimatedEditExample"
import { DeleteExample } from "./DeleteExample"
import { DuplicateExampleButton } from "./DuplicateExampleButton"
import { UpdateExampleButton } from "./UpdateExampleButton"

export const ManageExampleContainer = ({
  children,
  example,
}: {
  children: React.ReactNode
  example: Example
}) => {
  const form = useEditExampleForm(example)
  const {
    watch,
    formState: { isDirty, isSubmitting },
  } = form

  const [editOpen, setEditOpen] = useState(false)

  const closeForm = () => setEditOpen(false)
  const openForm = () => setEditOpen(true)

  const { mutateAsync } = useUpdateExampleMutation(() => {
    closeForm()
    form.reset({ ...watch() })
  })

  const saveDisabled = !isDirty || isSubmitting

  const handleSubmit = async (values: EditExampleForm) => {
    await mutateAsync({ ...example, ...values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex grow flex-col"
      >
        <AnimatePresenceWrapper mode="popLayout">
          {editOpen ? (
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
        <CardFooter className="flex flex-row gap-x-2">
          <DeleteExample exampleId={example.id} />
          <UpdateExampleButton
            saveDisabled={saveDisabled}
            editOpen={editOpen}
            isSubmitting={isSubmitting}
            openForm={openForm}
            closeForm={closeForm}
          />
          <DuplicateExampleButton example={example} />
        </CardFooter>
      </form>
    </Form>
  )
}
