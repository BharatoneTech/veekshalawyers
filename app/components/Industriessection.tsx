"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  {
    number: "01",
    icon: "◈",
    title: "Financial Services",
    description:
      "Investment firms, banks, and fintech companies navigating growth, compliance, and digital transformation. We help structure governance, build investor-ready financials, and design scalable operating models.",
    tags: ["Investment Banking", "Fintech", "Wealth Management", "Compliance"],
    stat: "60+",
    statLabel: "Clients served",
    accent: "#c9a96e",
  },
  {
    number: "02",
    icon: "◉",
    title: "Technology & SaaS",
    description:
      "Product companies scaling from seed to Series C. From GTM strategy and pricing architecture to organizational design and board readiness — we've been in the room when it matters most.",
    tags: ["B2B SaaS", "AI & ML", "Developer Tools", "Enterprise Tech"],
    stat: "80+",
    statLabel: "Clients served",
    accent: "#7eb8a4",
  },
  {
    number: "03",
    icon: "◎",
    title: "Healthcare & Life Sciences",
    description:
      "Clinics, health-tech platforms, and pharmaceutical brands optimizing care delivery, navigating regulatory complexity, and scaling patient acquisition in competitive markets.",
    tags: ["Health Tech", "Pharma", "Medical Devices", "Telehealth"],
    stat: "35+",
    statLabel: "Clients served",
    accent: "#a09bcf",
  },
  {
    number: "04",
    icon: "◐",
    title: "Real Estate & Construction",
    description:
      "Developers, property firms, and construction groups building smarter operations. We deliver investor decks, market entry strategies, and operational frameworks that hold up at scale.",
    tags: ["PropTech", "Development", "Asset Management", "Construction"],
    stat: "40+",
    statLabel: "Clients served",
    accent: "#c97a6e",
  },
  {
    number: "05",
    icon: "◫",
    title: "Retail & E-Commerce",
    description:
      "Brands scaling across channels — from DTC launches to omnichannel expansion. We focus on margin improvement, supply chain efficiency, and customer acquisition frameworks that last.",
    tags: ["D2C", "Omnichannel", "Marketplace", "Brand Strategy"],
    stat: "55+",
    statLabel: "Clients served",
    accent: "#6eafc9",
  },
  {
    number: "06",
    icon: "◑",
    title: "Logistics & Supply Chain",
    description:
      "3PLs and logistics operators streamlining routes, reducing overhead, and entering new markets. We bring clarity to complex operational systems and build the reporting infrastructure to run them.",
    tags: ["3PL", "Last Mile", "Warehousing", "Route Optimisation"],
    stat: "28+",
    statLabel: "Clients served",
    accent: "#b8a47e",
  },
];

export default function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animDir, setAnimDir] = useState<"up" | "down">("down");
  const [animating, setAnimating] = useState(false);
  const scrollAccum = useRef(0);

  const navigate = (dir: "up" | "down") => {
    if (animating) return;
    const next =
      dir === "down"
        ? Math.min(activeIndex + 1, industries.length - 1)
        : Math.max(activeIndex - 1, 0);
    if (next === activeIndex) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(next);
      setAnimating(false);
    }, 430);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const atFirst = activeIndex === 0;
      const atLast = activeIndex === industries.length - 1;
      if ((atFirst && e.deltaY < 0) || (atLast && e.deltaY > 0)) return;
      e.preventDefault();
      if (animating) return;
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) >= 60) {
        navigate(scrollAccum.current > 0 ? "down" : "up");
        scrollAccum.current = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeIndex, animating]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40 || animating) return;
      navigate(dy > 0 ? "down" : "up");
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeIndex, animating]);

  const ind = industries[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        /* KEY FIX: use dvh so it fills the actual visible area on all devices/browsers */
        .ind3 {
          width: 100%;
          /* dvh fills exactly the visible viewport, ignoring browser chrome */
          height: 100dvh;
          /* fallback for older browsers */
          height: 100vh;
          /* no margin, no padding on the element itself */
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 270px 1fr;
          grid-template-rows: 100%;
          position: relative;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          /* critical — clip anything that would cause overflow */
          overflow: hidden;
          /* remove any default box sizing issues */
          box-sizing: border-box;
        }

        /* Subtle grid texture */
        .ind3-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
          z-index: 0;
        }

        /* Gold top line */
        .ind3-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #c9a96e 35%, #e2c99a 50%, #c9a96e 65%, transparent);
          z-index: 20;
        }

        /* ── LEFT PANEL ── */
        .ind3-left {
          position: relative;
          z-index: 5;
          border-right: 1px solid rgba(255,255,255,0.055);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 30px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .ind3-label {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 14px; flex-shrink: 0;
        }
        .ind3-label-line { width: 24px; height: 1px; background: #c9a96e; }
        .ind3-label-text {
          font-size: 0.57rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; color: #c9a96e;
        }

        .ind3-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.45rem, 2vw, 2rem);
          font-weight: 300; color: #fff;
          line-height: 1.12; margin: 0 0 24px;
          flex-shrink: 0;
        }
        .ind3-heading em { font-style: italic; color: #c9a96e; }

        .ind3-steps { display: flex; flex-direction: column; gap: 1px; flex-shrink: 0; }

        .ind3-step {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 8px;
          border-radius: 7px; cursor: pointer;
          transition: background 0.2s;
        }
        .ind3-step:hover { background: rgba(255,255,255,0.03); }
        .ind3-step.active { background: rgba(255,255,255,0.04); }

        .ind3-dot {
          width: 13px; height: 13px; flex-shrink: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.3s, background 0.3s;
        }
        .ind3-step.active .ind3-dot {
          border-color: var(--sa, #c9a96e);
          background: var(--sa, #c9a96e);
        }
        .ind3-dot-inner {
          width: 4px; height: 4px; border-radius: 50%;
          background: #fff; opacity: 0; transition: opacity 0.3s;
        }
        .ind3-step.active .ind3-dot-inner { opacity: 1; }

        .ind3-step-name {
          font-size: 0.7rem; font-weight: 400;
          color: rgba(255,255,255,0.28);
          transition: color 0.25s;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ind3-step.active .ind3-step-name {
          color: rgba(255,255,255,0.9); font-weight: 500;
        }

        .ind3-prog {
          margin-top: 22px; padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.055);
          flex-shrink: 0;
        }
        .ind3-prog-row {
          display: flex; justify-content: space-between;
          margin-bottom: 7px;
        }
        .ind3-prog-label {
          font-size: 0.57rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
        }
        .ind3-prog-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.7rem; color: rgba(255,255,255,0.3); letter-spacing: 0.08em;
        }
        .ind3-prog-track {
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden;
        }
        .ind3-prog-fill {
          height: 100%; border-radius: 2px;
          transition: width 0.45s cubic-bezier(0.4,0,0.2,1), background 0.5s;
        }

        /* ── RIGHT PANEL ── */
        .ind3-right {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          /* leave room for arrow buttons on right */
          padding: 32px 72px 32px 44px;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Card animations */
        @keyframes ind3EnterDown {
          from { opacity: 0; transform: translateY(44px) scale(0.975); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes ind3EnterUp {
          from { opacity: 0; transform: translateY(-44px) scale(0.975); }
          to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
        @keyframes ind3ExitUp {
          from { opacity: 1; transform: translateY(0)     scale(1); }
          to   { opacity: 0; transform: translateY(-44px) scale(0.975); }
        }
        @keyframes ind3ExitDown {
          from { opacity: 1; transform: translateY(0)    scale(1); }
          to   { opacity: 0; transform: translateY(44px) scale(0.975); }
        }

        .ind3-card {
          width: 100%;
          max-width: 600px;
          background: rgba(255,255,255,0.038);
          border: 1px solid rgba(255,255,255,0.085);
          border-radius: 14px;
          padding: 28px 32px 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 70px rgba(0,0,0,0.45);
          box-sizing: border-box;
        }

        .ind3-card.enter-down { animation: ind3EnterDown 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .ind3-card.enter-up   { animation: ind3EnterUp   0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .ind3-card.exit-up    { animation: ind3ExitUp    0.3s ease both; pointer-events: none; }
        .ind3-card.exit-down  { animation: ind3ExitDown  0.3s ease both; pointer-events: none; }

        .ind3-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          border-radius: 14px 14px 0 0; transition: background 0.5s;
        }

        .ind3-card-ghost {
          position: absolute; right: -6px; bottom: -22px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 7rem; font-weight: 700;
          color: rgba(255,255,255,0.022);
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -0.04em;
        }

        .ind3-card-toprow {
          display: flex; align-items: center; margin-bottom: 14px;
        }
        .ind3-card-icon {
          font-size: 1.45rem; line-height: 1; transition: color 0.4s;
        }

        .ind3-card-numrow {
          display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
        }
        .ind3-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.68rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.18);
        }
        .ind3-card-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }

        .ind3-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 2.6vw, 2.3rem);
          font-weight: 600; color: #fff; line-height: 1.1; margin: 0 0 12px;
        }

        .ind3-card-desc {
          font-size: 0.84rem; font-weight: 300; line-height: 1.78;
          color: rgba(255,255,255,0.46); margin: 0 0 18px;
        }

        .ind3-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .ind3-tag {
          font-size: 0.63rem; letter-spacing: 0.07em;
          padding: 4px 11px; border-radius: 100px; border: 1px solid;
          font-family: 'DM Sans', sans-serif;
        }

        .ind3-card-stat {
          display: flex; align-items: center; gap: 12px;
          padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .ind3-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem; font-weight: 600; line-height: 1; transition: color 0.5s;
        }
        .ind3-stat-sep { width: 1px; height: 24px; background: rgba(255,255,255,0.08); }
        .ind3-stat-label { font-size: 0.68rem; font-weight: 300; color: rgba(255,255,255,0.3); }

        /* ── Arrow buttons ── */
        .ind3-arrows {
          position: absolute;
          right: 20px; top: 50%; transform: translateY(-50%);
          z-index: 10; display: flex; flex-direction: column; gap: 8px;
        }
        .ind3-arr {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
        }
        .ind3-arr:hover:not(:disabled) {
          border-color: #c9a96e; color: #c9a96e;
          background: rgba(201,169,110,0.07); transform: scale(1.08);
        }
        .ind3-arr:disabled { opacity: 0.15; cursor: not-allowed; }

        /* scroll hint */
        .ind3-hint {
          position: absolute; bottom: 18px; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex; align-items: center; gap: 8px; opacity: 0.28;
        }
        .ind3-hint-text {
          font-size: 0.54rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
        }
        .ind3-hint-dots {
          display: flex; gap: 4px;
        }
        .ind3-hint-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(201,169,110,0.6);
          animation: hintBounce 1.6s ease-in-out infinite;
        }
        .ind3-hint-dot:nth-child(2) { animation-delay: 0.15s; }
        .ind3-hint-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes hintBounce {
          0%,100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .ind3 { grid-template-columns: 1fr; }
          .ind3-left { display: none; }
          .ind3-right { padding: 24px 20px; }
          .ind3-arrows { right: 14px; }
        }
      `}</style>

      <section className="ind3" ref={containerRef}>
        <div className="ind3-bg" />
        <div className="ind3-topline" />

        {/* ── LEFT ── */}
        <div className="ind3-left">
          <div className="ind3-label">
            <div className="ind3-label-line" />
            <span className="ind3-label-text">Industries</span>
          </div>

          <h2 className="ind3-heading">
            Sectors we<br /><em>know deeply.</em>
          </h2>

          <div className="ind3-steps">
            {industries.map((item, i) => (
              <div
                key={item.number}
                className={`ind3-step${i === activeIndex ? " active" : ""}`}
                style={{ "--sa": item.accent } as React.CSSProperties}
                onClick={() => {
                  if (animating || i === activeIndex) return;
                  setAnimDir(i > activeIndex ? "down" : "up");
                  setAnimating(true);
                  setTimeout(() => { setActiveIndex(i); setAnimating(false); }, 430);
                }}
              >
                <div className="ind3-dot">
                  <div className="ind3-dot-inner" />
                </div>
                <span className="ind3-step-name">{item.title}</span>
              </div>
            ))}
          </div>

          <div className="ind3-prog">
            <div className="ind3-prog-row">
              <span className="ind3-prog-label">Progress</span>
              <span className="ind3-prog-count">{activeIndex + 1} / {industries.length}</span>
            </div>
            <div className="ind3-prog-track">
              <div
                className="ind3-prog-fill"
                style={{
                  width: `${((activeIndex + 1) / industries.length) * 100}%`,
                  background: ind.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="ind3-right">
          <div
            key={activeIndex}
            className={`ind3-card ${
              animating
                ? `exit-${animDir === "down" ? "up" : "down"}`
                : `enter-${animDir}`
            }`}
          >
            <div className="ind3-card-bar" style={{ background: ind.accent }} />
            <div className="ind3-card-ghost">{ind.number}</div>

            <div className="ind3-card-toprow">
              <span className="ind3-card-icon" style={{ color: ind.accent + "cc" }}>
                {ind.icon}
              </span>
            </div>

            <div className="ind3-card-numrow">
              <span className="ind3-card-num">{ind.number}</span>
              <div className="ind3-card-rule" />
            </div>

            <h3 className="ind3-card-title">{ind.title}</h3>
            <p className="ind3-card-desc">{ind.description}</p>

            <div className="ind3-card-tags">
              {ind.tags.map((tag) => (
                <span
                  key={tag}
                  className="ind3-tag"
                  style={{
                    color: ind.accent + "cc",
                    borderColor: ind.accent + "40",
                    background: ind.accent + "0d",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="ind3-card-stat">
              <span className="ind3-stat-num" style={{ color: ind.accent }}>
                {ind.stat}
              </span>
              <div className="ind3-stat-sep" />
              <span className="ind3-stat-label">{ind.statLabel}</span>
            </div>
          </div>
        </div>

        {/* Arrow controls */}
        <div className="ind3-arrows">
          <button
            className="ind3-arr"
            disabled={activeIndex === 0 || animating}
            onClick={() => navigate("up")}
            aria-label="Previous"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            className="ind3-arr"
            disabled={activeIndex === industries.length - 1 || animating}
            onClick={() => navigate("down")}
            aria-label="Next"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Scroll hint */}
        <div className="ind3-hint">
          <span className="ind3-hint-text">Scroll to explore</span>
          <div className="ind3-hint-dots">
            <div className="ind3-hint-dot" />
            <div className="ind3-hint-dot" />
            <div className="ind3-hint-dot" />
          </div>
        </div>
      </section>
    </>
  );
}