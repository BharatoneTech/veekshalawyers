"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const services = [
  {
    id: "business-strategy",
    number: "01",
    title: "Business Strategy",
    tagline: "Direction with precision.",
    description:
      "We architect long-term roadmaps that align your vision with market realities — from competitive positioning to growth planning that compounds over time.",
    highlights: ["Market Analysis", "Competitive Positioning", "Growth Roadmaps", "KPI Frameworks"],
    href: "/services/business-strategy",
    accent: "#c9a96e",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85&fit=crop",
    imageAlt: "Business strategy meeting",
  },
  {
    id: "financial-advisory",
    number: "02",
    title: "Financial Advisory",
    tagline: "Numbers that tell a story.",
    description:
      "From cash flow optimization to investor readiness, we transform your financials into a strategic weapon for confident, high-stakes decisions.",
    highlights: ["Cash Flow Optimization", "Investor Readiness", "Financial Modeling", "Risk Management"],
    href: "/services/financial-advisory",
    accent: "#7eb8a4",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&fit=crop",
    imageAlt: "Financial charts and analysis",
  },
  {
    id: "operations",
    number: "03",
    title: "Operations & Scale",
    tagline: "Efficiency at every level.",
    description:
      "We identify bottlenecks, streamline workflows, and build the operational infrastructure needed to scale without chaos — from 10 to 1000.",
    highlights: ["Process Mapping", "Team Structuring", "Tech Stack Review", "Scalability Planning"],
    href: "/services/operations",
    accent: "#a09bcf",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=85&fit=crop",
    imageAlt: "Operations and team workspace",
  },
  {
    id: "market-expansion",
    number: "04",
    title: "Market Expansion",
    tagline: "New markets, real traction.",
    description:
      "Whether entering a new geography or launching a new product line, we guide every step — minimizing risk and maximizing impact from day one.",
    highlights: ["GTM Strategy", "Audience Research", "Partnership Development", "Launch Planning"],
    href: "/services/market-expansion",
    accent: "#c97a6e",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&q=85&fit=crop",
    imageAlt: "Global market expansion",
  },
  {
    id: "executive-coaching",
    number: "05",
    title: "Executive Coaching",
    tagline: "Lead with clarity and confidence.",
    description:
      "Our coaching programs are tailored for founders and executives navigating high-stakes decisions, pivotal transitions, and accelerated growth.",
    highlights: ["Leadership Assessment", "Decision Frameworks", "Communication Skills", "1:1 Coaching"],
    href: "/services/executive-coaching",
    accent: "#6eafc9",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&fit=crop",
    imageAlt: "Executive coaching session",
  },
];

const AUTO_INTERVAL = 4500;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean[]>(services.map(() => false));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((next: number) => {
    setPrev(active);
    setActive(next);
    progressRef.current = 0;
    setProgress(0);
    lastTsRef.current = null;
    setTimeout(() => setPrev(null), 700);
  }, [active]);

  const manualGo = useCallback((next: number) => {
    setIsPaused(true);
    goTo(next);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setIsPaused(false), 8000);
  }, [goTo]);

  useEffect(() => {
    if (!visible || isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      progressRef.current = Math.min(progressRef.current + delta / AUTO_INTERVAL, 1);
      setProgress(progressRef.current);
      if (progressRef.current >= 1) {
        goTo((active + 1) % services.length);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible, isPaused, active, goTo]);

  const svc = services[active];
  const prevSvc = prev !== null ? services[prev] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ═══════════════════════════════════
           ROOT
        ═══════════════════════════════════ */
        .sv {
          position: relative;
          min-height: 100vh;
          background: #070707;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ═══════════════════════════════════
           FULL-BLEED IMAGE BACKGROUND STACK
        ═══════════════════════════════════ */
        .sv-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .sv-bg-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center right;
          transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1);
        }
        .sv-bg-img.visible { opacity: 1; }
        .sv-bg-img.hidden  { opacity: 0; }

        /* Multi-layer overlay: left solid → right fades + top/bottom vignette */
        .sv-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right,
              #070707 0%,
              #070707 38%,
              rgba(7,7,7,0.82) 52%,
              rgba(7,7,7,0.45) 68%,
              rgba(7,7,7,0.2) 100%
            ),
            linear-gradient(to bottom,
              rgba(7,7,7,0.5) 0%,
              transparent 20%,
              transparent 80%,
              rgba(7,7,7,0.7) 100%
            );
        }

        /* ═══════════════════════════════════
           LAYOUT GRID
        ═══════════════════════════════════ */
        .sv-layout {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 560px 1fr;
          grid-template-rows: auto 1fr auto;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 0 48px;
          gap: 0;
        }

        /* ═══════════════════════════════════
           TOP BAR
        ═══════════════════════════════════ */
        .sv-topbar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 48px 0 0;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .sv-topbar.in { opacity: 1; transform: translateY(0); }

        .sv-eyebrow {
          display: flex; align-items: center; gap: 12px;
        }
        .sv-eyebrow-line {
          width: 32px; height: 1px;
          background: var(--accent, #c9a96e);
          transition: background 0.5s;
        }
        .sv-eyebrow-text {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--accent, #c9a96e);
          transition: color 0.5s;
        }

        /* Segment pills */
        .sv-pills {
          display: flex; gap: 6px;
        }
        .sv-pill {
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .sv-pill.active {
          background: var(--pill-accent, #c9a96e);
          border-color: var(--pill-accent, #c9a96e);
          color: #000;
        }
        .sv-pill:not(.active):hover {
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
        }

        /* ═══════════════════════════════════
           LEFT CONTENT
        ═══════════════════════════════════ */
        .sv-left {
          grid-column: 1;
          grid-row: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 0;
          position: relative;
        }

        /* Giant number watermark */
        .sv-watermark {
          position: absolute;
          top: 50%; left: -20px;
          transform: translateY(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10rem, 18vw, 18rem);
          font-weight: 700;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
          transition: color 1s;
          z-index: -1;
        }

        /* Animated content swap */
        .sv-content {
          position: relative;
        }
        .sv-content-inner {
          opacity: 0;
          transform: translateY(22px);
          animation: svFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes svFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .sv-num {
          font-size: 0.68rem; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.2);
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', sans-serif;
        }
        .sv-num::after {
          content: ''; flex: 1; max-width: 48px;
          height: 1px; background: rgba(255,255,255,0.08);
        }

        .sv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.0;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .sv-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-style: italic;
          font-weight: 300;
          color: var(--accent, #c9a96e);
          margin-bottom: 28px;
          transition: color 0.5s;
        }

        /* Accent rule */
        .sv-rule {
          width: 48px; height: 2px;
          background: var(--accent, #c9a96e);
          margin-bottom: 24px;
          border-radius: 2px;
          transition: background 0.5s;
        }

        .sv-desc {
          font-size: 1rem; font-weight: 300;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          max-width: 440px;
          margin-bottom: 32px;
        }

        /* Tags */
        .sv-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 40px;
        }
        .sv-tag {
          font-size: 0.68rem; letter-spacing: 0.08em;
          padding: 5px 14px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
          transition: border-color 0.3s, color 0.3s;
        }
        .sv-tag:hover {
          border-color: var(--accent, #c9a96e);
          color: rgba(255,255,255,0.8);
        }

        /* CTA group */
        .sv-actions {
          display: flex; align-items: center; gap: 16px;
        }
        .sv-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--accent, #c9a96e);
          color: #000; text-decoration: none;
          padding: 14px 28px; border-radius: 3px;
          font-size: 0.82rem; font-weight: 600;
          letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .sv-btn-primary:hover {
          filter: brightness(1.12);
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.4);
        }
        .sv-btn-primary svg { transition: transform 0.2s; }
        .sv-btn-primary:hover svg { transform: translateX(4px); }

        .sv-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.4); text-decoration: none;
          font-size: 0.82rem; font-weight: 400;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .sv-btn-ghost:hover { color: #fff; }

        /* ═══════════════════════════════════
           RIGHT — IMAGE PANEL
        ═══════════════════════════════════ */
        .sv-right {
          grid-column: 2;
          grid-row: 2;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 48px 0 48px 60px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .sv-right.in { opacity: 1; transform: translateX(0); }

        /* Floating image card */
        .sv-img-card {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/5;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.06);
        }

        .sv-img-card-img {
          position: absolute;
          inset: 0; width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s ease;
        }
        .sv-img-card-img.visible { opacity: 1; transform: scale(1); }
        .sv-img-card-img.hidden  { opacity: 0; transform: scale(1.04); }

        /* Overlay gradient on card */
        .sv-img-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top,
            rgba(0,0,0,0.6) 0%,
            rgba(0,0,0,0.1) 40%,
            transparent 70%
          );
          z-index: 2;
        }

        /* Floating label on image */
        .sv-img-label {
          position: absolute;
          bottom: 24px; left: 24px; right: 24px;
          z-index: 3;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .sv-img-label-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(10px);
          animation: svFadeUp 0.5s ease 0.3s forwards;
        }
        .sv-img-label-num {
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.45);
          flex-shrink: 0;
          margin-bottom: 4px;
        }

        /* Accent border stripe on card */
        .sv-img-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 4;
          transition: background 0.5s;
        }

        /* Floating badge */
        .sv-badge {
          position: absolute;
          top: -16px; right: -16px;
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(7,7,7,0.85);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .sv-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 600;
          color: var(--accent, #c9a96e);
          line-height: 1;
          transition: color 0.5s;
        }
        .sv-badge-label {
          font-size: 0.52rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* ═══════════════════════════════════
           BOTTOM BAR
        ═══════════════════════════════════ */
        .sv-bottombar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0 40px;
          gap: 24px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        }
        .sv-bottombar.in { opacity: 1; transform: translateY(0); }

        /* Progress tracks */
        .sv-tracks {
          display: flex; gap: 6px; align-items: center; flex: 1;
        }
        .sv-track {
          flex: 1; height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .sv-track:hover { background: rgba(255,255,255,0.12); }
        .sv-track-fill {
          position: absolute; inset: 0;
          border-radius: 2px;
          transform-origin: left;
          transition: background 0.5s;
        }

        /* Track label */
        .sv-track-label {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%; transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .sv-track:hover .sv-track-label { opacity: 1; }

        /* Arrows */
        .sv-arrows { display: flex; gap: 8px; }
        .sv-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
        }
        .sv-arrow:hover {
          border-color: var(--accent, #c9a96e);
          color: var(--accent, #c9a96e);
          background: rgba(255,255,255,0.05);
          transform: scale(1.08);
        }

        .sv-all-link {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.3); text-decoration: none;
          font-size: 0.78rem; letter-spacing: 0.05em;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .sv-all-link:hover { color: #fff; }

        /* ═══════════════════════════════════
           VERTICAL SERVICE INDEX (right side decoration)
        ═══════════════════════════════════ */
        .sv-index {
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 20;
        }
        .sv-index-item {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
          opacity: 0.28;
          transition: opacity 0.3s;
        }
        .sv-index-item.active, .sv-index-item:hover { opacity: 1; }
        .sv-index-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .sv-index-item.active .sv-index-dot {
          background: var(--accent, #c9a96e);
          border-color: var(--accent, #c9a96e);
          transform: scale(1.4);
        }
        .sv-index-text {
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          writing-mode: horizontal-tb;
        }

        /* ═══════════════════════════════════
           MOBILE
        ═══════════════════════════════════ */
        @media (max-width: 900px) {
          .sv-layout {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }
          .sv-topbar { padding-top: 40px; flex-wrap: wrap; gap: 12px; }
          .sv-pills { flex-wrap: wrap; }
          .sv-left { grid-column: 1; grid-row: 2; padding: 32px 0 24px; }
          .sv-right {
            grid-column: 1; grid-row: 3;
            padding: 0 0 24px;
            justify-content: center;
          }
          .sv-img-card { max-width: 100%; aspect-ratio: 16/9; }
          .sv-bottombar { grid-column: 1; flex-wrap: wrap; gap: 16px; }
          .sv-watermark { display: none; }
          .sv-index { display: none; }
          .sv-badge { display: none; }
        }
        @media (max-width: 480px) {
          .sv-title { font-size: 2.4rem; }
          .sv-actions { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section
        className="sv"
        ref={sectionRef}
        style={{ "--accent": svc.accent } as React.CSSProperties}
      >

        {/* ── Full-bleed background images ── */}
        <div className="sv-bg">
          {services.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.id}
              src={s.image}
              alt=""
              aria-hidden="true"
              className={`sv-bg-img ${i === active ? "visible" : "hidden"}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="sv-bg-overlay" />
        </div>

        {/* ── Grid layout ── */}
        <div className="sv-layout">

          {/* TOP BAR */}
          <div className={`sv-topbar ${visible ? "in" : ""}`}>
            <div className="sv-eyebrow">
              <div className="sv-eyebrow-line" />
              <span className="sv-eyebrow-text">What We Offer</span>
            </div>
            <div className="sv-pills">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  className={`sv-pill ${i === active ? "active" : ""}`}
                  style={{ "--pill-accent": s.accent } as React.CSSProperties}
                  onClick={() => manualGo(i)}
                >
                  {s.number} · {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* LEFT CONTENT */}
          <div className="sv-left">
            {/* Giant watermark number */}
            <div className="sv-watermark">{svc.number}</div>

            {/* Content animates on change */}
            <div className="sv-content" key={active}>
              <div className="sv-content-inner">
                <div className="sv-num">{svc.number}</div>
                <h2 className="sv-title">{svc.title}</h2>
                <p className="sv-tagline">{svc.tagline}</p>
                <div className="sv-rule" />
                <p className="sv-desc">{svc.description}</p>
                <div className="sv-tags">
                  {svc.highlights.map((h) => (
                    <span key={h} className="sv-tag">{h}</span>
                  ))}
                </div>
                <div className="sv-actions">
                  <Link href={svc.href} className="sv-btn-primary">
                    Explore Service
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/services" className="sv-btn-ghost">
                    All Services →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE PANEL */}
          <div className={`sv-right ${visible ? "in" : ""}`}>
            <div className="sv-img-card">
              {/* Accent top stripe */}
              <div
                className="sv-img-card-accent"
                style={{ background: svc.accent }}
              />
              {/* Stacked images */}
              {services.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.id}
                  src={s.image}
                  alt={s.imageAlt}
                  className={`sv-img-card-img ${i === active ? "visible" : "hidden"}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[i] = true; return n; })}
                />
              ))}
              {/* Bottom label on image */}
              <div className="sv-img-label" key={`label-${active}`}>
                <div className="sv-img-label-text">{svc.title}</div>
                <div className="sv-img-label-num">{svc.number} / 0{services.length}</div>
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="sv-badge">
              <span className="sv-badge-num" style={{ color: svc.accent }}>
                {svc.number}
              </span>
              <span className="sv-badge-label">Service</span>
            </div>

            {/* Vertical index dots */}
            <div className="sv-index">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  className={`sv-index-item ${i === active ? "active" : ""}`}
                  style={{ "--accent": s.accent } as React.CSSProperties}
                  onClick={() => manualGo(i)}
                >
                  <div className="sv-index-dot" />
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className={`sv-bottombar ${visible ? "in" : ""}`}>
            {/* Progress tracks */}
            <div className="sv-tracks">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  className="sv-track"
                  onClick={() => manualGo(i)}
                  title={s.title}
                >
                  <span className="sv-track-label">{s.title}</span>
                  <div
                    className="sv-track-fill"
                    style={{
                      background: s.accent,
                      transform:
                        i === active
                          ? `scaleX(${progress})`
                          : i < active
                          ? "scaleX(1)"
                          : "scaleX(0)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Arrows + pause */}
            <div className="sv-arrows">
              <button
                className="sv-arrow"
                onClick={() => manualGo((active - 1 + services.length) % services.length)}
                aria-label="Previous"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="sv-arrow"
                onClick={() => setIsPaused(p => !p)}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused
                  ? <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  : <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                }
              </button>
              <button
                className="sv-arrow"
                onClick={() => manualGo((active + 1) % services.length)}
                aria-label="Next"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link href="/services" className="sv-all-link">
              View All Services
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}