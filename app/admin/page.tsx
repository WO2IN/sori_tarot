import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Moon, ArrowLeft, Calendar } from "lucide-react"
import { StarField } from "@/components/star-field"
import { AdminReservationList } from "@/components/admin-reservation-list"

export const metadata = {
  title: "예약 관리 | 밤의 비밀 소리 타로",
  description: "밤의 비밀 소리 타로 예약 관리 페이지",
}

export type Reservation = {
  id: string
  name: string
  phone: string
  email: string | null
  service_type: string
  preferred_date: string
  preferred_time: string
  message: string | null
  status: string
  created_at: string
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")?.value

  if (adminSession !== "ok") {
    redirect("/admin/login")
  }

  const supabase = await createClient()

  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen">
        {/* Top bar */}
        <div className="border-b border-border/30 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              홈으로
            </Link>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <span className="font-serif text-base font-bold text-primary">
                예약 관리
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              예약 현황
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {`총 ${reservations?.length ?? 0}건의 예약이 있습니다.`}
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              예약 목록을 불러오는 중 오류가 발생했습니다.
            </div>
          )}

          {!error && reservations && reservations.length === 0 && (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-card py-16 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                아직 예약이 없습니다.
              </p>
            </div>
          )}

          {!error && reservations && reservations.length > 0 && (
            <AdminReservationList initialReservations={reservations as Reservation[]} />
          )}
        </div>
      </div>
    </>
  )
}

