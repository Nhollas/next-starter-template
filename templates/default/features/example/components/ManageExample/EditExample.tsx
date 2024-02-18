import { forwardRef } from "react"
import { UseFormReturn } from "react-hook-form"

import {
  CardHeader,
  CardContent,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from "../../../../components/ui"

import { UpdateExampleFormValues } from "../../hooks/useEditExampleForm"

export const EditExample = forwardRef<
  HTMLDivElement,
  {
    form: UseFormReturn<UpdateExampleFormValues>
  }
>(({ form }, ref) => {
  return (
    <div ref={ref} className="flex h-full flex-col">
      <CardHeader className="p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Title"
                  className="border-none px-2 text-2xl font-semibold leading-none tracking-tight outline outline-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </CardHeader>
      <CardContent className="flex h-full grow flex-col justify-between space-y-4 p-4 pt-0">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex grow">
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="border-none px-2 text-sm text-muted-foreground outline outline-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </CardContent>
    </div>
  )
})

EditExample.displayName = "EditExample"
