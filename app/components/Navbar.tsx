"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [hoveredIdx,  setHoveredIdx]  = useState<number | null>(null);
  const [pillStyle,   setPillStyle]   = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs      = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef        = useRef<HTMLDivElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Animated hover pill */
  const movePill = (idx: number) => {
    const el = linkRefs.current[idx];
    const nav = navRef.current;
    if (!el || !nav) return;
    const eRect  = el.getBoundingClientRect();
    const nRect  = nav.getBoundingClientRect();
    setPillStyle({ left: eRect.left - nRect.left, width: eRect.width, opacity: 1 });
    setHoveredIdx(idx);
  };
  const hidePill = () => { setPillStyle(p => ({ ...p, opacity: 0 })); setHoveredIdx(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Root vars ─── */
        :root {
          --gold: #c9a96e;
          --gold-dim: rgba(201,169,110,0.18);
          --nav-h: 68px;
        }

        /* ─── Wrapper ─── */
        .nb-wrap {
         position: static;
          top:0; left: 0; right: 0;
          z-index: 200;
          transition: padding 0.4s ease;
        }

        /* Floating pill shape when scrolled */
        .nb-wrap.scrolled {
          padding: 12px 24px;
        }

        /* ─── The bar ─── */
        .nb-bar {
          max-width: 1200px;
          margin: 0 auto;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 28px;
          border-radius: 0;
          background: rgba(8,8,8,0.55);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          transition:
            border-radius 0.4s ease,
            background    0.4s ease,
            border        0.4s ease,
            box-shadow    0.4s ease;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: visible;
        }

        .nb-wrap.scrolled .nb-bar {
          border-radius: 16px;
          background: rgba(10,10,10,0.82);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.5),
            0 1px 0 rgba(255,255,255,0.04) inset;
        }

        /* ─── Logo ─── */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          flex-shrink: 0;
          position: relative;
        }

        .nb-logo-img {
          height: 34px;
          width: auto;
          display: block;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nb-logo:hover .nb-logo-img {
          transform: scale(1.05);
          opacity: 0.85;
        }

        .nb-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 1.22rem;
          color: #fff;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nb-logo:hover .nb-logo-text { color: #e2c99a; }

        /* ─── Desktop links container (relative for pill) ─── */
        .nb-links-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        /* Hover pill */
        .nb-pill {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.07);
          pointer-events: none;
          transition:
            left   0.3s cubic-bezier(0.34,1.56,0.64,1),
            width  0.3s cubic-bezier(0.34,1.56,0.64,1),
            opacity 0.2s ease;
        }

        /* Nav link */
        .nb-link {
          position: relative;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 14px;
          border-radius: 8px;
          transition: color 0.2s ease;
          white-space: nowrap;
          z-index: 1;
        }
        .nb-link:hover { color: #fff; }
        .nb-link.active { color: #fff; }

        /* Gold dot under active link */
        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--gold);
        }

        /* ─── Right side ─── */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* Status dot */
        .nb-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .nb-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
          animation: pulse-green 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }

        /* CTA button */
        .nb-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: #000;
          text-decoration: none;
          padding: 9px 20px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .nb-cta:hover {
          background: #e2c99a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201,169,110,0.35);
        }
        .nb-cta svg { transition: transform 0.2s; }
        .nb-cta:hover svg { transform: translateX(3px); }

        /* ─── Hamburger ─── */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          cursor: pointer;
        }
        .nb-hamburger span {
          display: block;
          width: 20px; height: 1.5px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s;
        }
        .nb-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nb-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ─── Mobile drawer ─── */
        .nb-drawer {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 190;
          display: flex;
          flex-direction: column;
          background: rgba(5,5,5,0.97);
          backdrop-filter: blur(24px);
          padding: 100px 32px 40px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-drawer.open { transform: translateX(0); }

        .nb-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 0.2s, padding-left 0.25s;
        }
        .nb-drawer-link:hover, .nb-drawer-link.active {
          color: #fff;
          padding-left: 8px;
        }
        .nb-drawer-link.active { color: var(--gold); }
        .nb-drawer-link-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .nb-drawer-arrow {
          color: rgba(255,255,255,0.15);
          font-size: 1.2rem;
          transition: transform 0.2s, color 0.2s;
        }
        .nb-drawer-link:hover .nb-drawer-arrow {
          transform: translateX(6px);
          color: var(--gold);
        }

        .nb-drawer-cta {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .nb-drawer-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--gold);
          color: #000;
          text-decoration: none;
          padding: 16px;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.03em;
        }
        .nb-drawer-footer {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.18);
          text-align: center;
          letter-spacing: 0.08em;
        }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .nb-status { display: none !important; }
        }
        @media (max-width: 767px) {
          .nb-links-wrap { display: none !important; }
          .nb-cta         { display: none !important; }
          .nb-hamburger   { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nb-drawer { display: none !important; }
        }
      `}</style>

      {/* Spacer so page content isn't hidden under fixed nav */}
      <div style={{ height: "var(--nav-h)" }} />

      {/* ── Navbar ── */}
      <header className={`nb-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="nb-bar" ref={navRef}>

          {/* Logo */}
          <Link href="/" className="nb-logo">
            <Image
              src="/logo.png"
              alt="Consultant Logo"
              height={34}
              width={120}
              className="nb-logo-img"
              style={{ width: "auto", height: "70px" }}
              priority
            />
          </Link>

          {/* Desktop links with animated hover pill */}
          <div
            className="nb-links-wrap"
            onMouseLeave={hidePill}
          >
            {/* Sliding pill */}
            <div
              className="nb-pill"
              style={{
                left:    pillStyle.left,
                width:   pillStyle.width,
                opacity: pillStyle.opacity,
              }}
            />

            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                className={`nb-link${pathname === link.href ? " active" : ""}`}
                onMouseEnter={() => movePill(i)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="nb-right">
            {/* Availability status */}
            <div className="nb-status">
              <div className="nb-status-dot" />
              Available for projects
            </div>

            {/* CTA */}
            <Link href="/contact" className="nb-cta">
              Get in Touch
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className={`nb-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <div className={`nb-drawer${menuOpen ? " open" : ""}`}>
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nb-drawer-link${pathname === link.href ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <div>
              <div className="nb-drawer-link-num">{String(i + 1).padStart(2, "0")}</div>
              {link.label}
            </div>
            <span className="nb-drawer-arrow">→</span>
          </Link>
        ))}

        <div className="nb-drawer-cta">
          <Link href="/contact" className="nb-drawer-cta-btn" onClick={() => setMenuOpen(false)}>
            Get in Touch →
          </Link>
          <p className="nb-drawer-footer">© 2026 CONSULTANT · ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </>
  );
}