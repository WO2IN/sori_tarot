"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock, Loader2, ArrowLeft, Moon } from "lucide-react"

import { StarField } from "@/components/star-field"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "로그인에 실패했습니다.")
        return
      }

      router.push("/admin")
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <StarField />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border/50 bg-background/80 p-8 shadow-lg backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              메인으로
            </Link>
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-primary" />
              <span className="font-serif text-sm font-semibold text-primary">
                관리자 로그인
              </span>
            </div>
          </div>

          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h1 className="font-serif text-xl font-bold text-foreground">
              예약 관리 페이지 접속
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              관리자 비밀번호를 입력하면 예약 내역을 확인할 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-medium text-foreground">
                관리자 비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="비밀번호를 입력해 주세요"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  확인 중...
                </>
              ) : (
                "예약 관리 페이지로 들어가기"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

