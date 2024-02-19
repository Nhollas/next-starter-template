import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

import { serverEnv } from "@/lib/env"

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== serverEnv().DRAFTMODE_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  draftMode().enable()

  redirect("/")
}
