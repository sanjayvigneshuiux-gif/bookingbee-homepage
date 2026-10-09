import { useEffect, useMemo, useState } from "react"

/**
 * Integrations page — Figma "Feature Page / AI Phone Receptionist" (3052:5014, page "Integrations page").
 * Opened from the homepage Integrations section / header nav via the #/integrations route.
 * Header, footer CTA and site footer are the shared site components (rendered by App).
 */

const A = "public/assets/int/"

const HERO_LOGOS = [
  ["hl-meevo", "Meevo"], ["hl-phorest", "Phorest"], ["hl-mindbody", "Mindbody"], ["hl-bookme", "BookMe Beauty"],
  ["hl-booker", "Booker"], ["hl-setmore", "Setmore"], ["hl-square", "Square"],
] as const

type Cat = "booking" | "telephony" | "messaging"
const PLATFORMS = [
  { logo: "lg-meevo", lw: 160, name: "Meevo", tags: ["Salon", "Spa", "Scheduling"], text: "Every call becomes a confirmed slot in Meevo, matched to the right stylist's real-time availability." },
  { logo: "lg-phorest", lw: 160, name: "Phorest", tags: ["Salon", "Spa", "Scheduling"], text: "BookingBee reads your Phorest services and schedules and fills open chairs day and night." },
  { logo: "lg-mindbody", lw: 160, name: "Mindbody", tags: ["Spa", "Wellness", "Scheduling"], text: "Treatments booked into Mindbody while your team stays with the client in the room." },
  { logo: "lg-boulevard", lw: 250, name: "Boulevard", tags: ["Salon", "Spa", "Scheduling"], text: "Calls and texts turn into Boulevard appointments, so the premium experience starts on the first ring." },
  { logo: "lg-square", lw: 160, name: "Square Appointments", tags: ["Salon", "Barbershop", "Scheduling"], text: "Bookings land in Square without you pausing a cut to grab the phone." },
  { logo: "lg-booker", lw: 160, name: "Booker", tags: ["Salon", "Spa", "Scheduling"], text: "After-hours and overflow calls turn into confirmed Booker appointments." },
  { logo: "lg-daysmart", lw: 193, name: "DaySmart", tags: ["Salon", "Barbershop", "Scheduling"], text: "Your DaySmart calendar stays full during your busiest hours, because every call is answered." },
  { logo: "lg-setmore", lw: 160, name: "SetMore", tags: ["Beauty", "Wellness", "Scheduling"], text: "Booking requests from calls and messages flow straight into SetMore, with no manual entry." },
  { logo: "lg-bookme", lw: 97, name: "BookmeBeauty", tags: ["Beauty", "Wellness", "Scheduling"], text: "Booking requests from calls and messages flow straight into BookmeBeauty, with no manual entry." },
]
const TELEPHONY = [
  { img: "tel2-mobile", w: 122, h: 112, title: "Mobile", text: "Forward your salon phone so every call gets answered, even mid-service." },
  { img: "tel2-voip", w: 120, h: 120, title: "VoIP & Cloud Phones", text: "Works with the internet and cloud phone systems salons already use." },
  { img: "tel2-forward", w: 122, h: 112, title: "Call Forwarding", text: "Turn it on from your phone settings in minutes. No new hardware." },
]
const MESSAGING = [
  { img: "msg-sms", icon: "mi-1", title: "SMS Texting", text: "Books, reschedules and answers questions over SMS like a front desk." },
  { img: "msg-chat", icon: "mi-2", title: "Website AI Chatbot", text: "Converts website visitors into booked appointments, 24/7." },
  { img: "msg-fb", icon: "mi-3", title: "Facebook Messenger", text: "Answers questions on your Facebook page and books clients right inside Messenger." },
  { img: "msg-wa", icon: "mi-4", title: "WhatsApp Business", text: "Chats with clients on WhatsApp, shares open slots and confirms bookings in seconds." },
  { img: "msg-ig", icon: "mi-5", title: "Instagram DMs", text: "Turns DMs and story replies into booked appointments, even while you’re with a client." },
]
const TABS: { key: "all" | Cat; label: string }[] = [
  { key: "all", label: "All" }, { key: "booking", label: "Booking Software" }, { key: "telephony", label: "Telephony" }, { key: "messaging", label: "Messaging" },
]

const FAQS: [string, string][] = [
  ["Which booking software does BookingBee integrate with?", "BookingBee connects directly with eight leading salon and spa platforms: Meevo, Phorest, Mindbody, Boulevard, Square Appointments, Booker, DaySmart and SetMore. Once connected, your AI receptionist checks live availability and books appointments straight into your existing calendar. Your team keeps working in the software they already know, and every booking BookingBee makes shows up there instantly, with no double entry."],
  ["How does BookingBee book appointments into my calendar?", "When a client calls or texts, BookingBee checks your booking software in real time for open slots that match the requested service and stylist. It offers the client available times, confirms their choice, and writes the appointment directly into your calendar. Reschedules and cancellations sync the same way, so your front desk always sees an accurate, up-to-date schedule."],
  ["Can clients book with a specific stylist or provider?", "Yes. BookingBee reads each stylist's or provider's individual schedule, along with service durations, before offering a time. If a client asks for a favorite stylist, BookingBee offers only that person's open slots. If none work, it can suggest another team member or a different day, so the client still ends the call with a confirmed appointment."],
  ["Do I need to change my salon's phone number?", "No. You keep the number your clients already know. Simply forward calls from your existing salon line to BookingBee and choose when it answers: every call, only after hours, or when your line is busy or unanswered. Clients won't notice any change, except that every call now gets answered, even during your busiest hours."],
  ["Does BookingBee work with my phone provider?", "BookingBee works with most landline, mobile and VoIP providers, because setup relies on standard call forwarding that nearly every provider supports. During onboarding, our team walks you through the forwarding settings for your specific provider."],
  ["How long does setup take?", "Most salons are up and running in 5 to 7 business days. You connect your booking software, forward your phone line, and add your salon's services, policies and FAQs. Our onboarding specialists guide you through each step, so you don't need an IT team or technical knowledge. Before going live, you make a test call and watch the booking appear in your calendar."],
  ["What information does BookingBee sync with my booking software?", "BookingBee reads your real-time availability, services, durations, prices, business hours and blocked time, so it never offers a slot you can't fill. It then writes new appointments, reschedules and cancellations back to your software. Depending on your platform, it can also recognize returning clients and create new client profiles. Exact sync details vary by platform."],
  ["Does BookingBee handle text messages as well as calls?", "Yes. With omni-channel messaging, clients can reach you by phone or text, and BookingBee replies on the same channel. It sends appointment confirmations and reminders by text, and clients can reschedule or cancel simply by replying. Every booking made over text lands in the same calendar as phone bookings, keeping your whole schedule in one place."],
  ["Can callers still reach a real person?", "Yes. If a caller asks for a team member or has a question BookingBee shouldn't handle, it can transfer the call to your staff or take a detailed message and notify your team. You set the rules for when calls get handed off, so sensitive conversations and VIP clients always get the personal touch you want."],
  ["What happens if my booking software goes down?", "If BookingBee can't reach your booking software, it won't guess or risk a double booking. Instead, it captures the caller's name, number and requested service, lets them know your team will confirm shortly, and alerts your staff. Once the connection is restored, real-time booking resumes automatically, so no client request ever gets lost."],
  ["Does BookingBee work for spas, med spas and barbershops?", "Yes. BookingBee is built for salons, spas, med spas and barbershops. Spas use it to book treatments while therapists are in session, med spas to capture new consultation requests, and barbershops to answer calls without stopping a cut. Because it connects with the platforms each business already uses, setup is the same whatever type of business you run."],
  ["My booking software isn't listed. Can I still use BookingBee?", "Tell us what you use through the integration request form on this page. We prioritize new integrations based on what salon owners ask for, and we'll let you know as soon as yours is available. A BookingBee specialist may also reach out to discuss options that could get you answering every call sooner."],
]

const Check = () => (
  <span className="ip-check" aria-hidden="true"><svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5 3.7 6 9 1" stroke="#3bb581" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
)


function FeatureCard({ img, icon, title, text }: { img: string; icon: string; title: string; text: string }) {
  return (
    <article className="ip-mini">
      <div className="ip-mini-vis"><img src={A + img + ".webp"} alt="" width={216} height={162} loading="lazy" /></div>
      <div className="ip-mini-txt">
        <h4><img src={A + icon + ".png"} alt="" width={32} height={32} />{title}</h4>
        <p>{text}</p>
      </div>
    </article>
  )
}

const STORIES = [
  { logo: A + "omnia.png", brand: "Omnia Salon", quote: "We were losing a lot of appointments, but now we believe BookingBee.ai will help us. We will be able to prioritize customer service as the AI assistant will handle all our appointment calls.", name: "Abhi Jaiswal, Owner", place: "Omnia Salon, San Diego" },
  { logo: "public/assets/logo-beneath-surface.png", brand: "Beneath the Surface Spa", quote: "Since BookingBee started answering, no call goes to voicemail, even during a full book of blowouts.", name: "Marcia, Owner", place: "Beneath the Surface Spa, New Jersey" },
  { logo: "", brand: "Aura Hair Co", quote: "Clients start on Instagram and finish by phone without repeating themselves. That used to be chaos.", name: "Dominique, Owner", place: "Aura Hair Co, Boca Raton" },
]

function Stories() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setTimeout(() => setI((n) => (n + 1) % STORIES.length), 6000)
    return () => window.clearTimeout(t)
  }, [i, paused])
  const s = STORIES[i]
  const play = () => window.dispatchEvent(new CustomEvent("bb:play-video", { detail: { src: "", title: "Introducing BookingBee", poster: A + "video-bg.webp" } }))
  return (
    <section className="ip-stories" aria-labelledby="ip-stories-title">
      <div className="ip-story" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <h2 id="ip-stories-title">What Our Customers Says</h2>
        <div className="ip-story-body" key={i} aria-live="polite">
          <div className="ip-story-logo">{s.logo ? <img src={s.logo} alt={s.brand} /> : <span>{s.brand}</span>}</div>
          <blockquote>{s.quote}</blockquote>
          <p className="ip-story-name">{s.name}</p>
          <p className="ip-story-place">{s.place}</p>
        </div>
        <div className="ip-dots" role="tablist" aria-label="Choose a customer story">
          {STORIES.map((st, k) => <button key={st.brand} type="button" role="tab" aria-selected={k === i} aria-label={st.brand} className={k === i ? "is-on" : ""} onClick={() => setI(k)} />)}
        </div>
      </div>
      <button className="ip-video" type="button" onClick={play} aria-label="Play the Introducing BookingBee video">
        <span className="ip-video-intro">Introducing</span>
        <img className="ip-video-word" src={A + "bb-word.png"} alt="BookingBee" width={345} height={70} />
        <span className="ip-video-play" aria-hidden="true"><svg width="34" height="38" viewBox="0 0 34 38" fill="none"><path d="M32 16.4c2 1.15 2 4.05 0 5.2L4.5 37.5C2.5 38.65 0 37.2 0 34.9V3.1C0 .8 2.5-.65 4.5.5L32 16.4Z" fill="#190041"/></svg></span>
      </button>
    </section>
  )
}

export default function IntegrationsPage() {
  const [tab, setTab] = useState<"all" | Cat>("all")
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(0)

  const query = q.trim().toLowerCase()
  const match = (s: string) => !query || s.toLowerCase().includes(query)
  const show = (c: Cat) => tab === "all" || tab === c
  const platforms = useMemo(() => PLATFORMS.filter((p) => match(p.name + " " + p.tags.join(" ") + " " + p.text)), [query])
  const tele = TELEPHONY.filter((t) => match(t.title + " " + t.text))
  const msg = MESSAGING.filter((t) => match(t.title + " " + t.text))
  const sameNum = match("same number keep your existing number carrier line google website")
  const nothing = (!show("booking") || !platforms.length) && (!show("telephony") || (!tele.length && !sameNum)) && (!show("messaging") || !msg.length)

  return (
    <main className="ip" id="integrations-page">
      {/* ===== Hero ===== */}
      <section className="ip-hero" aria-labelledby="ip-title">
        <div className="ip-hero-text">
          <h1 id="ip-title">Works with the <span>salon software </span>you already run on</h1>
          <img className="ip-redline" src={A + "redline.png"} alt="" width={770} height={12} />
          <p>BookingBee books straight into your calendar and answers your existing calls. Your front desk workflow stays the same, and your missed calls turn into appointments.</p>
          <div className="ip-hero-btns">
            <a className="ip-btn-primary" href="#demo" data-open-demo="">Book a Demo</a>
            <a className="ip-btn-secondary" href="#ip-all">See All Integrations</a>
          </div>
        </div>
        <ul className="ip-hero-logos" aria-label="Booking software BookingBee connects to">
          {HERO_LOGOS.map(([f, n]) => <li key={f}><img src={A + f + ".png"} alt={n} title={n} width={32} height={32} /></li>)}
        </ul>
      </section>

      {/* ===== Scheduling integrations ===== */}
      <section className="ip-sched" id="ip-all" aria-labelledby="ip-sched-title">
        <div className="ip-intro">
          <p className="ip-label">Your software. Connected.</p>
          <h2 id="ip-sched-title">Books directly into your scheduling platform</h2>
          <p>BookingBee reads live availability and confirms every appointment back to the calendar your team already checks.</p>
        </div>

        <div className="ip-controls">
          <div className="ip-tabs" role="tablist" aria-label="Filter integrations">
            {TABS.map((t) => (
              <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className={tab === t.key ? "is-on" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
            ))}
          </div>
          <label className="ip-search">
            <img src={A + "search.png"} alt="" width={18} height={18} />
            <input type="search" placeholder="Search your software" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search your software" />
          </label>
        </div>

        {show("booking") && platforms.length > 0 && (
          <div className="ip-grid">
            {platforms.map((p) => (
              <article className="ip-card" key={p.name}>
                <div className="ip-card-id">
                  <img src={A + p.logo + ".png"} alt={p.name + " logo"} width={p.lw} height={48} />
                  <span className="ip-badge">Direct Sync</span>
                </div>
                <h3>{p.name}</h3>
                <ul className="ip-tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <p>{p.text}</p>
                <a className="ip-explore" href="#demo" data-open-demo="" data-demo-topic={p.name + " integration"}>Explore integration →</a>
              </article>
            ))}
          </div>
        )}

        {show("telephony") && (tele.length > 0 || sameNum) && (
          <div className="ip-group">
            <div className="ip-group-head">
              <p className="ip-label">Telephony</p>
              <h2>Answers on the phone line you already have.</h2>
              <p>Landline, mobile or VoIP, BookingBee picks up through simple call forwarding. No new number, no new hardware and no switching carriers.</p>
            </div>
            <div className="ip-tele">{tele.map((t) => (
              <article className="ip-tcard" key={t.title}>
                <div className="ip-tcard-vis"><img src={A + t.img + ".png"} alt="" width={t.w} height={t.h} loading="lazy" /></div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </article>
            ))}
              {sameNum && (
                <article className="ip-plan">
                  <img className="ip-plan-art" src={A + "tanyi.webp"} alt="" width={262} height={227} loading="lazy" />
                  <div className="ip-plan-card">
                    <h3>Keep your <span>Same Number</span>.<br />Tanyi answers it.</h3>
                    <p>Keep your existing number across phones, Google, and your website. BookingBee works with any carrier or line, ensuring every call gets answered.</p>
                    <a className="ip-plan-btn" href="#demo" data-open-demo="" data-demo-topic="Keep my existing number">Connect now</a>
                  </div>
                </article>
              )}
            </div>
          </div>
        )}

        {show("messaging") && msg.length > 0 && (
          <div className="ip-group">
            <div className="ip-group-head">
              <p className="ip-label">Messaging</p>
              <h2>Every text and DMs, answered and booked.</h2>
              <p>SMS, website chat, Instagram, Facebook and WhatsApp. BookingBee replies in seconds and books straight into your calendar, so no message goes cold.</p>
            </div>
            <div className="ip-row">{msg.map((t) => <FeatureCard key={t.title} {...t} />)}</div>
          </div>
        )}

        {nothing && <p className="ip-empty">No match for “{q}”. Tell us what you use below and we’ll build it.</p>}

        <div className="ip-request">
          <img className="ip-request-bee" src={A + "cta-bee.webp"} alt="" width={497} height={431} loading="lazy" />
          <div className="ip-request-card">
            <h2>Don’t see your software?</h2>
            <p>Tell us what you use. We add new integrations based on what salon owners ask for.</p>
            <a className="ip-btn-red" href="#demo" data-open-demo="" data-demo-topic="Integration request">Request an integration</a>
            <img className="ip-request-obj" src={A + "cta-obj.webp"} alt="" width={122} height={176} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== What syncs ===== */}
      <section className="ip-split ip-sync" aria-labelledby="ip-sync-title">
        <div className="ip-split-txt">
          <p className="ip-label">What Syncs</p>
          <h2 id="ip-sync-title">Your calendar stays the single source of truth</h2>
          <p>BookingBee never guesses. It checks your live schedule before offering a time, and every change it makes shows up in your software instantly.</p>
        </div>
        <img className="ip-split-vis" src={A + "sync-cal.webp"} alt="Monthly calendar and a day view with bookings synced by BookingBee" width={587} height={500} loading="lazy" />
      </section>

      {/* ===== Phone connection ===== */}
      <section className="ip-split rev ip-phone" aria-labelledby="ip-phone-title">
        <img className="ip-split-vis" src={A + "phone-vis.webp"} alt="Linking your existing salon number and a call being redirected" width={579} height={514} loading="lazy" />
        <div className="ip-split-txt">
          <p className="ip-label">One familiar number</p>
          <h2 id="ip-phone-title">Keep your number. Never miss a ring.</h2>
          <p>Clients call the same number they always have. You decide when BookingBee picks up.</p>
          <div className="ip-detail"><h3><Check />Forward your existing line</h3><p>Route calls from your current salon number to BookingBee. Clients notice nothing, except that someone always answers.</p></div>
          <div className="ip-detail"><h3><Check />Choose when it answers</h3><p>Every call, after hours only, or as backup when the line is busy or unanswered.</p></div>
        </div>
      </section>

      {/* ===== Omnichannel ===== */}
      <section className="ip-split ip-omni" aria-labelledby="ip-omni-title">
        <div className="ip-split-txt">
          <p className="ip-label">Stay in the conversation</p>
          <h2 id="ip-omni-title">Calls, texts and messages, all answered</h2>
          <p>Clients reach you however they like. BookingBee replies on the same channel and books into the same calendar.</p>
          <ul className="ip-benefits">
            <li><Check />Appointment confirmations and reminders by text</li>
            <li><Check />Reschedule or cancel by replying to a message</li>
            <li><Check />One conversation history across channels</li>
          </ul>
        </div>
        <img className="ip-split-vis" src={A + "omni-vis.webp"} alt="Text conversation and incoming call both handled by BookingBee" width={553} height={460} loading="lazy" />
      </section>

      {/* ===== Testimonial + intro video (Figma 3197:20557) ===== */}
      <Stories />

      {/* ===== FAQs ===== */}
      <section className="ip-faq" aria-labelledby="ip-faq-title">
        <div className="ip-faq-intro">
          <h2 id="ip-faq-title">Integration questions, answered</h2>
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
          {FAQS.map(([qq, a], i) => (
            <div className={"ip-q" + (open === i ? " is-open" : "")} key={qq}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{qq}</span>
                <i aria-hidden="true"><svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="m1 1.5 5 5 5-5" stroke="#632dba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></i>
              </button>
              <div className="ip-a"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
