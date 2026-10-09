import { useState, type FormEvent } from "react"

/** Live demo section (Figma: Live demo section 2694:27794) */

/** Demo line shown on the page — replace with the real BookingBee demo number. */
const DEMO_NUMBER_DISPLAY = "+1 (555) 010-2233"
const DEMO_NUMBER_TEL = "+15550102233"

/**
 * Optional: a webhook that triggers the outbound demo call (Zapier, Make, your own API…).
 * It receives JSON { phone, country }. Leave empty and "Call me" falls back to dialling the demo line.
 */
const CALLBACK_ENDPOINT = ""

const A = "public/assets/"

export default function LiveDemo() {
  const [phone, setPhone] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 10) { setState("error"); return }
    if (!CALLBACK_ENDPOINT) { window.location.href = `tel:${DEMO_NUMBER_TEL}`; return }
    setState("sending")
    fetch(CALLBACK_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: "+1" + digits.slice(-10), country: "US" }) })
      .then(() => setState("done"), () => setState("error"))
  }

  return (
    <section className="ld" id="live-demo" aria-labelledby="ld-title">
      <div className="ld-inner">
        <div className="ld-head">
          <span className="ld-eyebrow"><i className="dot y" />LIVE DEMO</span>
          <h2 id="ld-title"><span>See How Our</span><br />AI Receptionist Handles Calls</h2>
          <p>Hear a real booking call, answered from start to finish by BookingBee.</p>
        </div>

        <div className="ld-cards">
          <div className="ld-card ld-bee">
            <div className="ld-bee-inner">
              <div className="ld-bee-img"><img className="float-y" src={A + "bento-bee.webp"} alt="BookingBee mascot wearing a headset" width={380} height={380} loading="lazy" /></div>
              <p className="ld-bee-title">Meet BookingBee, your 24/7 front desk</p>
              <p className="ld-bee-status"><i className="dot g" />Online now · never puts a client on hold</p>
            </div>
          </div>

          <div className="ld-card ld-call">
            <div className="ld-intro">
              <h3>Enter your number.<br /><span>Bee</span> calls you in seconds.</h3>
              <p>Talk to it like a client would: book a balayage, move an{" "}<br />appointment, ask about prices.</p>
            </div>

            <form className={"ld-form" + (state === "error" ? " is-error" : "")} onSubmit={submit} noValidate>
              <label className="ld-country">
                <span>US +1</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M0.899902 0.900391L5.8999 5.90039L10.8999 0.900391" stroke="#66577D" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </label>
              <input
                type="tel" inputMode="tel" autoComplete="tel-national" placeholder="add your number" aria-label="Your phone number"
                value={phone} onChange={(e) => { setPhone(e.target.value); if (state === "error") setState("idle") }}
              />
              <button type="submit" disabled={state === "sending"}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 0H4.9689C6.19561 0 7.29874 0.746852 7.75433 1.88583L8.45861 3.64652C8.77063 4.42657 8.47041 5.31775 7.75 5.75C7.02959 6.18225 6.71224 7.08414 7.12514 7.81581C7.87526 9.14504 8.85496 10.1247 10.1842 10.8749C10.9159 11.2878 11.8178 10.9704 12.25 10.25C12.6822 9.52959 13.5734 9.22937 14.3535 9.54139L16.1142 10.2457C17.2531 10.7013 18 11.8044 18 13.0311V15C18 16.5 16.5 18 15 18C7 17.5 0.5 11 0 3C0 1.5 1.5 0 3 0Z" fill="#190041" /></svg>
                {state === "sending" ? "Calling…" : "Call me"}
              </button>
            </form>
            <p className="ld-form-note" aria-live="polite">
              {state === "error" && "Please enter a valid 10-digit US number."}
              {state === "done" && "Bee is calling you now — pick up!"}
            </p>

            <div className="ld-divider"><i /><span>or dial it yourself</span><i /></div>

            <a className="ld-direct" href={`tel:${DEMO_NUMBER_TEL}`}>
              <span className="ld-direct-icon">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true"><path d="M15.0957 17.3223C14.866 17.3796 14.6237 17.3571 14.4085 17.2582C11.515 15.8381 9.17338 13.4995 7.74964 10.6077C7.6442 10.3914 7.61688 10.1453 7.67233 9.91115C7.72778 9.677 7.86258 9.46927 8.05383 9.32324L8.54137 8.95758C8.80013 8.76351 9.01016 8.51186 9.15481 8.22255C9.29946 7.93325 9.37477 7.61423 9.37477 7.29078V4.16553C9.37477 3.61295 9.15526 3.08301 8.76453 2.69227C8.37379 2.30154 7.84385 2.08203 7.29127 2.08203H4.16602C3.61344 2.08203 3.08349 2.30154 2.69276 2.69227C2.30203 3.08301 2.08252 3.61295 2.08252 4.16553C2.08252 9.13874 4.05812 13.9083 7.57471 17.4248C11.0913 20.9414 15.8608 22.917 20.834 22.917C21.3866 22.917 21.9165 22.6975 22.3073 22.3068C22.698 21.9161 22.9175 21.3861 22.9175 20.8335V17.7083C22.9175 17.1557 22.698 16.6258 22.3073 16.235C21.9165 15.8443 21.3866 15.6248 20.834 15.6248H17.7088C17.3853 15.6248 17.0663 15.7001 16.777 15.8447C16.4877 15.9894 16.236 16.1994 16.042 16.4582L15.6721 16.9426C15.5287 17.131 15.3254 17.2649 15.0957 17.3223Z" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
              <span className="ld-direct-num"><small>Call the demo line</small><b>{DEMO_NUMBER_DISPLAY}</b></span>
              <span className="ld-direct-tap">Tap to call
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3.74951 9.0006H14.2507M9.00011 14.2512L14.2507 9.0006L9.00011 3.75" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
