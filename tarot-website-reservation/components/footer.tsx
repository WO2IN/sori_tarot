import Link from "next/link"
import { Moon, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold text-primary">
                밤의 비밀 소리 타로
              </span>
            </Link>
            <p className="text-center text-xs text-muted-foreground md:text-left">
              별이 속삭이는 당신의 이야기
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              href="#services"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              서비스
            </Link>
            <Link
              href="#about"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              소개
            </Link>
            <Link
              href="#testimonials"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              후기
            </Link>
            <Link
              href="/reservation"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              예약
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-border/30" />
          <Star className="h-2.5 w-2.5 text-primary/40" />
          <div className="h-px flex-1 bg-border/30" />
        </div>

        <p className="text-center text-xs text-muted-foreground/60">
          {`\u00A9 ${new Date().getFullYear()} 밤의 비밀 소리 타로. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
