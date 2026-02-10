import Image from "next/image"
import Link from "next/link"
import { Sparkles, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-tarot.jpg"
          alt="신비로운 타로 카드 리딩 배경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <Star className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs tracking-widest text-primary">
            TAROT READING
          </span>
          <Star className="h-3.5 w-3.5 text-primary" />
        </div>

        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="text-balance">
            별이 속삭이는
            <br />
            <span className="text-primary">당신의 이야기</span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-foreground/60 md:text-lg">
          타로 카드 속에 숨겨진 우주의 메시지를 읽어드립니다.
          <br className="hidden md:block" />
          과거의 흔적, 현재의 진실, 그리고 미래의 가능성을 함께 탐험하세요.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/reservation"
            className="group flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            카드 만나러 가기
          </Link>
          <Link
            href="#services"
            className="rounded-lg border border-border/50 bg-transparent px-8 py-3.5 text-sm font-medium text-foreground/70 transition-all hover:border-primary/50 hover:text-primary"
          >
            서비스 둘러보기
          </Link>
        </div>

        {/* Decorative divider */}
        <div className="mt-16 flex items-center gap-3">
          <div className="h-px w-12 bg-primary/30" />
          <Star className="h-3 w-3 text-primary/50" />
          <div className="h-px w-12 bg-primary/30" />
        </div>
      </div>
    </section>
  )
}
