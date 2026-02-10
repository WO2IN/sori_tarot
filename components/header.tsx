"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Moon, Sparkles } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Moon className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-bold tracking-wide text-primary">
            밤의 비밀 소리 타로
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-primary"
          >
            서비스
          </Link>
          <Link
            href="#about"
            className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-primary"
          >
            소개
          </Link>
          <Link
            href="#testimonials"
            className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-primary"
          >
            후기
          </Link>
          <Link
            href="/reservation"
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4" />
            예약하기
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border/30 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link
              href="#services"
              className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              서비스
            </Link>
            <Link
              href="#about"
              className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              소개
            </Link>
            <Link
              href="#testimonials"
              className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              후기
            </Link>
            <Link
              href="/reservation"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles className="h-4 w-4" />
              예약하기
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
