import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Moon, ArrowLeft, Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react"
import { StarField } from "@/components/star-field"

export const metadata = {
  title: "예약 관리 | 밤의 비밀 소리 타로",
  description: "밤의 비밀 소리 타로 예약 관리 페이지",
}

type Reservation = {
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    confirmed: "border-green-500/30 bg-green-500/10 text-green-400",
    cancelled: "border-red-500/30 bg-red-500/10 text-red-400",
  }

  const labels: Record<string, string> = {
    pending: "대기 중",
    confirmed: "확정",
    cancelled: "취소",
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status] || styles.pending}`}
    >
      {labels[status] || status}
    </span>
  )
}

export default async function AdminPage() {
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

          {/* Reservation Cards */}
          {!error && reservations && reservations.length > 0 && (
            <div className="flex flex-col gap-4">
              {(reservations as Reservation[]).map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {reservation.name}
                        </h3>
                        <StatusBadge status={reservation.status} />
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-primary/60" />
                          {reservation.service_type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary/60" />
                          {reservation.preferred_date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary/60" />
                          {reservation.preferred_time}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-primary/60" />
                          {reservation.phone}
                        </span>
                        {reservation.email && (
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-primary/60" />
                            {reservation.email}
                          </span>
                        )}
                      </div>

                      {reservation.message && (
                        <div className="mt-1 flex items-start gap-1.5 rounded-lg bg-background/50 p-3 text-sm text-foreground/70">
                          <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                          {reservation.message}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground/60">
                      {new Date(reservation.created_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
