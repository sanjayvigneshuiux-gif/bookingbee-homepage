import { useEffect, useRef, useState } from "react"
import { SalonGlobe, type SalonPin } from "@/components/ui/salon-globe"
import { ACTIVE_CLIENTS } from "../data/clients"

const A = "public/assets/"

/** Customer photos, pinned at their real locations (BookingBee CRM client map).
 *  Spotlight mode shows one salon at a time, so no offsets are needed. */
const PINS: SalonPin[] = [
  { name: "Spa Gregorie's", city: "Newport Beach, CA", location: [33.6122, -117.8743], image: A + "salon-spa-gregories.png" },
  { name: "Salon D", city: "Dallas, TX", location: [32.9339, -96.8238], image: A + "salon-salon-d.png" },
  { name: "Beauty Lounge Salon", city: "Tampa, FL", location: [28.066, -82.5812], image: A + "salon-beauty-lounge.png" },
  { name: "Salon Sora", city: "Boca Raton, FL", location: [26.3635, -80.1249], image: A + "salon-sora.png" },
  { name: "Riudi Salon", city: "Miami, FL", location: [25.6832, -80.3136], image: A + "salon-riudi.png" },
  { name: "Aura Hair Co", city: "Boca Raton, FL", location: [26.5278, -80.0992], image: A + "salon-aura.png" },
  { name: "Innovate Salon Academy", city: "New Jersey", location: [40.5509, -74.4267], image: A + "salon-innovate.png" },
  { name: "Beneath The Surface Spa", city: "New Jersey", location: [40.7585, -74.416], image: A + "salon-beneath.png" },
  { name: "Onur Salon", city: "New York, NY", location: [40.7687, -73.961], image: A + "salon-onur.png" },
  { name: "Davey Dublin Hair Salon", city: "Dublin, Ireland", location: [53.3412, -6.2648], image: A + "salon-davey.png" },
]

/** Every active client as a small dot */
const DOTS = ACTIVE_CLIENTS.map(({ name, location }) => ({ name, location }))
const LIVE_COUNT = ACTIVE_CLIENTS.length
const STEP_MS = 4200

const LOGOS = [
  { src: "logo-antonio-prieto.png", alt: "Antonio Prieto", w: 250, mt: 16.5 },
  { src: "logo-riudi.png", alt: "Riudi Salon", w: 149, mt: 0 },
  { src: "logo-innovate.png", alt: "Innovate Salon Academy", w: 192, mt: 0 },
  { src: "logo-paul-mitchell.png", alt: "Paul Mitchell", w: 185, mt: 0 },
  { src: "logo-spa-gregories.png", alt: "Spa Gregories", w: 250, mt: 7 },
  { src: "logo-woodhouse.png", alt: "Woodhouse Spa", w: 250, mt: 3.5 },
]

export default function TrustedSection() {
  const [spot, setSpot] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(0) // bumps when the visitor steps, restarting the timer
  const secRef = useRef<HTMLElement>(null)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 })
    if (secRef.current) io.observe(secRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !onScreen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setTimeout(() => setSpot((s) => (s + 1) % PINS.length), STEP_MS)
    return () => window.clearTimeout(t)
  }, [spot, paused, onScreen, manual])

  const step = (d: number) => { setSpot((s) => (s + d + PINS.length) % PINS.length); setManual((m) => m + 1) }
  const cur = PINS[spot]

  return (
    <section className="tr3" aria-labelledby="trusted-title" ref={secRef}>
      <div className="tr3-stage">
        <div className="tr3-inner">
          <div className="tr3-left">
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x=".5" y=".5" width="23" height="23" rx="11.5" fill="#12915e" stroke="#12915e" /><path fillRule="evenodd" clipRule="evenodd" d="M11.789 6.038a.6.6 0 0 1 .421 0l4.8 1.8a.6.6 0 0 1 .39.562v3.633a5.4 5.4 0 0 1-2.985 4.83l-2.147 1.073a.6.6 0 0 1-.536 0l-2.147-1.073A5.4 5.4 0 0 1 6.6 12.033V8.4a.6.6 0 0 1 .39-.562l4.8-1.8Zm2.479 5.137a.6.6 0 1 0-.937-.75l-1.906 2.383-.738-1.025a.6.6 0 1 0-.974.701l1.2 1.667a.6.6 0 0 0 .956.024l2.4-3Z" fill="#fff" /></svg>
              Trusted by Beauty Businesses
            </span>
            <h2 className="tr3-title" id="trusted-title">The <span>AI Receptionist</span> behind high-performing beauty businesses</h2>
            <p className="tr3-desc">Every conversation becomes revenue. See the impact live, right now.</p>

            <div className="tr3-impact">
              <p className="tr3-live"><i />Live AI impact across the U.S.</p>
              <dl className="tr3-stats">
                <div><dt>ROI for Salon &amp; Spa</dt><dd data-count="1.3" data-prefix="$" data-suffix="M" data-decimals="1">$1.3M</dd></div>
                <div><dt>Minutes communicated</dt><dd data-count="118469" data-suffix="+">118,469+</dd></div>
                <div><dt>Calls handled</dt><dd data-count="58148" data-suffix="+">58,148+</dd></div>
              </dl>
            </div>

            <a className="btn-dark tr3-cta" href="#demo" data-open-demo="">Schedule a Demo →</a>
          </div>

          <div className="tr3-map" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <SalonGlobe
              pins={PINS} dots={DOTS} className="trusted2-globe" focusOffset={-0.45} sway={0.12} active={spot}
              renderPin={(p) => (
                <span className="tr3-card">
                  <b>{p.name}</b>
                  <small>{p.city}</small>
                  <em><i />Live on BookingBee</em>
                </span>
              )}
            />
          </div>

          <div className="tr3-dock">
            <span className="tr3-count"><i />{LIVE_COUNT} salons &amp; spas live</span>
            <span className="tr3-nav">
              <button type="button" aria-label="Previous salon" onClick={() => step(-1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span className="tr3-now"><b>{String(spot + 1).padStart(2, "0")}</b> / {String(PINS.length).padStart(2, "0")}<span className="sr-only" aria-live="polite">{cur.name}, {cur.city}</span></span>
              <button type="button" aria-label="Next salon" onClick={() => step(1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </span>
            <span className="tr3-bar" aria-hidden="true"><i key={spot + "-" + manual} className={paused || !onScreen ? "hold" : ""} style={{ animationDuration: STEP_MS + "ms" }} /></span>
          </div>
        </div>
      </div>

      <div className="tr3-logos">
        <p className="tr3-logos-label">Trusted by salons like</p>
        <div className="logo-marquee" aria-label="Salons using BookingBee">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div className="marquee-set" aria-hidden={k === 1} key={k}>
                {LOGOS.map((l) => <img key={l.src} src={A + l.src} alt={k === 0 ? l.alt : ""} width={l.w} style={{ marginTop: l.mt }} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
