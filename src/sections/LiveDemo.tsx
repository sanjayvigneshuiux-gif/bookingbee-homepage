import { useEffect, useRef, useState, type FormEvent } from "react"

/**
 * Live demo — v2 refresh (Figma NbdFRm4kfUKuq0nzPHHH26 · 67:599 Chat / 70:868 Voice).
 * Left: "Meet Tyani" mascot card. Right: a Chat ⇄ Voice widget the visitor can play with.
 * Chat replies are scripted; the voice tab runs a live call (timer, reactive voice orb, transcript).
 */

const A = "public/assets/"
const AV = A + "ld2-av.png"

type Msg = { from: "bee" | "you"; text: string; time?: string }

const QUICK = ["Book an Appointment", "Reschedule an Appointment", "Cancel an Appointment"] as const
const REPLIES: Record<string, string> = {
  "Book an Appointment": "Lovely! I have Saturday 11:30 AM or 2:00 PM with Jess for a balayage. Which works for you?",
  "Reschedule an Appointment": "No problem. I can move your Thursday 3:00 PM cut to Friday 10:00 AM or 4:30 PM. Which do you prefer?",
  "Cancel an Appointment": "Done, your Thursday 3:00 PM appointment is cancelled. Would you like me to rebook for next week?",
}
const now = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

/* ---------- Tyani's receptionist brain (shared by chat and the live voice call) ---------- */
type Brain = { stage: "idle" | "offered" | "booked"; service: string; slot: string }
const SERVICES = ["balayage", "haircut", "cut", "colour", "color", "highlights", "blowout", "manicure", "pedicure", "facial", "massage", "nails", "brows", "lashes"]
const SLOTS = ["11:30 AM", "2:00 PM"]

function think(input: string, b: Brain): { reply: string; brain: Brain } {
  const q = input.toLowerCase()
  const svc = SERVICES.find((x) => q.includes(x))
  const time = q.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?/)
  if (/\b(bye|goodbye|that'?s all|no thanks|nothing else)\b/.test(q))
    return { reply: "Thanks for calling! Have a lovely day.", brain: { stage: "idle", service: "", slot: "" } }
  if (b.stage === "offered" && (time || /\b(yes|yeah|yep|sure|first|earlier|morning|book it|perfect|great|ok|okay|second|later|afternoon)\b/.test(q))) {
    const slot = time ? `${time[1]}:${time[2] || "00"} ${time[3]?.startsWith("p") || (!time[3] && +time[1] < 8) ? "PM" : "AM"}`
      : /second|later|afternoon/.test(q) ? SLOTS[1] : SLOTS[0]
    return { reply: `Done! You're booked for a ${b.service} on Saturday at ${slot} with Jess. I've texted you a confirmation. Anything else I can help with?`, brain: { stage: "booked", service: b.service, slot } }
  }
  if (/cancel/.test(q)) return { reply: "No problem. I've cancelled your Thursday 3 PM appointment. Would you like to rebook for next week?", brain: { ...b, stage: "idle" } }
  if (/reschedul|move|change/.test(q)) return { reply: "Sure! I can move your appointment to Friday at 10 AM or 4:30 PM. Which works better?", brain: { ...b, stage: "offered", service: b.service || "appointment" } }
  if (svc || /\b(book|appointment|slot|available|availability|opening|saturday|tomorrow|today)\b/.test(q)) {
    const service = svc ? (svc === "cut" ? "haircut" : svc) : b.service || "appointment"
    return { reply: `Of course! For a ${service}, I have Saturday at ${SLOTS[0]} or ${SLOTS[1]}. Which one works for you?`, brain: { stage: "offered", service, slot: "" } }
  }
  if (/price|cost|how much/.test(q)) return { reply: "A balayage starts at 180 dollars and a haircut at 65. Would you like me to book one for you?", brain: b }
  if (/open|hours|close/.test(q)) return { reply: "We're open Tuesday to Saturday, 9 AM to 7 PM. Shall I find you a time?", brain: b }
  if (/park/.test(q)) return { reply: "There's free parking right behind the salon. Anything else?", brain: b }
  if (/\b(hi|hello|hey)\b/.test(q)) return { reply: "Hi there! I can book, move or cancel appointments and answer questions. What can I do for you?", brain: b }
  return { reply: "I can help you book, reschedule or cancel an appointment, or answer questions about our services. What would you like to do?", brain: b }
}

/* Browser speech APIs (Chrome, Edge and Safari support speech recognition) */
type SR = { lang: string; interimResults: boolean; continuous: boolean; start(): void; stop(): void; abort(): void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>; resultIndex: number }) => void) | null
  onend: (() => void) | null; onerror: ((e: { error: string }) => void) | null }
const getSR = (): (new () => SR) | null => {
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR }
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}
function pickVoice() {
  const vs = window.speechSynthesis?.getVoices() || []
  return vs.find((v) => /en-US/i.test(v.lang) && /(samantha|aria|jenny|google us english|female|zira)/i.test(v.name))
    || vs.find((v) => /^en/i.test(v.lang)) || null
}

/* Voice orb — after "Voice Interaction Animation" by BigLoong (Spline Community, CC BY 4.0).
   Rebuilt in CSS + a tiny canvas so it reacts to the live call (--lv = voice level 0..1) and stays light. */
function VoiceOrb() {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = cv.current; if (!c) return
    const g = c.getContext("2d"); if (!g) return
    const S = 132, dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = S * dpr; c.height = S * dpr; g.scale(dpr, dpr)
    const P = Array.from({ length: 90 }, () => ({ a: Math.random() * 6.283, r: 47 + Math.random() * 17, s: (Math.random() - 0.5) * 0.004, z: 0.4 + Math.random() * 1.1, t: Math.random() * 6.283 }))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0, on = true
    const draw = () => {
      if (on && !reduce) raf = requestAnimationFrame(draw)
      const lv = parseFloat(getComputedStyle(c).getPropertyValue("--lv")) || 0
      g.clearRect(0, 0, S, S)
      for (const p of P) {
        p.a += p.s * (1 + lv * 3); p.t += 0.05
        const r = p.r + lv * 4 + Math.sin(p.t * 0.6) * 1.5
        const x = S / 2 + Math.cos(p.a) * r, y = S / 2 + Math.sin(p.a) * r
        g.globalAlpha = (0.35 + 0.65 * Math.abs(Math.sin(p.t))) * (0.55 + lv * 0.45)
        g.fillStyle = p.z > 1.1 ? "#fff3c4" : "#ffc95a"
        g.fillRect(x, y, p.z, p.z)
      }
    }
    draw()
    const io = new IntersectionObserver(([e]) => { const was = on; on = e.isIntersecting; if (on && !was) draw() })
    io.observe(c)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])
  return (
    <span className="vo" aria-hidden="true">
      <canvas ref={cv} className="vo-dust" />
      <span className="vo-orb"><i className="b1" /><i className="b2" /><i className="b3" /><i className="b4" /><span className="vo-eyes"><b /><b /></span></span>
    </span>
  )
}

function ChatPane() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bee", text: "Hi! How can I help you today?", time: "10:24 AM" },
    { from: "you", text: "Any balayage slots this Saturday?" },
  ])
  const [typing, setTyping] = useState(true)
  const [chips, setChips] = useState(true)
  const [q, setQ] = useState("")
  const win = useRef<HTMLDivElement>(null)
  const brain = useRef<Brain>({ stage: "offered", service: "balayage", slot: "" })

  useEffect(() => { const t = window.setTimeout(() => setTyping(false), 1400); return () => window.clearTimeout(t) }, [])
  useEffect(() => { const w = win.current; if (w) w.scrollTo({ top: w.scrollHeight, behavior: "smooth" }) }, [msgs, typing])

  const ask = (text: string) => {
    if (!text.trim() || typing) return
    setChips(false)
    setMsgs((m) => [...m, { from: "you", text }])
    setTyping(true)
    window.setTimeout(() => { setTyping(false); const r = REPLIES[text] ? { reply: REPLIES[text], brain: { stage: "offered" as const, service: "appointment", slot: "" } } : think(text, brain.current)
      brain.current = r.brain
      setMsgs((m) => [...m, { from: "bee", text: r.reply, time: now() }]); setChips(true) }, 1200)
  }
  const submit = (e: FormEvent) => { e.preventDefault(); ask(q); setQ("") }

  return (
    <>
      <div className="ld2-who">
        <img src={AV} alt="" width={52} height={52} />
        <div><b>Chat with Tyani</b><small>AI receptionist · Online now</small></div>
      </div>
      <div className="ld2-window" ref={win} aria-live="polite">
        {msgs.map((m, i) => m.from === "bee" ? (
          <div className="ld2-bee-msg" key={i}>
            <div className="ld2-row"><img src={AV} alt="" width={36} height={36} /><p className="ld2-bubble bee">{m.text}</p></div>
            {m.time && <small>{m.time}</small>}
          </div>
        ) : (
          <div className="ld2-you-msg" key={i}><p className="ld2-bubble you">{m.text}</p></div>
        ))}
        {typing && <span className="ld2-typing" aria-label="Tyani is typing"><i /><i /><i /></span>}
        {chips && !typing && (
          <div className="ld2-chips">
            {QUICK.map((c, i) => <button type="button" key={c} className={i === 0 ? "on" : ""} onClick={() => ask(c)}>{c}</button>)}
          </div>
        )}
      </div>
      <form className="ld2-input" onSubmit={submit}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about a service…" aria-label="Ask Tyani about a service" />
        <button type="submit" className="ld2-send">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.3 3.7 3.9 10.2c-.7.3-.6 1.3.1 1.5l6.3 1.9 1.9 6.3c.2.7 1.2.8 1.5.1L20.3 3.7Z" fill="#190041" /><path d="m10.3 13.6 4.4-4.4" stroke="#ffc300" strokeWidth="1.6" strokeLinecap="round" /></svg>
          Send
        </button>
      </form>
    </>
  )
}

type Line = { who: "you" | "bee"; text: string; interim?: boolean }

function VoicePane() {
  const [phase, setPhase] = useState<"ready" | "connecting" | "speaking" | "listening" | "thinking" | "ended" | "error">("ready")
  const [err, setErr] = useState("")
  const [secs, setSecs] = useState(0)
  const [muted, setMuted] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const tr = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const st = useRef({ live: false, muted: false, brain: { stage: "idle", service: "", slot: "" } as Brain, rec: null as SR | null,
    stream: null as MediaStream | null, ctx: null as AudioContext | null, raf: 0, speaking: false })

  const supported = typeof window !== "undefined" && !!getSR() && "speechSynthesis" in window

  useEffect(() => { const w = tr.current; if (w) w.scrollTo({ top: w.scrollHeight, behavior: "smooth" }) }, [lines])
  useEffect(() => {
    if (phase === "ready" || phase === "ended" || phase === "error" || phase === "connecting") return
    const t = window.setInterval(() => setSecs((s) => s + 1), 1000)
    return () => window.clearInterval(t)
  }, [phase === "ready" || phase === "ended" || phase === "error" || phase === "connecting"])
  useEffect(() => () => hangUp(false), [])

  /* live microphone level → waveform bars */
  const meter = (stream: MediaStream) => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC(); st.current.ctx = ctx
    const an = ctx.createAnalyser(); an.fftSize = 64
    ctx.createMediaStreamSource(stream).connect(an)
    const data = new Uint8Array(an.frequencyBinCount)
    let lv = 0
    const loop = () => {
      st.current.raf = requestAnimationFrame(loop)
      const el = waveRef.current
      if (!el) return
      an.getByteFrequencyData(data)
      const s = st.current
      let sum = 0; for (let i = 1; i < 14; i++) sum += data[i] || 0
      const mic = Math.min(1, sum / 13 / 120)
      const target = s.speaking ? 0.45 + 0.4 * Math.abs(Math.sin(performance.now() / 150)) * Math.abs(Math.sin(performance.now() / 410)) : s.muted ? 0 : mic
      lv += (target - lv) * 0.25
      el.style.setProperty("--lv", lv.toFixed(3))
    }
    loop()
  }

  const say = (text: string) => new Promise<void>((done) => {
    const s = st.current
    setLines((l) => [...l, { who: "bee", text }])
    setPhase("speaking"); s.speaking = true
    const u = new SpeechSynthesisUtterance(text)
    const v = pickVoice(); if (v) u.voice = v
    u.rate = 1.02; u.pitch = 1.1
    const fin = () => { s.speaking = false; done() }
    u.onend = fin; u.onerror = fin
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u)
  })

  const listen = () => {
    const s = st.current
    if (!s.live) return
    if (s.muted) { setPhase("listening"); return }
    const R = getSR()!; const rec = new R(); s.rec = rec
    rec.lang = "en-US"; rec.interimResults = true; rec.continuous = false
    let finalText = ""
    rec.onresult = (e) => {
      let interim = ""
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) finalText += r[0].transcript; else interim += r[0].transcript
      }
      const shown = (finalText + interim).trim()
      if (!shown) return
      setLines((l) => { const last = l[l.length - 1]; const row = { who: "you" as const, text: shown, interim: !finalText }
        return last && last.who === "you" && last.interim ? [...l.slice(0, -1), row] : [...l, row] })
    }
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") { setErr("Microphone access was blocked. Allow the microphone in your browser and try again."); hangUp(true, "error") }
    }
    rec.onend = async () => {
      s.rec = null
      if (!s.live) return
      const text = finalText.trim()
      if (!text) { if (!s.muted) listen(); return }
      setLines((l) => l.map((x, i) => (i === l.length - 1 && x.who === "you" ? { ...x, interim: false } : x)))
      setPhase("thinking")
      await new Promise((r) => setTimeout(r, 450))
      const { reply, brain } = think(text, s.brain); s.brain = brain
      await say(reply)
      if (/have a lovely day/i.test(reply)) { hangUp(true); return }
      listen()
    }
    setPhase("listening")
    try { rec.start() } catch { /* already started */ }
  }

  const start = async () => {
    setErr(""); setLines([]); setSecs(0); setMuted(false)
    const s = st.current
    s.brain = { stage: "idle", service: "", slot: "" }; s.muted = false
    setPhase("connecting")
    try {
      s.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
    } catch {
      setErr("Microphone access was blocked. Allow the microphone in your browser and try again."); setPhase("error"); return
    }
    s.live = true
    meter(s.stream)
    window.speechSynthesis.getVoices()
    await say("Hi! Thanks for calling Bella Salon, this is Tyani. How can I help you today?")
    listen()
  }

  function hangUp(show = true, to: "ended" | "error" = "ended") {
    const s = st.current
    s.live = false; s.speaking = false
    try { s.rec?.abort() } catch { /* noop */ }
    s.rec = null
    window.speechSynthesis?.cancel()
    s.stream?.getTracks().forEach((t) => t.stop()); s.stream = null
    cancelAnimationFrame(s.raf); waveRef.current?.style.setProperty("--lv", "0")
    s.ctx?.close().catch(() => {}); s.ctx = null
    if (show) setPhase(to)
  }

  const toggleMute = () => {
    const s = st.current
    const m = !s.muted; s.muted = m; setMuted(m)
    s.stream?.getAudioTracks().forEach((t) => (t.enabled = !m))
    if (m) { try { s.rec?.abort() } catch { /* noop */ } } else if (!s.speaking && !s.rec) listen()
  }

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`
  const inCall = phase === "connecting" || phase === "speaking" || phase === "listening" || phase === "thinking"
  const status = phase === "connecting" ? "Connecting…" : phase === "speaking" ? "Tyani is speaking…" : phase === "thinking" ? "Thinking…"
    : phase === "listening" ? (muted ? "Muted" : "Listening…") : phase === "ended" ? "Call ended" : "Ready"

  return (
    <>
      <div className="ld2-who">
        <img src={AV} alt="" width={52} height={52} />
        <div><b>Talk to Tyani</b><small>AI receptionist · Voice call</small></div>
      </div>
      <div className={"ld2-call" + (inCall ? " live" : "") + (phase === "speaking" ? " talking" : "") + (phase === "ended" ? " ended" : "")} ref={waveRef}>
        <span className="ld2-status"><i />{status}&nbsp; {mmss}</span>
        <div className="ld2-visual">
          <VoiceOrb />
        </div>
        <div className="ld2-transcript" ref={tr} aria-live="polite">
          {lines.length === 0 && (
            <p className="hint">{!supported
              ? "Live voice needs Chrome, Edge or Safari. You can still try the chat, or get a real call from Tyani."
              : err || (phase === "ended" ? "Call ended. Start a new call any time." : "Tap “Start call”, allow your microphone, then talk to Tyani like a client would: book a balayage, move an appointment or ask about prices.")}</p>
          )}
          {lines.map((l, i) => (
            <p key={i} className={l.who + (l.interim ? " interim" : "")}><small>{l.who === "you" ? "You" : "TYANI"}</small>{l.text}</p>
          ))}
          {err && lines.length > 0 && <p className="hint">{err}</p>}
        </div>
      </div>
      <div className="ld2-controls">
        {inCall ? (
          <>
            <button type="button" className="ld2-mute" aria-pressed={muted} onClick={toggleMute}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" stroke="#fff" strokeWidth="1.8" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />{muted && <path d="M4 4l16 16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />}</svg>
              {muted ? "Unmute" : "Mute"}
            </button>
            <button type="button" className="ld2-end" onClick={() => hangUp(true)}>
              <svg width="25" height="10" viewBox="0 0 25 10" fill="none" aria-hidden="true"><path d="M12.5 1C7.6 1 3.3 2.6 1.3 4.9c-.5.6-.4 1.5.2 2l1.7 1.4c.6.5 1.5.4 2-.1l1.1-1.4c.3-.4.4-.9.2-1.4l-.3-.8c1.9-.7 4-1 6.3-1s4.4.3 6.3 1l-.3.8c-.2.5-.1 1 .2 1.4l1.1 1.4c.5.5 1.4.6 2 .1l1.7-1.4c.6-.5.7-1.4.2-2C21.7 2.6 17.4 1 12.5 1Z" fill="#fff" /></svg>
              End call
            </button>
          </>
        ) : (
          <>
            {supported && <button type="button" className="ld2-start" onClick={start}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" fill="#190041" /></svg>
              {phase === "ended" || phase === "error" ? "Call again" : "Start call"}
            </button>}
            <button type="button" className="ld2-mute" data-open-demo="" data-demo-topic="Live voice demo">Get a real call</button>
          </>
        )}
      </div>
    </>
  )
}

export default function LiveDemo() {
  const [mode, setMode] = useState<"chat" | "voice">("chat")
  return (
    <section className="ld2" id="live-demo" aria-labelledby="ld2-title">
      <div className="ld2-head">
        <span className="bb-pill"><i />Live Demo · Try It Now</span>
        <h2 id="ld2-title">The AI front desk for<br /><span>voice and chat</span></h2>
        <p>Human-sounding agents that answer every call and every website chat, book appointments, and never put a client on hold.</p>
      </div>

      <div className="ld2-cards">
        <div className="ld2-meet">
          <div className="ld2-art">
            <img className="ld2-bee float-y" src={A + "ld2-bee.webp"} alt="Tyani, the BookingBee AI receptionist, answering two phones" width={372} height={340} />
            <span className="ld2-hi">Hi! How can I help<br />you today?</span>
          </div>
          <h3>Meet Tyani</h3>
          <p>Your AI receptionist for beauty &amp; wellness</p>
          <ul className="ld2-traits">
            {["Every call answered", "Books appointments", "Never on hold"].map((t) => <li key={t}><i />{t}</li>)}
          </ul>
        </div>

        <div className="ld2-widget">
          <div className="ld2-toggle" role="tablist" aria-label="Demo type">
            <button type="button" role="tab" aria-selected={mode === "chat"} className={mode === "chat" ? "on" : ""} onClick={() => setMode("chat")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4.5L9 20.5V17H7a3 3 0 0 1-3-3V6Z" fill="currentColor" /><circle cx="8.5" cy="10" r="1.1" fill="var(--ld2-dot)" /><circle cx="12" cy="10" r="1.1" fill="var(--ld2-dot)" /><circle cx="15.5" cy="10" r="1.1" fill="var(--ld2-dot)" /></svg>
              Chat
            </button>
            <button type="button" role="tab" aria-selected={mode === "voice"} className={mode === "voice" ? "on" : ""} onClick={() => setMode("voice")}>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true">{[3, 6, 9, 12, 15, 18, 21].map((x, i) => <path key={x} d={`M${x} ${8 - [2, 4, 6, 7, 6, 4, 2][i]}v${[4, 8, 12, 14, 12, 8, 4][i]}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />)}</svg>
              Voice
            </button>
          </div>
          <div className="ld2-pane" key={mode}>{mode === "chat" ? <ChatPane /> : <VoicePane />}</div>
        </div>
      </div>
    </section>
  )
}
