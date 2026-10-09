/** "AI Voice Receptionist" detail popup — opened from the bento card's "Learn more" (Figma: Popup / AI Voice Receptionist) */

const A = "public/assets/"

const CHECKS = [
  "Answers 24/7, including after hours and lunch breaks",
  "Books, reschedules and cancels in your calendar",
  "Handles pricing, hours and service questions",
  "Transfers VIP clients to your front desk",
]

/* waveform bar heights from the design (first 14 "spoken" in violet, rest pending) */
const WAVE = [6, 12, 20, 10, 26, 16, 30, 22, 12, 28, 18, 8, 24, 14, 20, 10, 16, 6, 12, 8, 18, 10, 6, 14, 8, 16, 10, 20, 12, 6, 10, 14]

/* Calls this week: [answered, booked] bar heights */
const WEEK: [string, number, number][] = [
  ["M", 62, 40], ["T", 70, 44], ["W", 58, 36], ["T", 80, 52], ["F", 96, 64], ["S", 104, 72], ["S", 40, 26],
]

const FEATURES = [
  {
    title: "Handle high call volumes",
    body: "Answer every call instantly, day or night, so no client ever lands in voicemail or waits on hold.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><g clipPath="url(#vr-i1)"><path fillRule="evenodd" clipRule="evenodd" d="M1.7249 8.50837C1.75637 8.84807 1.78308 9.18837 1.82148 9.52731C1.83898 9.68178 1.87602 9.83438 1.91014 9.9865C2.37361 12.0555 3.23973 13.9602 4.34434 15.7531C7.28422 20.525 11.1967 24.2562 16.2493 26.7428C17.8045 27.5082 19.4094 28.1273 21.1599 28.2796C22.2267 28.3724 23.1715 28.1297 23.9375 27.3378C24.5958 26.6573 25.2648 25.9873 25.9236 25.3072C26.6367 24.571 26.6378 23.9574 25.9247 23.2258C25.441 22.7294 24.946 22.244 24.4557 21.754C23.7718 21.0709 23.0942 20.3815 22.4016 19.7073C21.8739 19.1935 21.2887 19.1887 20.7316 19.6685C20.6356 19.7512 20.5457 19.8413 20.4559 19.9309C19.7854 20.5997 19.119 21.2727 18.4444 21.9374C17.9734 22.4014 17.4527 22.5157 16.8942 22.2386C16.3184 21.9529 15.7466 21.6516 15.2042 21.3079C13.3842 20.1547 11.8145 18.7098 10.4042 17.0888C9.42169 15.9594 8.52575 14.7688 7.89401 13.3992C7.39718 12.3222 7.46799 11.9859 8.32243 11.1597C8.99591 10.5084 9.66752 9.85375 10.3097 9.17199C10.7978 8.65385 10.7819 8.11764 10.33 7.56903C10.2742 7.50128 10.2162 7.43482 10.1542 7.3727C8.99591 6.21138 7.83846 5.04923 6.67544 3.8926C6.55273 3.7706 6.40683 3.66222 6.25347 3.5826C5.75507 3.32368 5.25913 3.44046 4.74998 3.94034C4.0951 4.58323 3.46213 5.24879 2.79845 5.8823C2.04406 6.6024 1.69096 7.46934 1.7249 8.50837ZM0 8.26248C0.0439753 7.91596 0.0678711 7.56545 0.135918 7.22369C0.305596 6.37166 0.68558 5.6188 1.29407 4.99627C2.09913 4.17272 2.87618 3.31447 3.74307 2.56049C5.06362 1.4119 6.49607 1.41766 7.76678 2.60799C9.11915 3.87499 10.4154 5.20593 11.6792 6.56206C12.6185 7.57015 12.6102 9.11422 11.6998 10.1507C11.0247 10.9194 10.2798 11.6274 9.55526 12.3518C9.41805 12.489 9.38265 12.578 9.47624 12.7674C10.2026 14.2378 11.2285 15.4869 12.3379 16.6735C13.4755 17.8904 14.7269 18.9773 16.1339 19.8747C16.5347 20.1302 16.9635 20.342 17.4107 20.5913C17.8932 20.1025 18.3607 19.6196 18.8391 19.1477C19.1586 18.8326 19.4796 18.5166 19.8241 18.2301C20.8431 17.3825 22.3884 17.3691 23.3441 18.281C24.7417 19.6146 26.1102 20.9819 27.4353 22.3874C28.4171 23.4288 28.4321 25.006 27.4826 26.0769C26.6035 27.0684 25.6805 28.03 24.6995 28.9194C23.6754 29.8478 22.3943 30.0885 21.0371 29.9737C18.4967 29.759 16.2407 28.7287 14.0556 27.5168C11.3722 26.0286 8.98323 24.1511 6.89326 21.9057C4.33852 19.1611 2.22513 16.1244 0.897707 12.5886C0.447562 11.3896 0.0929411 10.1638 0.0420965 8.87038C0.0395132 8.80404 0.0145606 8.73858 0 8.6727C0 8.53596 0 8.39922 0 8.26248Z" fill="#FF644D" /><path fillRule="evenodd" clipRule="evenodd" d="M16.8178 0C17.4946 0.175666 18.1788 0.327026 18.8469 0.531402C21.0231 1.19714 22.9605 2.29963 24.6669 3.80172C26.4801 5.39775 27.8845 7.29831 28.853 9.51493C29.3743 10.7081 29.7408 11.9487 29.9583 13.2319C30.0363 13.6922 29.7775 14.0762 29.342 14.1876C28.9014 14.3003 28.4557 14.0737 28.3276 13.6252C28.1485 12.9982 28.0325 12.3528 27.8445 11.729C26.9983 8.92017 25.407 6.60522 23.145 4.74939C21.2532 3.19722 19.0999 2.19906 16.6931 1.7461C16.0359 1.62239 15.7433 1.31832 15.761 0.817741C15.7762 0.387617 16.0508 0.16093 16.4076 0H16.8178Z" fill="#FF644D" /><path fillRule="evenodd" clipRule="evenodd" d="M15.5181 6.30367C15.5176 5.75712 15.9861 5.35782 16.5441 5.46186C19.1789 5.95304 21.2848 7.29038 22.8586 9.45721C23.7145 10.6356 24.2508 11.9539 24.5204 13.3838C24.6167 13.8948 24.3705 14.3326 23.9034 14.4546C23.4495 14.5731 23.0071 14.2925 22.8575 13.7957C22.664 13.1534 22.5367 12.4802 22.2596 11.8759C21.0773 9.29663 19.074 7.7225 16.2892 7.15118C15.7915 7.04908 15.5184 6.74471 15.5181 6.30367Z" fill="#FF644D" /></g><defs><clipPath id="vr-i1"><rect width="30" height="30" fill="white" /></clipPath></defs></svg>
    ),
  },
  {
    title: "Book, reschedule",
    body: "Book, reschedule and cancel appointments straight into your salon calendar in real time.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M10.6665 2.66602V7.99935" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21.3335 2.66602V7.99935" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M25.3333 5.33398H6.66667C5.19391 5.33398 4 6.52789 4 8.00065V26.6673C4 28.1401 5.19391 29.334 6.66667 29.334H25.3333C26.8061 29.334 28 28.1401 28 26.6673V8.00065C28 6.52789 26.8061 5.33398 25.3333 5.33398Z" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 13.334H28" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 21.3327L14.6667 23.9993L20 18.666" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    title: "Peak hours and parking",
    body: "Handle pricing, hours, parking and prep questions the way your best front-desk person would.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M10.5332 26.6674C13.0779 27.9728 16.0053 28.3264 18.7877 27.6644C21.5701 27.0025 24.0246 25.3685 25.7088 23.057C27.3931 20.7454 28.1964 17.9083 27.9739 15.0569C27.7515 12.2055 26.5179 9.52734 24.4956 7.50497C22.4732 5.4826 19.795 4.24905 16.9436 4.0266C14.0922 3.80416 11.2551 4.60744 8.9436 6.29171C6.63206 7.97598 4.99809 10.4305 4.33613 13.2129C3.67418 15.9953 4.02776 18.9226 5.33317 21.4674L2.6665 29.334L10.5332 26.6674Z" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.1201 12.0008C12.4336 11.1097 13.0523 10.3582 13.8667 9.8796C14.6811 9.40097 15.6386 9.22601 16.5697 9.38571C17.5007 9.54541 18.3452 10.0295 18.9536 10.7521C19.5619 11.4748 19.8949 12.3895 19.8934 13.3341C19.8934 16.0008 15.8935 17.3341 15.8935 17.3341V20" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 22.666H16.0133" stroke="#FF644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
]

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#F0E7FF" /><path d="M6 10.3004L8.6 12.9004L14 7.40039" stroke="#632DBA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function DemoButton() {
  return (
    <a className="vr-btn primary" href="#demo" data-open-demo="" data-demo-topic="AI Voice Receptionist">
      Book a demo <Arrow />
    </a>
  )
}

export default function VoicePopup() {
  return (
    <div className="modal vr-modal" id="voice-modal" role="dialog" aria-modal="true" aria-labelledby="vr-title" hidden>
      <div className="modal-backdrop" data-close=""></div>
      <div className="vr-dialog">
        <button className="vr-close" type="button" aria-label="Close" data-close="">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M13.5 4.5L4.5 13.5" stroke="#632DBA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 4.5L13.5 13.5" stroke="#632DBA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Hero */}
        <div className="vr-hero">
          <div className="vr-hero-text">
            <p className="vr-eyebrow">AI VOICE RECEPTIONIST</p>
            <h2 id="vr-title">Answer every call.<br />Book every client.</h2>
            <p className="vr-lead">Bee picks up every ring, books appointments straight into your calendar, and answers client questions naturally — so your front desk can focus on the clients in the chair.</p>
            <div className="vr-btns">
              <DemoButton />
              <button className="vr-btn secondary" type="button" data-vr-sample="">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3.5 1.75L11.6667 7L3.5 12.25V1.75Z" stroke="#632DBA" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Hear a sample call
              </button>
            </div>
          </div>
          <ul className="vr-checks">
            {CHECKS.map((c) => <li key={c}><Check /><span>{c}</span></li>)}
          </ul>
        </div>

        {/* Visual row */}
        <div className="vr-visual">
          <div className="vr-call-panel">
            <img className="vr-phone" src={A + "bento-voice-phone.webp"} alt="Incoming call from Sarah Miller answered by BookingBee" width={318} height={604} />
            <div className="vr-call-card" id="vr-call-card">
              <div className="vr-caller">
                <span className="vr-caller-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M18.3332 14.0994V16.5994C18.3341 16.8315 18.2866 17.0612 18.1936 17.2739C18.1006 17.4865 17.9643 17.6774 17.7933 17.8343C17.6222 17.9912 17.4203 18.1107 17.2005 18.185C16.9806 18.2594 16.7477 18.287 16.5165 18.2661C13.9522 17.9875 11.489 17.1112 9.32486 15.7078C7.31139 14.4283 5.60431 12.7212 4.32486 10.7078C2.91651 8.53377 2.04007 6.05859 1.76653 3.48276C1.7457 3.25232 1.77309 3.02006 1.84695 2.80078C1.9208 2.5815 2.03951 2.38 2.1955 2.20911C2.3515 2.03822 2.54137 1.90169 2.75302 1.8082C2.96468 1.71471 3.19348 1.66631 3.42486 1.6661H5.92486C6.32928 1.66212 6.72136 1.80533 7.028 2.06904C7.33464 2.33275 7.53493 2.69897 7.59153 3.09943C7.69705 3.89949 7.89274 4.68504 8.17486 5.4411C8.28698 5.73937 8.31125 6.06353 8.24478 6.37516C8.17832 6.6868 8.02392 6.97286 7.79986 7.19943L6.74153 8.25776C7.92783 10.3441 9.65524 12.0715 11.7415 13.2578L12.7999 12.1994C13.0264 11.9754 13.3125 11.821 13.6241 11.7545C13.9358 11.688 14.2599 11.7123 14.5582 11.8244C15.3143 12.1066 16.0998 12.3022 16.8999 12.4078C17.3047 12.4649 17.6744 12.6688 17.9386 12.9807C18.2029 13.2926 18.3433 13.6907 18.3332 14.0994Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="vr-caller-text"><small>Incoming call</small><b>(312) 555-0187</b></span>
                <span className="vr-live"><svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true"><circle cx="3.5" cy="3.5" r="3.5" fill="#1AB873" /></svg><span className="vr-timer">0:42</span></span>
              </div>
              <div className="vr-wave" aria-hidden="true">
                {WAVE.map((h, i) => <i key={i} className={i < 14 ? "on" : ""} style={{ height: h, animationDelay: `${(i % 7) * 0.09}s` }} />)}
              </div>
              <div className="vr-line l1"><p className="vr-bubble in wide"><small>Caller</small>Hi, can I book a balayage this Saturday?</p></div>
              <div className="vr-line out l2"><p className="vr-bubble out wide"><small>Bee</small>Of course! Jess has 2:00 PM open. Shall I book it for you?</p></div>
              <div className="vr-line l3"><p className="vr-bubble in"><small>Caller</small>Yes please.</p></div>
              <div className="vr-booked">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.333 1.333v2.667M10.667 1.333v2.667M3.333 2.667h9.334c.736 0 1.333.597 1.333 1.333v9.333c0 .737-.597 1.334-1.333 1.334H3.333A1.333 1.333 0 0 1 2 13.333V4c0-.736.597-1.333 1.333-1.333ZM2 6.667h12M6 10.667l1.333 1.333L10 9.333" stroke="#12915E" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Booked · Balayage, Sat 2:00 PM with Jess
              </div>
            </div>
          </div>
          <div className="vr-right">
            <div className="vr-stat">
              <b>24/7</b>
              <p>every call answered, including<br />after hours and lunch breaks</p>
            </div>
            <div className="vr-chart-wrap">
              <div className="vr-chart">
                <p className="vr-chart-title">Calls this week</p>
                <div className="vr-legend"><span><i className="a" />Answered</span><span><i className="b" />Booked</span></div>
                <div className="vr-bars">
                  {WEEK.map(([d, a, b], i) => (
                    <div className="vr-day" key={i}>
                      <div className="vr-pair"><i className="a" style={{ height: a }} /><i className="b" style={{ height: b }} /></div>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="vr-features">
          {FEATURES.map((f) => (
            <div className="vr-feature" key={f.title}>
              <span className="vr-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        {/* Get started */}
        <div className="vr-cta">
          <h3>Get started with AI Voice Receptionist</h3>
          <div className="vr-btns">
            <DemoButton />
            <a className="vr-btn secondary" href="https://bookingbee.ai/contact-us/" target="_blank" rel="noopener">Contact sales</a>
          </div>
        </div>
      </div>
    </div>
  )
}
