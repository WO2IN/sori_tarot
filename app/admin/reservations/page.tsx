import { ArrowLeft, Moon } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { StarField } from "@/components/star-field"

type Reservation = {
  id: number
  created_at: string
  name: string
  phone: string
  email: string | null
  service_type: string
  preferred_date: string
  preferred_time: string
  message: string | null
}

export const metadata = {
  title: "예약 관리 | 밤의 비밀 소리 타로",
  description: "손님 예약 내역을 확인하는 관리자 페이지입니다.",
}

export default async function AdminReservationsPage() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")?.value

  if (adminSession !== "ok") {
    redirect("/admin/login")
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })

  const reservations = (data ?? []) as Reservation[]

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen">
        {/* Top bar */}
        <div className="border-b border-border/30 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              메인으로
            </a>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <span className="font-serif text-base font-bold text-primary">
                밤의 비밀 소리 타로 · 관리자
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              예약 관리
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              손님들이 남긴 예약 신청을 한눈에 확인할 수 있는 페이지입니다.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              예약 정보를 불러오는 중 오류가 발생했습니다. Supabase 설정을 확인해 주세요.
            </div>
          )}

          {reservations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-card/60 p-10 text-center text-sm text-muted-foreground">
              아직 들어온 예약이 없습니다.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-sm">
              <div className="max-h-[70vh] overflow-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="sticky top-0 bg-background/90 backdrop-blur">
                    <tr className="border-b border-border/60 text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-4 py-3">예약일시(생성)</th>
                      <th className="px-4 py-3">이름</th>
                      <th className="px-4 py-3">연락처</th>
                      <th className="px-4 py-3">서비스</th>
                      <th className="px-4 py-3">희망 날짜/시간</th>
                      <th className="px-4 py-3">메모</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-border/40 last:border-b-0 hover:bg-muted/40"
                      >
                        <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-muted-foreground">
                          {r.created_at
                            ? new Date(r.created_at).toLocaleString("ko-KR", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 align-top text-sm font-medium text-foreground">
                          {r.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 align-top text-sm">
                          {r.phone}
                          {r.email && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              {r.email}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top text-sm">
                          {r.service_type}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 align-top text-sm">
                          {r.preferred_date} {r.preferred_time && `· ${r.preferred_time}`}
                        </td>
                        <td className="max-w-xs px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                          {r.message || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

