import { createServer, Server } from "http"
import { AddressInfo } from "net"
import { parse } from "url"

import { Page, test as base } from "@playwright/test"
import { http } from "msw"
import type { SetupServer } from "msw/node"
import { setupServer } from "msw/node"
import next from "next"

import { serverEnv } from "@/app/lib/env"

export const buildLocalUrl = (path: string, port: string) => {
  return `http://localhost:${port}${path}`
}

export const test = base.extend<
  { http: typeof http },
  {
    port: string
    requestInterceptor: SetupServer
    enablePreviewMode: (page: Page) => Promise<() => Promise<void>>
  }
>({
  baseURL: async ({ port }, use) => {
    await use(buildLocalUrl("", port))
  },
  port: [
    async ({}, use) => {
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
    { scope: "worker", auto: true },
  ],

  requestInterceptor: [
    async ({}, use) => {
      const requestInterceptor = setupServer()

      requestInterceptor.listen({
        onUnhandledRequest: "warn",
      })

      await use(requestInterceptor)
    },
    { scope: "worker" },
  ],
  http,
  enablePreviewMode: [
    async ({ port }, use) => {
      async function enablePreviewMode(
        page: Page,
        base = `http://localhost:${port}`,
      ) {
        await page.goto(
          `${base}/api/preview?secret=${serverEnv().DRAFTMODE_SECRET}`,
        )

        return async function disablePreviewMode() {
          await page.goto(`${base}/api/exit-preview`)
        }
      }

      await use(enablePreviewMode)
    },
    { scope: "worker" },
  ],
})

export default test
