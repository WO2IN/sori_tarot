import React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google"
import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["300", "400", "500", "700"],
})

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "밤의 비밀 소리 타로 | 당신의 운명을 읽다",
  description:
    "신비로운 타로 리딩으로 당신의 과거, 현재, 미래를 탐험하세요. 전문 타로 리더와 함께하는 1:1 상담 예약.",
}

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${notoSerifKr.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
