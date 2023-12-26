import { createServer, Server } from "http"
import { AddressInfo } from "net"
import { parse } from "url"

import { test as base, Page } from "@playwright/test"
import { http } from "msw"
import type { SetupServer } from "msw/node"
import { setupServer } from "msw/node"
import next from "next"

export const test = base.extend<{
  port: string
  requestInterceptor: SetupServer
  http: typeof http
  enablePreviewMode: (page: Page) => Promise<() => Promise<void>>
}>({
  port: async ({}, use) => {
    const app = next({ dev: false })
    const handle = app.getRequestHandler()

    await app.prepare()

    const server: Server = await new Promise((resolve) => {
      const server = createServer((req, res) => {
        const parsedUrl = parse(req.url as string, true)
        handle(req, res, parsedUrl)
      })

      server.listen((error: any) => {
        if (error) throw error
        resolve(server)
      })
    })
    const port = String((server.address() as AddressInfo).port)
    await use(port)
  },
  requestInterceptor: async ({}, use) => {
    await use(
      (() => {
        const requestInterceptor = setupServer()

        requestInterceptor.listen({
          onUnhandledRequest: "bypass",
        })

        return requestInterceptor
      })(),
    )
  },
  http,
  enablePreviewMode: async ({ port }, use) => {
    async function enablePreviewMode(
      page: Page,
      base = `http://localhost:${port}`,
    ) {
      await page.goto(
        `${base}/api/preview?secret=${process.env.PREVIEW_SECRET}`,
      )

      return async function disablePreviewMode() {
        await page.goto(`${base}/api/exit-preview`)
      }
    }

    await use(enablePreviewMode)
  },
})

export default test
