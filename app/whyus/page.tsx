'use client'
import { useState, useEffect } from 'react'

export default function WhyUsPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeReason, setActiveReason] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navScrolled = scrollY > 60

  const reasons = [
    {
      num: '01',
      title: 'Compassionate Counsel',
      short: 'We care deeply about every client.',
      detail: 'We handle every case with genuine empathy, understanding the deep personal impact legal matters have on your life and family. Legal challenges can be stressful and overwhelming — our approach is to listen first, advise second, and always treat you as a person, not just a case file.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#B8965A" opacity="0.9"/>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Always Responsive',
      short: 'You are never left in the dark.',
      detail: 'Prompt communication and timely updates ensure you are always informed about the progress of your matter. We understand that waiting for answers creates anxiety — so we make it our priority to return calls, respond to emails, and provide regular updates without you ever having to chase us.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6l5.25 3.15-.75 1.23L12.5 11V15z" fill="#B8965A" opacity="0.9"/>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Decade of Experience',
      short: 'Over 10 years of NSW legal practice.',
      detail: 'Admitted to practice in New South Wales since 2014, our principal solicitor brings over a decade of deep expertise in property transactions and immigration matters of all complexity levels. Experience means we have seen the edge cases, the complications, and the solutions — so you benefit from hard-won knowledge every single time.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.18V11c0 3.5-2.33 6.79-6 7.93-3.67-1.14-6-4.43-6-7.93V7.18L12 5z" fill="#B8965A" opacity="0.9"/>
        </svg>
      )
    },
    {
      num: '04',
      title: 'Tailored Strategy',
      short: 'Every matter is uniquely yours.',
      detail: 'Every approach is crafted specifically for your unique circumstances and goals — we never offer cookie-cutter legal advice. Whether you are a first-home buyer, a business owner, an international student, or a family navigating immigration, your strategy is built around your specific needs, timeline, and desired outcomes.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#B8965A" opacity="0.9"/>
        </svg>
      )
    },
    {
      num: '05',
      title: 'Multi-lingual Service',
      short: 'We speak your language.',
      detail: 'Fluent in Hindi, English, Kannada, and Telugu — we bridge language barriers to serve diverse communities across NSW with ease and confidence. Legal advice is only useful when it is clearly understood. Our multilingual capability means you can express yourself fully, ask questions freely, and be completely confident in the advice you receive.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill="#B8965A" opacity="0.9"/>
        </svg>
      )
    },
    {
      num: '06',
      title: 'Results Focused',
      short: 'We are measured by your outcomes.',
      detail: 'We combine rigorous legal standards with a practical, outcome-focused approach to consistently deliver for our clients. Every decision we make, every document we draft, every negotiation we enter is guided by one question: what is the best result for our client? Our 98% satisfaction rate speaks to this unwavering commitment.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" fill="#B8965A" opacity="0.9"/>
        </svg>
      )
    },
  ]

  const stats = [
    ['10+', 'Years in NSW'],
    ['500+', 'Cases Settled'],
    ['4', 'Languages'],
    ['98%', 'Satisfaction'],
  ]

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
        .topnav { position: fixed; top: 0; left: 0; right: 0; z-index: 900; padding: 12px 64px; display: flex; align-items: center; justify-content: space-between; transition: all 0.5s cubic-bezier(0.4,0,0.2,1); }
        .topnav.scrolled { padding: 8px 64px; background: #12243C; backdrop-filter: blur(24px); border-bottom: 1px solid var(--border-soft); box-shadow: 0 1px 32px rgba(0,0,0,0.06); }
        .nav-wordmark { display: flex; align-items: center; gap: 12px; text-decoration: none; transition: opacity 0.3s; }
        .nav-wordmark:hover { opacity: 0.85; }
        .nav-logo { width: 300px; height: 80px; min-width: 300px; min-height: 80px; object-fit: contain; display: block; flex-shrink: 0; transition: all 0.5s cubic-bezier(0.4,0,0.2,1); }
        .topnav.scrolled .nav-logo { width: 300px; height: 80px; min-width: 300px; min-height: 80px; }
        .nav-wordmark-text { font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff; letter-spacing: 0.3px; transition: color 0.4s; line-height: 1.2; }
        .nav-wordmark-text.dark { color: var(--navy); }
        .nav-wordmark-text sub { font-family: 'Outfit', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; display: block; margin-top: 2px; color: rgba(255,255,255,0.5); transition: color 0.4s; }
        .nav-wordmark-text.dark sub { color: var(--gold); }
        .nav-links { display: flex; gap: 40px; align-items: center; }
        .nl { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.25s; cursor: pointer; }
        .nl:hover { color: #fff; }
        .nl.dk { color: var(--ink-soft); }
        .nl.dk:hover { color: var(--navy); }
        .nl.active { color: var(--gold) !important; }
        .nav-cta { font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 10px 26px; border-radius: 4px; text-decoration: none; transition: all 0.3s; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #fff; backdrop-filter: blur(8px); }
        .nav-cta:hover { background: rgba(255,255,255,0.25); }
        .nav-cta.dk { background: var(--gold); border-color: var(--gold); color: #fff; }
        .nav-cta.dk:hover { background: var(--gold-light); }

        /* ── HAMBURGER ── */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; z-index: 1000; }
        .hamburger span { display: block; width: 24px; height: 2px; border-radius: 2px; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .hamburger span.light { background: rgba(255,255,255,0.85); }
        .hamburger span.dark { background: var(--navy); }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE MENU DRAWER ── */
        .mobile-menu {
          display: none;
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--navy);
          z-index: 800;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 100px 48px 60px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%); }
        .mobile-menu::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(184,150,90,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,90,0.03) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }

        .mob-link {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 8vw, 48px);
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
          cursor: pointer;
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
        .why-hero { min-height: 460px; position: relative; display: flex; align-items: flex-end; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80) center/cover no-repeat; filter: brightness(0.15); }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(14,30,53,0.98) 0%, rgba(26,51,82,0.92) 55%, rgba(14,30,53,0.85) 100%); }
        .hero-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%); }

        /* ── SECTION LABEL ── */
        .sec-label { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .sec-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }

        /* ── STATS BAR ── */
        .stats-strip { background: var(--navy); position: relative; overflow: hidden; }
        .stats-strip::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(184,150,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,90,0.04) 1px, transparent 1px); background-size: 48px 48px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        .stat-cell { padding: 48px 40px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 1; transition: background 0.3s; }
        .stat-cell:last-child { border-right: none; }
        .stat-cell:hover { background: rgba(184,150,90,0.05); }
        .stat-num { font-family: 'DM Serif Display', serif; font-size: 56px; color: #fff; line-height: 1; margin-bottom: 10px; }
        .stat-label { font-family: 'Outfit', sans-serif; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.38); font-weight: 500; }
        .stat-gold { display: block; width: 24px; height: 2px; background: var(--gold); margin: 10px auto 0; border-radius: 1px; }

        /* ── REASON CARDS ── */
        .reason-card {
          background: var(--white); border: 1px solid var(--border-soft);
          border-radius: 3px; padding: 40px 44px;
          display: grid; grid-template-columns: 64px 1fr; gap: 28px;
          align-items: start; cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          position: relative; overflow: hidden;
        }
        .reason-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: transparent; transition: background 0.3s; }
        .reason-card:hover { box-shadow: 0 16px 56px rgba(0,0,0,0.08); transform: translateY(-3px); border-color: var(--border); }
        .reason-card:hover::before { background: var(--gold); }
        .reason-card.expanded { border-color: var(--border); box-shadow: 0 16px 56px rgba(0,0,0,0.08); }
        .reason-card.expanded::before { background: var(--gold); }

        .reason-num { font-family: 'DM Serif Display', serif; font-size: 13px; color: var(--gold); letter-spacing: 1px; margin-bottom: 16px; }
        .reason-icon-wrap { width: 56px; height: 56px; background: var(--gold-pale); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); flex-shrink: 0; transition: all 0.3s; }
        .reason-card:hover .reason-icon-wrap, .reason-card.expanded .reason-icon-wrap { background: var(--navy); border-color: var(--navy); }
        .reason-card:hover .reason-icon-wrap svg path, .reason-card.expanded .reason-icon-wrap svg path { fill: var(--gold-light); }

        .reason-title { font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 8px; letter-spacing: -0.3px; line-height: 1.2; transition: color 0.3s; }
        .reason-short { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--ink-faint); font-weight: 400; }
        .reason-detail { font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--ink-soft); line-height: 1.85; font-weight: 300; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-soft); max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, margin 0.3s; }
        .reason-detail.open { max-height: 200px; opacity: 1; }
        .reason-toggle { width: 28px; height: 28px; background: var(--gold-pale); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 4px; transition: all 0.3s; }
        .reason-card:hover .reason-toggle { background: var(--gold); }
        .reason-card.expanded .reason-toggle { background: var(--gold); transform: rotate(45deg); }

        /* ── HIGHLIGHT QUOTE ── */
        .highlight-quote { background: linear-gradient(135deg, var(--gold-pale) 0%, #fff 100%); border: 1px solid var(--border); border-radius: 4px; padding: 40px 48px; position: relative; overflow: hidden; }
        .highlight-quote::before { content: '"'; font-family: 'DM Serif Display', serif; font-size: 100px; color: var(--gold); opacity: 0.15; position: absolute; top: -15px; left: 24px; line-height: 1; }
        .highlight-quote p { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--navy); line-height: 1.65; font-weight: 400; font-style: italic; padding-left: 8px; }

        /* ── VALUES GRID ── */
        .values-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        .value-card { background: var(--white); border: 1px solid var(--border-soft); border-top: 3px solid var(--gold); border-radius: 2px; padding: 28px 28px; transition: all 0.3s; }
        .value-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .value-title { font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
        .value-desc { font-family: 'Outfit', sans-serif; font-size: 13.5px; color: var(--ink-soft); line-height: 1.75; font-weight: 300; }

        /* ── GOLD RULE ── */
        .gold-rule { width: 48px; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); display: block; margin-bottom: 36px; border-radius: 2px; }

        /* ── CTA STRIP ── */
        .cta-strip { background: var(--gold); padding: 72px 64px; position: relative; overflow: hidden; }
        .cta-strip::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 40px 40px; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .f1 { animation: fadeUp 0.9s 0.1s both; }
        .f2 { animation: fadeUp 0.9s 0.25s both; }
        .f3 { animation: fadeUp 0.9s 0.4s both; }
        .f4 { animation: fadeUp 0.9s 0.55s both; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .topnav, .topnav.scrolled { padding: 10px 24px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .nav-logo { width: 200px !important; height: 66px !important; min-width: 200px !important; min-height: 66px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .stat-cell { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .main-layout { grid-template-columns: 1fr !important; }
          .sticky-col { position: static !important; }
          .reason-card { grid-template-columns: 1fr !important; padding: 28px 24px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .main-pad { padding: 56px 24px !important; }
          .hero-inner-pad { padding: 130px 24px 56px !important; }
          .cta-strip { padding: 56px 24px !important; }
          .highlight-quote { padding: 28px 28px !important; }
        }
      `}</style>

      {/* ── MOBILE MENU DRAWER ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="/about" className="mob-link" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/#vision" className="mob-link" onClick={() => setMenuOpen(false)}>Vision</a>
        <a href="/services" className="mob-link" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="/whyus" className="mob-link mob-active">Why Us</a>
        <div className="mob-divider" />
        <a href="/contact" className="mob-cta" onClick={() => setMenuOpen(false)}>Contact Us →</a>
        <div className="mob-langs">
          {['Hindi', 'English', 'Kannada', 'Telugu'].map(l => (
            <span key={l} className="mob-lang">{l}</span>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={`topnav${navScrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-wordmark">
          <img src="/logo.png" alt="Veeksha Lawyers Logo" className="nav-logo" />
          <div className={`nav-wordmark-text${navScrolled ? ' dark' : ''}`}></div>
        </a>

        <div className="nav-links">
          {[['About', '/about'], ['Vision', '/#vision'], ['Services', '/services'], ['Why Us', '/whyus']].map(([l, href]) => (
            <a key={l} href={href} className={`nl${navScrolled ? ' dk' : ''}${l === 'Why Us' ? ' active' : ''}`}>{l}</a>
          ))}
          <a href="/contact" className={`nav-cta${navScrolled ? ' dk' : ''}`}>Contact</a>
        </div>

        {/* ── HAMBURGER BUTTON ── */}
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
      <div className="why-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-accent" />
        <div className="hero-inner-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '150px 64px 64px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="f1" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span className="sans" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-light)' }}>The Veeksha Difference</span>
          </div>
          <h1 className="f2 serif" style={{ fontSize: 'clamp(40px, 6vw, 74px)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-2px', marginBottom: '24px' }}>
            Why Choose Us
          </h1>
          <p className="f3 sans" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: '520px', fontWeight: 300, marginBottom: '40px' }}>
            What makes Veeksha Lawyers & Consultancy the trusted choice for clients across New South Wales — quality, care, and consistency in everything we do.
          </p>
          <div className="f4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['NSW Admitted 2014', '10+ Years Experience', '4 Languages', '98% Satisfaction'].map(tag => (
              <span key={tag} style={{ background: 'rgba(184,150,90,0.2)', border: '1px solid rgba(184,150,90,0.4)', color: 'var(--gold-light)', fontFamily: 'Outfit,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '1px', padding: '7px 16px', borderRadius: '2px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="stats-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {stats.map(([num, label]) => (
            <div key={label} className="stat-cell">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
              <span className="stat-gold" />
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="main-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 64px' }}>
        <div className="main-layout" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '96px', alignItems: 'start' }}>

          {/* ── LEFT STICKY ── */}
          <div className="sticky-col" style={{ position: 'sticky', top: '120px' }}>
            <div className="sec-label">Why Choose Us</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '24px' }}>
              The Veeksha<br />Difference
            </h2>
            <span className="gold-rule" />
            <p className="sans" style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.9, marginBottom: '36px', fontWeight: 300 }}>
              We combine deep legal expertise with genuine personal care — because your legal matter deserves both.
            </p>

            <div className="highlight-quote" style={{ marginBottom: '40px' }}>
              <p>Every client deserves legal advice that is clear, compassionate, and completely tailored to their circumstances.</p>
            </div>

            <div className="values-grid">
              {[
                ['Compassion', 'We genuinely care about every client.'],
                ['Integrity', 'Transparent and honest at all times.'],
                ['Excellence', 'Results that exceed expectations.'],
                ['Inclusion', 'Proudly serving all communities.'],
              ].map(([t, d]) => (
                <div key={t} className="value-card">
                  <div className="value-title">{t}</div>
                  <div className="value-desc">{d}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px' }}>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'Outfit,sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', transition: 'gap 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '16px'}
                onMouseLeave={e => e.currentTarget.style.gap = '10px'}>
                Book a Consultation →
              </a>
            </div>
          </div>

          {/* ── RIGHT: REASONS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reasons.map((r) => (
              <div
                key={r.num}
                className={`reason-card${activeReason === r.num ? ' expanded' : ''}`}
                onClick={() => setActiveReason(activeReason === r.num ? null : r.num)}
                
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div className="reason-icon-wrap">{r.icon}</div>
                  <div className="reason-num">{r.num}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div>
                      <div className="reason-title">{r.title}</div>
                      <div className="reason-short">{r.short}</div>
                    </div>
                    <div className="reason-toggle">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className={`reason-detail${activeReason === r.num ? ' open' : ''}`}>
                    {r.detail}
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom CTA card */}
            <div style={{ background: 'var(--navy)', borderRadius: '3px', padding: '40px 44px', marginTop: '8px', position: 'relative', overflow: 'hidden', borderTop: '3px solid var(--gold)' }}>
              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(184,150,90,0.06)' }} />
              <div className="sans" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px' }}>Ready to Get Started?</div>
              <div className="serif" style={{ fontSize: '26px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '14px', letterSpacing: '-0.5px' }}>
                Experience the Veeksha difference for yourself.
              </div>
              <p className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontWeight: 300, marginBottom: '28px' }}>
                Book a consultation today — we respond within one business day.
              </p>
              <a href="/contact" style={{ display: 'inline-block', background: 'var(--gold)', color: '#fff', padding: '14px 32px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
                Contact Us Today →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip">
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', position: 'relative', zIndex: 2 }}>
          <div>
            <div className="sans" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}>NSW Legal Experts</div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '8px' }}>
              Your Rights.<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>Our Resolve.</em>
            </h2>
            <p className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Property Law · Immigration Law · NSW Admitted 2014</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: 'var(--navy)', color: '#fff', padding: '16px 40px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Book a Consultation →
            </a>
            <div className="sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>contact@veekshalawyers.com.au</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--navy)', padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>© 2026 Veeksha Lawyers & Consultancy Pty Ltd · NSW, Australia</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ display: 'block', width: '20px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
          <span className="sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}