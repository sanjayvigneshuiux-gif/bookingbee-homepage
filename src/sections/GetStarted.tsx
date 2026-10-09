import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * "Getting started — Live on your phones in 4 simple steps"
 * Figma: meevo-event-2026 · 2743:8310 (03 · Get started / Step 1 default).
 * Step 1 is built 1:1 from the frame; steps 2–4 reuse the same panel, tab and mockup system.
 */

const A = "public/assets/"

/* Tab icon glyphs (exact Figma paths). Rect + stroke colours switch with the active state in CSS. */
const TAB_ICONS = [
  { w: 30, h: 31, d: "M7 13H23M11 7V10M19 7V10M11 17H12M15 17H16M19 17H20M7 9H23V24H7V9Z", sw: 2, rx: 6 },
  { w: 26, h: 33, d: "M10 7V12M16 7V12M13 21C16 21 19 19 19 16V12H7V16C7 19 10 21 13 21ZM13 21V26", sw: 1.8, rx: 10 },
  { w: 30, h: 34, d: "M20 20C21 14 19 10 15 7C11 10 9 14 10 20M20 20H10M20 20L23 24L19 23M10 20L7 24L11 23M15 14V14.5M13 23L15 27L17 23", sw: 1.8, rx: 10 },
  { w: 32, h: 31, d: "M7 24H25M10 20V15M15 20V10M20 20V13M25 20V7", sw: 1.8, rx: 10 },
]

function TabIcon({ i }: { i: number }) {
  const g = TAB_ICONS[i]
  return (
    <svg className="gs-tab-ic" width={g.w} height={g.h} viewBox={`0 0 ${g.w} ${g.h}`} fill="none" aria-hidden="true">
      <rect width={g.w} height={g.h} rx={g.rx} />
      <path d={g.d} strokeWidth={g.sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* 58px panel tile: Step 1 uses the exact Figma tile; the others place the tab glyph on the same tile. */
function Tile({ i }: { i: number }) {
  if (i === 0)
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <rect width="58" height="58" rx="18" fill="#EEE7FA" />
        <path d="M16 26.1111H42M22.5 16V21.7778M35.5 16V21.7778M22.5 31.8889H25.75M29 31.8889H32.25M35.5 31.8889H38.75M16 20.3333H42V42H16V20.3333Z" stroke="#632DBA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  const g = TAB_ICONS[i]
  return (
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
      <rect width="58" height="58" rx="18" fill="#EEE7FA" />
      <g transform={`translate(${29 - g.w * 0.8} ${29 - g.h * 0.8}) scale(1.6)`}>
        <path d={g.d} stroke="#632DBA" strokeWidth={g.sw / 1.4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

const Check = () => (
  <svg className="gs-check" width="20" height="19" viewBox="0 0 20 19" fill="none" aria-hidden="true">
    <rect width="20" height="18.5" rx="9.25" fill="#E3F5EC" />
    <path d="M5 9L8.5 12.5L15 6" stroke="#3BB581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Arrow = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect width="38" height="38" rx="19" fill="#FFC300" />
    <path d="M14 24L24 14M24 21V14H17" stroke="#190041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ---------------- Mockups ---------------- */

const DAYS = [["Mon", 5], ["Tue", 6], ["Wed", 7], ["Thu", 8], ["Fri", 9]] as const
const SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"]

function BookMock() {
  const [day, setDay] = useState(1)
  const [slot, setSlot] = useState(1)
  const d = DAYS[day]
  return (
    <div className="gs-mock">
      <div className="gs-host">
        <span className="gs-av"><img src={A + "bb-icon.png"} alt="" width={44} height={44} /></span>
        <span><b>BookingBee live demo</b><small>20 min · Video call + live phone test</small></span>
      </div>
      <i className="gs-rule" />
      <p className="gs-lbl">Pick a day · October</p>
      <div className="gs-days" role="group" aria-label="Pick a day">
        {DAYS.map(([w, n], k) => (
          <button type="button" key={w} className={"gs-day" + (k === day ? " on" : "")} aria-pressed={k === day} onClick={() => setDay(k)}>
            <small>{w}</small><b>{n}</b>
          </button>
        ))}
      </div>
      <p className="gs-lbl">Available times</p>
      <div className="gs-slots" role="group" aria-label="Available times">
        {SLOTS.map((t, k) => (
          <button type="button" key={t} className={"gs-slot" + (k === slot ? " on" : "")} aria-pressed={k === slot} onClick={() => setSlot(k)}>{t}</button>
        ))}
      </div>
      <button type="button" className="gs-confirm" data-open-demo="" data-demo-topic={`Live demo · ${d[0]}, Oct ${d[1]} · ${SLOTS[slot]}`}>
        Confirm {d[0]}, Oct {d[1]} · {SLOTS[slot]}
      </button>
    </div>
  )
}

const TOOLS = [
  { name: "Meevo", sub: "Services, staff & hours", state: "Connected" },
  { name: "Square", sub: "Payments & deposits", state: "Connected" },
  { name: "Google Business", sub: "Hours & location", state: "Connected" },
  { name: "Your salon voice", sub: "Warm · English + Español", state: "Choose" },
]

function SetupMock() {
  return (
    <div className="gs-mock">
      <div className="gs-host">
        <span className="gs-av"><img src={A + "bb-icon.png"} alt="" width={44} height={44} /></span>
        <span><b>Setting up Aurora Hair &amp; Co</b><small>Done for you by your onboarding specialist</small></span>
      </div>
      <i className="gs-rule" />
      <div className="gs-prog-row"><p className="gs-lbl">Setup progress</p><span className="gs-prog-val">3 of 4</span></div>
      <div className="gs-prog"><i style={{ width: "75%" }} /></div>
      <div className="gs-list">
        {TOOLS.map((t) => (
          <div className="gs-item" key={t.name}>
            <span className="gs-item-ic">{t.name.charAt(0)}</span>
            <span className="gs-item-tx"><b>{t.name}</b><small>{t.sub}</small></span>
            <span className={"gs-tag" + (t.state === "Connected" ? " ok" : "")}>{t.state}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const WHEN = ["After hours", "Overflow", "Always on"]

function LiveMock() {
  const [when, setWhen] = useState(0)
  return (
    <div className="gs-mock">
      <div className="gs-host">
        <span className="gs-av"><img src={A + "bb-icon.png"} alt="" width={44} height={44} /></span>
        <span><b>Your salon line</b><small>(312) 555-0187 · keeps your number</small></span>
      </div>
      <i className="gs-rule" />
      <p className="gs-lbl">When should Bee answer?</p>
      <div className="gs-seg" role="group" aria-label="When should Bee answer">
        {WHEN.map((w, k) => (
          <button type="button" key={w} className={"gs-slot" + (k === when ? " on" : "")} aria-pressed={k === when} onClick={() => setWhen(k)}>{w}</button>
        ))}
      </div>
      <div className="gs-switch-row">
        <span className="gs-item-tx"><b>Call forwarding</b><small>Missed &amp; busy calls route to Bee</small></span>
        <span className="gs-switch on" aria-hidden="true"><i /></span>
      </div>
      <p className="gs-lbl">First calls today</p>
      <div className="gs-list">
        <div className="gs-item"><span className="gs-item-ic y">SM</span><span className="gs-item-tx"><b>Sarah Miller</b><small>Balayage · Sat 2:00 PM</small></span><span className="gs-tag ok">Booked</span></div>
        <div className="gs-item"><span className="gs-item-ic">JT</span><span className="gs-item-tx"><b>Jason Tran</b><small>“Are you open Sunday?”</small></span><span className="gs-tag">Answered</span></div>
      </div>
    </div>
  )
}

const BARS = [38, 52, 46, 64, 58, 80, 72]

function MonitorMock() {
  return (
    <div className="gs-mock">
      <div className="gs-host">
        <span className="gs-av"><img src={A + "bb-icon.png"} alt="" width={44} height={44} /></span>
        <span><b>Weekly report</b><small>Oct 5 – Oct 11 · all locations</small></span>
      </div>
      <i className="gs-rule" />
      <div className="gs-stats">
        <div><small>Calls answered</small><b>212</b></div>
        <div><small>Booked</small><b>64</b></div>
        <div><small>Revenue</small><b>$4.8k</b></div>
      </div>
      <div className="gs-bars" aria-hidden="true">
        {BARS.map((h, k) => <i key={k} style={{ height: h + "%" }} className={k === 5 ? "on" : ""} />)}
      </div>
      <div className="gs-days-lbl" aria-hidden="true">{["M", "T", "W", "T", "F", "S", "S"].map((x, k) => <span key={k}>{x}</span>)}</div>
      <div className="gs-tip">
        <span className="gs-item-tx"><b>Suggested tweak</b><small>Add gel removal price · asked 9×</small></span>
        <span className="gs-tag ok">Apply</span>
      </div>
    </div>
  )
}

type Step = { tab: string; title: string; lead: string; points: string[]; toast: string; mock: ReactNode }

const STEPS: Step[] = [
  { tab: "Book a demo", title: "Book a demo", lead: "See how BookingBee handles a real call for your salon’s services.",
    points: ["A live call using your own service menu", "Tailored to salons, spas, med spas or barbershops", "Pricing and plan fit, answered on the spot"],
    toast: "New demo slots open this week", mock: <BookMock /> },
  { tab: "Quick setup", title: "Quick setup", lead: "We load your services, staff and hours and connect the tools you already use.",
    points: ["Services, prices and staff imported for you", "Connects to Meevo, Square, Phorest and more", "Pick a voice and greeting that sounds like you"],
    toast: "Most salons are set up in a day", mock: <SetupMock /> },
  { tab: "Go live", title: "Go live", lead: "Forward your existing number and Bee starts answering, no new phone line needed.",
    points: ["Keep your salon number, just forward calls", "Choose after hours, overflow or always on", "Bookings land straight in your calendar"],
    toast: "Bee is live on your line", mock: <LiveMock /> },
  { tab: "Monitor & refine", title: "Monitor & refine", lead: "Every call is summarised, and your weekly report shows what Bee booked for you.",
    points: ["Call summaries and full transcripts", "Weekly bookings and revenue report", "We fine-tune answers as your menu changes"],
    toast: "Your weekly report is ready", mock: <MonitorMock /> },
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
    <section className="gs" id="get-started" aria-labelledby="gs-title" ref={secRef}>
      <div className="gs-inner">
        <div className="gs-head">
          <div className="gs-heading">
            <span className="gs-eyebrow">GETTING STARTED</span>
            <h2 id="gs-title">Live on your phones<br />in <em>4 simple</em> steps</h2>
          </div>
          <p className="gs-intro">From first demo to a fully answering front desk in days. We do the heavy lifting, you stay with your clients.</p>
        </div>

        <div className="gs-tabs" role="tablist" aria-label="Getting started steps" onKeyDown={onKey}>
          {STEPS.map((st, i) => (
            <button
              key={st.tab} type="button" role="tab" id={`gs-tab-${i}`} aria-controls="gs-panel" aria-selected={i === active} tabIndex={i === active ? 0 : -1}
              ref={(n) => { tabRefs.current[i] = n }} className={"gs-tab" + (i === active ? " on" : "")} onClick={() => pick(i)}
            >
              <TabIcon i={i} />
              <span className="gs-tab-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="gs-tab-t">{st.tab}</span>
            </button>
          ))}
        </div>

        <div className="gs-panel" id="gs-panel" role="tabpanel" aria-labelledby={`gs-tab-${active}`}>
          <div className="gs-content" key={"c" + active}>
            <Tile i={active} />
            <div className="gs-text">
              <p className="gs-step">STEP {num}</p>
              <h3>{s.title}</h3>
              <p className="gs-lead">{s.lead}</p>
            </div>
            <ul className="gs-points">
              {s.points.map((p) => <li key={p}><Check />{p}</li>)}
            </ul>
            <div className="gs-cta-wrap">
              <a className="gs-cta" href="#demo" data-open-demo="" data-demo-topic={`Getting started · ${s.tab}`}>Book a demo<Arrow /></a>
            </div>
          </div>
          <div className="gs-visual" aria-hidden={false}>
            <i className="gs-blob b0" /><i className="gs-blob b1" /><i className="gs-blob b2" /><i className="gs-blob b3" />
            <div className="gs-mock-wrap" key={"m" + active}>
              {s.mock}
              <span className="gs-toast"><i />{s.toast}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
