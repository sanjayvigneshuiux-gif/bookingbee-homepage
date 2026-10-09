const A = "public/assets/"

const SOLUTIONS = [
  ["AI First Salon Software", "https://bookingbee.ai/solutions/salon-software/"],
  ["AI-Hair Salon Software", "https://bookingbee.ai/solutions/hair-salon-software/"],
  ["AI-Nail Salon Software", "https://bookingbee.ai/solutions/ai-nail-salon-software/"],
  ["AI-Spa Software", "https://bookingbee.ai/solutions/ai-first-spa-software/"],
  ["AI First Med Spa Software", "https://bookingbee.ai/solutions/ai-first-med-spa-software/"],
  ["AI First Barber software", "https://bookingbee.ai/solutions/ai-first-barber-software/"],
]
const QUICK = [
  ["About Us", "https://bookingbee.ai/about-us/"],
  ["Contact Us", "https://bookingbee.ai/contact-us/"],
  ["Schedule a demo", "https://bookingbee.ai/schedule-a-demo/"],
  ["FAQ", "https://bookingbee.ai/faq-overview/"],
  ["Pricing", "https://bookingbee.ai/pricing/"],
]

export function FooterCta({ variant = "home" }: { variant?: "home" | "integrations" }) {
  const int = variant === "integrations"
  return (
    <section className={"fcta" + (int ? " fcta-int" : "")} aria-labelledby={int ? "fcta-int-title" : "fcta-title"}>
      <span className="fcta-glow l" aria-hidden="true" />
      <span className="fcta-glow r" aria-hidden="true" />
      {int ? (
        <div className="fcta-copy">
          <h2 id="fcta-int-title">Every call answered. Every appointment booked.</h2>
          <p>See BookingBee working with your software in a 15-minute demo.</p>
          <div className="fcta-btns">
            <a className="fcta-btn" href="https://bookingbee.ai/schedule-a-demo" data-open-demo="">Book A Demo</a>
            <a className="fcta-btn ghost" href="#live-demo">Talk To AI</a>
          </div>
        </div>
      ) : (
        <div className="fcta-copy">
          <h2 id="fcta-title">Even the world's best receptionist<br /><span>can handle only one call</span> at a time.</h2>
          <p>BookingBee handles multiple calls simultaneously, turning your front desk into a 24/7 booking engine.</p>
          <a className="fcta-btn" href="https://bookingbee.ai/schedule-a-demo" data-open-demo="">BOOK MY DEMO</a>
        </div>
      )}
      <img className="fcta-art" src={A + "footer-bee.webp"} alt="BookingBee bee answering calls at the front desk" width={909} height={340} loading="lazy" />
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer2">
      <div className="ft-row">
        <div className="ft-col">
          <p className="ft-h">BookingBee.AI</p>
          <p className="ft-line first"><span>Email: </span><a href="mailto:sales-team@bookingbee.ai">sales-team@bookingbee.ai</a></p>
          <p className="ft-line"><span>Phone: </span><a href="tel:+13023033005">+1 (302) 303 3005</a></p>
          <p className="ft-line">Address: 1007 N Orange St. 4th<br />Floor Suite #1396, Wilmington,<br />Delaware 19801, United States</p>
        </div>
        <div className="ft-col">
          <p className="ft-h">Solutions</p>
          <ul className="ft-links">{SOLUTIONS.map(([t, u]) => <li key={t}><a href={u} target="_blank" rel="noopener">{t}</a></li>)}</ul>
        </div>
        <div className="ft-col">
          <p className="ft-h">Quick Links</p>
          <ul className="ft-links">{QUICK.map(([t, u]) => <li key={t}><a href={u} target="_blank" rel="noopener">{t}</a></li>)}</ul>
        </div>
        <div className="ft-col right">
          <div className="socials-row">
            <a href="https://www.facebook.com/bookingbeeai" target="_blank" rel="noopener" aria-label="BookingBee.AI on Facebook"><svg viewBox="0 0 320 512"><path d="M279 288l14-93h-89v-60c0-25 13-50 53-50h40V6S260 0 225 0c-73 0-121 44-121 125v70H23v93h81v224h100V288z" /></svg></a>
            <a href="https://twitter.com/BookingBee_ai" target="_blank" rel="noopener" aria-label="BookingBee.AI on Twitter"><svg viewBox="0 0 512 512"><path d="M459 152c1 4 1 9 1 13 0 139-106 299-299 299-59 0-115-17-161-47 8 1 16 1 25 1 49 0 94-17 130-45-46-1-85-31-98-73 6 1 13 2 20 2 9 0 19-1 27-4-48-10-84-52-84-103v-1c14 8 30 13 47 13-28-19-47-51-47-87 0-20 5-38 14-53 52 64 129 105 216 110-2-8-3-16-3-24 0-58 47-105 105-105 30 0 58 13 77 33 24-5 46-13 67-25-8 24-25 45-46 58 21-3 42-8 60-17-14 21-32 40-52 55z" /></svg></a>
            <a href="https://www.instagram.com/bookingbee.ai/" target="_blank" rel="noopener" aria-label="BookingBee.AI on Instagram"><svg viewBox="0 0 448 512"><path d="M224 141c-64 0-115 51-115 115s51 115 115 115 115-51 115-115-51-115-115-115zm0 190c-41 0-75-34-75-75s34-75 75-75 75 34 75 75-34 75-75 75zm146-194c0 15-12 27-27 27s-27-12-27-27 12-27 27-27 27 12 27 27zm76 27c-2-36-10-68-36-94s-58-34-94-36c-37-2-148-2-185 0-36 2-68 10-94 36S3 128 1 164c-2 37-2 148 0 185 2 36 10 68 36 94s58 34 94 36c37 2 148 2 185 0 36-2 68-10 94-36s34-58 36-94c2-37 2-148 0-185zm-48 225c-8 20-23 35-43 43-30 12-101 9-134 9s-104 3-134-9c-20-8-35-23-43-43-12-30-9-101-9-134s-3-104 9-134c8-20 23-35 43-43 30-12 101-9 134-9s104-3 134 9c20 8 35 23 43 43 12 30 9 101 9 134s3 104-9 134z" /></svg></a>
          </div>
          <p className="copyright">Ⓒ 2026 Booking Bee Inc.</p>
          <div className="legal"><a href="https://bookingbee.ai/terms-of-service/" target="_blank" rel="noopener">Terms</a><a href="https://bookingbee.ai/privacy/" target="_blank" rel="noopener">Privacy Policy</a></div>
        </div>
      </div>
    </footer>
  )
}
