import { http, HttpResponse } from "msw"

import { exampleGenerator } from "@/test/data-generators"
import { Example } from "@/types"

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
