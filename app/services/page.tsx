'use client'
import { useState, useEffect } from 'react'

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('property')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      const sections = ['property', 'buying', 'selling', 'property-approach', 'immigration', 'visa-applications', 'immigration-support']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navScrolled = scrollY > 60

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
          --cream: #FAFAF8; --cream-mid: #F2F0EB; --white: #FFFFFF;
          --border: rgba(184,150,90,0.18); --border-soft: rgba(0,0,0,0.08);
        }
        body { background: var(--cream); }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'Outfit', sans-serif; }

        /* NAV */
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

        /* HAMBURGER */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; z-index: 1000; }
        .hamburger span { display: block; width: 24px; height: 2px; border-radius: 2px; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .hamburger span.light { background: rgba(255,255,255,0.85); }
        .hamburger span.dark { background: var(--navy); }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE MENU DRAWER */
        .mobile-menu { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--navy); z-index: 800; flex-direction: column; justify-content: center; align-items: flex-start; padding: 100px 48px 60px; transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.4,0,0.2,1); }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%); }
        .mobile-menu::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(184,150,90,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,90,0.03) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
        .mob-link { font-family: 'DM Serif Display', serif; font-size: clamp(32px, 8vw, 48px); color: rgba(255,255,255,0.75); text-decoration: none; display: block; margin-bottom: 8px; cursor: pointer; transition: color 0.25s, padding-left 0.3s; position: relative; z-index: 1; border: none; background: none; text-align: left; }
        .mob-link:hover { color: var(--gold-light); padding-left: 8px; }
        .mob-link.active-page { color: var(--gold-light); }
        .mob-divider { width: 40px; height: 1px; background: rgba(184,150,90,0.3); margin: 24px 0; position: relative; z-index: 1; }
        .mob-cta { display: inline-block; background: var(--gold); color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 14px 32px; border-radius: 3px; text-decoration: none; margin-top: 16px; position: relative; z-index: 1; }
        .mob-langs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 32px; position: relative; z-index: 1; }
        .mob-lang { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 1px; color: var(--gold); background: rgba(184,150,90,0.12); border: 1px solid rgba(184,150,90,0.25); padding: 5px 12px; border-radius: 2px; }

        /* HERO */
        .services-hero { min-height: 460px; position: relative; display: flex; align-items: flex-end; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80) center/cover no-repeat; filter: brightness(0.15); }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(14,30,53,0.98) 0%, rgba(26,51,82,0.92) 55%, rgba(14,30,53,0.85) 100%); }
        .hero-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%); }

        /* TABS */
        .tab-bar { display: flex; gap: 0; border-bottom: 2px solid var(--border-soft); margin-bottom: 48px; position: sticky; top: 92px; background: var(--cream); z-index: 100; }
        .tab-btn { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; color: var(--ink-faint); padding: 18px 36px; border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.3s; }
        .tab-btn:hover { color: var(--navy); background: rgba(0,0,0,0.02); }
        .tab-btn.active { color: var(--gold); border-bottom-color: var(--gold); background: var(--gold-pale); }

        /* SECTION LABEL */
        .sec-label { font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .sec-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }

        /* LAYOUT */
        .services-layout { display: grid; grid-template-columns: 260px 1fr; gap: 80px; }
        .sidebar { position: sticky; top: 160px; height: fit-content; }
        .sidebar-link { display: flex; align-items: center; gap: 8px; font-family: 'Outfit', sans-serif; font-size: 11.5px; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; color: var(--ink-faint); padding: 11px 12px; border-left: 2px solid transparent; text-decoration: none; transition: all 0.25s; cursor: pointer; border-radius: 0 4px 4px 0; }
        .sidebar-link:hover { color: var(--gold); border-left-color: var(--gold-light); background: var(--gold-pale); padding-left: 18px; }
        .sidebar-link.active { color: var(--gold); border-left-color: var(--gold); background: var(--gold-pale); font-weight: 600; }
        .sidebar-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; opacity: 0.5; }

        /* SERVICE SECTION */
        .service-section { padding: 72px 0; border-bottom: 1px solid var(--border-soft); }
        .service-section:last-child { border-bottom: none; padding-bottom: 40px; }

        /* HEADINGS */
        .service-heading { font-family: 'DM Serif Display', serif; font-size: clamp(34px, 4vw, 56px); font-weight: 700; color: var(--navy); letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 8px; }
        .heading-num { font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; color: var(--gold); background: var(--gold-pale); padding: 6px 14px; border-radius: 2px; display: inline-block; margin-bottom: 16px; }
        .sub-heading { font-family: 'DM Serif Display', serif; font-size: 26px; font-weight: 700; color: var(--navy); margin-bottom: 14px; margin-top: 48px; letter-spacing: -0.5px; display: flex; align-items: center; gap: 14px; }
        .sub-heading::before { content: ''; display: block; width: 4px; height: 26px; background: var(--gold); border-radius: 2px; flex-shrink: 0; }

        /* BODY TEXT */
        .body-text { font-family: 'Outfit', sans-serif; font-size: 15px; color: var(--ink-soft); line-height: 1.95; font-weight: 300; margin-bottom: 18px; }

        /* INTRO CARD */
        .intro-card { background: var(--navy); border-radius: 4px; padding: 36px 40px; margin-bottom: 36px; position: relative; overflow: hidden; }
        .intro-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); }
        .intro-card::after { content: ''; position: absolute; bottom: -40px; right: -40px; width: 160px; height: 160px; border-radius: 50%; background: rgba(184,150,90,0.06); }
        .intro-card p { font-family: 'Outfit', sans-serif; font-size: 14.5px; color: rgba(255,255,255,0.68); line-height: 1.9; font-weight: 300; }
        .intro-card p + p { margin-top: 14px; }

        /* SERVICES GRID */
        .services-grid-label { font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 24px; margin-top: 48px; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 40px; }
        .service-item { display: flex; align-items: flex-start; gap: 12px; background: #fff; border: 1px solid var(--border-soft); border-radius: 4px; padding: 14px 16px; transition: all 0.3s; }
        .service-item:hover { border-color: var(--border); box-shadow: 0 6px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .service-item-icon { width: 30px; height: 30px; background: var(--gold-pale); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .service-item span { font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--ink); line-height: 1.5; font-weight: 500; }

        /* PROCESS BLOCK */
        .process-block { background: #fff; border: 1px solid var(--border-soft); border-radius: 4px; padding: 32px 36px; margin: 20px 0 8px; position: relative; overflow: hidden; }
        .process-block::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, var(--gold), var(--gold-light)); border-radius: 4px 0 0 4px; }
        .process-block-title { font-family: 'DM Serif Display', serif; font-size: 19px; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
        .process-block p { font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--ink-soft); line-height: 1.9; font-weight: 300; }

        /* HIGHLIGHT QUOTE */
        .highlight-quote { background: linear-gradient(135deg, var(--gold-pale) 0%, #fff 100%); border: 1px solid var(--border); border-radius: 4px; padding: 28px 32px; margin: 36px 0; position: relative; }
        .highlight-quote::before { content: '"'; font-family: 'DM Serif Display', serif; font-size: 80px; color: var(--gold); opacity: 0.2; position: absolute; top: -10px; left: 20px; line-height: 1; }
        .highlight-quote p { font-family: 'DM Serif Display', serif; font-size: 17px; color: var(--navy); line-height: 1.7; font-weight: 400; font-style: italic; padding-left: 12px; }

        /* GOLD RULE */
        .gold-rule { width: 48px; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); display: block; margin-bottom: 32px; border-radius: 2px; }

        /* VALUES TRIO */
        .values-trio { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 32px; }

        /* CTA STRIP */
        .cta-strip { background: var(--gold); padding: 72px 64px; position: relative; overflow: hidden; }
        .cta-strip::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 40px 40px; }

        /* FOOTER */
        .site-footer { background: var(--navy); padding: 32px 64px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid rgba(255,255,255,0.05); }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .f1 { animation: fadeUp 0.9s 0.1s both; }
        .f2 { animation: fadeUp 0.9s 0.25s both; }
        .f3 { animation: fadeUp 0.9s 0.4s both; }


        #property, #buying, #selling, #property-approach,
#immigration, #visa-applications, #immigration-support {
  scroll-margin-top: 160px;
}

@media (max-width: 900px) {
  #property, #buying, #selling, #property-approach,
  #immigration, #visa-applications, #immigration-support {
    scroll-margin-top: 120px;
  }
}

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          /* Nav */
          .topnav, .topnav.scrolled { padding: 10px 24px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .nav-logo { width: 200px !important; height: 66px !important; min-width: 200px !important; min-height: 66px !important; }

          /* Hero */
          .services-hero { min-height: 320px; }
          .hero-inner-pad { padding: 110px 20px 48px !important; }

          /* Tab bar */
          .tab-bar { top: 68px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding: 0 20px; margin-bottom: 32px; }
          .tab-btn { padding: 14px 18px; font-size: 11px; white-space: nowrap; letter-spacing: 1.2px; }

          /* Main pad */
          .main-pad { padding: 0 20px 0 !important; }

          /* Layout: single column, hide sidebar */
          .services-layout { grid-template-columns: 1fr !important; gap: 0 !important; }
          .sidebar { display: none !important; }

          /* Service sections */
          .service-section { padding: 40px 0 !important; }

          /* Heading */
          .service-heading { font-size: clamp(30px, 8vw, 40px) !important; letter-spacing: -1px !important; }
          .sub-heading { font-size: 22px !important; margin-top: 36px !important; }

          /* Intro card */
          .intro-card { padding: 24px 20px !important; margin-bottom: 24px !important; }
          .intro-card p { font-size: 14px !important; }

          /* Highlight quote */
          .highlight-quote { padding: 24px 20px 20px !important; margin: 24px 0 !important; }
          .highlight-quote p { font-size: 15px !important; }

          /* Services grid: single column on mobile */
          .services-grid { grid-template-columns: 1fr !important; gap: 10px !important; margin-bottom: 24px !important; }
          .services-grid-label { font-size: 19px !important; margin-top: 32px !important; margin-bottom: 16px !important; }

          /* Process block */
          .process-block { padding: 20px 18px !important; }
          .process-block-title { font-size: 17px !important; }
          .process-block p { font-size: 13.5px !important; }

          /* Body text */
          .body-text { font-size: 14px !important; }

          /* Values trio: single column on mobile */
          .values-trio { grid-template-columns: 1fr !important; gap: 10px !important; margin-top: 20px !important; }

          /* CTA strip */
          .cta-strip { padding: 48px 20px !important; }

          /* Footer */
          .site-footer { padding: 24px 20px !important; flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>

      {/* MOBILE MENU DRAWER */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="/about" className="mob-link" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/#vision" className="mob-link" onClick={() => setMenuOpen(false)}>Vision</a>
        <a href="/services" className="mob-link active-page">Services</a>
        <a href="/whyus" className="mob-link" onClick={() => setMenuOpen(false)}>Why Us</a>
        <div className="mob-divider" />
        <a href="/contact" className="mob-cta" onClick={() => setMenuOpen(false)}>Contact Us →</a>
        <div className="mob-langs">
          {['Hindi', 'English', 'Kannada', 'Telugu'].map(l => (
            <span key={l} className="mob-lang">{l}</span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav className={`topnav${navScrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-wordmark">
          {/* No inline style — CSS class handles all sizing including mobile */}
          <img src="/logo.png" alt="Veeksha Lawyers Logo" className="nav-logo" />
          <div className={`nav-wordmark-text${navScrolled ? ' dark' : ''}`}></div>
        </a>

        <div className="nav-links">
          {[['About', '/about'], ['Vision', '/#vision'], ['Services', '/services'], ['Why Us', '/whyus']].map(([l, href]) => (
            <a key={l} href={href} className={`nl${navScrolled ? ' dk' : ''}${l === 'Services' ? ' active' : ''}`}>{l}</a>
          ))}
          <a href="/contact" className={`nav-cta${navScrolled ? ' dk' : ''}`}>Contact</a>
        </div>

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

      {/* HERO */}
      <div className="services-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-accent" />
        <div className="hero-inner-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '150px 64px 64px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="f1" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span className="sans" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-light)' }}>Practice Areas</span>
          </div>
          <h1 className="f2 serif" style={{ fontSize: 'clamp(36px, 6vw, 74px)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-2px', marginBottom: '20px' }}>
            Our Legal Services
          </h1>
          <p className="f3 sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: '500px', fontWeight: 300, marginBottom: '32px' }}>
            Expert legal guidance across Property Law and Immigration Law — delivered with clarity, compassion, and results across New South Wales.
          </p>
          <div className="f3" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Property Law', 'Immigration Law', 'NSW Admitted 2014', '4 Languages'].map(tag => (
              <span key={tag} style={{ background: 'rgba(184,150,90,0.2)', border: '1px solid rgba(184,150,90,0.4)', color: 'var(--gold-light)', fontFamily: 'Outfit,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '1px', padding: '6px 14px', borderRadius: '2px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>

        {/* Tab Bar */}
        <div className="tab-bar">
          <button
            className={`tab-btn${['property','buying','selling','property-approach'].includes(activeSection) ? ' active' : ''}`}
            onClick={() => document.getElementById('property')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            01 · Property Law
          </button>
          <button
            className={`tab-btn${['immigration','visa-applications','immigration-support'].includes(activeSection) ? ' active' : ''}`}
            onClick={() => document.getElementById('immigration')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            02 · Immigration Law
          </button>
        </div>

        <div className="services-layout">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sans" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', paddingLeft: '12px' }}>On This Page</div>
           {(
  [
    ['property', 'Property Law', true],
    ['buying', 'Buying Property', false],
    ['selling', 'Selling Property', false],
    ['property-approach', 'Client Approach', false],
    ['immigration', 'Immigration Law', true],
    ['visa-applications', 'Visa Applications', false],
    ['immigration-support', 'Personalised Support', false],
  ] as [string, string, boolean][]
).map(([id, label, isMain]) => (
              <span key={id}
                className={`sidebar-link${activeSection === id ? ' active' : ''}`}
                style={{ fontWeight: isMain ? 600 : 400, marginTop: isMain ? '8px' : '0', fontSize: isMain ? '11.5px' : '11px' }}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="sidebar-dot" />
                {label}
              </span>
            ))}

            <div style={{ marginTop: '32px', background: 'var(--navy)', padding: '28px', borderRadius: '4px', borderTop: '3px solid var(--gold)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(184,150,90,0.08)' }} />
              <div className="sans" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px' }}>Need Advice?</div>
              <p className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '20px', fontWeight: 300 }}>Book a consultation with our principal solicitor today.</p>
              <a href="/contact" style={{ display: 'block', background: 'var(--gold)', color: '#fff', padding: '12px 16px', textAlign: 'center', fontFamily: 'Outfit,sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}>
                Contact Us →
              </a>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main>

            {/* PROPERTY LAW */}
            <section id="property" className="service-section">
              <div className="heading-num">Practice Area 01</div>
              <h2 className="service-heading">Property Law</h2>
              <span className="gold-rule" />
              <div className="intro-card">
                <p>Property transactions are often among the most significant financial decisions individuals make. At our firm, we provide <strong style={{ color: 'var(--gold-light)', fontWeight: 600 }}>clear, practical, and reliable legal advice</strong> to guide clients through every stage of property transactions in New South Wales.</p>
                <p>Our team has extensive experience assisting clients with residential and investment property matters. Whether you are buying your first home, selling property, investing in real estate, or transferring ownership, we ensure the process is <strong style={{ color: 'var(--gold-light)', fontWeight: 600 }}>smooth, compliant, and completed with confidence.</strong></p>
                <p>We understand that property transactions can be complex and time-sensitive. Our client-focused approach ensures prompt communication, careful attention to detail, and practical solutions tailored to your specific circumstances.</p>
              </div>
              <div className="highlight-quote">
                <p>Our firm is committed to making every property transaction as seamless and stress-free as possible — protecting your legal and financial interests at every step.</p>
              </div>
              <div className="services-grid-label">Our Property Law Services</div>
              <p className="body-text" style={{ marginBottom: '16px' }}>We assist clients with a wide range of property-related matters, including:</p>
              <div className="services-grid">
                {['Buying and selling residential property','Contract review and advice','Property transfers between family members','Off-the-plan purchases','Strata title transactions','Title searches and due diligence','Settlement and conveyancing services'].map(item => (
                  <div key={item} className="service-item">
                    <div className="service-item-icon"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#B8965A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div id="buying">
                <h3 className="sub-heading">Buying Property</h3>
                <div className="process-block">
                  <div className="process-block-title">How We Help You Buy</div>
                  <p>Purchasing property involves important legal and financial considerations. Our team carefully reviews contracts, identifies potential risks, and advises you before you commit to the purchase. We guide you through the entire process — from contract exchange to settlement — to ensure your interests are fully protected.</p>
                </div>
              </div>
              <div id="selling">
                <h3 className="sub-heading">Selling Property</h3>
                <div className="process-block">
                  <div className="process-block-title">How We Help You Sell</div>
                  <p>When selling property, it is essential to have legally compliant documentation and a smooth settlement process. We assist with preparing contracts for sale, liaising with agents and financial institutions, and managing settlement efficiently from start to finish.</p>
                </div>
              </div>
              <div id="property-approach">
                <h3 className="sub-heading">Client-Focused Approach</h3>
                <p className="body-text">We pride ourselves on providing legal services that are <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>professional, responsive, and compassionate.</strong> Our goal is to make property transactions as straightforward and stress-free as possible while protecting our clients' legal and financial interests at every stage.</p>
              </div>
            </section>

            {/* IMMIGRATION LAW */}
            <section id="immigration" className="service-section">
              <div className="heading-num">Practice Area 02</div>
              <h2 className="service-heading">Immigration Law</h2>
              <span className="gold-rule" />
              <div className="intro-card">
                <p>Navigating Australia's immigration system can be complex and time-sensitive. Our firm provides <strong style={{ color: 'var(--gold-light)', fontWeight: 600 }}>clear, reliable, and practical legal advice</strong> to individuals, families, and businesses seeking immigration assistance.</p>
                <p>With a strong understanding of Australian immigration laws and procedures, we assist clients with a wide range of visa and migration matters. Whether you are planning to study, work, reunite with family, or settle permanently in Australia, we provide <strong style={{ color: 'var(--gold-light)', fontWeight: 600 }}>personalised legal solutions</strong> tailored to your circumstances.</p>
                <p>We understand that immigration matters can significantly impact people's lives and futures. Our client-focused approach ensures that every matter is handled with compassion, efficiency, and transparency while keeping clients fully informed.</p>
              </div>
              <div className="highlight-quote">
                <p>Every immigration matter is unique. We take time to understand your goals and circumstances to provide tailored advice and practical strategies designed to achieve the best possible outcome for your migration journey.</p>
              </div>
              <div className="services-grid-label">Our Immigration Law Services</div>
              <p className="body-text" style={{ marginBottom: '16px' }}>Our firm provides assistance with various immigration matters, including:</p>
              <div className="services-grid">
                {['Student visas','Partner and family visas','Skilled migration visas','Employer-sponsored visas','Visitor visas','Permanent residency applications','Citizenship applications'].map(item => (
                  <div key={item} className="service-item">
                    <div className="service-item-icon"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#B8965A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div id="visa-applications">
                <h3 className="sub-heading">Visa Applications</h3>
                <div className="process-block">
                  <div className="process-block-title">Preparing Your Application</div>
                  <p>Preparing a visa application requires careful documentation and strict compliance with immigration requirements. We assist clients in preparing accurate and complete applications, ensuring that all necessary supporting documents are properly presented to maximise the chances of a successful outcome.</p>
                </div>
              </div>
              <div id="immigration-support">
                <h3 className="sub-heading">Personalised Legal Support</h3>
                <p className="body-text">Every immigration matter is unique. Our firm takes the time to understand each client's goals and circumstances to provide tailored advice and practical strategies. We are committed to delivering <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>responsive, professional, and compassionate service</strong> to help clients achieve the best possible outcome for their migration journey.</p>
                <div className="values-trio">
                  {[['Compassionate','Every client matters deeply to us.'],['Transparent','Clear guidance at every stage.'],['Results-Driven','Committed to your best outcome.']].map(([title, desc]) => (
                    <div key={title} style={{ background: '#fff', border: '1px solid var(--border-soft)', borderTop: '3px solid var(--gold)', borderRadius: '2px', padding: '20px 18px' }}>
                      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>{title}</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12.5px', color: 'var(--ink-faint)', lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* CTA + FOOTER */}
      <div style={{ marginTop: '80px' }}>
        <section className="cta-strip">
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', position: 'relative', zIndex: 2 }}>
            <div>
              <div className="sans" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}>Get in Touch</div>
              <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '8px' }}>
                Ready to Discuss<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>Your Matter?</em>
              </h2>
              <p className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Serving NSW · English · Hindi · Kannada · Telugu</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--navy)', color: '#fff', padding: '16px 36px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
                Email Us Today →
              </a>
              <div className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>shrunga@veekshalawyers.com.au</div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <span className="sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>© 2026 Veeksha Lawyers & Consultancy Pty Ltd · NSW, Australia</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ display: 'block', width: '20px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
            <span className="sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>All rights reserved</span>
          </div>
        </footer>
      </div>

    </div>
  )
}