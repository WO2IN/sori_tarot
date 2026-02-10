import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Moon, Star } from "lucide-react"
import { StarField } from "@/components/star-field"
import { ReservationForm } from "@/components/reservation-form"

export const metadata = {
  title: "예약하기 | 밤의 비밀 소리 타로",
  description: "밤의 비밀 소리 타로 1:1 상담을 예약하세요.",
}

export default function ReservationPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen">
        {/* Top bar */}
        <div className="border-b border-border/30 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              돌아가기
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <span className="font-serif text-base font-bold text-primary">
                밤의 비밀 소리 타로
              </span>
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-4 text-xs tracking-[0.3em] text-primary">
              RESERVATION
            </span>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">상담 예약</span>
            </h1>
            <p className="mt-4 max-w-lg text-balance text-sm leading-relaxed text-muted-foreground">
              아래 양식을 작성해 주시면 확인 후 연락드리겠습니다.
              <br />
              모든 상담은 1:1 프라이빗으로 진행됩니다.
            </p>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-12 bg-primary/30" />
              <Star className="h-3 w-3 text-primary/50" />
              <div className="h-px w-12 bg-primary/30" />
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm sm:p-10">
            <Suspense fallback={<div className="py-10 text-center text-muted-foreground">로딩 중...</div>}>
              <ReservationForm />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
