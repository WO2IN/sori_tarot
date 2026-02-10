import { Moon, Eye, Shield, Star } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "깊은 통찰력",
    description: "카드 속 메시지를 정확하게 해석합니다.",
  },
  {
    icon: Shield,
    title: "비밀 보장",
    description: "모든 상담 내용은 철저하게 비밀이 보장됩니다.",
  },
  {
    icon: Moon,
    title: "맞춤 리딩",
    description: "개인의 에너지와 상황에 맞는 맞춤형 리딩을 제공합니다.",
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-y border-border/30 bg-card/50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <span className="mb-4 inline-block text-xs tracking-[0.3em] text-primary">
              ABOUT
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">
                당신의 마음에
                <br />
                <span className="text-primary">빛을 비추다</span>
              </span>
            </h2>
            <p className="mt-6 break-keep text-sm leading-relaxed text-muted-foreground">
              밤의 비밀 소리 타로는 단순한 점술이 아닌,
              <br />
              당신의 내면과 대화하는 시간입니다. 타로 카드는 우주의 에너지를 담고 있으며,
              그 에너지를 통해 당신이 지금 알아야 할 메시지를 전달해 드립니다.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              모든 상담은 편안하고 따뜻한 분위기에서 진행되며, 판단 없이 오직
              당신의 이야기에 귀 기울입니다.
            </p>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-16 bg-primary/30" />
              <Star className="h-3 w-3 text-primary/50" />
              <div className="h-px w-16 bg-primary/30" />
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="flex flex-col gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-5 rounded-xl border border-border/30 bg-background/50 p-6 transition-all hover:border-primary/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
