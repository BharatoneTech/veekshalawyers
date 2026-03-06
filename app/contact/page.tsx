'use client'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navScrolled = scrollY > 60
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: '#FAFAF8', color: '#1C1C1C', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        :root {
          --gold: #B8965A; --gold-light: #D4AF7A; --gold-pale: #F5EDD8;
          --navy: #0E1E35; --navy-mid: #1A3352;
          --ink: #1C1C1C; --ink-soft: #5A5A5A; --ink-faint: #9A9A9A;
          --cream: #FAFAF8; --white: #FFFFFF;
          --border: rgba(184,150,90,0.18); --border-soft: rgba(0,0,0,0.08);
        }

        body { background: var(--cream); }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'Outfit', sans-serif; }

        /* ── NAV ── */
        .topnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 900;
          padding: 12px 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .topnav.scrolled {
          padding: 8px 64px;
          background: rgba(250,250,248,0.97); backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border-soft);
          box-shadow: 0 1px 32px rgba(0,0,0,0.06);
        }
        .nav-wordmark { display: flex; align-items: center; gap: 12px; text-decoration: none; transition: opacity 0.3s; }
        .nav-wordmark:hover { opacity: 0.85; }

        /* Desktop logo */
        .nav-logo {
          width: 300px; height: 80px; min-width: 300px; min-height: 80px;
          object-fit: contain; display: block; flex-shrink: 0;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .topnav.scrolled .nav-logo { width: 56px; height: 56px; min-width: 56px; min-height: 56px; }

        .nav-wordmark-text { font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff; letter-spacing: 0.3px; transition: color 0.4s; line-height: 1.2; }
        .nav-wordmark-text.dark { color: var(--navy); }
        .nav-wordmark-text sub { font-family: 'Outfit', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; display: block; margin-top: 2px; color: rgba(255,255,255,0.5); transition: color 0.4s; }
        .nav-wordmark-text.dark sub { color: var(--gold); }
        .nav-links { display: flex; gap: 40px; align-items: center; }
        .nl { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.25s; }
        .nl:hover { color: #fff; }
        .nl.dk { color: var(--ink-soft); }
        .nl.dk:hover { color: var(--navy); }
        .nl.active { color: var(--gold) !important; }
        .nav-cta { font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 10px 26px; border-radius: 4px; text-decoration: none; transition: all 0.3s; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #fff; backdrop-filter: blur(8px); }
        .nav-cta:hover { background: rgba(255,255,255,0.25); }
        .nav-cta.dk { background: var(--gold); border-color: var(--gold); color: #fff; }
        .nav-cta.dk:hover { background: var(--gold-light); }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px; background: none; border: none; z-index: 1000;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px; border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .hamburger span.light { background: rgba(255,255,255,0.85); }
        .hamburger span.dark { background: var(--navy); }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE MENU DRAWER ── */
        .mobile-menu {
          display: none;
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--navy); z-index: 800;
          flex-direction: column; justify-content: center; align-items: flex-start;
          padding: 100px 48px 60px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%);
        }
        .mobile-menu::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(184,150,90,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,150,90,0.03) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .mob-link {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 8vw, 48px);
          color: rgba(255,255,255,0.75); text-decoration: none;
          display: block; margin-bottom: 8px; cursor: pointer;
          transition: color 0.25s, padding-left 0.3s;
          position: relative; z-index: 1;
          border: none; background: none; text-align: left;
        }
        .mob-link:hover { color: var(--gold-light); padding-left: 8px; }
        .mob-link.mob-active { color: var(--gold-light); }
        .mob-divider { width: 40px; height: 1px; background: rgba(184,150,90,0.3); margin: 24px 0; position: relative; z-index: 1; }
        .mob-cta {
          display: inline-block; background: var(--gold); color: #fff;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 32px; border-radius: 3px; text-decoration: none;
          margin-top: 16px; position: relative; z-index: 1;
          border: none; cursor: pointer;
        }
        .mob-langs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 32px; position: relative; z-index: 1; }
        .mob-lang { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 1px; color: var(--gold); background: rgba(184,150,90,0.12); border: 1px solid rgba(184,150,90,0.25); padding: 5px 12px; border-radius: 2px; }

        /* ── HERO ── */
        .contact-hero { min-height: 400px; position: relative; display: flex; align-items: flex-end; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80) center/cover no-repeat; filter: brightness(0.15); }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(14,30,53,0.98) 0%, rgba(26,51,82,0.92) 55%, rgba(14,30,53,0.85) 100%); }
        .hero-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .f1 { animation: fadeUp 0.9s 0.1s both; }
        .f2 { animation: fadeUp 0.9s 0.25s both; }
        .f3 { animation: fadeUp 0.9s 0.4s both; }
        .f4 { animation: fadeUp 0.9s 0.55s both; }

        /* ── SEC LABEL ── */
        .sec-label { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .sec-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }

        /* ── FORM ── */
        .form-group { margin-bottom: 24px; }
        .form-label { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-faint); display: block; margin-bottom: 8px; transition: color 0.3s; }
        .form-label.focused { color: var(--gold); }
        .form-input {
          width: 100%; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 400;
          color: var(--ink); background: var(--white);
          border: 1px solid var(--border-soft); border-radius: 3px;
          padding: 14px 18px; outline: none;
          transition: all 0.3s; appearance: none;
        }
        .form-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(184,150,90,0.1); }
        .form-input::placeholder { color: var(--ink-faint); }
        select.form-input { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9A9A' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; }
        textarea.form-input { resize: vertical; min-height: 130px; line-height: 1.7; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .submit-btn {
          width: 100%; background: var(--navy); color: #fff;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 18px 32px; border: none; border-radius: 3px;
          cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden;
          margin-top: 8px;
        }
        .submit-btn::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
        .submit-btn:hover::before { transform: translateX(0); }
        .submit-btn span { position: relative; z-index: 1; }
        .submit-btn:hover { box-shadow: 0 8px 32px rgba(184,150,90,0.35); }

        /* ── CONTACT CARDS ── */
        .contact-card { background: var(--white); border: 1px solid var(--border-soft); border-radius: 3px; padding: 24px 24px; display: flex; gap: 18px; align-items: flex-start; transition: all 0.3s; margin-bottom: 14px; }
        .contact-card:hover { border-color: var(--border); box-shadow: 0 8px 32px rgba(0,0,0,0.06); transform: translateX(4px); }
        .contact-card:last-child { margin-bottom: 0; }
        .card-icon { width: 44px; height: 44px; background: var(--gold-pale); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--border); }
        .card-label { font-family: 'Outfit', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 5px; }
        .card-value { font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--ink); font-weight: 500; line-height: 1.5; }
        .card-value a { color: var(--ink); text-decoration: none; transition: color 0.25s; }
        .card-value a:hover { color: var(--gold); }

        /* ── HOURS TABLE ── */
        .hours-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-soft); font-family: 'Outfit', sans-serif; font-size: 13px; }
        .hours-row:last-child { border-bottom: none; }
        .hours-day { color: var(--ink-soft); font-weight: 400; }
        .hours-time { color: var(--ink); font-weight: 500; }
        .hours-closed { color: var(--ink-faint); font-weight: 300; font-style: italic; }

        /* ── MAP ── */
        .map-wrapper { border-radius: 3px; overflow: hidden; border: 1px solid var(--border-soft); box-shadow: 0 8px 40px rgba(0,0,0,0.08); position: relative; }
        .map-overlay-badge { position: absolute; top: 16px; left: 16px; background: var(--navy); color: #fff; font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 8px 14px; border-radius: 2px; border-left: 3px solid var(--gold); z-index: 10; }

        /* ── SUCCESS STATE ── */
        .success-box { background: var(--navy); border-radius: 4px; padding: 48px 32px; text-align: center; border-top: 3px solid var(--gold); }

        /* ── LANG STRIP ── */
        .lang-strip { display: flex; gap: 8px; flex-wrap: wrap; }
        .lang-pill { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.5px; color: var(--gold); background: rgba(184,150,90,0.1); border: 1px solid rgba(184,150,90,0.25); padding: 5px 12px; border-radius: 2px; }

        /* ── CTA STRIP ── */
        .cta-strip { background: var(--gold); padding: 72px 64px; position: relative; overflow: hidden; }
        .cta-strip::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 40px 40px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          /* Nav */
          .topnav, .topnav.scrolled { padding: 10px 20px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }

          /* Logo: 200x66 on mobile, same even when scrolled */
          .nav-logo {
            width: 200px !important; height: 66px !important;
            min-width: 200px !important; min-height: 66px !important;
          }
          .topnav.scrolled .nav-logo {
            width: 200px !important; height: 66px !important;
            min-width: 200px !important; min-height: 66px !important;
          }

          /* Hero */
          .contact-hero { min-height: 320px; }
          .hero-inner-pad { padding: 110px 20px 48px !important; }

          /* Main content */
          .main-pad { padding: 48px 20px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }

          /* Form row: stack on mobile */
          .form-row { grid-template-columns: 1fr !important; gap: 0 !important; }

          /* Map section */
          .map-pad { padding: 0 20px 56px !important; }
          .map-wrapper iframe { height: 280px !important; }

          /* CTA strip */
          .cta-strip { padding: 48px 20px !important; }
          .cta-inner { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }

          /* Footer */
          .site-footer { padding: 24px 20px !important; flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }

          /* Contact card: prevent overflow */
          .contact-card { padding: 18px 16px !important; }
          .card-value { font-size: 13px !important; word-break: break-word; }
        }
      `}</style>

      {/* ── MOBILE MENU DRAWER ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="/about" className="mob-link" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/#vision" className="mob-link" onClick={() => setMenuOpen(false)}>Vision</a>
        <a href="/services" className="mob-link" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="/whyus" className="mob-link" onClick={() => setMenuOpen(false)}>Why Us</a>
        <div className="mob-divider" />
        <a href="/contact" className="mob-cta mob-active">Contact Us →</a>
        <div className="mob-langs">
          {['Hindi', 'English', 'Kannada', 'Telugu'].map(l => (
            <span key={l} className="mob-lang">{l}</span>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={`topnav${navScrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-wordmark">
          {/* No inline style — CSS class controls all sizes */}
          <img src="/logo.png" alt="Veeksha Lawyers Logo" className="nav-logo" />
          <div className={`nav-wordmark-text${navScrolled ? ' dark' : ''}`}></div>
        </a>

        <div className="nav-links">
          {[['About', '/about'], ['Vision', '/#vision'], ['Services', '/services'], ['Why Us', '/whyus']].map(([l, href]) => (
            <a key={l} href={href} className={`nl${navScrolled ? ' dk' : ''}`}>{l}</a>
          ))}
          <a href="/contact" className={`nav-cta${navScrolled ? ' dk' : ''} active`}>Contact</a>
        </div>

        {/* ── HAMBURGER ── */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={navScrolled ? 'dark' : 'light'} />
          <span className={navScrolled ? 'dark' : 'light'} />
          <span className={navScrolled ? 'dark' : 'light'} />
        </button>
      </nav>

      {/* ── HERO ── */}
      <div className="contact-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-accent" />
        <div className="hero-inner-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '150px 64px 60px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="f1" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span className="sans" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-light)' }}>Get in Touch</span>
          </div>
          <h1 className="f2 serif" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-2px', marginBottom: '20px' }}>
            Contact Us
          </h1>
          <p className="f3 sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, maxWidth: '480px', fontWeight: 300, marginBottom: '32px' }}>
            We're here to help. Reach out to discuss your legal matter and we'll respond promptly with clear, practical guidance.
          </p>
          <div className="f4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="mailto:contact@veekshalawyers.com.au" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold)', color: '#fff', fontFamily: 'Outfit,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '12px 22px', borderRadius: '3px', textDecoration: 'none' }}>
              ✉ Email Us
            </a>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Outfit,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '1px', padding: '12px 20px', borderRadius: '3px' }}>
              NSW, Australia
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="main-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 64px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '72px', alignItems: 'start' }}>

          {/* ── LEFT: FORM ── */}
          <div>
            <div className="sec-label">Send a Message</div>
            <h2 className="serif" style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '8px' }}>
              Book a Consultation
            </h2>
            <p className="sans" style={{ fontSize: '14px', color: 'var(--ink-faint)', lineHeight: 1.7, marginBottom: '36px', fontWeight: 300 }}>
              Fill in your details below and we'll get back to you within one business day.
            </p>

            {submitted ? (
              <div className="success-box">
                <div style={{ width: '56px', height: '56px', background: 'rgba(184,150,90,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                    <path d="M2 10L9 17L22 2" stroke="#B8965A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="serif" style={{ fontSize: '26px', color: '#fff', marginBottom: '12px' }}>Message Sent!</div>
                <p className="sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300, maxWidth: '320px', margin: '0 auto 28px' }}>
                  Thank you for reaching out. We'll review your enquiry and respond within one business day.
                </p>
                <button onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', phone:'', service:'', message:'' }) }}
                  style={{ background: 'var(--gold)', color: '#fff', border: 'none', fontFamily: 'Outfit,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '3px', cursor: 'pointer' }}>
                  Send Another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className={`form-label${focused === 'name' ? ' focused' : ''}`}>Full Name *</label>
                    <input name="name" type="text" required placeholder="Your full name" className="form-input"
                      value={formData.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                  </div>
                  <div className="form-group">
                    <label className={`form-label${focused === 'email' ? ' focused' : ''}`}>Email Address *</label>
                    <input name="email" type="email" required placeholder="your@email.com" className="form-input"
                      value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className={`form-label${focused === 'phone' ? ' focused' : ''}`}>Phone Number</label>
                    <input name="phone" type="tel" placeholder="+61 (your number)" className="form-input"
                      value={formData.phone} onChange={handleChange}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} />
                  </div>
                  <div className="form-group">
                    <label className={`form-label${focused === 'service' ? ' focused' : ''}`}>Area of Enquiry *</label>
                    <select name="service" required className="form-input"
                      value={formData.service} onChange={handleChange}
                      onFocus={() => setFocused('service')} onBlur={() => setFocused('')}>
                      <option value="">Select a service</option>
                      <option>Property Law — Buying / Selling</option>
                      <option>Property Law — Conveyancing</option>
                      <option>Property Law — Contract Review</option>
                      <option>Immigration — Student Visa</option>
                      <option>Immigration — Partner / Family Visa</option>
                      <option>Immigration — Skilled Migration</option>
                      <option>Immigration — Permanent Residency</option>
                      <option>Immigration — Citizenship</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className={`form-label${focused === 'message' ? ' focused' : ''}`}>Your Message *</label>
                  <textarea name="message" required placeholder="Please describe your legal matter briefly so we can assist you better..." className="form-input"
                    value={formData.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                </div>

                <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--border)', borderRadius: '3px', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" stroke="#B8965A" strokeWidth="1.5"/>
                    <path d="M12 8v4M12 16h.01" stroke="#B8965A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="sans" style={{ fontSize: '12px', color: '#7A5C2A', fontWeight: 400, lineHeight: 1.5 }}>
                    You may also write in <strong>Hindi, Kannada, or Telugu</strong> — we're fluent in all four languages.
                  </span>
                </div>

                <button type="submit" className="submit-btn">
                  <span>Send Enquiry →</span>
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: CONTACT INFO ── */}
          <div>
            <div className="sec-label">Contact Details</div>
            <h2 className="serif" style={{ fontSize: 'clamp(26px,3vw,32px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: '28px', lineHeight: 1.1 }}>
              Reach Us Directly
            </h2>

            <div className="contact-card">
              <div className="card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#B8965A"/>
                </svg>
              </div>
              <div>
                <div className="card-label">Email</div>
                <div className="card-value">
                  <a href="mailto:contact@veekshalawyers.com.au">contact@veekshalawyers.com.au</a>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#B8965A"/>
                </svg>
              </div>
              <div>
                <div className="card-label">Location</div>
                <div className="card-value">New South Wales, Australia</div>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#B8965A"/>
                </svg>
              </div>
              <div>
                <div className="card-label">Response Time</div>
                <div className="card-value">Within 1 Business Day</div>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill="#B8965A"/>
                </svg>
              </div>
              <div>
                <div className="card-label">Languages</div>
                <div style={{ marginTop: '8px' }}>
                  <div className="lang-strip">
                    {['Hindi', 'English', 'Kannada', 'Telugu'].map(l => (
                      <span key={l} className="lang-pill">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: '3px', padding: '24px 24px', borderTop: '3px solid var(--gold)', marginTop: '4px' }}>
              <div className="sans" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Office Hours</div>
              {[
                ['Monday', '9:00 am – 5:30 pm'],
                ['Tuesday', '9:00 am – 5:30 pm'],
                ['Wednesday', '9:00 am – 5:30 pm'],
                ['Thursday', '9:00 am – 5:30 pm'],
                ['Friday', '9:00 am – 5:30 pm'],
                ['Saturday', 'By Appointment'],
                ['Sunday', 'Closed'],
              ].map(([day, time]) => (
                <div key={day} className="hours-row">
                  <span className="hours-day">{day}</span>
                  <span className={time === 'Closed' ? 'hours-closed' : 'hours-time'}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GOOGLE MAP ── */}
      <div className="map-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px 80px' }}>
        <div className="sec-label" style={{ marginBottom: '20px' }}>Our Location</div>
        <h2 className="serif" style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: '28px' }}>
          Find Us in NSW
        </h2>
        <div className="map-wrapper">
          <div className="map-overlay-badge">📍 New South Wales, Australia</div>
          <iframe
            title="Veeksha Lawyers Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405417!2d-118.69192060649498!3d-33.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sNew%20South%20Wales%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau&pb=!1m18!1m12!1m3!1d13266697.91863!2d143.2104872!3d-33.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sNew%20South%20Wales%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
            width="100%"
            height="460"
            style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.05)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="sans" style={{ fontSize: '12px', color: 'var(--ink-faint)', marginTop: '12px', fontWeight: 300 }}>
          * To update the map pin to your exact office address, replace the Google Maps embed URL above with your specific location link from <strong>maps.google.com → Share → Embed a map</strong>.
        </p>
      </div>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip">
        <div className="cta-inner" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', position: 'relative', zIndex: 2 }}>
          <div>
            <div className="sans" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}>NSW Legal Experts</div>
            <h2 className="serif" style={{ fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '8px' }}>
              Your Rights.<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>Our Resolve.</em>
            </h2>
            <p className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Property Law · Immigration Law · NSW Admitted 2014</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:contact@veekshalawyers.com.au"
              style={{ background: 'var(--navy)', color: '#fff', padding: '16px 36px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Email Us Today →
            </a>
            <div className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>contact@veekshalawyers.com.au</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer" style={{ background: 'var(--navy)', padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>© 2024 Veeksha Lawyers & Consultancy Pty Ltd · NSW, Australia</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ display: 'block', width: '20px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
          <span className="sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}