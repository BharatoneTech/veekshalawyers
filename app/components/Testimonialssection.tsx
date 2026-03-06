"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Working with this team completely transformed how we approach growth. Within 90 days we had a clear strategy, aligned leadership, and our first $2M quarter. I genuinely didn't think it was possible that fast.",
    author: "Marcus Chen",
    role: "CEO",
    company: "Nexova Technologies",
    industry: "SaaS / B2B",
    result: "+$2M revenue in 90 days",
    avatar: "MC",
    rating: 5,
    accent: "#c9a96e",
  },
  {
    id: 2,
    quote: "Every consultant we'd worked with before left us with a thick report and no real change. These people stayed in the room with us. They challenged our assumptions and helped us build something we're actually proud of.",
    author: "Priya Nair",
    role: "Founder & Managing Director",
    company: "Meridian Capital",
    industry: "Financial Services",
    result: "3× investor pipeline growth",
    avatar: "PN",
    rating: 5,
    accent: "#7eb8a4",
  },
  {
    id: 3,
    quote: "Our operations were a mess — three teams, no clear process, constant firefighting. They came in, mapped everything, restructured accountability, and within six weeks we were running like a proper company.",
    author: "David Osei",
    role: "COO",
    company: "Volta Logistics",
    industry: "Supply Chain",
    result: "40% reduction in overhead",
    avatar: "DO",
    rating: 5,
    accent: "#a09bcf",
  },
  {
    id: 4,
    quote: "The executive coaching program pushed me in ways I wasn't expecting. I came in thinking I needed better systems — I left knowing I needed to lead differently. That shift changed everything for my company.",
    author: "Sarah Wilmington",
    role: "Founder",
    company: "Bloom Health Co.",
    industry: "Health & Wellness",
    result: "2× team performance",
    avatar: "SW",
    rating: 5,
    accent: "#c97a6e",
  },
  {
    id: 5,
    quote: "We were expanding into three new markets simultaneously and completely overwhelmed. The market entry framework they built for us was precise, practical, and saved us from at least two very expensive mistakes.",
    author: "James Okonkwo",
    role: "VP Strategy",
    company: "Helix Global",
    industry: "Retail Expansion",
    result: "3 markets launched on time",
    avatar: "JO",
    rating: 5,
    accent: "#6eafc9",
  },
];

const AUTO_INTERVAL = 4000;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number, direction: "next" | "prev") => {
    setDir(direction);
    setPrev(active);
    setActive(idx);
    progressRef.current = 0;
    lastTsRef.current = null;
    setProgress(0);
  }, [active]);

  const manualGo = useCallback((idx: number, direction: "next" | "prev") => {
    setIsPaused(true);
    goTo(idx, direction);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 8000);
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
        setActive(prev => {
          const next = (prev + 1) % testimonials.length;
          setDir("next");
          setPrev(prev);
          return next;
        });
        progressRef.current = 0;
        lastTsRef.current = null;
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible, isPaused]);

  const t = testimonials[active];
  const p = prev !== null ? testimonials[prev] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .ts {
          background: #f5f2ed;
          height: 100vh;
          min-height: 600px;
          max-height: 940px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          padding: 0;
        }

        /* Layered background */
        .ts-bg-left {
          position: absolute;
          top: 0; left: 0;
          width: 42%;
          height: 100%;
          background: #1a1510;
          clip-path: polygon(0 0, 88% 0, 100% 100%, 0 100%);
          z-index: 0;
        }
        .ts-bg-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.1) 0%, transparent 65%);
        }

        /* Gold accent top border */
        .ts::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #c9a96e 35%, #e2c99a 50%, #c9a96e 65%, transparent);
          z-index: 10;
        }

        /* Big quote mark watermark */
        .ts-wm {
          position: absolute;
          top: 50%;
          left: 38%;
          transform: translate(-50%, -58%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(160px, 22vw, 300px);
          font-weight: 700;
          line-height: 1;
          color: rgba(201,169,110,0.06);
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* Dot texture on right */
        .ts-dots {
          position: absolute;
          top: 0; right: 0;
          width: 60%;
          height: 100%;
          opacity: 0.03;
          background-image: radial-gradient(circle, #8b6914 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .ts-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 0;
          align-items: center;
          height: 100%;
        }

        /* ── LEFT PANEL ── */
        .ts-left {
          padding-right: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding-top: 0;
        }

        .ts-label {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s, transform 0.7s;
        }
        .ts-label.in { opacity: 1; transform: translateY(0); }
        .ts-label-line { width: 28px; height: 1px; background: #c9a96e; }
        .ts-label-text { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a96e; }

        .ts-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3vw, 2.9rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 24px;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.8s ease 0.12s, transform 0.8s ease 0.12s;
        }
        .ts-title.in { opacity: 1; transform: translateY(0); }
        .ts-title em { font-style: italic; color: #c9a96e; }

        /* Stacked avatar cards */
        .ts-avatars {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.28s, transform 0.8s ease 0.28s;
        }
        .ts-avatars.in { opacity: 1; transform: translateY(0); }

        .ts-avatar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          position: relative;
        }
        .ts-avatar-item:hover { transform: translateX(4px); }
        .ts-avatar-item.active {
          background: rgba(255,255,255,0.06);
          border-color: rgba(201,169,110,0.25);
        }

        /* Progress bar on active */
        .ts-avatar-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          background: #c9a96e;
          border-radius: 0 0 8px 8px;
          transform-origin: left;
          transition: background 0.3s;
        }

        .ts-av-circle {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
          border: 1.5px solid rgba(255,255,255,0.15);
          transition: border-color 0.3s;
        }
        .ts-avatar-item.active .ts-av-circle {
          border-color: rgba(201,169,110,0.5);
        }

        .ts-av-info { flex: 1; min-width: 0; }
        .ts-av-name {
          font-size: 0.78rem; font-weight: 500;
          color: rgba(255,255,255,0.7);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: color 0.25s;
        }
        .ts-avatar-item.active .ts-av-name { color: #fff; }
        .ts-av-company {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.03em;
        }

        .ts-av-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.25);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          flex-shrink: 0;
        }
        .ts-avatar-item.active .ts-av-check { opacity: 1; }

        /* Trust bar */
        .ts-trust {
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
        }
        .ts-trust.in { opacity: 1; transform: translateY(0); }
        .ts-trust-label { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.22); margin-bottom: 10px; }
        .ts-trust-row { display: flex; gap: 16px; }
        .ts-trust-stat { display: flex; flex-direction: column; gap: 2px; }
        .ts-trust-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 600; color: #c9a96e; line-height: 1;
        }
        .ts-trust-desc { font-size: 0.62rem; color: rgba(255,255,255,0.28); }

        /* ── RIGHT PANEL ── */
        .ts-right {
          padding-left: 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          height: 100%;
        }

        /* Card stage */
        .ts-stage {
          position: relative;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .ts-stage.in { opacity: 1; transform: translateY(0); }

        /* Stack depth cards */
        .ts-card-depth-2 {
          position: absolute;
          top: 10px; left: 10px; right: -10px;
          height: 100%;
          background: rgba(26,21,16,0.4);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 14px;
          z-index: 0;
        }
        .ts-card-depth-1 {
          position: absolute;
          top: 5px; left: 5px; right: -5px;
          height: 100%;
          background: rgba(26,21,16,0.55);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
          z-index: 1;
        }

        /* Main card */
        .ts-card {
          position: relative;
          z-index: 2;
          background: #fff;
          border-radius: 14px;
          padding: 32px 32px 26px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        /* Card accent bar */
        .ts-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--t-accent, #c9a96e);
          transition: background 0.5s ease;
        }

        /* Card quote mark */
        .ts-card-qmark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 700;
          color: var(--t-accent, #c9a96e);
          line-height: 0.6;
          margin-bottom: 14px;
          display: block;
          opacity: 0.35;
          transition: color 0.5s;
        }

        /* Quote text — slide animation */
        @keyframes quoteInNext {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes quoteInPrev {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ts-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.05rem, 1.6vw, 1.28rem);
          font-weight: 400;
          font-style: italic;
          color: #2c1f0a;
          line-height: 1.68;
          margin: 0 0 22px;
        }
        .ts-quote-text.animate-next { animation: quoteInNext 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .ts-quote-text.animate-prev { animation: quoteInPrev 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        /* Stars */
        .ts-stars {
          display: flex; gap: 3px; margin-bottom: 20px;
        }
        .ts-star { color: #c9a96e; font-size: 0.75rem; }

        /* Card footer */
        .ts-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .ts-card-author { display: flex; align-items: center; gap: 12px; }
        .ts-author-circle {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 600;
          color: #fff; flex-shrink: 0;
        }
        .ts-author-name {
          font-size: 0.88rem; font-weight: 500;
          color: #1a1510; letter-spacing: 0.01em;
        }
        .ts-author-role { font-size: 0.7rem; color: rgba(0,0,0,0.4); margin-top: 1px; }
        .ts-author-company {
          font-size: 0.65rem;
          color: rgba(0,0,0,0.3);
          letter-spacing: 0.04em;
          margin-top: 1px;
        }

        /* Result badge */
        .ts-result-badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          border-radius: 100px;
          padding: 6px 12px;
          flex-shrink: 0;
        }
        .ts-result-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--t-accent, #c9a96e);
          flex-shrink: 0;
        }
        .ts-result-text {
          font-size: 0.67rem;
          font-weight: 500;
          color: #a07835;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* Industry tag */
        .ts-industry {
          margin-top: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .ts-industry-tag {
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.3);
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.06);
          padding: 3px 10px;
          border-radius: 100px;
        }

        /* Navigation */
        .ts-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
        }
        .ts-nav.in { opacity: 1; transform: translateY(0); }

        .ts-nav-arrows { display: flex; gap: 8px; }
        .ts-arr {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.1);
          background: #fff;
          color: rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .ts-arr:hover {
          border-color: #c9a96e;
          color: #a07835;
          transform: scale(1.08);
          box-shadow: 0 4px 14px rgba(201,169,110,0.2);
        }

        /* Mini dots */
        .ts-nav-dots { display: flex; gap: 6px; align-items: center; }
        .ts-ndot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(0,0,0,0.15);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .ts-ndot.active {
          background: #c9a96e;
          transform: scale(1.4);
        }

        .ts-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.8rem;
          color: rgba(0,0,0,0.3);
          letter-spacing: 0.08em;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ts { height: auto; max-height: none; padding: 60px 0; }
          .ts-inner {
            grid-template-columns: 1fr;
            padding: 0 24px;
            height: auto;
            gap: 36px;
          }
          .ts-bg-left {
            width: 100%; height: 340px;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            position: relative;
          }
          .ts-left { padding-right: 0; }
          .ts-right { padding-left: 0; }
          .ts-wm { display: none; }
        }

        @media (max-width: 560px) {
          .ts-card { padding: 24px 22px 20px; }
          .ts-avatars { display: none; }
        }
      `}</style>

      <section className="ts" ref={sectionRef}>
        <div className="ts-dots" />
        <div className="ts-bg-left" />
        <div className="ts-wm">"</div>

        <div className="ts-inner">

          {/* ── LEFT ── */}
          <div className="ts-left">
            <div className={`ts-label ${visible ? "in" : ""}`}>
              <div className="ts-label-line" />
              <span className="ts-label-text">Client Stories</span>
            </div>

            <h2 className={`ts-title ${visible ? "in" : ""}`}>
              What our<br /><em>clients say</em><br />about us.
            </h2>

            {/* Stacked selector */}
            <div className={`ts-avatars ${visible ? "in" : ""}`}>
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={`ts-avatar-item ${i === active ? "active" : ""}`}
                  onClick={() => manualGo(i, i > active ? "next" : "prev")}
                >
                  {/* Progress bar */}
                  {i === active && (
                    <div
                      className="ts-avatar-progress"
                      style={{ width: `${progress * 100}%`, background: t.accent }}
                    />
                  )}
                  <div
                    className="ts-av-circle"
                    style={{ background: i === active ? `linear-gradient(135deg, ${t.accent}, ${t.accent}99)` : "rgba(255,255,255,0.06)" }}
                  >
                    {t.avatar}
                  </div>
                  <div className="ts-av-info">
                    <div className="ts-av-name">{t.author}</div>
                    <div className="ts-av-company">{t.company}</div>
                  </div>
                  <div className="ts-av-check">
                    <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="#c9a96e" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust stats */}
            <div className={`ts-trust ${visible ? "in" : ""}`}>
              <div className="ts-trust-label">Trusted by leaders across industries</div>
              <div className="ts-trust-row">
                {[
                  { val: "98%", desc: "Satisfaction score" },
                  { val: "240+", desc: "Engagements" },
                  { val: "5★", desc: "Average rating" },
                ].map(s => (
                  <div key={s.val} className="ts-trust-stat">
                    <div className="ts-trust-val">{s.val}</div>
                    <div className="ts-trust-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="ts-right">
            <div
              className={`ts-stage ${visible ? "in" : ""}`}
              style={{ "--t-accent": t.accent } as React.CSSProperties}
            >
              {/* Depth stack */}
              <div className="ts-card-depth-2" />
              <div className="ts-card-depth-1" />

              {/* Main card */}
              <div className="ts-card">
                <span className="ts-card-qmark">"</span>

                {/* Stars */}
                <div className="ts-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="ts-star">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p
                  key={t.id}
                  className={`ts-quote-text animate-${dir}`}
                >
                  {t.quote}
                </p>

                {/* Footer */}
                <div className="ts-card-footer">
                  <div className="ts-card-author">
                    <div
                      className="ts-author-circle"
                      style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)` }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="ts-author-name">{t.author}</div>
                      <div className="ts-author-role">{t.role}</div>
                      <div className="ts-author-company">{t.company}</div>
                    </div>
                  </div>
                  <div
                    className="ts-result-badge"
                    style={{ "--t-accent": t.accent } as React.CSSProperties}
                  >
                    <div className="ts-result-dot" />
                    <span className="ts-result-text">{t.result}</span>
                  </div>
                </div>

                <div className="ts-industry">
                  <span className="ts-industry-tag">{t.industry}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className={`ts-nav ${visible ? "in" : ""}`}>
              <div className="ts-nav-arrows">
                <button
                  className="ts-arr"
                  onClick={() => manualGo(active === 0 ? testimonials.length - 1 : active - 1, "prev")}
                  aria-label="Previous"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m4 4H3" />
                  </svg>
                </button>
                <button
                  className="ts-arr"
                  onClick={() => manualGo((active + 1) % testimonials.length, "next")}
                  aria-label="Next"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              <div className="ts-nav-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`ts-ndot ${i === active ? "active" : ""}`}
                    onClick={() => manualGo(i, i > active ? "next" : "prev")}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <span className="ts-counter">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}