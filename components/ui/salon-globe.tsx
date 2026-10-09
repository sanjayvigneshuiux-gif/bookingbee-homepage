"use client";

import createGlobe, { type COBEOptions } from "cobe"
import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * BookingBee "Trusted" globe.
 * Built on the same cobe engine as components/ui/globe-feature-section.tsx,
 * styled to the Figma example (lavender sphere, navy land dots) and overlaid with
 * customer profile pins that stay glued to their city as the globe turns.
 */

export type SalonPin = {
  name: string
  city: string
  location: [number, number] // [lat, lng]
  image: string
  /** nudge (px at a 1500px-wide globe) so photos in the same area don't stack; the client dot marks the exact spot */
  offset?: [number, number]
}

const DEG = Math.PI / 180
/** phi that puts a longitude at the centre of the sphere (cobe convention) */
const phiFor = (lng: number) => Math.PI - (lng * DEG - Math.PI / 2)

export const SALON_GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.45,
  dark: 0,
  diffuse: 1.5,
  mapSamples: 28000,
  mapBrightness: 6,
  baseColor: [0.84, 0.78, 1], // richer lavender (#D6C7FF) — reads like the Figma sphere
  markerColor: [1, 205 / 255, 0], // bee yellow
  glowColor: [1, 1, 1],
  markers: [],
}

/** Same projection cobe uses for its markers → screen position on a unit sphere. */
function project(lat: number, lng: number, phi: number, theta: number) {
  const r = lat * DEG
  const a = lng * DEG - Math.PI
  const c = Math.cos(r)
  const p = [-c * Math.cos(a), Math.sin(r), c * Math.sin(a)]
  const cx = Math.cos(theta), sx = Math.sin(theta), cy = Math.cos(phi), sy = Math.sin(phi)
  return {
    x: cy * p[0] + sy * p[2],
    y: sy * sx * p[0] + cx * p[1] - cy * sx * p[2],
    z: -sy * cx * p[0] + sx * p[1] + cy * cx * p[2],
  }
}

/** A small, unlabelled client dot (name shows on hover) */
export type ClientDot = { name: string; location: [number, number] }

export function SalonGlobe({
  pins,
  dots = [],
  className,
  focusLng = -98,
  focusOffset = -0.42,
  sway = 0.32,
  config = SALON_GLOBE_CONFIG,
  active = null,
  renderPin,
}: {
  pins: SalonPin[]
  /** every client location, drawn as small glowing dots */
  dots?: ClientDot[]
  className?: string
  /** longitude to keep in view */
  focusLng?: number
  /** rotate the focus left (negative) / right (positive) of the sphere centre */
  focusOffset?: number
  /** how far (radians) the globe gently rocks left/right */
  sway?: number
  config?: COBEOptions
  /** spotlight mode: only this pin is shown and the globe glides to bring it into view */
  active?: number | null
  /** extra content drawn next to a pin (spotlight card) */
  renderPin?: (pin: SalonPin, i: number) => ReactNode
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pinRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const activeRef = useRef<number | null>(active)
  activeRef.current = active

  useEffect(() => {
    const canvas = canvasRef.current!
    const wrap = wrapRef.current!
    let width = canvas.offsetWidth
    let dragStart: number | null = null
    let dragOffset = 0
    let dragBase = 0
    let t = 0
    const base = phiFor(focusLng) + focusOffset
    let spotPhi = activeRef.current != null && pins[activeRef.current] ? phiFor(pins[activeRef.current].location[1]) + focusOffset : base
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const theta = config.theta

    const onResize = () => { width = canvas.offsetWidth }
    window.addEventListener("resize", onResize)

    const alpha = pins.map(() => 0)
    const placePins = (phi: number) => {
      const R = (width / 2) * 0.8
      const spot = activeRef.current
      pins.forEach((pin, i) => {
        const el = pinRefs.current[i]
        if (!el) return
        const q = project(pin.location[0], pin.location[1], phi, theta)
        const visible = q.z > 0.12
        const k = width / 1500
        if (spot !== null && spot !== undefined) {
          /* spotlight: one pin at a time, exactly on its city, fading in/out */
          alpha[i] += ((i === spot && visible ? 1 : 0) - alpha[i]) * 0.12
          el.style.transform = `translate(${width / 2 + q.x * R}px, ${width / 2 - q.y * R}px) translate(-50%, -50%)`
          el.style.opacity = String(alpha[i] < 0.01 ? 0 : alpha[i])
          el.style.pointerEvents = i === spot && visible ? "auto" : "none"
          el.classList.toggle("is-spot", i === spot)
          el.style.zIndex = i === spot ? "200" : "100"
          return
        }
        const s = 0.7 + 0.3 * Math.max(0, q.z)
        const ox = (pin.offset?.[0] ?? 0) * k, oy = (pin.offset?.[1] ?? 0) * k
        el.style.transform = `translate(${width / 2 + q.x * R + ox}px, ${width / 2 - q.y * R + oy}px) translate(-50%, -50%) scale(${s})`
        el.style.opacity = visible ? String(Math.min(1, (q.z - 0.12) * 4)) : "0"
        el.style.pointerEvents = visible ? "auto" : "none"
        el.style.zIndex = String(Math.round(q.z * 100))
      })
      dots.forEach((dot, i) => {
        const el = dotRefs.current[i]
        if (!el) return
        const q = project(dot.location[0], dot.location[1], phi, theta)
        const visible = q.z > 0.05
        el.style.transform = `translate(${width / 2 + q.x * R}px, ${width / 2 - q.y * R}px) translate(-50%, -50%)`
        el.style.opacity = visible ? String(Math.min(1, (q.z - 0.05) * 5)) : "0"
        el.style.pointerEvents = visible ? "auto" : "none"
      })
    }

    // Backing-store resolution: sharp on retina, capped so a large globe stays smooth.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const globe = createGlobe(canvas, {
      ...config,
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      onRender: (state) => {
        if (!reduce && dragStart === null) t += 0.004
        const spot = activeRef.current
        if (spot !== null && spot !== undefined && pins[spot]) {
          /* glide (shortest way round) to the spotlight salon */
          let target = phiFor(pins[spot].location[1]) + focusOffset - dragOffset
          const cur = spotPhi
          target = cur + ((((target - cur) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI)
          spotPhi += (target - spotPhi) * (reduce ? 1 : 0.035)
        } else spotPhi = base + Math.sin(t) * sway
        const phi = spotPhi + Math.sin(t) * (activeRef.current != null ? sway * 0.25 : 0) + dragOffset
        state.phi = phi
        state.width = width * dpr
        state.height = width * dpr
        placePins(phi)
      },
    })
    setTimeout(() => { canvas.style.opacity = "1"; wrap.classList.add("is-ready") })

    // Only render while the globe is on screen — keeps page scrolling smooth.
    const io = new IntersectionObserver(([entry]) => {
      (globe as unknown as { toggle: (on?: boolean) => void }).toggle(entry.isIntersecting)
    })
    io.observe(wrap)

    const down = (e: PointerEvent) => { dragStart = e.clientX; dragBase = dragOffset; canvas.style.cursor = "grabbing" }
    const move = (e: PointerEvent) => { if (dragStart !== null) dragOffset = dragBase + (e.clientX - dragStart) / 220 }
    const up = () => { dragStart = null; canvas.style.cursor = "grab" }
    canvas.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)

    return () => {
      io.disconnect()
      globe.destroy()
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
  }, [pins, dots, focusLng, focusOffset, sway, config])

  return (
    <div ref={wrapRef} className={cn("salon-globe relative aspect-square", className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        style={{ cursor: "grab", touchAction: "pan-y" }}
        aria-hidden="true"
      />
      <div className="salon-pins">
        {dots.map((dot, i) => (
          <span
            key={dot.name + i}
            ref={(el) => { dotRefs.current[i] = el }}
            className="salon-dot"
            style={{ opacity: 0, animationDelay: `${(i % 12) * 0.25}s` }}
            data-label={dot.name}
            aria-hidden="true"
          />
        ))}
        {pins.map((pin, i) => (
          <button
            key={pin.name}
            ref={(el) => { pinRefs.current[i] = el }}
            type="button"
            className="salon-pin"
            style={{ opacity: 0 }}
            aria-label={`${pin.name}, ${pin.city}`}
            data-label={`${pin.name} · ${pin.city}`}
          >
            <img src={pin.image} alt="" width={40} height={40} />
            {renderPin?.(pin, i)}
          </button>
        ))}
      </div>
    </div>
  )
}
