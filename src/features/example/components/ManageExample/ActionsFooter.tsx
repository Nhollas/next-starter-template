import { CardFooter } from "@/components/ui"

import { DeleteExample } from "./DeleteExample"
import { UpdateExampleButton } from "./UpdateExampleButton"

export const ActionsFooter = ({ exampleId }: { exampleId: string }) => {
  return (
    <CardFooter className="flex flex-row gap-x-2">
      <DeleteExample exampleId={exampleId} />
      <UpdateExampleButton />
    </CardFooter>
  )
}
