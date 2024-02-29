"use client"
import { RotateCw, Trash } from "lucide-react"
import { useState } from "react"

import {
  Button,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui"

import { useDeleteExampleMutation } from "../../api"

import { AnimatedActionButton } from "./AnimatedActionButton"

export const DeleteExample = ({ exampleId }: { exampleId: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const closeDialog = () => setDialogOpen(false)
  const openDialog = () => setDialogOpen(true)

  const { mutate, isPending } = useDeleteExampleMutation(() => closeDialog())

  return (
    <AlertDialog open={dialogOpen}>
      <AlertDialogTrigger asChild>
        <AnimatedActionButton
          layout
          variant="outline"
          className="aspect-square h-10"
          onClick={() => openDialog()}
        >
          <Trash className="h-5 w-5 flex-shrink-0" />
          <span className="sr-only">Delete Example</span>
        </AnimatedActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this example?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeDialog()}>
            Cancel
          </AlertDialogCancel>
          {isPending ? (
            <AlertDialogAction disabled>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </AlertDialogAction>
          ) : (
            <Button variant="destructive" onClick={() => mutate(exampleId)}>
              Confirm
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
