import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }))

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: "서버에 관리자 비밀번호가 설정되어 있지 않습니다." },
      { status: 500 },
    )
  }

  if (password !== adminPassword) {
    return NextResponse.json(
      { error: "관리자 비밀번호가 올바르지 않습니다." },
      { status: 401 },
    )
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  })

  return NextResponse.json({ success: true })
}

