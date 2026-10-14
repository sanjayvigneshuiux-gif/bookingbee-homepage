import { SalonGlobe, SALON_GLOBE_CONFIG, type SalonPin } from "@/components/ui/salon-globe"
import { ACTIVE_CLIENTS } from "../data/clients"

/**
 * Trusted — map template (Figma NbdFRm4kfUKuq0nzPHHH26 · 30:14073).
 * Centered heading, a half-globe rising behind a glass stats card, then the logo marquee.
 * The globe is the live cobe sphere: every active BookingBee client shows as a yellow dot.
 */

const A = "public/assets/"
/* framed on the North Atlantic so every U.S. and U.K. client faces the visitor at once */
const MAP_CONFIG = { ...SALON_GLOBE_CONFIG, theta: 0.14, mapBrightness: 3.2, diffuse: 1.25, mapSamples: 24000, baseColor: [0.86, 0.8, 1] as [number, number, number] }
/* the 15 highlighted customers (10 real photos + 5 mock) — photo + always-on name/location tag.
   offset (px at a 1500px globe) fans out the Florida and New York clusters; side = which way the tag points */
type Pin = SalonPin & { side: "l" | "r" }
const PINS: Pin[] = [
  { name: "Spa Gregorie's", city: "Newport Beach, CA", location: [33.6122, -117.8743], image: A + "salon-spa-gregories.png", side: "l" },
  { name: "Salon D", city: "Dallas, TX", location: [32.9339, -96.8238], image: A + "salon-salon-d.png", offset: [0, -8], side: "l" },
  { name: "Beauty Lounge Salon", city: "Tampa, FL", location: [28.066, -82.5812], image: A + "salon-beauty-lounge.png", offset: [-14, -36], side: "l" },
  { name: "Salon Sora", city: "Boca Raton, FL", location: [26.3635, -80.1249], image: A + "salon-sora.png", offset: [-32, 2], side: "l" },
  { name: "Riudi Salon", city: "Miami, FL", location: [25.6832, -80.3136], image: A + "salon-riudi.png", offset: [26, -4], side: "r" },
  { name: "Aura Hair Co", city: "Boca Raton, FL", location: [26.5278, -80.0992], image: A + "salon-aura.png", offset: [22, -53], side: "r" },
  { name: "Innovate Salon Academy", city: "New Jersey", location: [40.5509, -74.4267], image: A + "salon-innovate.png", offset: [-13, 1], side: "l" },
  { name: "Beneath The Surface Spa", city: "New Jersey", location: [40.7585, -74.416], image: A + "salon-beneath.png", offset: [30, -28], side: "r" },
  { name: "Onur Salon", city: "New York, NY", location: [40.7687, -73.961], image: A + "salon-onur.png", offset: [28, 40], side: "r" },
  /* mock pins — photos are placeholders (public/assets/salon-mock-*.png): drop the real photo in with the same file name */
  { name: "Salon Michelle", city: "Seattle, WA", location: [47.4052, -122.3252], image: A + "salon-mock-salon-michelle.png", side: "r" },
  { name: "Salon Ami", city: "Kansas City, MO", location: [39.0348, -94.358], image: A + "salon-mock-salon-ami.png", side: "l" },
  { name: "Marianne Strokirk Salon", city: "Chicago, IL", location: [41.9064, -87.6285], image: A + "salon-mock-marianne.png", side: "l" },
  { name: "Taz Hair Co.", city: "Toronto, Canada", location: [43.6706, -79.3913], image: A + "salon-mock-taz.png", offset: [-24, -46], side: "r" },
  { name: "Replay Salon", city: "Cardiff, UK", location: [51.479, -3.1782], image: A + "salon-mock-replay.png", offset: [14, 42], side: "l" },
  { name: "Davey Dublin Hair Salon", city: "Dublin, Ireland", location: [53.3412, -6.2648], image: A + "salon-davey.png", side: "r" },
]
const tag = (p: SalonPin, i: number) => (
  <span className={`tr4-tag tr4-tag--${PINS[i].side}`}><b>{p.name}</b><small>{p.city}</small></span>
)
const DOTS = ACTIVE_CLIENTS.map(({ name, location }) => ({ name, location }))

const LOGOS = [
  { src: "logo-antonio-prieto.png", alt: "Antonio Prieto", w: 250, mt: 16.5 },
  { src: "logo-riudi.png", alt: "Riudi Salon", w: 149, mt: 0 },
  { src: "logo-innovate.png", alt: "Innovate Salon Academy", w: 192, mt: 0 },
  { src: "logo-paul-mitchell.png", alt: "Paul Mitchell", w: 185, mt: 0 },
  { src: "logo-spa-gregories.png", alt: "Spa Gregories", w: 250, mt: 7 },
  { src: "logo-woodhouse.png", alt: "Woodhouse Spa", w: 250, mt: 3.5 },
]

export default function TrustedSection() {
  return (
    <section className="tr4" aria-labelledby="trusted-title">
      <div className="tr4-head">
        <span className="bb-pill"><i />Our Customers</span>
        <h2 id="trusted-title">The <span>AI Receptionist</span> <br />Behind High-Performing Beauty Businesses</h2>
        <p>Every conversation becomes revenue. See the impact live, right now.</p>
      </div>

      <div className="tr4-stage">
        <div className="tr4-globe" aria-hidden="true">
          <SalonGlobe pins={PINS} dots={DOTS} renderPin={tag} className="tr4-sphere" focusLng={-60} focusOffset={0} sway={0.05} config={MAP_CONFIG} />
        </div>

        <div className="tr4-impact">
          <p className="tr4-live"><i />LIVE AI IMPACT ACROSS THE U.S.</p>
          <dl className="tr4-stats">
            <div><dt data-count="1.3" data-prefix="$" data-suffix="M" data-decimals="1">$1.3M</dt><dd>ROI for Salon &amp; Spa</dd></div>
            <div><dt data-count="118469" data-suffix="+">118,469+</dt><dd>Minutes communicated</dd></div>
            <div><dt data-count="58148" data-suffix="+">58,148+</dt><dd>Calls handled</dd></div>
          </dl>
        </div>
      </div>

      <p className="tr4-join">Trusted by Beauty &amp; Wellness industry</p>
      <div className="tr4-logos logo-marquee" aria-label="Salons using BookingBee">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div className="marquee-set" aria-hidden={k === 1} key={k}>
              {LOGOS.map((l) => <img key={l.src} src={A + l.src} alt={k === 0 ? l.alt : ""} width={l.w} style={{ marginTop: l.mt }} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
