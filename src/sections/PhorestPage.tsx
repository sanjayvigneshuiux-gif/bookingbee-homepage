import { useState } from "react"
import { PLATFORMS, PAGES } from "./IntegrationsPage"

/**
 * Phorest integration page — Figma NbdFRm4kfUKuq0nzPHHH26 · 25:13171.
 * Route: #/integration-phorest (opened from the Phorest card on the Integrations page).
 * Header, footer CTA and site footer are the shared site components rendered by App.
 */

const P = "public/assets/phorest/"
const I = "public/assets/int/"

const FACTS = [["2002", "Founded"], ["Dublin", "Headquartered in Ireland"], ["10,000+", "Salons on Phorest"], ["10", "Countries"]]

const FEATURES = [
  { icon: "pf-1", title: "Every call answered, 24/7", text: "After hours, weekends or mid-service, BookingBee picks up every call, so no client is sent to voicemail." },
  { icon: "pf-2", title: "Live Phorest booking", text: "BookingBee checks real availability and books, reschedules or cancels in your Phorest calendar during the call." },
  { icon: "pf-3", title: "Book by stylist", text: "Clients ask for their favourite stylist and get only that stylist’s open slots, at the right service length." },
  { icon: "pf-4", title: "No double entry", text: "Every booking and change appears in Phorest instantly. Nobody re-types voicemails or messages." },
  { icon: "pf-5", title: "Book by text", text: "With omni-channel messaging, clients book, reschedule or cancel by text, and it lands in the same Phorest calendar." },
  { icon: "pf-6", title: "Automated reminders", text: "Outbound reminders cut no-shows, and clients confirm or reschedule just by replying." },
  { icon: "pf-7", title: "Win back lapsed clients", text: "Outbound client retrieval reaches clients who haven’t booked in a while and rebooks them into Phorest.", elite: true },
  { icon: "pf-8", title: "Sounds like your salon", text: "Custom voice cloning gives BookingBee a voice that matches your brand.", elite: true },
  { icon: "pf-9", title: "Smart handoff", text: "Tricky or VIP calls go to your team, or BookingBee takes a detailed message." },
  { icon: "pf-10", title: "Keep your number", text: "Forward your existing salon line and choose when BookingBee answers. Clients notice nothing new." },
]

const SETUP = [
  { img: "ph-setup1", w: 180, title: "Connect Phorest", text: "Securely link your Phorest account. Your services, stylists and opening hours import automatically. No developer needed." },
  { img: "ph-setup2", w: 180, title: "Forward your salon number", text: "Keep the number clients know, and choose when BookingBee answers: every call, after hours, or when the line is busy." },
  { img: "ph-setup3", w: 177, title: "Go live", text: "Our team tailors BookingBee to your policies and FAQs. Make a test call, watch the booking land in Phorest, then switch it on." },
]

const FAQS: [string, string][] = [
  ["How does BookingBee integrate with Phorest?", "BookingBee connects securely to your Phorest account, giving your AI receptionist access to live availability, services and stylist schedules. When a client calls or texts, BookingBee checks Phorest in real time and books the appointment straight into your Phorest calendar. Reschedules and cancellations sync the same way, so Phorest stays your single source of truth with no manual entry."],
  ["Will BookingBee work with my existing phone number and system?", "Yes. You keep the salon number your clients already know and simply forward calls to BookingBee. It works with most landline, mobile and VoIP providers, and you choose when it answers: every call, only after hours, or when the line is busy or unanswered. Our onboarding team walks you through the forwarding settings for your provider."],
  ["Do I need to change how my team uses Phorest?", "No. BookingBee fits around the way your salon already runs Phorest. Appointments it books appear in the same calendar as walk-ins, online bookings and front desk bookings, so your team keeps working exactly as they do today. There’s no new system to learn, no staff retraining, and no changes to your Phorest services or settings."],
  ["Can clients book with their favourite Phorest stylist?", "Yes. BookingBee reads each stylist’s schedule in Phorest before offering a time. When a client asks for their favourite stylist, it offers only that stylist’s open slots, matched to the right service length. If nothing suits, it can suggest another stylist or a different day, so the client still ends the call with a confirmed booking."],
  ["Can clients book more than one service in a single call?", "Yes. A client can book a cut, colour and treatment in one conversation. BookingBee checks Phorest for back-to-back availability across the services and stylists involved, offers times that work for the whole visit, and syncs every service to your Phorest calendar. Your team sees the full appointment ready to go, without anyone picking up the phone."],
  ["Will BookingBee double-book my Phorest calendar?", "No. BookingBee checks Phorest for live availability at the moment of booking, using each service’s duration and every stylist’s existing appointments. It only offers slots that are genuinely free. If a slot fills while a client is deciding, for example through online booking or the front desk, BookingBee simply offers the next best time instead."],
  ["How do BookingBee reminders work with Phorest’s own reminders?", "BookingBee sends outbound appointment reminders, and clients can confirm, reschedule or cancel just by replying, with every change syncing straight to Phorest. During onboarding, our team sets up reminders around any Phorest reminders you already send, so clients are never messaged twice. You decide which system handles each reminder, keeping communication clear and consistent."],
  ["Does BookingBee work for multi-location Phorest salons?", "Yes. BookingBee can be set up for each of your Phorest locations, with every site’s own services, stylists, opening hours and phone number. Callers get accurate availability for the salon they’re calling, and bookings land in the right location’s Phorest calendar. Growing groups get the same consistent, instant answer at every salon."],
  ["Is my Phorest client data secure?", "Yes. BookingBee connects to Phorest over an encrypted connection and only accesses what it needs to answer calls and book appointments, such as availability, services and client contact details. Your client data stays protected and is never sold or shared."],
  ["How quickly can my salon go live?", "Most Phorest salons go live within 7 days. You connect Phorest, forward your number and share your salon’s policies and FAQs, and our onboarding specialists handle the setup for you. No technical knowledge is needed. Before going live, you make a test call and watch the appointment appear in your Phorest calendar, so you know it works."],
]

const RELATED = ["Meevo", "Phorest", "Mindbody"].map((n) => PLATFORMS.find((p) => p.name === n)!)

export default function PhorestPage() {
  const [open, setOpen] = useState(0)
  return (
    <main className="ip ph" id="integration-phorest">
      {/* ===== Hero ===== */}
      <section className="ph-hero" aria-labelledby="ph-title">
        <img className="ph-lockup" src={P + "ph-lockup.png"} alt="BookingBee and Phorest" width={519} height={61} />
        <span className="bb-pill"><i />Phorest Integration</span>
        <h1 id="ph-title">AI Receptionist for <span>Phorest</span></h1>
        <img className="ph-redline" src={P + "ph-redline.png"} alt="" width={934} height={19} />
        <p>BookingBee answers your salon's calls and texts, checks live availability in Phorest, and books the appointment straight into your calendar. Every ring becomes a booking, even when your whole team is behind the chair.</p>
        <div className="ph-btns">
          <a className="ph-btn-primary" href="#demo" data-open-demo="" data-demo-topic="Phorest integration">Book a Demo</a>
          <a className="ph-btn-secondary" href="#/integrations">See All Integrations</a>
        </div>
      </section>

      {/* ===== About Phorest ===== */}
      <section className="ph-about" aria-labelledby="ph-about-title">
        <div className="ph-about-card">
          <div className="ph-about-row">
            <div className="ph-about-txt">
              <img src={P + "ph-mark.png"} alt="Phorest" width={153} height={48} />
              <span className="bb-pill" id="ph-about-title"><i />About Phorest</span>
              <p>Phorest is an all-in-one management platform for salons, spas and clinics. It brings appointments and online booking, client records, staff rotas, stock, reporting, PhorestPay payments and built-in marketing into one system, which is why multi-stylist salons and growing groups rely on it to run their business day to day.</p>
            </div>
            <div className="ph-why">
              <span className="bb-pill"><i />Why connect BookingBee</span>
              <h2>Connecting BookingBee to Phorest adds the one thing your software can’t do on its own: <span>answer the phone</span>.</h2>
              <p>Your AI receptionist picks up every call and text, books into Phorest in real time, and keeps your calendar full while your team focuses on the client in the chair.</p>
            </div>
          </div>
          <dl className="ph-facts">
            {FACTS.map(([v, l]) => <div key={l}><dt>{v}</dt><dd>{l}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="ph-feat" aria-labelledby="ph-feat-title">
        <div className="ph-head">
          <span className="bb-pill"><i />BookingBee + Phorest</span>
          <h2 id="ph-feat-title">What your salon gets with<br />BookingBee + Phorest</h2>
          <p>Everything BookingBee does flows straight into Phorest, so your team keeps one calendar and one source of truth.</p>
        </div>
        <div className="ph-grid">
          {FEATURES.map((f) => (
            <article className="ph-fcard" key={f.title}>
              <div className="ph-fcard-top">
                <img src={P + f.icon + ".png"} alt="" width={44} height={44} />
                {f.elite && <span className="ph-elite">Elite</span>}
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== How setup works ===== */}
      <section className="ph-setup-wrap" aria-labelledby="ph-setup-title">
        <div className="ph-setup">
          <span className="bb-pill"><i />How Setup Works</span>
          <h2 id="ph-setup-title">Simple setup. <span>Live in 7 days.</span></h2>
          <p className="ph-setup-sub">We handle the setup. You keep running your salon.</p>
          <ol className="ph-steps">
            {SETUP.map((s, i) => (
              <li key={s.title}>
                <span className="ph-num">{String(i + 1).padStart(2, "0")}</span>
                <img src={P + s.img + ".png?v=2"} alt="" width={s.w} height={120} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Related integrations ===== */}
      <section className="ph-related" aria-labelledby="ph-rel-title">
        <div className="ph-rel-head">
          <div>
            <span className="bb-pill"><i />Explore the connections</span>
            <h2 id="ph-rel-title">More salon software. The same BookingBee.</h2>
          </div>
          <a className="ph-btn-outline" href="#/integrations">See All Integrations</a>
        </div>
        <div className="ip-grid">
          {RELATED.map((p) => (
            <article className="ip-card" key={p.name}>
              <div className="ip-card-id">
                <img src={I + p.logo + ".png"} alt={p.name + " logo"} width={p.lw} height={48} />
                <span className="ip-badge">Direct Sync</span>
              </div>
              <h3>{p.name}</h3>
              <ul className="ip-tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <p>{p.text}</p>
              {PAGES[p.name]
                ? <a className="ip-explore" href={PAGES[p.name]}>Explore integration →</a>
                : <a className="ip-explore" href="#demo" data-open-demo="" data-demo-topic={p.name + " integration"}>Explore integration →</a>}
            </article>
          ))}
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="ip-faq" aria-labelledby="ph-faq-title">
        <div className="ip-faq-intro">
          <span className="bb-pill"><i />FAQs</span>
          <h2 id="ph-faq-title">Integration questions, answered</h2>
          <p>Still unsure how BookingBee fits your setup? Our team can walk you through it.</p>
          <aside className="help-card">
            <div className="art"><img src="public/assets/faq-bee.webp" alt="" width="304" height="224" loading="lazy" /></div>
            <div className="txt">
              <h3>Still unsure? We can help!</h3>
              <p>Schedule a call with our team to learn how BookingBee can transform your salon.</p>
              <div className="btn-wrap"><a className="btn-talk" href="#demo" data-open-demo="">Talk to our team</a></div>
            </div>
          </aside>
        </div>
        <div className="ip-qs">
          {FAQS.map(([q, a], i) => (
            <div className={"ip-q" + (open === i ? " is-open" : "")} key={q}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <small className="ph-qn">{String(i + 1).padStart(2, "0")}</small>
                <span>{q}</span>
                <i aria-hidden="true" className="ph-pm">{open === i ? "−" : "+"}</i>
              </button>
              <div className="ip-a"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
