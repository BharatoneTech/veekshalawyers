'use client'

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --gold: #B8965A;
          --gold-light: #D4AF7A;
          --gold-pale: #F5EDD8;
          --navy: #0E1E35;
          --navy-mid: #1A3352;
          --ink-soft: #5A5A5A;
          --ink-faint: #9A9A9A;
          --cream: #FAFAF8;
          --border-soft: rgba(0,0,0,0.08);
        }

        .footer-root {
          font-family: 'Outfit', sans-serif;
          background: var(--navy);
          position: relative;
          overflow: hidden;
        }

        /* subtle grid pattern */
        .footer-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(184,150,90,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,150,90,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* gold top border */
        .footer-top-bar {
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, transparent 100%);
        }

        /* ── MAIN GRID ── */
        .footer-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 72px 64px 56px;
          display: grid;
          grid-template-columns: 300px 1fr 1fr 1fr;
          gap: 56px;
          position: relative;
          z-index: 2;
        }

        /* ── COL 1: BRAND ── */
        .footer-brand {}

        /* FIX: was fixed 260px — now fluid with a max so it never overflows */
        .footer-logo-box {
          width: 100%;
          max-width: 260px;
          height: 80px;
          background: rgba(255,255,255,0.04);
          border: 1px dashed rgba(184,150,90,0.35);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        .footer-logo-box:hover { border-color: var(--gold); }
        .footer-logo-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .footer-logo-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .footer-logo-placeholder svg { opacity: 0.3; }
        .footer-logo-placeholder span {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.25); font-weight: 500;
        }

        .footer-firm-name {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .footer-firm-sub {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .footer-tagline {
          font-size: 13px;
          color: rgba(255,255,255,0.38);
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 28px;
          max-width: 240px;
        }

        /* language pills */
        .footer-langs {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px;
        }
        .footer-lang {
          font-size: 10px; font-weight: 500; letter-spacing: 0.5px;
          color: var(--gold); background: rgba(184,150,90,0.12);
          border: 1px solid rgba(184,150,90,0.25);
          padding: 4px 10px; border-radius: 2px;
        }

        /* ── COL HEADINGS ── */
        .footer-col-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(184,150,90,0.2);
          display: flex; align-items: center; gap: 10px;
        }
        .footer-col-heading::before {
          content: '';
          display: block;
          width: 20px; height: 1.5px;
          background: var(--gold);
          flex-shrink: 0;
        }

        /* ── LINKS ── */
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-link {
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: all 0.25s;
          display: flex; align-items: center; gap: 8px;
        }
        .footer-link::before {
          content: '';
          display: block;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.3s;
          flex-shrink: 0;
        }
        .footer-link:hover { color: var(--gold-light); }
        .footer-link:hover::before { width: 12px; }

        /* ── CONTACT ── */
        .contact-item {
          display: flex; gap: 12px; align-items: flex-start;
          margin-bottom: 16px;
        }
        .contact-icon {
          width: 32px; height: 32px;
          background: rgba(184,150,90,0.1);
          border: 1px solid rgba(184,150,90,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .contact-text {
          font-size: 13px; color: rgba(255,255,255,0.45);
          line-height: 1.65; font-weight: 300;
        }
        .contact-text a {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.25s;
        }
        .contact-text a:hover { color: var(--gold-light); }

        /* ── DIVIDER ── */
        .footer-divider {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          position: relative;
          z-index: 2;
        }
        .footer-divider-line {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 64px 40px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          z-index: 2;
        }

        .footer-copyright {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          font-weight: 300;
          margin-bottom: 6px;
        }
        .footer-disclaimer {
          font-size: 11px;
          color: rgba(255,255,255,0.15);
          font-weight: 300;
          max-width: 420px;
          line-height: 1.6;
        }

        /* right: firm image */
        .footer-firm-img-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .footer-firm-img-box {
          width: 320px;
          height: 140px;
          background: rgba(255,255,255,0.04);
          border: 1px dashed rgba(184,150,90,0.35);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s;
          position: relative;
        }
        .footer-firm-img-box:hover { border-color: var(--gold); }
        .footer-firm-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .footer-firm-img-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .footer-firm-img-placeholder svg { opacity: 0.25; }
        .footer-firm-img-placeholder span {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.2); font-weight: 500; text-align: center;
          line-height: 1.5;
        }
        .footer-firm-img-box::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 40px; height: 40px;
          background: linear-gradient(135deg, transparent 50%, rgba(184,150,90,0.25) 50%);
          pointer-events: none;
        }
        .footer-firm-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gold); font-weight: 500;
          text-align: right; margin-top: 8px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .footer-main { grid-template-columns: 260px 1fr 1fr; gap: 40px; }
          .footer-contact-col { grid-column: 1 / -1; }
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            padding: 40px 20px 32px;
            gap: 36px;
          }
          .footer-divider { padding: 0 20px; }
          .footer-bottom {
            padding: 24px 20px 36px;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          /* Logo: full width, reasonable height */
          .footer-logo-box {
            max-width: 100%;
            height: 72px;
          }

          /* Firm image: full width on mobile */
          .footer-firm-img-wrap { width: 100%; }
          .footer-firm-img-box {
            width: 100%;
            height: 120px;
          }
          .footer-firm-label { text-align: left; }

          .footer-tagline { max-width: 100%; }
          .footer-disclaimer { max-width: 100%; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-bar" />

        {/* ── MAIN GRID ── */}
        <div className="footer-main">

          {/* COL 1 — BRAND + LOGO */}
          <div className="footer-brand">
            <div className="footer-logo-box">
              <img
                src="/logo.png"
                alt="Veeksha Lawyers Logo"
                onError={(e) => {
  const target = e.currentTarget
  target.style.display = 'none'
  const placeholder = target.nextElementSibling as HTMLElement | null
  if (placeholder) placeholder.style.display = 'flex'
}}
              />
              <div className="footer-logo-placeholder" style={{ display: 'none' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="1" y="1" width="26" height="26" rx="3" stroke="rgba(184,150,90,0.5)" strokeWidth="1.5" strokeDasharray="4 2"/>
                  <path d="M9 19L13 11L17 16L20 13" stroke="rgba(184,150,90,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9.5" cy="10.5" r="2" fill="rgba(184,150,90,0.4)"/>
                </svg>
                <span>Your Logo</span>
              </div>
            </div>

            <div className="footer-firm-name">Veeksha Lawyers</div>
            <div className="footer-firm-sub">& CONSULTANTS Pty Ltd</div>

            <p className="footer-tagline">
              Trusted legal experts in Property Law and Immigration Law across New South Wales since 2014.
            </p>

            <div className="footer-langs">
              {['Hindi', 'English', 'Kannada', 'Telugu'].map(l => (
                <span key={l} className="footer-lang">{l}</span>
              ))}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(184,150,90,0.08)', border: '1px solid rgba(184,150,90,0.2)', borderRadius: '3px', padding: '8px 14px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)' }}>NSW Admitted 2014</span>
            </div>
          </div>

          {/* COL 2 — QUICK LINKS */}
          <div>
            <div className="footer-col-heading">Quick Links</div>
            <ul className="footer-links">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Vision & Mission', '/#vision'],
                ['Our Services', '/services'],
                ['Why Choose Us', '/#why'],
                ['Contact', 'mailto:contact@veekshalawyers.com.au'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="footer-link">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — PRACTICE AREAS */}
          <div>
            <div className="footer-col-heading">Practice Areas</div>
            <ul className="footer-links">
              {[
                'Property Law',
                'Buying & Selling Property',
                'Conveyancing Services',
                'Immigration Law',
                'Visa Applications',
                'Permanent Residency',
                'Citizenship Applications',
              ].map(item => (
                <li key={item}>
                  <a href="/services" className="footer-link">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — CONTACT */}
          <div className="footer-contact-col">
            <div className="footer-col-heading">Contact Us</div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="rgba(184,150,90,0.7)"/>
                </svg>
              </div>
              <div className="contact-text">
                New South Wales,<br />Australia
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(184,150,90,0.7)"/>
                </svg>
              </div>
              <div className="contact-text">
                <a href="mailto:contact@veekshalawyers.com.au">
                  contact@veekshalawyers.com.au
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.61 21 3 14.39 3 6c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z" fill="rgba(184,150,90,0.7)"/>
                </svg>
              </div>
              <div className="contact-text">
                <a href="tel:+61">+61 (NSW)</a>
              </div>
            </div>

            <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '2px solid var(--gold)', borderRadius: '2px', padding: '16px 18px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontWeight: 600 }}>Office Hours</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontWeight: 300 }}>
                Mon – Fri &nbsp;&nbsp; 9:00am – 5:30pm<br />
                Saturday &nbsp;&nbsp; By Appointment<br />
                Sunday &nbsp;&nbsp;&nbsp;&nbsp; Closed
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="footer-divider">
          <hr className="footer-divider-line" />
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">

          <div className="footer-bottom-left">
            <div className="footer-copyright">
              © 2026 Veeksha Lawyers & Consultants Pty Ltd · NSW, Australia · All rights reserved
            </div>
            <div className="footer-disclaimer">
              Liability limited by a scheme approved under Professional Standards Legislation. This website contains general legal information only and does not constitute legal advice.
            </div>
          </div>

          <div className="footer-firm-img-wrap">
            <div className="footer-firm-img-box">
              <img
                src="/firm.png"
                alt="Veeksha Lawyers Firm"
                onError={(e) => {
  const target = e.currentTarget
  target.style.display = 'none'

  const placeholder = target.nextElementSibling as HTMLElement | null
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}}
              />
              <div className="footer-firm-img-placeholder" style={{ display: 'none' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="1" y="1" width="34" height="34" rx="3" stroke="rgba(184,150,90,0.4)" strokeWidth="1.5" strokeDasharray="4 2"/>
                  <rect x="6" y="22" width="24" height="8" rx="1" fill="rgba(184,150,90,0.15)"/>
                  <rect x="10" y="14" width="6" height="8" rx="1" fill="rgba(184,150,90,0.2)"/>
                  <rect x="20" y="16" width="6" height="6" rx="1" fill="rgba(184,150,90,0.2)"/>
                  <path d="M14 14 L18 8 L22 14" stroke="rgba(184,150,90,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="footer-firm-label">Veeksha Lawyers · NSW</div>
          </div>
        </div>

      </footer>
    </>
  )
}