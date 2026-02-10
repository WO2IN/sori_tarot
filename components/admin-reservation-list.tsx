"use client"

import { useState, useTransition } from "react"
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react"

import type { Reservation } from "@/app/admin/page"

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    confirmed: "border-green-500/30 bg-green-500/10 text-green-400",
    cancelled: "border-red-500/30 bg-red-500/10 text-red-400",
  }

  const labels: Record<string, string> = {
    pending: "대기 중",
    confirmed: "진행 중",
    completed: "완료",
    cancelled: "취소",
  }

  const key = status === "completed" ? "completed" : status

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        styles[key] || styles.pending
      }`}
    >
      {labels[status] || labels[key] || status}
    </span>
  )
}

type Props = {
  initialReservations: Reservation[]
}

export function AdminReservationList({ initialReservations }: Props) {
  const [reservations, setReservations] = useState(initialReservations)
  const [isPending, startTransition] = useTransition()
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [error, setError] = useState("")

  const updateStatus = (id: string, status: string) => {
    setUpdatingId(id)
    setError("")
    startTransition(async () => {
      const res = await fetch(`/api/admin/reservations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, id, created_at: reservations.find((r) => r.id === id)?.created_at }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "상태 변경에 실패했습니다.")
        setUpdatingId(null)
        return
      }

      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r)),
      )
      setUpdatingId(null)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {reservation.name}
                </h3>
                <StatusBadge status={reservation.status} />
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => updateStatus(reservation.id, "pending")}
                    disabled={isPending && updatingId === reservation.id}
                    className="rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground hover:border-yellow-500/60 hover:text-yellow-400 disabled:opacity-50"
                  >
                    대기중
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(reservation.id, "confirmed")}
                    disabled={isPending && updatingId === reservation.id}
                    className="rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground hover:border-green-500/60 hover:text-green-400 disabled:opacity-50"
                  >
                    진행 중
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(reservation.id, "completed")}
                    disabled={isPending && updatingId === reservation.id}
                    className="rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground hover:border-primary/60 hover:text-primary disabled:opacity-50"
                  >
                    완료
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(reservation.id, "cancelled")}
                    disabled={isPending && updatingId === reservation.id}
                    className="rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground hover:border-red-500/60 hover:text-red-400 disabled:opacity-50"
                  >
                    취소
                  </button>
                </div>
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
  )
}

