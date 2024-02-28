import { Pencil, RotateCw, Save } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { UpdateExampleFormValues } from "../../hooks/useEditExampleForm"
import AnimatePresenceWrapper from "../AnimatePresenceWrapper"

import { AnimatedActionButton } from "./AnimatedActionButton"

export const UpdateExampleButton = () => {
  const { watch, formState, setValue } =
    useFormContext<UpdateExampleFormValues>()

  const isOpen = watch("isOpen")

  const showDisabled = !formState.isDirty || formState.isSubmitting

  return (
    <>
      <AnimatedActionButton
        layout
        variant="outline"
        type="button"
        className="z-20 aspect-square h-10"
        onClick={() => setValue("isOpen", !isOpen)}
      >
        <Pencil className="h-5 w-5 flex-shrink-0" />
        <span className="sr-only">Update Example</span>
      </AnimatedActionButton>
      <AnimatePresenceWrapper mode="popLayout">
        {isOpen && (
          <AnimatedActionButton
            layout
            initial={{ opacity: 0, x: -50, scale: 0.5 }}
            animate={{ opacity: showDisabled ? 0.5 : 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.5 }}
            transition={{
              type: "spring",
              duration: 0.5,
            }}
            variant="outline"
            type="submit"
            className="z-10 aspect-square h-10"
            disabled={showDisabled}
          >
            {formState.isSubmitting ? (
              <RotateCw className="h-5 w-5 flex-shrink-0 animate-spin" />
            ) : (
              <Save className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="sr-only">Save</span>
          </AnimatedActionButton>
        )}
      </AnimatePresenceWrapper>
    </>
  )
}
