'use client'
import { useState, useEffect, useRef } from 'react'

export default function VeekshaLawyers() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  setMenuOpen(false)
}

  const navScrolled = scrollY > 60

  return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: '#FAFAF8', color: '#1C1C1C', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        :root {
          --gold: #B8965A;
          --gold-light: #D4AF7A;
          --gold-pale: #F5EDD8;
          --navy: #0E1E35;
          --navy-mid: #1A3352;
          --ink: #1C1C1C;
          --ink-soft: #5A5A5A;
          --ink-faint: #9A9A9A;
          --cream: #FAFAF8;
          --cream-mid: #F2F0EB;
          --white: #FFFFFF;
          --border: rgba(184,150,90,0.18);
          --border-soft: rgba(0,0,0,0.08);
        }

        body { background: var(--cream); }

        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'Outfit', sans-serif; }

        /* TOP NAV */
        .topnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 900;
          padding: 12px 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .topnav.scrolled {
          padding: 8px 64px;
          background: #12243C;
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border-soft);
          box-shadow: 0 1px 32px rgba(0,0,0,0.06);
        }

        .nav-wordmark {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .nav-wordmark:hover { opacity: 0.85; }

        .nav-logo {
          width: 300px;
          height: 80px;
          min-width: 300px;
          min-height: 80px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .topnav.scrolled .nav-logo {
          width: 56px;
          height: 56px;
          min-width: 56px;
          min-height: 56px;
        }

        .nav-wordmark-text {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #fff;
          letter-spacing: 0.3px;
          transition: color 0.4s;
          line-height: 1.2;
        }
        .nav-wordmark-text.dark { color: var(--navy); }
        .nav-wordmark-text sub {
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-top: 2px;
          color: rgba(255,255,255,0.5);
          transition: color 0.4s;
        }
        .nav-wordmark-text.dark sub { color: var(--gold); }

        .nav-links { display: flex; gap: 40px; align-items: center; }
        .nl { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.25s; cursor: pointer; }
        .nl:hover { color: #fff; }
        .nl.dk { 
  color: rgba(255,255,255,0.7); 
}
        .nl.dk:hover { color: #fff; }
        .nav-cta {
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 10px 26px; border-radius: 4px; text-decoration: none; transition: all 0.3s;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #fff;
          backdrop-filter: blur(8px);
        }
        .nav-cta:hover { background: rgba(255,255,255,0.25); }
        .nav-cta.dk { background: var(--gold); border-color: var(--gold); color: #fff; }
        .nav-cta.dk:hover { background: var(--gold-light); }

        /* SECTION HEADER */
        .sec-label {
          font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase; color: var(--gold);
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .sec-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }

        /* CARDS */
        .svc-card {
          background: var(--white); border: 1px solid var(--border-soft);
          border-radius: 2px; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          text-decoration: none; color: inherit; display: block;
        }
        .svc-card:hover { box-shadow: 0 24px 64px rgba(0,0,0,0.09); transform: translateY(-4px); border-color: var(--border); }

        .why-row {
          display: flex; gap: 20px; padding: 28px 0;
          border-bottom: 1px solid var(--border-soft);
          transition: all 0.3s;
        }
        .why-row:last-child { border-bottom: none; }
        .why-num {
          font-family: 'DM Serif Display', serif; font-size: 13px; color: var(--gold);
          min-width: 36px; padding-top: 3px; letter-spacing: 1px;
        }

        /* STAT */
        .stat-item { text-align: center; }
        .stat-num { font-family: 'DM Serif Display', serif; font-size: 52px; color: #fff; line-height: 1; }
        .stat-sub { font-family: 'Outfit', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-top: 8px; }

        /* PILL TAGS */
        .tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--gold-pale); border-radius: 2px;
          padding: 6px 14px; font-family: 'Outfit',sans-serif;
          font-size: 11px; font-weight: 500; color: #7A5C2A; letter-spacing: 0.5px;
        }

        /* CHECK ITEM */
        .check-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; }
        .check-dot { width: 18px; height: 18px; border: 1.5px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .f1 { animation: fadeUp 0.9s 0.1s both; }
        .f2 { animation: fadeUp 0.9s 0.25s both; }
        .f3 { animation: fadeUp 0.9s 0.4s both; }
        .f4 { animation: fadeUp 0.9s 0.55s both; }
        .f5 { animation: fadeUp 0.9s 0.7s both; }
        .fi { animation: fadeIn 1.2s 0.3s both; }

        /* DIVIDER */
        .gold-rule { width: 48px; height: 2px; background: var(--gold); display: block; }

        /* HOVER ARROW */
        .arrow-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Outfit',sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold);
          text-decoration: none; transition: gap 0.3s;
        }
        .arrow-link:hover { gap: 16px; }

        /* HAMBURGER */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; z-index: 1000; }
        .hamburger span { display: block; width: 24px; height: 2px; border-radius: 2px; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .hamburger span.light { background: rgba(255,255,255,0.85); }
        .hamburger span.dark { background: #fff; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE MENU DRAWER */
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

        @media (max-width: 900px) {
  .about-img-wrap { width: 75% !important; margin: 0 auto !important; }
  .about-img-wrap img { height: 380px !important; }
}

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .topnav, .topnav.scrolled { padding: 10px 24px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .nav-logo { width: 56px !important; height: 56px !important; }
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-right-col { display: none !important; }
          .two-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; }
          .section-pad { padding: 72px 24px !important; }
          .hero-text { padding: 130px 24px 80px !important; }
        }
      `}</style>

      {/* ─── MOBILE MENU DRAWER ─── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mob-link" onClick={() => scrollTo('about')}>About</button>
        <button className="mob-link" onClick={() => scrollTo('vision')}>Vision</button>
        <a href="/services" className="mob-link">Services</a>
        <a href="/whyus" className="mob-link">Why Us</a>
        <div className="mob-divider" />
        <a href="/contact" className="mob-cta">Contact Us →</a>
        <div className="mob-langs">
          {[' English', 'Hindi', 'Kannada', 'Telugu'].map(l => (
            <span key={l} className="mob-lang">{l}</span>
          ))}
        </div>
      </div>

      {/* ─── NAV ─── */}
      <nav className={`topnav${navScrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-wordmark">
          <img
            src="/logo.png"
            alt="Veeksha Lawyers Logo"
            className="nav-logo"
            style={{ width: '300px', height: '80px', minWidth: '300px', minHeight: '80px', objectFit: 'contain', display: 'block' }}
          />
          <div className={`nav-wordmark-text${navScrolled ? ' dark' : ''}`}>
            <sub></sub>
          </div>
        </a>

        <div className="nav-links">
          {[['About', 'about'], ['Vision', 'vision']].map(([l, id]) => (
  <span key={id} className={`nl${navScrolled ? ' dk' : ''}`} onClick={() => scrollTo(id)}>{l}</span>
))}
<a href="/services" className={`nl${navScrolled ? ' dk' : ''}`} style={{ textDecoration: 'none' }}>Services</a>
<a href="/whyus" className={`nl${navScrolled ? ' dk' : ''}`} style={{ textDecoration: 'none' }}>Why Us</a>
          <a href="/contact" className={`nav-cta${navScrolled ? ' dk' : ''}`}>Contact</a>
        </div>

        

        {/* Hamburger */}
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

      {/* ─── HERO ─── */}
      <section id="hero" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80) center/cover no-repeat', filter: 'brightness(0.18)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(14,30,53,0.98) 0%, rgba(26,51,82,0.92) 55%, rgba(14,30,53,0.85) 100%)' }} />
        {/* Gold accent line */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(180deg, transparent 5%, var(--gold) 30%, var(--gold-light) 70%, transparent 95%)' }} />

        <div className="hero-text" style={{ maxWidth: '1280px', margin: '0 auto', padding: '140px 64px 80px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="hero-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '80px', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div className="f1" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold)' }} />
                <span className="sans" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-light)' }}>NSW Legal Experts · Since 2014</span>
              </div>

              <h1 className="f2 serif" style={{ fontSize: 'clamp(52px, 7.5vw, 96px)', fontWeight: 400, color: '#fff', lineHeight: 0.95, letterSpacing: '-2px', marginBottom: '32px' }}>
                Your Rights.<br />
                <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Our Resolve.</em>
              </h1>

              <p className="f3 sans" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, maxWidth: '440px', marginBottom: '48px', fontWeight: 300 }}>
                Veeksha Lawyers & Consultancy Pty Ltd delivers expert <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Property Law</strong> and <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Immigration Law</strong> services across New South Wales — with clarity, compassion, and results.
              </p>

              <div className="f4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '72px' }}>
                <span onClick={() => scrollTo('services')} style={{ background: 'var(--gold)', color: '#fff', padding: '14px 32px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}>
                  Our Services →
                </span>
                <span onClick={() => scrollTo('about')} style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)', padding: '14px 32px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}>
                  Meet the Solicitor
                </span>
              </div>

              {/* Stats */}
              <div className="f5 stats-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', gap: '32px' }}>
                {[['10+', 'Years in NSW'], ['500+', 'Cases Settled'], ['4', 'Languages'], ['98%', 'Satisfaction']].map(([n, l]) => (
                  <div key={l} className="stat-item">
                    <div className="stat-num">{n}</div>
                    <div className="stat-sub">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Profile card */}
            <div className="hero-right-col fi" style={{ position: 'relative' }}>
              {/* <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(184,150,90,0.3)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
                <img src="/profilepic.jpeg" alt="Principal Solicitor" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)' }} />
                <div style={{ background: 'var(--navy)', padding: '24px 28px', borderTop: '2px solid var(--gold)' }}>
                  <div className="sans" style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Principal Solicitor</div>
                  <div className="serif" style={{ fontSize: '20px', color: '#fff', lineHeight: 1.2 }}>Shrunga Hosur<br />Krishnamurthy</div>
                  <div className="sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '6px', fontWeight: 300 }}>LLB · MBA · Admitted NSW 2014</div>
                </div>
              </div> */}
              {/* Credential badge */}
              {/* <div style={{ position: 'absolute', top: '-12px', right: '-12px', background: 'var(--gold)', borderRadius: '2px', padding: '12px 16px', boxShadow: '0 8px 24px rgba(184,150,90,0.35)' }}>
                <div className="serif" style={{ fontSize: '16px', color: '#fff', lineHeight: 1 }}>NSW</div>
                <div className="sans" style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Certified</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-pad" style={{ padding: '112px 64px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          <div className="two-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Image side */}
           
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="about-img-wrap" style={{ borderRadius: '2px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.1)', width: '75%' }}>
                    <img src="profilepic.jpeg" alt="Principal Solicitor" style={{ width: '100%', height: '500px', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                </div>


              {/* Languages */}
              {/* <div style={{ position: 'absolute', bottom: '-24px', right: '-24px', background: '#fff', border: '1px solid var(--border-soft)', borderLeft: '3px solid var(--gold)', padding: '24px 28px', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', minWidth: '220px' }}>
                <div className="sans" style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>Languages Spoken</div>
                {['Hindi', 'English', 'Kannada', 'Telugu'].map(lang => (
                  <div key={lang} className="sans" style={{ fontSize: '13px', color: 'var(--ink-soft)', padding: '5px 0', borderBottom: '1px solid var(--border-soft)' }}>{lang}</div>
                ))}
              </div> */}
            </div>

            {/* Text side */}
            <div style={{ paddingRight: '20px' }}>
              <div className="sec-label">Meet Our Founder</div>
              <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '8px' }}>
                Shrunga Hosur<br />Krishnamurthy
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', marginTop: '12px' }}>
                <span className="gold-rule" />
                <span
  className="sans"
  style={{
    fontSize: '14px',
    background: 'var(--gold)',
    color: '#fff',
    fontWeight: 900,
    padding: '6px 14px',
    borderRadius: '4px'
  }}
>
  Principal Solicitor
</span>
              </div>

              <p className="sans" style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.9, marginBottom: '18px', fontWeight: 300 }}>
                <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>The Principal Solicitor</strong>  brings an extensive, internationally diverse legal background. After completing a <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>law degree and MBA in India</strong>, she moved to Australia and has been admitted to practice in New South Wales since 2014.
              </p>
              <p className="sans" style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.9, marginBottom: '18px', fontWeight: 300 }}>
                With deep expertise in <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>property law and immigration law</strong>, she is recognised for being <em>responsive, compassionate, and efficient</em> — delivering clear, practical guidance to every client.
              </p>
              <p className="sans" style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.9, marginBottom: '40px', fontWeight: 300 }}>
                Her fluency in <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>English, Hindi, Kannada, and Telugu</strong> enables her to serve diverse communities across NSW with ease and confidence.
              </p>

              {/* Credentials */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['LLB — India', 'MBA — India', 'Admitted NSW 2014', 'Multi-lingual'].map(c => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISION ─── */}
      <section id="vision" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        {/* subtle pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(184,150,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,90,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, width: '40%', height: '100%', background: 'linear-gradient(270deg, rgba(184,150,90,0.04) 0%, transparent 100%)' }} />

        <div className="section-pad" style={{ maxWidth: '1280px', margin: '0 auto', padding: '112px 64px', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold)' }} />
              <span className="sans" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>Our Purpose</span>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--gold)' }} />
            </div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,58px)', fontWeight: 400, color: '#fff', letterSpacing: '-1px' }}>Vision & Mission</h2>
          </div>

          <div className="two-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '64px' }}>
            {[
              { label: 'Vision', title: 'What We Stand For', text: 'To be the most trusted legal partner for individuals, families, and businesses across New South Wales — delivering accessible, compassionate, and results-driven legal services that empower clients to make confident, informed decisions.' },
              { label: 'Mission', title: 'How We Work', text: 'To provide clear, practical, and reliable legal advice with professionalism and genuine care — guiding clients through complex legal matters with transparency, efficiency, and an unwavering commitment to their best outcomes.' }
            ].map(({ label, title, text }, i) => (
              <div key={label} style={{ background: i === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(184,150,90,0.08)', border: '1px solid rgba(255,255,255,0.07)', padding: '52px 48px', borderLeft: i === 0 ? '3px solid var(--gold)' : '3px solid var(--gold-light)' }}>
                <div className="sans" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>{label}</div>
                <h3 className="serif" style={{ fontSize: '28px', fontWeight: 400, color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>{title}</h3>
                <p className="sans" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, fontWeight: 300 }}>{text}</p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {[['Compassion', 'Every client matters deeply to us.'], ['Integrity', 'Transparent at every step.'], ['Excellence', 'Results that exceed expectations.'], ['Inclusion', 'Serving all communities.']].map(([title, sub]) => (
              <div key={title} style={{ borderTop: '1px solid rgba(184,150,90,0.3)', paddingTop: '24px' }}>
                <div className="serif" style={{ fontSize: '22px', color: '#fff', marginBottom: '8px' }}>{title}</div>
                <div className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* ─── SERVICES ─── */}
      <section id="services" className="section-pad" style={{ padding: '112px 64px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <div className="sec-label">Practice Areas</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-1px', maxWidth: '520px', lineHeight: 1.1 }}>Legal Services We Offer</h2>
          </div>

          <div className="two-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {[
              {
                img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80',
                num: '01', label: 'Property Law',
                href: '/services#property',
                desc: 'Comprehensive legal guidance for all your property needs across New South Wales — from contract review to settlement.',
                items: ['Buying & selling residential property', 'Contract review and advice', 'Conveyancing & settlement services', 'Off-the-plan & strata title purchases', 'Property transfers between family', 'Title searches and due diligence']
              },
              {
                img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80',
                num: '02', label: 'Immigration Law',
                href: '/services#immigration',
                desc: "Expert immigration assistance for individuals, families, and businesses navigating Australia's visa and migration system.",
                items: ['Student & partner visas', 'Skilled migration visas', 'Employer-sponsored visas', 'Visitor visas', 'Permanent residency applications', 'Citizenship applications']
              }
            ].map(({ img, num, label, desc, items, href }) => (
              <div key={label} className="svc-card" onClick={() => window.location.href = href} style={{ cursor: 'pointer' }}>
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', filter: 'grayscale(10%)' }}
                   onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'scale(1.04)'
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'scale(1)'
}}/>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(14,30,53,0.75) 100%)' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--gold)', color: '#fff', fontFamily: 'Outfit,sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', padding: '5px 12px', borderRadius: '2px' }}>0{num}</div>
                </div>
                <div style={{ padding: '36px 40px 40px' }}>
                  <h3 className="serif" style={{ fontSize: '28px', fontWeight: 400, color: 'var(--navy)', marginBottom: '14px', letterSpacing: '-0.3px' }}>{label}</h3>
                  <p className="sans" style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '28px', fontWeight: 300 }}>{desc}</p>
                  <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '24px' }}>
                    {items.map(item => (
                      <div key={item} className="check-item">
                        <div className="check-dot">
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M1 3L3 5L7 1" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="sans" style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.5, fontWeight: 400 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '28px' }}>
                    <a href={href} className="arrow-link" onClick={(e) => e.stopPropagation()}>Learn More <span>→</span></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section id="why" className="section-pad" style={{ padding: '112px 64px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="two-grid" style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '96px', alignItems: 'start' }}>

            {/* Sticky left */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="sec-label">Why Choose Us</div>
              <h2 className="serif" style={{ fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '24px' }}>
                The Veeksha<br />Difference
              </h2>
              <p className="sans" style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.85, marginBottom: '36px', fontWeight: 300 }}>
                What makes us the trusted choice for clients across New South Wales — quality, care, and consistency.
              </p>
              <a href="mailto:contact@veekshalawyers.com.au" className="arrow-link">Book a Consultation →</a>
            </div>

            {/* Right: list */}
            <div>
              {[
                ['01', 'Compassionate Counsel', 'We handle every case with genuine empathy, understanding the deep personal impact legal matters have on your life and family.'],
                ['02', 'Always Responsive', 'Prompt communication and timely updates ensure you are always informed, never left wondering about the progress of your matter.'],
                ['03', 'Decade of Experience', 'Over ten years of NSW legal practice with deep expertise in property transactions and immigration matters of all complexity levels.'],
                ['04', 'Tailored Strategy', 'Every approach is crafted specifically for your unique circumstances and goals — we never offer cookie-cutter legal advice.'],
                ['05', 'Multi-lingual Service', 'Fluent in Hindi, English, Kannada, and Telugu — we bridge language barriers to serve diverse communities across NSW.'],
                ['06', 'Results Focused', 'We combine rigorous legal standards with a practical, outcome-focused approach to consistently deliver for our clients.'],
              ].map(([num, title, desc]) => (
                <div key={num} className="why-row">
                  <div className="why-num">{num}</div>
                  <div style={{ flex: 1 }}>
                    <h4 className="serif" style={{ fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '8px' }}>{title}</h4>
                    <p className="sans" style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.8, fontWeight: 300 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section style={{ background: 'var(--gold)', padding: '80px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', position: 'relative', zIndex: 2 }}>
          <div>
            <div className="sans" style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}>Get in Touch</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 400, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '8px' }}>
              Ready to Discuss<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>Your Matter?</em>
            </h2>
            <p className="sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Serving NSW · English · Hindi · Kannada · Telugu</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:contact@veekshalawyers.com.au" style={{ background: 'var(--navy)', color: '#fff', padding: '16px 40px', borderRadius: '3px', fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#0d1a2e'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}>
              Email Us Today →
            </a>
            <div className="sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>contact@veekshalawyers.com.au</div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
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