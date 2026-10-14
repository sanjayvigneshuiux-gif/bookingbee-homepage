import { useEffect, useRef, useState, type ReactNode } from "react"
import { SocialIcon, SmsIcon, RemindersIcon, CalendarIcon } from "./featureIcons"

/** "One AI front desk, every channel your clients use" — horizontal feature scroller (Figma: Features — Horizontal scroll) */

const A = "public/assets/"
const P = { stroke: "currentColor", strokeWidth: 1.66667, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">{children}</svg>
)

type Feature = { key: string; title: string; desc: string; img: string; alt: string; icon: ReactNode; voice?: boolean }

const FEATURES: Feature[] = [
  {
    key: "voice", title: "AI Voice Receptionist", voice: true,
    desc: "Answers every call, books appointments and handles FAQs naturally.",
    img: "feat2-voice.webp", alt: "Salon client on a call answered by the BookingBee AI receptionist",
    icon: <Icon><path {...P} d="M18.3332 14.0994V16.5994C18.3341 16.8315 18.2866 17.0612 18.1936 17.2739C18.1006 17.4865 17.9643 17.6774 17.7933 17.8343C17.6222 17.9912 17.4203 18.1107 17.2005 18.185C16.9806 18.2594 16.7477 18.287 16.5165 18.2661C13.9522 17.9875 11.489 17.1112 9.32486 15.7078C7.31139 14.4283 5.60431 12.7212 4.32486 10.7078C2.91651 8.53377 2.04007 6.05859 1.76653 3.48276C1.7457 3.25232 1.77309 3.02006 1.84695 2.80078C1.9208 2.5815 2.03951 2.38 2.1955 2.20911C2.3515 2.03822 2.54137 1.90169 2.75302 1.8082C2.96468 1.71471 3.19348 1.66631 3.42486 1.6661H5.92486C6.32928 1.66212 6.72136 1.80533 7.028 2.06904C7.33464 2.33275 7.53493 2.69897 7.59153 3.09943C7.69705 3.89949 7.89274 4.68504 8.17486 5.4411C8.28698 5.73937 8.31125 6.06353 8.24478 6.37516C8.17832 6.6868 8.02392 6.97286 7.79986 7.19943L6.74153 8.25776C7.92783 10.3441 9.65524 12.0715 11.7415 13.2578L12.7999 12.1994C13.0264 11.9754 13.3125 11.821 13.6241 11.7545C13.9358 11.688 14.2599 11.7123 14.5582 11.8244C15.3143 12.1066 16.0998 12.3022 16.8999 12.4078C17.3047 12.4649 17.6744 12.6688 17.9386 12.9807C18.2029 13.2926 18.3433 13.6907 18.3332 14.0994Z" /></Icon>,
  },
  {
    key: "chatbot", title: "Website AI Chatbot",
    desc: "Converts website visitors into booked appointments, 24/7.",
    img: "feat2-chatbot.webp", alt: "BookingBee website chat widget offering to book an appointment",
    icon: <Icon><path {...P} d="M9.99984 18.3327C14.6022 18.3327 18.3332 14.6017 18.3332 9.99935C18.3332 5.39698 14.6022 1.66602 9.99984 1.66602C5.39746 1.66602 1.6665 5.39698 1.6665 9.99935C1.6665 14.6017 5.39746 18.3327 9.99984 18.3327Z" /><path {...P} d="M6.6665 9.99935C6.6665 6.89663 7.86003 3.91281 9.99984 1.66602C12.1396 3.91281 13.3332 6.89663 13.3332 9.99935C13.3332 13.1021 12.1396 16.0859 9.99984 18.3327C7.86003 16.0859 6.6665 13.1021 6.6665 9.99935Z" /><path {...P} d="M1.6665 10H18.3332" /></Icon>,
  },
  {
    key: "text-automation", title: "Social Media Automation",
    desc: "Replies to Instagram, Facebook and WhatsApp DMs and turns followers into booked clients.",
    img: "feat2-text-automation.webp", alt: "Instagram DM conversation booking a Saturday appointment",
    icon: SocialIcon,
  },
  {
    key: "texting", title: "SMS Texting",
    desc: "Books, reschedules and answers questions over SMS like a front desk.",
    img: "feat2-texting.webp", alt: "SMS thread rescheduling an appointment to Wednesday",
    icon: SmsIcon,
  },
  {
    key: "email", title: "Email Notifications",
    desc: "Branded confirmations, reminders and thank-you notes land in every inbox automatically.",
    img: "feat2-email.webp", alt: "Happy stylist next to a BookingBee appointment confirmation email",
    icon: <Icon><g transform="translate(1.667 3.334)"><path {...P} d="M 1.666666603088379 0 L 14.99999942779541 0 C 15.920474021289522 0 16.66666603088379 0.7461920202686301 16.66666603088379 1.6666666269302368 L 16.66666603088379 11.666666388511658 C 16.66666603088379 12.587140995173264 15.920474021289522 13.333333015441895 14.99999942779541 13.333333015441895 L 1.666666603088379 13.333333015441895 C 0.7461920095942673 13.333333015441895 0 12.587140995173264 0 11.666666388511658 L 0 1.6666666269302368 C 0 0.7461920202686301 0.7461920095942673 0 1.666666603088379 0 Z" /></g><g transform="translate(1.667 5.834)"><path {...P} d="M 16.66666603088379 0 L 9.191666093508411 4.749999689955391 C 8.934392488916036 4.911187991735757 8.636930404446383 4.99667549133301 8.333333015441895 4.996675491333008 C 8.029735626437406 4.99667549133301 7.732273541967754 4.911187991735757 7.474999937375379 4.749999689955391 L 0 0" /></g></Icon>,
  },
  {
    key: "reminders", title: "Smart Reminders",
    desc: "Automated SMS and email nudges that keep chairs full and no-shows low.",
    img: "feat2-reminders.webp", alt: "Reminder notifications and a client confirmed badge",
    icon: RemindersIcon,
  },
  {
    key: "winback", title: "Client Win-Back",
    desc: "Reaches out to lapsed clients and turns empty slots into rebookings.",
    img: "feat2-winback.webp", alt: "Win-back text offering a Thursday opening and the client rebooking",
    icon: <Icon><g transform="translate(2.5 2.5)"><path {...P} d="M 0 7.5 C 1.1102230246251565e-15 8.983359833558401 0.43986747662226366 10.433407723903658 1.2639780839284263 11.666776339213055 C 2.0880886912345886 12.900144954522451 3.2594284415245056 13.861439923445383 4.629874229431152 14.429097175598145 C 6.000320017337799 14.996754427750906 7.508319715658823 15.145279417435328 8.96317720413208 14.855890274047852 C 10.418034692605337 14.566501130660376 11.75440639257431 13.852194050947826 12.803300221761068 12.803300221761068 C 13.852194050947826 11.75440639257431 14.566501130660376 10.418034692605337 14.855890274047852 8.96317720413208 C 15.145279417435328 7.508319715658823 14.996754427750906 6.000320017337799 14.429097175598145 4.629874229431152 C 13.861439923445383 3.2594284415245056 12.900144954522451 2.0880886912345886 11.666776339213055 1.2639780839284263 C 10.433407723903658 0.43986747662226366 8.983359833558401 -1.1102230246251565e-15 7.5 0 C 5.4032933712005615 0.007887583536406359 3.3908077081044516 0.8260195453961692 1.8833335240681968 2.28333314259847 L 0 4.166666666666667" /></g><g transform="translate(2.5 2.5)"><path {...P} d="M 0 0 L 0 4.166666507720947 L 4.166666507720947 4.166666507720947" /></g><g transform="translate(10 5.834)"><path {...P} d="M 0 0 L 0 4.166666439601353 L 2.5 5.8333330154418945" /></g></Icon>,
  },
  {
    key: "calendar", title: "Calendar Sync",
    desc: "Every booking lands straight in your salon software — no double entry.",
    img: "feat2-calendar.webp", alt: "Salon calendar with bookings synced live by BookingBee",
    icon: CalendarIcon,
  },
]

export default function FeatureScroller() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const fsRef = useRef<HTMLDivElement>(null)
  /** scroll-linked mode: vertical page scroll drives the cards sideways, then the page moves on */
  const pin = useRef({ on: false, top: 0, span: 0, dist: 0, hold: 0 })
  const [prog, setProg] = useState({ start: 0, size: 0.38, atStart: true, atEnd: false })

  useEffect(() => {
    const el = trackRef.current!
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const size = Math.min(1, el.clientWidth / el.scrollWidth)
      const p = max > 0 ? el.scrollLeft / max : 0
      setProg({ start: p * (1 - size), size, atStart: el.scrollLeft < 4, atEnd: el.scrollLeft > max - 4 })
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    /* Highlighted ("filled") card follows the horizontal scroll:
       the card under the pointer, or — when the pointer isn't on the row — the card in the first slot. */
    let px = -1, py = -1, activeCard: HTMLElement | null = null
    const markActive = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>(".fs-card"))
      if (!cards.length) return
      let next: HTMLElement | null = null
      const tr = el.getBoundingClientRect()
      if (px >= 0 && px >= tr.left && px <= tr.right && py >= tr.top && py <= tr.bottom) {
        next = (document.elementFromPoint(px, py) as HTMLElement | null)?.closest<HTMLElement>(".fs-card") ?? null
      }
      if (!next) {
        const max = el.scrollWidth - el.clientWidth
        const p = max > 0 ? el.scrollLeft / max : 0
        next = cards[Math.min(cards.length - 1, Math.round(p * (cards.length - 1)))]
      }
      if (next !== activeCard) {
        activeCard?.classList.remove("is-active")
        next?.classList.add("is-active")
        activeCard = next
      }
    }
    const onPtr = (e: PointerEvent) => { if (e.pointerType === "mouse") { px = e.clientX; py = e.clientY; markActive() } }
    const onLeave = () => { px = py = -1; markActive() }
    el.addEventListener("scroll", markActive, { passive: true })
    window.addEventListener("scroll", markActive, { passive: true })
    window.addEventListener("pointermove", onPtr, { passive: true })
    el.addEventListener("pointerleave", onLeave)
    markActive()

    // drag to scroll with a mouse (touch & trackpads scroll natively)
    let down = false, sx = 0, sl = 0, moved = false
    const onDown = (e: PointerEvent) => { if (e.pointerType !== "mouse" || pin.current.on) return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; el.classList.add("is-grabbing") }
    const onMove = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = sl - dx }
    const onUp = () => { down = false; el.classList.remove("is-grabbing") }
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false } }
    el.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    el.addEventListener("click", onClick, true)

    /* ---- pinned horizontal scroll (desktop / tablet) ---- */
    const wrap = pinRef.current!, fs = fsRef.current!
    const page = document.getElementById("page")
    const header = document.querySelector<HTMLElement>(".site-header")
    const layout = () => {
      const P = pin.current
      wrap.style.height = ""
      fs.style.removeProperty("--fs-zoom")
      wrap.classList.remove("is-pinned")
      P.on = false
      const w = document.documentElement.clientWidth
      if (w <= 760 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      wrap.classList.add("is-pinned")
      const pz = (page && parseFloat(page.style.zoom)) || 1
      const hdr = header ? header.getBoundingClientRect().height : 0
      const natural = fs.getBoundingClientRect().height            // on-screen px at zoom 1
      const room = window.innerHeight - hdr - 12
      const hz = Math.min(1, room / natural)
      if (hz < 0.55) { wrap.classList.remove("is-pinned"); return }
      fs.style.setProperty("--fs-zoom", String(hz))
      const shown = natural * hz
      P.dist = el.scrollWidth - el.clientWidth                        // horizontal travel (track px)
      P.span = Math.max(1, P.dist * pz * hz)                           // vertical scroll needed, on-screen px
      P.top = hdr + Math.max(6, (window.innerHeight - hdr - shown) / 2)
      /* rest on the first and last cards for a moment before / after they move */
      P.hold = Math.round(Math.min(320, window.innerHeight * 0.35))
      fs.style.setProperty("--fs-top", P.top / (pz * hz) + "px")
      wrap.style.height = (shown + P.span + 2 * P.hold) / pz + "px"
      P.on = true
      sync()
    }
    const sync = () => {
      const P = pin.current
      if (!P.on) return
      const r = wrap.getBoundingClientRect()
      const t = Math.max(0, Math.min(1, (P.top - r.top - P.hold) / P.span))
      el.scrollLeft = t * P.dist
    }
    window.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", layout)
    window.addEventListener("load", layout)
    if (document.fonts) document.fonts.ready.then(layout)
    layout()

    return () => {
      window.removeEventListener("scroll", sync)
      el.removeEventListener("scroll", markActive)
      window.removeEventListener("scroll", markActive)
      window.removeEventListener("pointermove", onPtr)
      el.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("resize", layout)
      window.removeEventListener("load", layout)
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      el.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      el.removeEventListener("click", onClick, true)
    }
  }, [])

  const go = (dir: 1 | -1) => {
    const el = trackRef.current!
    const card = el.querySelector<HTMLElement>(".fs-card")
    const step = card ? card.offsetWidth + 24 : 424
    const P = pin.current
    if (P.on) {
      // in scroll-linked mode the arrows move the page, which moves the cards
      const target = Math.max(0, Math.min(P.dist, el.scrollLeft + dir * step))
      const r = pinRef.current!.getBoundingClientRect()
      window.scrollTo({ top: window.scrollY + r.top - P.top + P.hold + (target / P.dist) * P.span, behavior: "smooth" })
    } else {
      el.scrollBy({ left: dir * step, behavior: "smooth" })
    }
  }

  return (
    <div className="fs-pin" ref={pinRef}>
    <div className="fs" ref={fsRef} aria-labelledby="fs-title">
      <div className="fs-head">
        <div className="fs-heading">
          <span className="bb-pill"><i />What BookingBee Does</span>
          <h2 id="fs-title">One AI front desk,<br />every channel your clients use</h2>
        </div>
        <div className="fs-arrows">
          <button type="button" className="fs-arrow prev" aria-label="Previous features" onClick={() => go(-1)} disabled={prog.atStart}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M13.75 16.5L8.25 11L13.75 5.5" stroke="currentColor" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="fs-arrow next" aria-label="Next features" onClick={() => go(1)} disabled={prog.atEnd}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M8.25 16.5L13.75 11L8.25 5.5" stroke="currentColor" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div className="fs-track" ref={trackRef} tabIndex={0} aria-label="BookingBee features — scroll sideways">
        {FEATURES.map((f) => (
          <article className="fs-card" key={f.key}>
            <div className="fs-visual"><img src={A + f.img} alt={f.alt} width={360} height={270} loading="lazy" draggable={false} /></div>
            <div className="fs-text">
              <div className="fs-title"><span className="fs-icon">{f.icon}</span><h3>{f.title}</h3></div>
              <p>{f.desc}</p>
            </div>
            <a
              className="fs-more"
              href={f.voice ? "#ai-voice-receptionist" : "#demo"}
              {...(f.voice ? { "data-open-modal": "voice-modal", "aria-haspopup": "dialog" } : { "data-open-demo": "", "data-demo-topic": f.title })}
            >
              Learn more
              <span className="fs-more-btn"><svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5.832 14h16.335M14 22.167 22.167 14 14 5.832" stroke="#632DBA" strokeWidth="2.4" strokeLinecap="round" /></svg></span>
            </a>
          </article>
        ))}
      </div>

      <div className="fs-progress" aria-hidden="true">
        <span style={{ left: `${prog.start * 100}%`, width: `${prog.size * 100}%` }} />
      </div>
    </div>
    </div>
  )
}
