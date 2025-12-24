"use client"

import { useEffect, useRef } from "react"

/**
 * PixelBackground Component
 * 
 * Creates an animated pixel background with floating particles.
 * The pixels float upward with random positions, durations, and delays
 * to create a dynamic visual effect.
 * 
 * @returns A div container with dynamically generated animated pixels
 */
export function PixelBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const pixelCount = 80

    // Generate random pixels with varying animation properties
    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement("div")
      pixel.className = "pixel"
      pixel.style.left = `${Math.random() * 100}%`
      pixel.style.top = `${Math.random() * 100}%`
      pixel.style.animationDuration = `${15 + Math.random() * 20}s`
      pixel.style.animationDelay = `${Math.random() * 5}s`
      container.appendChild(pixel)
    }

    // Cleanup: remove all pixels when component unmounts
    return () => {
      container.innerHTML = ""
    }
  }, [])

  return <div ref={containerRef} className="pixel-bg" />
}
