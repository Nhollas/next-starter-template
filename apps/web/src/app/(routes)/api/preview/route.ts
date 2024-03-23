import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

import { serverEnv } from "@/app/lib/env"

const { DRAFTMODE_SECRET } = serverEnv()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== DRAFTMODE_SECRET) {
    return new Response("Invalid Secret", { status: 401 })
  }

  draftMode().enable()

  redirect("/")
}
