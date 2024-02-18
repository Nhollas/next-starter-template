import { CardFooter } from "@/components/ui"
import { Example } from "@/types"

import { DeleteExample } from "./DeleteExample"
import { DuplicateExampleButton } from "./DuplicateExampleButton"
import { UpdateExampleButton } from "./UpdateExampleButton"

export const ActionsFooter = ({ example }: { example: Example }) => {
  return (
    <CardFooter className="flex flex-row gap-x-2">
      <DeleteExample exampleId={example.id} />
      <UpdateExampleButton />
      <DuplicateExampleButton example={example} />
    </CardFooter>
  )
}
