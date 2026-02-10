import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service_type, preferred_date, preferred_time, message } = body

    // Validation
    if (!name || !phone || !service_type || !preferred_date || !preferred_time) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해 주세요." },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from("reservations").insert([
      {
        name,
        phone,
        email: email || null,
        service_type,
        preferred_date,
        preferred_time,
        message: message || null,
      },
    ]).select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "예약 저장 중 오류가 발생했습니다." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "예약이 완료되었습니다.", data },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: "예약 조회 중 오류가 발생했습니다." },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
