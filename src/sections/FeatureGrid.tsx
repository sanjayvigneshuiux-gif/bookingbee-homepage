/** Second bento grid: Email Notifications, Smart Reminders, Client Win-Back, Real-Time Calendar Sync */

const A = "public/assets/"

function LearnMore() {
  return (
    <a className="learn-more" href="#demo" data-open-demo="">
      Learn more
      <span className="arrow-btn"><svg viewBox="0 0 28 28" fill="none"><path d="M5.832 14h16.335M14 22.167 22.167 14 14 5.832" stroke="#632DBA" strokeWidth="2.4" strokeLinecap="round" /></svg></span>
    </a>
  )
}

function BeeAvatar() {
  return <span className="bee-av2"><img src={A + "bb-icon.png"} alt="" /></span>
}

const Check = ({ bg, fg, size = 22 }: { bg: string; fg: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="11" fill={bg} /><path d="M6.5 11.3 9.5 14.3 15.5 8.1" stroke={fg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

export default function FeatureGrid() {
  return (
    <div className="fgrid">
      {/* Email Notifications */}
      <article className="fcard fcard-email">
        <span className="glow lav" style={{ left: 476, top: 89 }} />
        <span className="glow warm" style={{ left: 606, top: -121 }} />
        <div className="fcard-copy" style={{ left: 35, top: 35 }}>
          <span className="channel-icon"><svg viewBox="0 0 36 36" fill="none"><path d="M30 6H6a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z" stroke="#632DBA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M33 10.5 19.545 19.05a2.9 2.9 0 0 1-3.09 0L3 10.5" stroke="#632DBA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <h3 className="fcard-title">Email<br />Notifications</h3>
          <p className="fcard-desc" style={{ width: 250 }}>Branded confirmations, reminders and thank-you notes land in every client’s inbox automatically.</p>
        </div>
        <div className="fcard-lm" style={{ left: 35, top: 315 }}><LearnMore /></div>

        <div className="inbox" aria-hidden="true">
          <div className="inbox-head"><i style={{ background: "#ffc300" }} /><i style={{ background: "#8b63d1" }} /><i style={{ background: "#736b8c" }} /><b>Inbox</b><span className="chip-y">3 new</span></div>
          <div className="mail unread"><BeeAvatar /><div><p className="row"><b>BookingBee</b><small>now</small><em /></p><p className="subj">Confirmed: Balayage · Sat 2:00 PM</p><p className="prev">Your stylist Sarah is all set for you…</p></div></div>
          <div className="mail unread"><BeeAvatar /><div><p className="row"><b>BookingBee</b><small>9:12</small><em /></p><p className="subj">Reminder: See you tomorrow!</p><p className="prev">Reply C to confirm or R to reschedule…</p></div></div>
          <div className="mail"><BeeAvatar /><div><p className="row"><b>BookingBee</b><small>Mon</small></p><p className="subj read">Thanks for visiting Aurora ✨</p><p className="prev">How was your cut? Leave a quick review…</p></div></div>
          <div className="mail"><BeeAvatar /><div><p className="row"><b>BookingBee</b><small>Fri</small></p><p className="subj read">We miss you, Maya!</p><p className="prev">It’s been 8 weeks — time for a refresh?</p></div></div>
        </div>
        <div className="confirm-card" aria-hidden="true">
          <p className="cc-head"><Check bg="#632dba" fg="#fff" />Appointment confirmed</p>
          <div className="cc-rows"><p><span>Service</span><b>Balayage + Blowout</b></p><p><span>Stylist</span><b>Sarah M.</b></p><p><span>When</span><b>Sat, Oct 18 · 2:00 PM</b></p></div>
          <div className="cc-btns"><span className="solid">Add to calendar</span><span className="ghost">Reschedule</span></div>
        </div>
        <span className="sent-chip" aria-hidden="true"><i />Sent instantly</span>
      </article>

      {/* Smart Reminders */}
      <article className="fcard fcard-rem">
        <span className="glow lav" style={{ left: 116, top: 89 }} />
        <span className="glow warm" style={{ left: 246, top: -121 }} />
        <div className="notif" style={{ left: 85, top: 43, width: 252, opacity: 0.6 }} aria-hidden="true">
          <BeeAvatar /><div><p className="row"><b>BookingBee</b><small>24h before</small></p><p className="txt">Reminder: Balayage with Sarah tomorrow at 2 PM.</p></div>
        </div>
        <div className="notif" style={{ left: 71, top: 89, width: 302 }} aria-hidden="true">
          <BeeAvatar /><div><p className="row"><b>BookingBee</b><small>2h before</small></p><p className="txt">See you at 2:00 PM today! Reply C to confirm or R to reschedule.</p></div>
        </div>
        <span className="chip-v" style={{ left: 233, top: 145 }} aria-hidden="true"><Check bg="#FFC300" fg="#190041" size={14} />Client confirmed</span>
        <span className="bell" aria-hidden="true"><svg viewBox="0 0 26 26" fill="none"><path d="M11.124 22.75a2.17 2.17 0 0 0 3.753 0M23.834 8.667c0-2.492-.867-4.658-2.167-6.5M3.534 16.604a1.08 1.08 0 0 0 .8 1.813h17.333a1.08 1.08 0 0 0 .801-1.812C21.028 15.119 19.5 13.54 19.5 8.667a6.5 6.5 0 0 0-13 0c0 4.874-1.529 6.452-2.966 7.937ZM4.334 2.167C3.034 4.009 2.167 6.175 2.167 8.667" stroke="#190041" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <h3 className="fcard-title sm" style={{ left: 35, top: 221 }}>Smart Reminders</h3>
        <p className="fcard-desc sm" style={{ left: 35, top: 262, width: 300 }}>Automated SMS &amp; email nudges that keep chairs full and no-shows low.</p>
        <div className="fcard-lm" style={{ left: 35, top: 323 }}><LearnMore /></div>
      </article>

      {/* Client Win-Back */}
      <article className="fcard fcard-win">
        <span className="glow lav" style={{ left: 116, top: 89 }} />
        <span className="glow warm" style={{ left: 246, top: -121 }} />
        <span className="win-icon" aria-hidden="true"><svg viewBox="0 0 26 26" fill="none"><path d="M3.25 13A9.75 9.75 0 1 0 13 3.25a10.56 10.56 0 0 0-7.302 2.968L3.25 8.667" stroke="#fff" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.25 3.25v5.417h5.417M13 7.583V13l3.25 2.166" stroke="#fff" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <div className="win-thread" aria-hidden="true">
          <div className="wt-row"><BeeAvatar /><p className="wt-in">Hi Maya! It’s been 8 weeks since your last color. Sarah has a Thu 4 PM opening — want it?</p></div>
          <div className="wt-row me"><p className="wt-out">Yes please! 💜</p></div>
        </div>
        <span className="chip-y2" style={{ left: 95, top: 163 }} aria-hidden="true"><Check bg="#190041" fg="#FFC300" size={14} />Client rebooked · Thu 4 PM</span>
        <h3 className="fcard-title sm" style={{ left: 35, top: 221 }}>Client Win-Back</h3>
        <p className="fcard-desc sm" style={{ left: 35, top: 262, width: 300 }}>Reaches out to lapsed clients and turns empty slots into rebookings.</p>
        <div className="fcard-lm" style={{ left: 35, top: 323 }}><LearnMore /></div>
      </article>

      {/* Real-Time Calendar Sync */}
      <article className="fcard fcard-cal">
        <span className="glow lav" style={{ left: -31, top: 89 }} />
        <span className="glow warm" style={{ left: -101, top: -121 }} />
        <div className="fcard-copy" style={{ left: 524, top: 35 }}>
          <span className="channel-icon"><svg viewBox="0 0 36 36" fill="none"><path d="M12 3v6M24 3v6M28.5 6h-21a3 3 0 0 0-3 3v21a3 3 0 0 0 3 3h21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3ZM4.5 15h27M13.5 24l3 3 6-6" stroke="#632DBA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <h3 className="fcard-title">Real-Time<br />Calendar Sync</h3>
          <p className="fcard-desc" style={{ width: 250 }}>Every booking lands straight in your salon software — no double entry, no double booking.</p>
        </div>
        <div className="fcard-lm" style={{ left: 524, top: 315 }}><LearnMore /></div>

        <div className="calwin" aria-hidden="true">
          <div className="cal-head"><b>Saturday, Oct 18</b><span className="chip-y"><i />Live sync</span></div>
          <p className="cal-col" style={{ left: 68 }}>Sarah M.</p>
          <p className="cal-col" style={{ left: 228 }}>Jess K.</p>
          {["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"].map((t, i) => (
            <div key={t}><p className="cal-time" style={{ top: 80 + i * 46 }}>{t}</p><span className="cal-line" style={{ top: 86 + i * 46 }} /></div>
          ))}
          <div className="appt" style={{ left: 64, top: 88, height: 65 }}><b>Root touch-up</b><small>Walk-in</small></div>
          <div className="appt bee" style={{ left: 224, top: 111, height: 42 }}><b>Men’s cut</b><small>Booked by BookingBee</small></div>
          <div className="appt" style={{ left: 64, top: 180, height: 42 }}><b>Blowout</b><small>Front desk</small></div>
          <div className="appt bee" style={{ left: 224, top: 180, height: 65 }}><b>Gel manicure</b><small>Booked by BookingBee</small></div>
          <div className="appt bee" style={{ left: 64, top: 272, height: 88 }}><b>Balayage + Blowout</b><small>Booked by BookingBee</small></div>
          <div className="appt" style={{ left: 224, top: 295, height: 42 }}><b>Brow shaping</b><small>Front desk</small></div>
        </div>
        <div className="synced" aria-hidden="true"><BeeAvatar /><div><b>New booking synced</b><small>Balayage · Sat 2:00 PM · Sarah</small></div><Check bg="#FFC300" fg="#190041" /></div>
      </article>
    </div>
  )
}
