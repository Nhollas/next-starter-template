"use client";
import { RotateCw, Trash } from "lucide-react";
import { useState } from "react";

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
} from "@/components/ui";

import { useDeleteExampleMutation } from "../../api";

import { AnimatedActionButton } from "./AnimatedActionButton";

export const DeleteExample = ({ exampleId }: { exampleId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useDeleteExampleMutation(() =>
    setIsOpen(false),
  );

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <AnimatedActionButton
          layout
          variant="outline"
          className="aspect-square h-11"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-6 w-6 flex-shrink-0" />
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
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
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
  );
};
