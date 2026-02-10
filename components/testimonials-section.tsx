import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "김*철",
    initial: "김",
    review:
      "진로 고민이 많았는데, 밤의 비밀 소리 타로 상담 후 마음이 한결 가벼워졌어요. 카드 해석이 너무 정확해서 놀랐습니다.",
    service: "진로 / 커리어 리딩",
    rating: 5,
  },
  {
    name: "곽*영",
    initial: "이",
    review:
      "연애 상담을 받았는데 제 상황을 너무 잘 읽어주셨어요. 따뜻하고 편안한 분위기에서 상담받을 수 있었습니다.",
    service: "연애 / 관계 리딩",
    rating: 5,
  },
  {
    name: "김*지",
    initial: "박",
    review:
      "종합 운세를 봤는데, 현재 제 상황과 정말 맞아떨어졌어요. 앞으로의 방향에 대해 큰 도움이 되었습니다.",
    service: "종합 운세 리딩",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-xs tracking-[0.3em] text-primary">
            REVIEWS
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">고객 후기</span>
          </h2>
          <p className="mt-4 max-w-lg text-balance text-sm leading-relaxed text-muted-foreground">
            밤의 비밀 소리 타로를 경험하신 분들의 이야기를 들어보세요.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30"
            >
              <Quote className="mb-4 h-6 w-6 text-primary/30" />

              {/* Rating Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={`star-${testimonial.name}-${i}`}
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="mb-6 text-sm leading-relaxed text-foreground/80">
                {`"${testimonial.review}"`}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-serif text-sm font-bold text-primary">
                    {testimonial.initial}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
