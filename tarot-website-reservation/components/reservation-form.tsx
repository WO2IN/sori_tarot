"use client"

import React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Sparkles, CheckCircle, Loader2 } from "lucide-react"

const serviceOptions = [
  "연애 / 관계 리딩",
  "진로 / 커리어 리딩",
  "종합 운세 리딩",
]

const timeSlots = [
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
]

export function ReservationForm() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get("service") || ""

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_type: preselectedService,
    preferred_date: "",
    preferred_time: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || "예약 중 오류가 발생했습니다.")
        return
      }

      setIsSuccess(true)
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl border border-primary/30 bg-card p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">
          예약이 완료되었습니다
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          확인 후 연락드리겠습니다. 예약 관련 문의사항이 있으시면 편하게
          연락해 주세요.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false)
            setFormData({
              name: "",
              phone: "",
              email: "",
              service_type: "",
              preferred_date: "",
              preferred_time: "",
              message: "",
            })
          }}
          className="mt-2 rounded-lg bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          새 예약하기
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <User className="h-3.5 w-3.5 text-primary" />
          이름 <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력해 주세요"
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Phone className="h-3.5 w-3.5 text-primary" />
          연락처 <span className="text-destructive">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Mail className="h-3.5 w-3.5 text-primary" />
          이메일 <span className="text-xs text-muted-foreground">(선택)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Service Type */}
      <div className="flex flex-col gap-2">
        <label htmlFor="service_type" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          서비스 선택 <span className="text-destructive">*</span>
        </label>
        <select
          id="service_type"
          name="service_type"
          required
          value={formData.service_type}
          onChange={handleChange}
          className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">서비스를 선택해 주세요</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Date and Time */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="preferred_date" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            희망 날짜 <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            id="preferred_date"
            name="preferred_date"
            required
            min={minDate}
            value={formData.preferred_date}
            onChange={handleChange}
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preferred_time" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            희망 시간 <span className="text-destructive">*</span>
          </label>
          <select
            id="preferred_time"
            name="preferred_time"
            required
            value={formData.preferred_time}
            onChange={handleChange}
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">시간을 선택해 주세요</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MessageSquare className="h-3.5 w-3.5 text-primary" />
          추가 메시지 <span className="text-xs text-muted-foreground">(선택)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="궁금한 점이나 요청사항이 있으시면 적어주세요"
          className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            예약 처리 중...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            예약 신청하기
          </>
        )}
      </button>
    </form>
  )
}
