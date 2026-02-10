import Image from "next/image"
import Link from "next/link"
import { Heart, Briefcase, Compass, Clock, Sparkles } from "lucide-react"

const services = [
  {
    title: "연애 / 관계 리딩",
    description:
      "사랑과 인간관계에 대한 깊은 통찰을 제공합니다.\n현재 관계의 방향성과 미래의 가능성을 함께 살펴봅니다.",
    icon: Heart,
    image: "/images/tarot-love.jpg",
    duration: "40분",
    price: "5,000원",
  },
  {
    title: "진로 / 커리어 리딩",
    description:
      "직업과 커리어에 대한 고민을 타로로 풀어드립니다. 새로운 시작이나 전환점에 서 있을 때 방향을 제시합니다.",
    icon: Briefcase,
    image: "/images/tarot-career.jpg",
    duration: "40분",
    price: "5,000원",
  },
  {
    title: "종합 운세 리딩",
    description:
      "삶의 전반적인 흐름을 읽어드립니다. 영적 성장과 \n내면의 목소리에 귀 기울이는 시간을 함께합니다.",
    icon: Compass,
    image: "/images/tarot-spiritual.jpg",
    duration: "60분",
    price: "10,000원",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-xs tracking-[0.3em] text-primary">
            SERVICES
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">타로 리딩 서비스</span>
          </h2>
          <p className="mt-4 max-w-lg text-balance text-sm leading-relaxed text-muted-foreground">
            당신의 상황에 맞는 리딩을 선택하세요. <br></br>모든 상담은 1:1 프라이빗으로
            진행됩니다.<br />
            예약은 오후 20시부터 오후 23시까지 가능합니다.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-primary" />
                  <span className="text-xs text-foreground/80">
                    {service.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <service.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="mb-5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-primary">
                    {service.price}
                  </span>
                  <Link
                    href={`/reservation?service=${encodeURIComponent(service.title)}`}
                    className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <Sparkles className="h-3 w-3" />
                    예약하기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
