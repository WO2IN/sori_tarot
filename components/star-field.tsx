"use client"

import { useEffect, useRef } from "react"

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const starCount = 80
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star animate-twinkle"
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 5}s`
      star.style.animationDuration = `${2 + Math.random() * 4}s`
      const size = Math.random() * 2 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      container.appendChild(star)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
