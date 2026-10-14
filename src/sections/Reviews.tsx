import { useState } from "react"

const A = "public/assets/"

type Review = {
  id: string
  name: string
  business: string
  role: string
  photo: string
  /** object-position for the photo in the tall rail and the wide featured card */
  railPos: string
  featPos: string
  quote?: string
  stat?: { value: string; label: string }
  logo?: string
  /** YouTube / Vimeo / .mp4 link for this customer's story — plays when the card is clicked */
  video?: string
}

/** Paste each customer's video link here. */
const VIDEOS: Record<string, string> = {
  marcia: "",
  daniel: "",
  scott: "",
  dominique: "",
  antonio: "",
}

function playVideo(r: Review) {
  window.dispatchEvent(new CustomEvent("bb:play-video", { detail: { src: VIDEOS[r.id] || r.video || "", title: `${r.name} · ${r.business}`, poster: r.photo } }))
}

const REVIEWS: Review[] = [
  {
    id: "marcia", name: "Marcia", business: "Beneath the Surface", role: "Owner, Beneth the Surface Spa",
    photo: A + "review-marcia.webp", railPos: "35% 50%", featPos: "50% 38%",
    quote: "Since BookingBee started answering, no call goes to voicemail, even during a full book of blowouts.",
    stat: { value: "38%", label: "Fewer missed calls in the first 60 days" },
    logo: A + "logo-beneath-surface.png",
  },
  { id: "daniel", name: "Daniel", business: "Beauty Lounge", role: "Beauty Lounge", photo: A + "review-daniel.webp", railPos: "62% 50%", featPos: "60% 40%" },
  { id: "scott", name: "Scott Dacon", business: "Spa Gregories", role: "Spa Gregories", photo: A + "review-scott.webp", railPos: "52% 55%", featPos: "50% 42%" },
  {
    id: "dominique", name: "Dominique", business: "Aura Hair Co", role: "Owner, Aura Hair Co",
    photo: A + "review-dominique.webp", railPos: "42% 50%", featPos: "50% 35%",
    quote: "Clients start on Instagram and finish by phone without repeating themselves. That used to be chaos.",
    stat: { value: "2x", label: "Faster time to a confirmed appointment" },
  },
  { id: "antonio", name: "Antonio Prieto", business: "Antonio Prieto Salon", role: "Antonio Prieto Salon", photo: A + "review-antonio.webp", railPos: "40% 50%", featPos: "40% 40%" },
]

export default function ReviewsSection() {
  const [active, setActive] = useState("marcia")

  return (
    <section className="reviews" id="stories" aria-labelledby="reviews-title">
      <div className="reviews-inner">
        <div className="reviews-head reveal">
          <span className="bb-pill"><i />Customer Stories</span>
          <h2 id="reviews-title">What Our Customers Say</h2>
          <p>Real stories from salon owners who transformed their business with BookingBee</p>
        </div>
        <div className="reviews-row">
          {REVIEWS.map((r) => {
            const on = r.id === active
            return (
              <article
                key={r.id}
                className={"rv" + (on ? " is-on" : "")}
                tabIndex={0}
                role="button"
                aria-label={on ? `Play ${r.name}'s video` : `${r.name}, ${r.business}`}
                aria-expanded={on}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setActive(r.id) }}
                onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setActive(r.id) }}
                onClick={() => { if (on) playVideo(r); else setActive(r.id) }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (on) playVideo(r); else setActive(r.id) } }}
              >
                <img className="rv-photo" src={r.photo} alt="" loading="lazy" style={{ objectPosition: on ? r.featPos : r.railPos }} />
                <span className="rv-tint" />
                <span className="rv-shade" />
                <div className="rv-tag"><span className="who">{r.name}</span><span className="biz">{r.business}</span></div>
                {r.logo && <img className="rv-logo" src={r.logo} alt={r.business} />}
                <span className="rv-play" aria-hidden="true">
                  <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#FFC300" fillOpacity=".97" /><path d="M27 25l12 7-12 7V25Z" fill="#190041" /></svg>
                </span>
                <div className="rv-body">
                  <p className="rv-name">{r.name}</p>
                  <p className="rv-role">{r.role}</p>
                  {r.quote && <p className="rv-quote">{r.quote}</p>}
                  {r.stat && (
                    <>
                      <hr />
                      <p className="rv-stat"><b>{r.stat.value}</b><small>{r.stat.label}</small></p>
                    </>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
