import { AnimatePresence, motion } from "framer-motion"
import { Pencil, RotateCw, Save } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui"

import { UpdateExampleFormValues } from "../../hooks/useEditExampleForm"

const AnimatedButton = motion(Button)

export const UpdateExampleButton = () => {
  const { watch, formState, setValue } =
    useFormContext<UpdateExampleFormValues>()

  const isOpen = watch("isOpen")

  const showDisabled = !formState.isDirty || formState.isSubmitting

  return (
    <>
      <Button
        variant="outline"
        type="button"
        className="aspect-square h-11"
        onClick={() => setValue("isOpen", !isOpen)}
      >
        <Pencil className="h-6 w-6 flex-shrink-0" />
        <span className="sr-only">Update Example</span>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <AnimatedButton
            initial={{ opacity: 0, x: -50, scale: 0.5 }}
            animate={{ opacity: showDisabled ? 0.5 : 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.5 }}
            transition={{
              type: "spring",
              duration: 0.5,
            }}
            variant="outline"
            type="submit"
            className="aspect-square h-11"
            disabled={showDisabled}
          >
            {formState.isSubmitting ? (
              <RotateCw className="h-6 w-6 flex-shrink-0 animate-spin" />
            ) : (
              <Save className="h-6 w-6 flex-shrink-0" />
            )}
            <span className="sr-only">Save</span>
          </AnimatedButton>
        )}
      </AnimatePresence>
    </>
  )
}
