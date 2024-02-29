import { Eraser, Pencil, RotateCw, Save } from "lucide-react"
import { Fragment } from "react"

import AnimatePresenceWrapper from "../AnimatePresenceWrapper"

import { AnimatedActionButton } from "./AnimatedActionButton"

export const UpdateExampleButton = ({
  saveDisabled,
  isSubmitting,
  editOpen,
  openForm,
  closeForm,
}: {
  saveDisabled: boolean
  isSubmitting: boolean
  editOpen: boolean
  openForm: () => void
  closeForm: () => void
}) => {
  return (
    <Fragment>
      <EditButton
        openForm={openForm}
        closeForm={closeForm}
        editOpen={editOpen}
      />
      {editOpen && (
        <SaveButton saveDisabled={saveDisabled} isSubmitting={isSubmitting} />
      )}
    </Fragment>
  )
}

function EditButton({
  openForm,
  closeForm,
  editOpen,
}: {
  openForm: () => void
  closeForm: () => void
  editOpen: boolean
}) {
  return (
    <AnimatedActionButton
      layout
      variant="outline"
      className="z-20 aspect-square h-10"
      type="button"
      onClick={() => (editOpen ? closeForm() : openForm())}
    >
      {editOpen ? (
        <>
          <Eraser className="h-5 w-5 flex-shrink-0" />
          <span className="sr-only">Cancel Edit</span>
        </>
      ) : (
        <>
          <Pencil className="h-5 w-5 flex-shrink-0" />
          <span className="sr-only">Update Example</span>
        </>
      )}
    </AnimatedActionButton>
  )
}

function SaveButton({
  saveDisabled,
  isSubmitting,
}: {
  saveDisabled: boolean
  isSubmitting: boolean
}) {
  return (
    <AnimatePresenceWrapper mode="popLayout">
      <AnimatedActionButton
        layout
        initial={{ opacity: 0, x: -50, scale: 0.5 }}
        animate={{ opacity: saveDisabled ? 0.5 : 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.5 }}
        transition={{
          type: "spring",
          duration: 0.5,
        }}
        variant="outline"
        type="submit"
        className="z-10 aspect-square h-10"
        disabled={saveDisabled}
      >
        {isSubmitting ? (
          <RotateCw className="h-5 w-5 flex-shrink-0 animate-spin" />
        ) : (
          <Save className="h-5 w-5 flex-shrink-0" />
        )}
        <span className="sr-only">Save</span>
      </AnimatedActionButton>
    </AnimatePresenceWrapper>
  )
}
