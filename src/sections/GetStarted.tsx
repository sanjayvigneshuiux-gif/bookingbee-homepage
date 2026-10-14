import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * "Getting started with your phones in 4 simple steps"
 * Figma: Home-page-Re-design-FInal-Layout (NbdFRm4kfUKuq0nzPHHH26) · 09 · Getting started — 1*4 steps (v2), Step 8, 9, 10.
 * Tabs sit on a dotted track; each step shows its own panel (badge, title, checklist, CTA) and the Figma visual.
 */

const A = "public/assets/"
const C = "currentColor"

/* Tab glyphs exported from Figma (32×32 grid). Colour follows the tab state via currentColor. */
const ICONS: ReactNode[] = [
  <>
    <rect x="4" y="8" width="24" height="20" rx="2" stroke={C} strokeWidth="2" />
    <path d="M4 12C4 10.11 4 9.17 4.59 8.59C5.17 8 6.11 8 8 8H24C25.89 8 26.83 8 27.41 8.59C28 9.17 28 10.11 28 12V13.33H4V12Z" fill={C} />
    <path d="M9.33 4V8M22.67 4V8" stroke={C} strokeWidth="2" strokeLinecap="round" />
    <rect x="9.33" y="16" width="5.33" height="2.67" rx=".5" fill={C} /><rect x="9.33" y="21.33" width="5.33" height="2.67" rx=".5" fill={C} />
    <rect x="17.33" y="16" width="5.33" height="2.67" rx=".5" fill={C} /><rect x="17.33" y="21.33" width="5.33" height="2.67" rx=".5" fill={C} />
  </>,
  <>
    <path d="M6.67 16V5.33M25.33 26.67V24M6.67 26.67V21.33M25.33 16V5.33M16 9.33V5.33M16 26.67V16" stroke={C} strokeWidth="3" strokeLinecap="round" />
    <circle cx="6.67" cy="18.67" r="2.67" stroke={C} strokeWidth="3" /><circle cx="16" cy="12" r="2.67" stroke={C} strokeWidth="3" /><circle cx="25.33" cy="20" r="2.67" stroke={C} strokeWidth="3" />
  </>,
  <path d="M3.35 4.74L5.97 2.12C7.14.95 9.04.95 10.21 2.12L12.7 4.62C13.87 5.79 13.87 7.69 12.7 8.86L10.61 10.95C10.11 11.45 9.99 12.22 10.3 12.86C12.15 16.54 15.13 19.52 18.81 21.36C19.45 21.68 20.22 21.56 20.72 21.05L22.81 18.96C23.98 17.79 25.88 17.79 27.05 18.96L29.55 21.46C30.72 22.63 30.72 24.53 29.55 25.7L26.93 28.32C24.81 30.43 21.47 30.67 19.08 28.88L12.4 23.87C10.66 22.56 9.11 21.01 7.8 19.27L2.79 12.58C1 10.2 1.23 6.85 3.35 4.74Z" fill={C} />,
  <>
    <path d="M10.67 13.33V21.33M16 16V21.33M21.33 10.67V21.33" stroke={C} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="4" y="5.33" width="24" height="21.33" rx="2" stroke={C} strokeWidth="3" />
  </>,
]

const Check = () => (
  <span className="gs2-check" aria-hidden="true">
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4.2 3.7 6.8 9 1.2" stroke="#3BB581" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
)

const Arrow = () => (
  <span className="gs2-arrow" aria-hidden="true">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 10.5 10.5 1.5M10.5 8.5v-7h-7" stroke="#190041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
)

type Step = { tab: string; lead: string; points: string[]; cta: string; href: string; demo?: boolean; img: string; alt: string }

const STEPS: Step[] = [
  { tab: "Book a demo", lead: "See how BookingBee handles a real call for your salon’s services.",
    points: ["A live call using your own service menu", "Tailored to salons, spas, med spas or barbershops", "Pricing and plan fit, answered on the spot"],
    cta: "Book a demo", href: "#demo", demo: true, img: "gs2-1.webp", alt: "Booking a 30-minute BookingBee product demo: pick Tue, Oct 6 at 11:30 AM" },
  { tab: "Quick setup", lead: "We connect BookingBee to your booking software and phone line, so it knows your salon from day one.",
    points: ["Connects to your booking software in minutes", "Services, stylists and prices imported for you", "Keep your number, just forward your calls"],
    cta: "See integrations", href: "#/integrations", img: "gs2-2.webp", alt: "Setup progress: booking software connected, 42 services and 6 stylists imported, call forwarding in progress" },
  { tab: "Go live", lead: "Your AI receptionist starts answering every call, day or night, and books straight into your calendar.",
    points: ["Answers every call, 24/7, in your salon’s voice", "Books, reschedules and cancels for you", "Texts clients a confirmation instantly"],
    cta: "Hear a sample call", href: "#live-demo", img: "gs2-3.webp", alt: "Incoming call answered by BookingBee with a live transcript and a confirmation text" },
  { tab: "Monitor & refine", lead: "Track every call and booking in one dashboard, and fine-tune how BookingBee answers as your salon grows.",
    points: ["Call summaries and recordings in one place", "See bookings and revenue captured", "Update answers, hours and services anytime"],
    cta: "See the dashboard", href: "#demo", demo: true, img: "gs2-4.webp", alt: "BookingBee call history dashboard with 4x ROI, $6,202 revenue managed and after-hours handling on" },
]

export default function GetStarted() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const secRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  /* gently cycles through the steps while the section is on screen, until the visitor picks a tab */
  useEffect(() => {
    const el = secRef.current
    if (!el || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let t: number | undefined
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t)
      if (e.isIntersecting) t = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), 7000)
    }, { threshold: 0.45 })
    io.observe(el)
    return () => { io.disconnect(); window.clearInterval(t) }
  }, [touched])

  const pick = (i: number, focus = false) => {
    setTouched(true)
    setActive(i)
    if (focus) tabRefs.current[i]?.focus()
  }
  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key
    if (k === "ArrowRight" || k === "ArrowLeft" || k === "Home" || k === "End") {
      e.preventDefault()
      const n = k === "Home" ? 0 : k === "End" ? STEPS.length - 1 : (active + (k === "ArrowRight" ? 1 : -1) + STEPS.length) % STEPS.length
      pick(n, true)
    }
  }

  const s = STEPS[active]
  const num = String(active + 1).padStart(2, "0")

  return (
    <section className="gs2" id="get-started" aria-labelledby="gs2-title" ref={secRef}>
      <div className="gs2-head">
        <span className="bb-pill"><i />How It Works</span>
        <h2 id="gs2-title">Getting started with your phones<br />in <em>4 simple</em> steps</h2>
        <p>From first demo to a fully answering front desk in days. We do the heavy lifting, you stay with your clients.</p>
      </div>

      <div className="gs2-tabs" role="tablist" aria-label="Getting started steps" onKeyDown={onKey}>
        {STEPS.map((st, i) => (
          <div className="gs2-tab-slot" key={st.tab}>
            {i > 0 && <i className={"gs2-link" + (i <= active ? " done" : "")} aria-hidden="true" />}
            <button
              type="button" role="tab" id={`gs2-tab-${i}`} aria-controls="gs2-panel" aria-selected={i === active} tabIndex={i === active ? 0 : -1}
              ref={(n) => { tabRefs.current[i] = n }} className={"gs2-tab" + (i === active ? " on" : "")} onClick={() => pick(i)}
            >
              <span className="gs2-ic"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true">{ICONS[i]}</svg></span>
              <span className="gs2-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="gs2-t">{st.tab}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="gs2-panel" id="gs2-panel" role="tabpanel" aria-labelledby={`gs2-tab-${active}`}>
        <div className="gs2-content" key={"c" + active}>
          <span className="gs2-badge">STEP {num}</span>
          <h3>{s.tab}</h3>
          <p className="gs2-lead">{s.lead}</p>
          <ul className="gs2-points">{s.points.map((p) => <li key={p}><Check />{p}</li>)}</ul>
          <a className="gs2-cta" href={s.href} {...(s.demo ? { "data-open-demo": "", "data-demo-topic": `Getting started · ${s.tab}` } : {})}>{s.cta}<Arrow /></a>
        </div>
        <div className="gs2-visual">
          {STEPS.map((st, i) => (
            <img key={st.img} className={i === active ? "on" : ""} src={A + st.img} alt={i === active ? st.alt : ""} aria-hidden={i !== active} width={640} height={600} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}
