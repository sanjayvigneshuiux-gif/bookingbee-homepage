import { useEffect, useState } from "react"
import IntegrationsPage from "./sections/IntegrationsPage"
import PhorestPage from "./sections/PhorestPage"
import GradientBlinds from "@/components/ui/gradient-blinds"
import TrustedSection from "./sections/Trusted"
import VoicePopup from "./sections/VoicePopup"
import FeatureScroller from "./sections/FeatureScroller"
import LiveDemo from "./sections/LiveDemo"
import ReviewsSection from "./sections/Reviews"
import GetStarted from "./sections/GetStarted"
import { FooterCta, SiteFooter } from "./sections/Footer"
import { initInteractions } from "./interactions.js"


/**
 * BookingBee — Meevo LIVE! 2026 landing page.
 * Markup ported 1:1 from the Figma build. The Trusted section uses the
 * shadcn Globe component (components/ui/globe-feature-section.tsx) themed for BookingBee.
 */
export default function App() {
  useEffect(() => initInteractions(), [])

  /* Tiny hash router: #/integrations opens the Integrations page (Figma 3052:5014).
     Anchors inside the current view (#demo, #ip-all…) keep the view; any other anchor returns home. */
  type Route = "home" | "int" | "phorest"
  const routeFor = (prev: Route): Route => {
    const h = location.hash
    if (h.startsWith("#/integration-phorest")) return "phorest"
    if (h.startsWith("#/integrations")) return "int"
    if (!h || h === "#top") return "home"
    if (h === "#demo") return prev
    const el = document.getElementById(h.slice(1))
    if (el && el.closest("#integrations-page")) return "int"
    if (el && el.closest("#integration-phorest")) return "phorest"
    return "home"
  }
  const [route, setRoute] = useState<Route>(() => (location.hash.startsWith("#/integration-phorest") ? "phorest" : location.hash.startsWith("#/integrations") ? "int" : "home"))
  useEffect(() => {
    const onHash = () => setRoute((prev) => {
      const next = routeFor(prev)
      if (next !== prev) {
        requestAnimationFrame(() => {
          const id = location.hash.slice(1)
          const el = next === "home" && id && !id.startsWith("/") ? document.getElementById(id) : null
          if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior })
          else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
          window.dispatchEvent(new Event("resize"))
        })
      }
      return next
    })
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  useEffect(() => {
    const home = (window as unknown as { __bbTitle?: string })
    home.__bbTitle ??= document.title
    document.title = route === "int" ? "Integrations | BookingBee AI Receptionist" : route === "phorest" ? "Phorest Integration | AI Receptionist for Phorest | BookingBee" : home.__bbTitle
    document.body.classList.toggle("route-int", route !== "home")
  }, [route])

  return (
    <>
      <div className="page" id="page">

      {/* ============ HEADER ============ */}
      <header className="site-header" id="top">
        <div className="header-bar">
          <a className="brand" href="#top" aria-label="BookingBee home"><img src="public/assets/logo-header.svg" alt="BookingBee" width="196" height="40" /></a>
          <div className="header-right">
            <nav className="main-nav" aria-label="Primary">
              <ul>
                <li className="nav-item has-menu">
                  <a className="nav-link" href="#features" aria-haspopup="true">Solutions<span className="nav-caret" style={{ left: "86.25px" }}><svg viewBox="0 0 9 14" fill="none"><path d="M8.32031 5.57031C8.3724 5.6224 8.39844 5.68229 8.39844 5.75C8.39844 5.81771 8.3724 5.8776 8.32031 5.92969L4.67969 9.57031C4.6276 9.6224 4.56771 9.64844 4.5 9.64844C4.43229 9.64844 4.3724 9.6224 4.32031 9.57031L0.679688 5.92969C0.627604 5.8776 0.601562 5.81771 0.601562 5.75C0.601562 5.68229 0.627604 5.6224 0.679688 5.57031L1.07031 5.17969C1.1224 5.1276 1.18229 5.10156 1.25 5.10156C1.31771 5.10156 1.3776 5.1276 1.42969 5.17969L4.5 8.25L7.57031 5.17969C7.6224 5.1276 7.68229 5.10156 7.75 5.10156C7.81771 5.10156 7.8776 5.1276 7.92969 5.17969L8.32031 5.57031Z" fill="white"/></svg></span></a>
                  <div className="nav-menu">
                    <a href="#features">AI Receptionist for Salons</a>
                    <a href="#features">AI Receptionist for Hair Salons</a>
                    <a href="#features">AI Receptionist for Nail Salons</a>
                    <a href="#features">AI Receptionist for Spa</a>
                    <a href="#features">AI Receptionist for Med Spa</a>
                    <a href="#features">AI Receptionist for Barbers</a>
                  </div>
                </li>
                <li className="nav-item"><a className="nav-link" href="#" data-open-demo="">Pricing</a></li>
                <li className="nav-item"><a className="nav-link" href="#/integrations">Integrations</a></li>
                <li className="nav-item"><a className="nav-link" href="#stories">Our Story</a></li>
                <li className="nav-item has-menu">
                  <a className="nav-link" href="#faq" aria-haspopup="true">Resources<span className="nav-caret" style={{ left: "93.29px" }}><svg viewBox="0 0 9 14" fill="none"><path d="M8.32031 5.57031C8.3724 5.6224 8.39844 5.68229 8.39844 5.75C8.39844 5.81771 8.3724 5.8776 8.32031 5.92969L4.67969 9.57031C4.6276 9.6224 4.56771 9.64844 4.5 9.64844C4.43229 9.64844 4.3724 9.6224 4.32031 9.57031L0.679688 5.92969C0.627604 5.8776 0.601562 5.81771 0.601562 5.75C0.601562 5.68229 0.627604 5.6224 0.679688 5.57031L1.07031 5.17969C1.1224 5.1276 1.18229 5.10156 1.25 5.10156C1.31771 5.10156 1.3776 5.1276 1.42969 5.17969L4.5 8.25L7.57031 5.17969C7.6224 5.1276 7.68229 5.10156 7.75 5.10156C7.81771 5.10156 7.8776 5.1276 7.92969 5.17969L8.32031 5.57031Z" fill="white"/></svg></span></a>
                  <div className="nav-menu">
                    <a href="#stories">Customer Stories</a>
                    <a href="#how-it-works">See How It Works</a>
                    <a href="#faq">FAQs</a>
                  </div>
                </li>
              </ul>
            </nav>
            <a className="btn-demo-sm" href="#demo" data-open-demo="">Schedule a demo </a>
            <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button>
          </div>
        </div>
      </header>

      <main hidden={route !== "home"}>
      {/* ============ HERO (Figma NbdFRm4kfUKuq0nzPHHH26 · 118:4450) ============ */}
      <section className="hero2" aria-labelledby="hero-title">
        {/* interactive light-through-blinds backdrop (React Bits · GradientBlinds) in the BookingBee navy → purple */}
        <GradientBlinds className="hero2-blinds" gradientColors={["#5227FF", "#632DBA", "#B78BFF"]} angle={20} blindCount={16} blindMinWidth={60}
          spotlightRadius={0.7} spotlightOpacity={0.6} lightColor="#e4d4ff" shine={0.45} relief={0.5} glow={0.5}
          sway={0.35} hoverTilt={0.6} clickEffect="ripple" noise={0.22} mirrorGradient dpr={1.5} />
        <div className="hero2-copy">
          <span className="bb-pill"><i />AI Receptionist for Salons &amp; Spas</span>
          <h1 id="hero-title"><span className="y">#1</span> Voice AI Receptionist for <span className="l">Beauty Salons &amp; Spas</span></h1>
          <p>Whether you run a salon, spa, med spa, or barbershop, it never misses a client call and keeps your bookings flowing smoothly.</p>
          <div className="hero2-ctas">
            <a className="hero2-btn" href="#demo" data-open-demo="">Book a Demo</a>
            <a className="hero2-btn ghost" href="#features">See How it works</a>
          </div>
        </div>
        <div className="hero2-room" role="img" aria-label="BookingBee's robot bee receptionist answering a call at a salon front desk">
          <span className="hero2-voice" aria-hidden="true">
            {[3, 3.73, 3.27, 5.55, 12.16, 8.42, 15.75, 14.9, 23.38, 42.41, 25.63, 29.85, 41.25, 45.1, 67.5, 36.31, 38.36, 52.9, 40.35, 48.81, 23.63, 29.4, 31.27, 17, 15.86, 8.51, 10, 8.49, 3.44, 3, 3].map((h, i) => <i key={i} style={{ height: `${(h / 67.5) * 100}%`, animationDelay: `${(i % 7) * -0.17}s`, opacity: 0.38 + 0.62 * (1 - Math.abs(i - 15) / 15) }} />)}
          </span>
        </div>
      </section>

      {/* ============ TRUSTED + GLOBE ============ */}
      <TrustedSection />

      {/* ============ LIVE DEMO ============ */}
      <LiveDemo />

      {/* ============ FEATURE BENTO ============ */}
      <section className="bento-section" id="features" aria-labelledby="fs-title">
        {/* One AI front desk — horizontal feature scroller */}
        <FeatureScroller />

        {/* Built to handle the whole front desk */}
        <div className="handle-scroller" id="handle-scroller"><div className="handle" id="handle">
          <div className="handle-stage">
            <div className="handle-head">
              <span className="bb-pill"><i />What BookingBee Handles</span>
              <h2>Built to handle the whole front desk.</h2>
              <p className="lead">Not just bookings. Everything your front desk juggles between clients: late-night calls, second locations, languages, and the questions nobody writes down.</p>
            </div>
            <div className="handle-row">
            <div className="handle-left">
              <div className="accordion" id="accordion">
                <div className="acc-item is-open">
                  <button className="acc-head" type="button" aria-expanded="true">
                    <span className="acc-tile"><svg viewBox="12 12 24 24" fill="none" aria-hidden="true"><path d="M30.2 24.8C32.4 24.8 34.4 23.4 35.3 21.5C34.6 21.8 33.8 21.9 33 21.9C31.6 21.9 30.2 21.3 29.2 20.3C28.2 19.3 27.6 17.9 27.6 16.5C27.6 15.7 27.7 14.9 28 14.3C26.1 15.1 24.8 17.1 24.8 19.3C24.7 19.7 24.8 20.2 24.9 20.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.2 26.4C16.4 26.4 16.5 26.3 16.7 26.2C16.8 26.1 16.8 25.9 16.9 25.8C17.4 22.3 20 20.3 22.9 20.3C25.6 20.3 27.4 22 28.1 23.9C28.2 24 28.3 24.1 28.4 24.2C28.5 24.3 28.6 24.3 28.7 24.4C31.1 24.7 33 26.3 33 29C33 31.8 30.7 33.8 27.9 33.8H17C14.6 33.8 12.8 32.6 12.8 30C12.8 27.8 14.6 26.7 16.2 26.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    <span className="acc-title">After-hours &amp; overflow</span>
                    <svg className="acc-plus" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9 3.75v10.5" stroke="#9A93AE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="acc-body"><div><p>Closed, slammed, or on a lunch break, Bee picks up. Every call that used to hit voicemail becomes a booking.</p></div></div>
                </div>
                <div className="acc-item">
                  <button className="acc-head" type="button" aria-expanded="false">
                    <span className="acc-tile"><svg viewBox="10 10 24 24" fill="none" aria-hidden="true"><path d="M22 14a7 7 0 0 1 7 7c0 4.7-5.3 8-6.6 8.8a.9.9 0 0 1-.8 0C20.3 29 15 25.7 15 21a7 7 0 0 1 7-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="21" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    <span className="acc-title">Multi-location</span>
                    <svg className="acc-plus" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9 3.75v10.5" stroke="#9A93AE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="acc-body"><div><p>Run every location from one place. Bee knows each salon’s hours, team and services, and books callers into the right chair.</p></div></div>
                </div>
                <div className="acc-item">
                  <button className="acc-head" type="button" aria-expanded="false">
                    <span className="acc-tile"><svg viewBox="10 10 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M17.5 14C18.1 14 18.5 14.4 18.5 15V16H22C22.6 16 23 16.4 23 17C23 17.6 22.6 18 22 18H20.9C20.7 19.5 20.1 21.1 19.1 22.6L20.9 24.3C21.3 24.7 21.3 25.3 20.9 25.7C20.5 26.1 19.9 26.1 19.5 25.7L17.8 24.1C16.8 25 15.6 25.7 14.2 26C13.6 26.1 13.1 25.7 13 25.2C12.9 24.6 13.3 24.1 13.8 24C14.8 23.8 15.6 23.4 16.4 22.7L14.3 20.7C13.9 20.3 13.9 19.7 14.3 19.3C14.7 18.9 15.3 18.9 15.7 19.3L17.6 21.1C18.3 20.1 18.7 19 18.9 18H13C12.4 18 12 17.6 12 17C12 16.4 12.4 16 13 16H16.5V15C16.5 14.4 16.9 14 17.5 14ZM26.5 19C26.9 19 27.3 19.3 27.4 19.6L30.9 28.6C31.1 29.2 30.9 29.7 30.4 29.9C29.8 30.1 29.3 29.9 29.1 29.4L28.5 28H24.5L23.9 29.4C23.7 29.9 23.2 30.1 22.6 29.9C22.1 29.7 21.9 29.2 22.1 28.6L25.6 19.6C25.7 19.3 26.1 19 26.5 19ZM25.2 26H27.8L26.5 22.8L25.2 26Z"/></svg></span>
                    <span className="acc-title">Multi-language &amp; custom voices</span>
                    <svg className="acc-plus" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9 3.75v10.5" stroke="#9A93AE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="acc-body"><div><p>Clients hear a voice that fits your brand, in the language they’re most comfortable in.</p></div></div>
                </div>
                <div className="acc-item">
                  <button className="acc-head" type="button" aria-expanded="false">
                    <span className="acc-tile"><svg viewBox="10 10 24 24" fill="none" aria-hidden="true"><path d="M25 13.1C24.9 12.9 24.6 12.8 24.3 12.8H16.5C16 12.8 15.5 13 15.2 13.4C14.9 13.7 14.7 14.2 14.7 14.7V29.3C14.7 29.8 14.9 30.3 15.2 30.6C15.5 31 16 31.2 16.5 31.2H27.5C28 31.2 28.5 31 28.8 30.6C29.1 30.3 29.3 29.8 29.3 29.3V17.8C29.3 17.6 29.2 17.3 29 17.1L25 13.1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23.8 12.8V16.5C23.8 17 24 17.5 24.4 17.8C24.7 18.1 25.2 18.3 25.7 18.3H29.3M20.2 19.3H18.3M25.7 22.9H18.3M25.7 26.6H18.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    <span className="acc-title">Call summaries &amp; transcripts</span>
                    <svg className="acc-plus" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9 3.75v10.5" stroke="#9A93AE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="acc-body"><div><p>Every conversation lands in your dashboard with a quick summary and full transcript, so you always know what was booked, moved or asked.</p></div></div>
                </div>
                <div className="acc-item">
                  <button className="acc-head" type="button" aria-expanded="false">
                    <span className="acc-tile"><svg viewBox="10 10 24 24" fill="none" aria-hidden="true"><g transform="translate(10 10)"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg></span>
                    <span className="acc-title">Advanced AI configuration</span>
                    <svg className="acc-plus" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9 3.75v10.5" stroke="#9A93AE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="acc-body"><div><p>Set your booking rules, buffers and hand-off paths. Bee follows your front-desk playbook instead of a one-size-fits-all script.</p></div></div>
                </div>
                <div className="acc-item">
                  <button className="acc-head" type="button" aria-expanded="false">
                    <span className="acc-tile"><svg viewBox="10 10 24 24" fill="none" aria-hidden="true"><path d="M18 19H26M18 23H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M24.5 28.5L22 31L19 28H16C15.2 28 14.4 27.7 13.9 27.1C13.3 26.6 13 25.8 13 25V17C13 16.2 13.3 15.4 13.9 14.9C14.4 14.3 15.2 14 16 14H28C28.8 14 29.6 14.3 30.1 14.9C30.7 15.4 31 16.2 31 17V21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M29 29C29.4 29 29.9 28.8 30.2 28.6C30.6 28.3 30.8 27.9 30.9 27.5C31 27 31 26.6 30.8 26.2C30.6 25.8 30.3 25.4 29.9 25.2C29.5 25 29.1 25 28.6 25C28.2 25.1 27.8 25.4 27.5 25.7M29 32V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    <span className="acc-title">And all the little questions</span>
                    <svg className="acc-plus" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9 3.75v10.5" stroke="#9A93AE" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                  <div className="acc-body"><div><p>Parking, pricing, walk-ins, aftercare. Bee answers the questions nobody writes down, day or night.</p></div></div>
                </div>
              </div>
            </div>

            <img className="ml-pack" src="public/assets/multilang-pack.webp" alt="AI Languages picker, Clone Your Voice and Pro Voice library in BookingBee" width={656} height={645} loading="lazy" />
            <div className="handle-right" aria-hidden="true">
              {/* Product mock — built from the BookingBee app design (Figma "Application design", RecentCall / Dashboard) */}
              <div className="dash app">
                <div className="app-side">
                  <span className="app-logo"><img src="public/assets/app/logo.svg" width={40} height={40} alt="" /><i /></span>
                  <span data-nav="gauge"><img src="public/assets/app/gauge.svg" width={21} height={18} alt="" /></span>
                  <span data-nav="calls" className="on"><img src="public/assets/app/calls.svg" width={18} height={18} alt="" /></span>
                  <span data-nav="chair"><img src="public/assets/app/chair.svg" width={20} height={21} alt="" /></span>
                  <span data-nav="users"><img src="public/assets/app/users.svg" width={20} height={19} alt="" /></span>
                  <span data-nav="h247"><img src="public/assets/app/h247.svg" width={20} height={20} alt="" /></span>
                  <span data-nav="settings"><img src="public/assets/app/settings.svg" width={20} height={20} alt="" /></span>
                </div>
                <div className="app-col">
                  <div className="app-top">
                    <b className="app-title">Call History</b>
                    <span className="app-chip">Last night</span>
                    <span className="app-top-icons">
                      <img src="public/assets/app/search.svg" width={20} height={20} alt="" />
                      <img src="public/assets/app/bell.svg" width={21} height={22} alt="" />
                      <span className="app-me">PB</span>
                    </span>
                  </div>
                  <div className="dash-main app-main" />
                </div>
              </div>
              <div className="toast app-toast">
                <span className="ic"><img src="public/assets/app/calls.svg" width={18} height={18} alt="" /></span>
                <span className="tx"><b>Call answered</b><small>11:05 PM · Hannah Jensen</small></span>
                <span className="gdot"></span>
              </div>
            </div>
            </div>
          </div>
        </div></div>
      </section>

      {/* ============ CUSTOMER REVIEWS ============ */}
      <ReviewsSection />

      {/* ============ INTEGRATIONS ============ */}
      <section className="integrations" id="integrations" aria-labelledby="int-title">
        <div className="int-inner">
          <div className="int-card">
            <div className="int-row">
              <div className="int-text">
                <span className="bb-pill"><i />Integrations</span>
                <h2 id="int-title">Integrations</h2>
                <p>Integrate BookingBee.ai with your existing apps, whether it's for payments, appointments, or social media. As long as there's an open API available, we'll take care of the integration for you.</p>
                <div className="int-btn-wrap"><a className="btn-dark int-explore" href="#/integrations">Explore all integrations →</a><a className="btn-outline" href="#demo" data-open-demo="" data-demo-topic="Integration request">Request yours - We'll build it →</a></div>
              </div>
              <a className="int-visual" href="#/integrations" aria-label="See all BookingBee integrations"><img src="public/assets/integrations.webp" alt="BookingBee integrates with Meevo, Phorest, Mindbody, Square, Setmore, BookMe Beauty and Booker" width="688" height="544" loading="lazy" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BEFORE / AFTER ============ */}
      <section className="swipe" id="how-it-works" aria-labelledby="swipe-title">
        <div className="swipe-head reveal">
          <span className="bb-pill"><i />Before &amp; After</span>
          <h2 id="swipe-title">Swipe to See the Difference in <span>Daily Salon Life</span></h2>
          <p>See how our AI receptionist for beauty salons works</p>
        </div>
        <div className="ba-fit">
        <div className="ba" id="ba">
          {/* With BookingBee (revealed on the right) */}
          <div className="ba-layer ba-after-layer">
            <img className="ba-photo" src="public/assets/swipe-with.webp" alt="Aurora salon front desk with the BookingBee AI receptionist answering calls" width={1211} height={760} loading="lazy" />
            <span className="ba-tag with" style={{ left: 1017, top: 36 }}>With BookingBee</span>
          </div>
          {/* Without BookingBee (clipped to the left of the handle) */}
          <div className="ba-layer ba-before-layer">
            <img className="ba-photo" src="public/assets/swipe-without.webp" alt="The same salon front desk without BookingBee, phones unanswered" width={1211} height={760} loading="lazy" />
            <span className="ba-tag without" style={{ left: 36, top: 36 }}>Without BookingBee</span>
          </div>
                    {/* Talking points — each pair swaps as the handle passes it */}
          <div className="ba-bubble b one" style={{ left: 590.5, top: 57 }}><img src="public/assets/swipe-av-wo-closing.webp" alt="" width={72} height={72} /><span>No one answers after closing</span></div>
          <div className="ba-bubble b" style={{ left: 232.5, top: 228 }}><img src="public/assets/swipe-av-wo-staff.webp" alt="" width={72} height={72} /><span>Staff juggling phones and clients</span></div>
          <div className="ba-bubble b" style={{ left: 734.5, top: 268 }}><img src="public/assets/swipe-av-wo-lost.webp" alt="" width={72} height={72} /><span>Lost bookings from missed calls</span></div>
          <div className="ba-bubble b" style={{ left: 851.5, top: 459 }}><img src="public/assets/swipe-av-wo-missed.webp" alt="" width={72} height={72} /><span>Missed calls during busy hours</span></div>
          <div className="ba-bubble w one" style={{ left: 590.5, top: 57 }}><img src="public/assets/swipe-av-w-247.webp" alt="" width={72} height={72} /><span>Appointments booked 24/7</span></div>
          <div className="ba-bubble w" style={{ left: 232.5, top: 228 }}><img src="public/assets/swipe-av-w-staff.webp" alt="" width={72} height={72} /><span>Staff focused on clients, calls handled automatically</span></div>
          <div className="ba-bubble w" style={{ left: 734.5, top: 268 }}><img src="public/assets/swipe-av-w-bookings.webp" alt="" width={72} height={72} /><span>More bookings from every call</span></div>
          <div className="ba-bubble w one" style={{ left: 851.5, top: 459 }}><img src="public/assets/swipe-av-w-instant.webp" alt="" width={72} height={72} /><span>Every call answered instantly</span></div>
          <span className="ba-line"></span>
          <button className="ba-handle" type="button" role="slider" aria-label="Drag to compare with and without BookingBee" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>
            <svg viewBox="0 0 40 22" fill="none"><path d="M9 3 2 11l7 8M31 3l7 8-7 8" stroke="#632DBA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="ba-hint" aria-hidden="true">Drag to compare</span>
        </div>
        </div>
      </section>

      {/* ============ GETTING STARTED (4 steps) ============ */}
      <GetStarted />

      {/* ============ FAQ ============ */}
      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div className="faq-inner">
          <span className="bb-pill"><i />FAQs</span>
          <h2 id="faq-title">BookingBee FAQs</h2>
          <div className="faq-grid">
            <aside className="help-card">
              <div className="art"><img src="public/assets/faq-bee.webp" alt="" width="304" height="224" loading="lazy" /></div>
              <div className="txt">
                <h3>Still unsure? We can help!</h3>
                <p>Schedule a call with our team to learn how BookingBee can transform your salon.</p>
                <div className="btn-wrap"><a className="btn-talk" href="#demo" data-open-demo="">Talk to our team</a></div>
              </div>
            </aside>
            <div className="faq-list" id="faq-list">
              <div className="faq-item is-open">
                <button className="faq-q" type="button" aria-expanded="true">Will it sound like a real person or a robot?<span className="chev"><svg viewBox="0 0 18 20" fill="currentColor"><path fillRule="evenodd" d="M1.853 6.228a.563.563 0 0 1 .796 0L9 12.58l6.353-6.353a.563.563 0 0 1 .796.796l-6.75 6.75a.563.563 0 0 1-.796 0l-6.75-6.75a.563.563 0 0 1 0-.796Z"/></svg></span></button>
                <div className="faq-a"><div><p>BookingBee uses natural conversational AI, not a rigid phone tree - so conversations flow just like they would with a real front-desk receptionist. It picks up on context, handles multiple questions in one call, and adjusts its tone naturally. Most clients don't even realize they're speaking to AI. Curious? Listen to the live call demo above and judge for yourself today.</p></div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">What is an AI receptionist for Beauty Salons?<span className="chev"><svg viewBox="0 0 18 20" fill="currentColor"><path fillRule="evenodd" d="M1.853 6.228a.563.563 0 0 1 .796 0L9 12.58l6.353-6.353a.563.563 0 0 1 .796.796l-6.75 6.75a.563.563 0 0 1-.796 0l-6.75-6.75a.563.563 0 0 1 0-.796Z"/></svg></span></button>
                <div className="faq-a"><div><p>An AI receptionist for beauty salons is a virtual front desk that answers your salon’s calls, texts and website chats around the clock. BookingBee books, reschedules and cancels appointments, answers common questions about services, pricing and availability, and hands off to your team whenever a human touch is needed.</p></div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">How to Choose the Right AI Receptionist for Beauty Salons?<span className="chev"><svg viewBox="0 0 18 20" fill="currentColor"><path fillRule="evenodd" d="M1.853 6.228a.563.563 0 0 1 .796 0L9 12.58l6.353-6.353a.563.563 0 0 1 .796.796l-6.75 6.75a.563.563 0 0 1-.796 0l-6.75-6.75a.563.563 0 0 1 0-.796Z"/></svg></span></button>
                <div className="faq-a"><div><p>Look for natural-sounding conversations, a direct connection to your booking software, support for calls, texts and web chat, clear call summaries, and a setup your team can manage without IT help. BookingBee was built for salons, spas, med spas and barbershops with exactly those needs in mind.</p></div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">How does an AI Receptionist for Beauty Salons help manage client calls and appointments?<span className="chev"><svg viewBox="0 0 18 20" fill="currentColor"><path fillRule="evenodd" d="M1.853 6.228a.563.563 0 0 1 .796 0L9 12.58l6.353-6.353a.563.563 0 0 1 .796.796l-6.75 6.75a.563.563 0 0 1-.796 0l-6.75-6.75a.563.563 0 0 1 0-.796Z"/></svg></span></button>
                <div className="faq-a"><div><p>It picks up every call instantly, even when your team is with clients or the salon is closed. It checks availability, books or moves appointments, confirms the details with the client, and logs a summary of every conversation so nothing slips through the cracks.</p></div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">Do I need to change my salon’s phone number to use this system?<span className="chev"><svg viewBox="0 0 18 20" fill="currentColor"><path fillRule="evenodd" d="M1.853 6.228a.563.563 0 0 1 .796 0L9 12.58l6.353-6.353a.563.563 0 0 1 .796.796l-6.75 6.75a.563.563 0 0 1-.796 0l-6.75-6.75a.563.563 0 0 1 0-.796Z"/></svg></span></button>
                <div className="faq-a"><div><p>No. You keep your existing salon phone number. Calls are simply forwarded to BookingBee whenever you want it to answer, whether that’s after hours, during busy periods or all day.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER CTA ============ */}
      <FooterCta />
      </main>

      {route === "int" && (<>
        <IntegrationsPage />
        <FooterCta variant="integrations" />
      </>)}
      {route === "phorest" && (<>
        <PhorestPage />
        <FooterCta variant="integrations" />
      </>)}

      <SiteFooter />
      </div>{/* /.page */}

      {/* ============ DEMO MODAL ============ */}
      <div className="modal" id="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title" hidden>
        <div className="modal-backdrop" data-close=""></div>
        <div className="modal-dialog">
          <button className="modal-close" type="button" aria-label="Close" data-close="">×</button>
          <h3 id="demo-title">Book your free BookingBee demo</h3>
          <p className="sub">See how Bee answers every call, books appointments and never misses a client.</p>
          <form className="demo-form" id="demo-form" noValidate>
            <div className="two">
              <label>Full name<input name="name" autoComplete="name" required /></label>
              <label>Salon name<input name="salon" autoComplete="organization" required /></label>
            </div>
            <div className="two">
              <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
            </div>
            <label>Business type
              <select name="type">
                <option>Hair salon</option><option>Nail salon</option><option>Spa</option><option>Med spa</option><option>Barbershop</option><option>Other</option>
              </select>
            </label>
            <input type="hidden" name="topic" defaultValue="Demo request" />
            <button type="submit">Book My Free Demo</button>
          </form>
          <div className="form-success" role="status">
            <div className="ok">✓</div>
            <h3 style={{ padding: "0" }}>You’re on the list!</h3>
            <p className="sub">Thanks — our team will reach out shortly to schedule your demo.</p>
          </div>
        </div>
      </div>

      <div className="modal" id="video-modal" role="dialog" aria-modal="true" aria-label="Customer video" hidden>
        <div className="modal-backdrop" data-close=""></div>
        <div className="modal-dialog video"><button className="modal-close" type="button" aria-label="Close" data-close="">×</button><div className="video-slot"></div></div>
      </div>
      <VoicePopup />
    </>
  )
}
