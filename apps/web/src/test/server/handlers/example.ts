import { http, HttpResponse } from "msw"

import { Example } from "@/app/features/example"
import { exampleGenerator } from "@/test/data-generators"

export const exampleHandlers = [
  http.get("/api/example/*", ({ request }) => {
    const id = new URL(request.url).pathname.split("/").pop()
    const example = exampleGenerator({ id })

    return HttpResponse.json<Example>(example)
  }),
  http.get("/api/examples", () =>
    HttpResponse.json<Example[]>(Array.from({ length: 5 }, exampleGenerator)),
  ),
]
