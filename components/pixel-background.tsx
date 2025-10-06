"use client"

import { useEffect, useRef } from "react"

export function PixelBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const pixelCount = 80

    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement("div")
      pixel.className = "pixel"
      pixel.style.left = `${Math.random() * 100}%`
      pixel.style.top = `${Math.random() * 100}%`
      pixel.style.animationDuration = `${15 + Math.random() * 20}s`
      pixel.style.animationDelay = `${Math.random() * 5}s`
      container.appendChild(pixel)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [])

  return <div ref={containerRef} className="pixel-bg" />
}
