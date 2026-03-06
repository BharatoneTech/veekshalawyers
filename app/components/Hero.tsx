"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fit=crop",
    label: "Executive Strategy",
  },
  {
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80&fit=crop",
    label: "Team Collaboration",
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80&fit=crop",
    label: "Leadership & Vision",
  },
  {
    url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80&fit=crop",
    label: "Business Growth",
  },
  {
    url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&fit=crop",
    label: "Modern Workspace",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goToSlide = (indexOrFn: number | ((prev: number) => number)) => {
    setActiveSlide((prev) => {
      const next = typeof indexOrFn === "function" ? indexOrFn(prev) : indexOrFn;
      if (next === prev) return prev;
      setPrevSlide(prev);
      setTransitioning(true);
      setTimeout(() => {
        setPrevSlide(null);
        setTransitioning(false);
      }, 1000);
      return next;
    });
    // Reset timer
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToSlide((p) => (p + 1) % SLIDES.length);
    }, 5000);
  };

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const COLS = 28;
    const ROWS = 14;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colGap = canvas.width / COLS;
      const rowGap = canvas.height / ROWS;
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const x = i * colGap + colGap / 2;
          const y = j * rowGap + rowGap / 2;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const maxDist = 130;
          const proximity = Math.max(0, 1 - dist / maxDist);
          const size = 1 + proximity * 2.5;
          const opacity = 0.08 + proximity * 0.4;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold: #c9a96e;
          --gold-light: #e2c99a;
          --dark: #080808;
        }

        /* ── Section ── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          background: #050505;
        }

        /* ── Slideshow background ── */
        .hero-slides {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 1s ease;
        }
        .hero-slide.active  { opacity: 1; }
        .hero-slide.prev    { opacity: 0; }
        .hero-slide.hidden  { opacity: 0; }

        /* Dark overlay on top of image */
        .hero-slide::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, rgba(5,5,5,0.92) 38%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.35) 100%),
            linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 50%);
        }

        /* Ken Burns zoom animation on active slide */
        .hero-slide.active .hero-slide-img {
          animation: kenBurns 6s ease-in-out forwards;
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        .hero-slide-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          will-change: transform;
        }

        /* ── Slide counter / label ── */
        .hero-slide-meta {
          position: absolute;
          bottom: 44px;
          right: 44px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }
        .slide-label {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .slide-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.25);
        }
        .slide-counter strong {
          color: var(--gold);
          font-size: 1.1rem;
        }

        /* ── Dot navigation ── */
        .hero-dots {
          position: absolute;
          bottom: 44px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 20;
        }
        .hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s, width 0.3s;
        }
        .hero-dot.active {
          background: var(--gold);
          width: 22px;
          border-radius: 3px;
        }

        /* ── Progress bar ── */
        .hero-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: var(--gold);
          z-index: 20;
          animation: progressBar 5s linear infinite;
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Canvas ── */
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        /* ── Diagonal accent ── */
        .hero-diagonal {
          position: absolute;
          top: 0;
          right: 22%;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 30%, rgba(201,169,110,0.2) 70%, transparent);
          z-index: 3;
        }

        /* ── Content ── */
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 80px;
          align-items: center;
          width: 100%;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.7s ease forwards 0.1s;
        }
        .hero-eyebrow-line {
          width: 36px;
          height: 1px;
          background: var(--gold);
        }
        .hero-eyebrow-text {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 6vw, 5.8rem);
          font-weight: 300;
          line-height: 1.05;
          color: #fff;
          margin: 0 0 8px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards 0.25s;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold-light);
        }
        .hero-title-bold {
          font-weight: 600;
          display: block;
        }

        .hero-subtitle-block {
          margin-top: 32px;
          padding-left: 24px;
          border-left: 1px solid rgba(201,169,110,0.35);
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards 0.45s;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.58);
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 44px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards 0.6s;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: #000;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 2px;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.35);
        }
        .btn-primary svg { transition: transform 0.2s; }
        .btn-primary:hover svg { transform: translateX(4px); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 400;
          letter-spacing: 0.03em;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { color: #fff; }
        .btn-ghost-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: 1px solid currentColor;
          display: inline-block;
        }

        /* Stats */
        .hero-stats {
          display: flex;
          gap: 36px;
          margin-top: 56px;
          padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.07);
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.8s;
        }
        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #fff;
          line-height: 1;
        }
        .stat-number span { color: var(--gold); font-size: 1.4rem; }
        .stat-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 6px;
        }

        /* Right card */
        .hero-right {
          opacity: 0;
          transform: translateX(24px);
          animation: fadeRight 0.9s ease forwards 0.5s;
        }
        .hero-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 4px;
          padding: 36px 32px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: relative;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
          opacity: 0.6;
        }
        .card-tag {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: block;
        }
        .card-services {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
        }
        .card-services li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          transition: color 0.2s, padding-left 0.2s;
          cursor: default;
        }
        .card-services li:last-child { border-bottom: none; }
        .card-services li:hover { color: #fff; padding-left: 6px; }
        .card-services li .svc-arrow {
          opacity: 0;
          color: var(--gold);
          font-size: 0.8rem;
          transition: opacity 0.2s, transform 0.2s;
        }
        .card-services li:hover .svc-arrow { opacity: 1; transform: translateX(4px); }

        .card-cta {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card-cta-text {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }
        .card-cta-text strong {
          display: block;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          font-size: 0.85rem;
          margin-bottom: 2px;
        }
        .card-cta-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .card-cta-btn:hover {
          background: rgba(201,169,110,0.1);
          border-color: var(--gold);
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 1.1s;
        }
        .scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, rgba(201,169,110,0.6), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        .scroll-text {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        /* Slide nav arrows */
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.3);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
          backdrop-filter: blur(6px);
        }
        .hero-arrow:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(0,0,0,0.5);
        }
        .hero-arrow-left  { left: 24px; }
        .hero-arrow-right { right: 24px; }

        @keyframes fadeUp   { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeRight { to { opacity: 1; transform: translateX(0); } }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }

        @media (max-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr;
            padding: 80px 24px 140px;
            gap: 48px;
          }
          .hero-right { max-width: 400px; }
          .hero-stats  { gap: 24px; }
          .hero-diagonal { display: none; }
          .hero-arrow { display: none; }
          .hero-slide-meta { display: none; }
        }
        @media (max-width: 500px) {
          .hero-title { font-size: 2.8rem; }
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .hero-stats { gap: 20px; flex-wrap: wrap; }
        }
      `}</style>

      <section className="hero-section">

        {/* ── Slideshow Background ── */}
        <div className="hero-slides">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`hero-slide ${
                i === activeSlide ? "active" : i === prevSlide ? "prev" : "hidden"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.url}
                alt={slide.label}
                className="hero-slide-img"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Slide label + counter */}
        <div className="hero-slide-meta" style={{ zIndex: 20, position: "absolute", bottom: 44, right: 44 }}>
          <span className="slide-label">{SLIDES[activeSlide].label}</span>
          <span className="slide-counter">
            <strong>{String(activeSlide + 1).padStart(2, "0")}</strong> / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="hero-progress"
          key={activeSlide}
          style={{ animation: "progressBar 5s linear forwards" }}
        />

        {/* Arrow controls */}
        <button
          className="hero-arrow hero-arrow-left"
          onClick={() => goToSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Previous slide"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="hero-arrow hero-arrow-right"
          onClick={() => goToSlide((activeSlide + 1) % SLIDES.length)}
          aria-label="Next slide"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot navigation */}
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === activeSlide ? " active" : ""}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Diagonal accent */}
        <div className="hero-diagonal" />

        {/* Interactive dot grid canvas */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* ── Main Content ── */}
        <div className="hero-content">

          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Strategic Business Consulting</span>
            </div>

            <h1 className="hero-title">
              We turn <em>vision</em> into
              <span className="hero-title-bold">measurable results.</span>
            </h1>

            <div className="hero-subtitle-block">
              <p className="hero-subtitle">
                Partnering with founders and executives to unlock growth, streamline operations,
                and build companies that last — with clarity, precision, and purpose.
              </p>
            </div>

            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">
                Start a Conversation
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="btn-ghost">
                <span className="btn-ghost-dot" />
                View Services
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">12<span>+</span></div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">240<span>+</span></div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98<span>%</span></div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* RIGHT — Services Card */}
          <div className="hero-right">
            <div className="hero-card">
              <span className="card-tag">What we offer</span>
              <ul className="card-services">
                {[
                  "Business Strategy",
                  "Financial Advisory",
                  "Operations & Scale",
                  "Market Expansion",
                  "Executive Coaching",
                  "M&A Consulting",
                ].map((svc) => (
                  <li key={svc}>
                    {svc}
                    <span className="svc-arrow">→</span>
                  </li>
                ))}
              </ul>
              <div className="card-cta">
                <div className="card-cta-text">
                  <strong>Free Discovery Call</strong>
                  30 min · No commitment
                </div>
                <Link href="/contact" className="card-cta-btn" aria-label="Book a call">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>

      </section>
    </>
  );
}