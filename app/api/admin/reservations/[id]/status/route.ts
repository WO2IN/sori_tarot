import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")?.value

  if (adminSession !== "ok") {
    return NextResponse.json({ error: "인증되지 않은 요청입니다." }, { status: 401 })
  }

  const { status, id, created_at } = await request
    .json()
    .catch(() => ({ status: "", id: undefined, created_at: undefined }))

  if (!status) {
    return NextResponse.json({ error: "상태 값이 필요합니다." }, { status: 400 })
  }

  const allowed = ["pending", "confirmed", "completed", "cancelled"]
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "허용되지 않은 상태 값입니다." }, { status: 400 })
  }

  const supabase = await createClient()

  let query = supabase.from("reservations").update({ status })

  if (id !== undefined && id !== null) {
    query = query.eq("id", id)
  } else if (created_at) {
    query = query.eq("created_at", created_at)
  } else {
    return NextResponse.json({ error: "예약을 식별할 수 없습니다." }, { status: 400 })
  }

  const { error } = await query

  if (error) {
    console.error("Update status error:", error)
    return NextResponse.json(
      { error: error.message || "상태 변경 중 오류가 발생했습니다." },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}

