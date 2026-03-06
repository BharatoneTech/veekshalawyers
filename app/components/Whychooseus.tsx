"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const reasons = [
  {
    number: "01",
    title: "Proven Track Record",
    body: "12+ years. 240+ engagements. Across industries from fintech to real estate — we've seen what works and what doesn't, and we apply that hard-won knowledge to every client.",
    tag: "Experience",
    icon: "◈",
    size: "large", // spans 2 rows
    accent: "#c9a96e",
  },
  {
    number: "02",
    title: "Tailored, Not Templated",
    body: "No off-the-shelf playbooks. Every strategy we build is engineered specifically for your business, your market, and your moment.",
    tag: "Customization",
    icon: "◉",
    size: "small",
    accent: "#7eb8a4",
  },
  {
    number: "03",
    title: "Speed Without Sacrifice",
    body: "We move fast — but never recklessly. Our structured process means you get results in weeks, not quarters.",
    tag: "Efficiency",
    icon: "◎",
    size: "small",
    accent: "#a09bcf",
  },
  {
    number: "04",
    title: "Real Accountability",
    body: "We tie our success to yours. Clear KPIs from day one, transparent reporting, and honest conversations when something isn't working.",
    tag: "Integrity",
    icon: "◐",
    size: "small",
    accent: "#c97a6e",
  },
  {
    number: "05",
    title: "Senior-Level Attention",
    body: "No bait-and-switch. The experts you meet in discovery are the same people doing the work — every time.",
    tag: "Quality",
    icon: "◫",
    size: "small",
    accent: "#6eafc9",
  },
];

const stats = [
  { value: "98%", label: "Client retention rate" },
  { value: "3×",  label: "Average ROI delivered" },
  { value: "14d", label: "Average time to first insight" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        /* ─── Section ─── */
        .wcu {
          background: #080808;
          height: 100vh;
          min-height: 620px;
          max-height: 960px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 40px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Giant background number */
        .wcu-bg-num {
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(200px, 28vw, 380px);
          font-weight: 700;
          line-height: 1;
          color: rgba(201,169,110,0.04);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.06em;
          transition: opacity 1.2s ease;
        }

        /* Gradient mesh blobs */
        .wcu-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .wcu-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,169,110,0.07), transparent 70%);
          top: -120px; left: -120px;
        }
        .wcu-blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(110,175,201,0.05), transparent 70%);
          bottom: -80px; right: 20%;
        }

        /* Thin horizontal rule at top */
        .wcu::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.25) 40%, rgba(201,169,110,0.25) 60%, transparent);
        }

        .wcu-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 20px;
          height: 100%;
          padding: 36px 0 28px;
          box-sizing: border-box;
        }

        /* ─── Header row ─── */
        .wcu-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .wcu-header.in { opacity: 1; transform: translateY(0); }

        .wcu-label {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
        }
        .wcu-label-line { width: 30px; height: 1px; background: #c9a96e; }
        .wcu-label-text { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a96e; }

        .wcu-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 2.9rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
          margin: 0;
        }
        .wcu-title em { font-style: italic; color: #c9a96e; }

        .wcu-header-right {
          text-align: right;
          flex-shrink: 0;
        }
        .wcu-header-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.05em;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 9px 18px; border-radius: 100px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .wcu-header-cta:hover {
          color: #fff; border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.04);
        }

        /* ─── BENTO GRID ─── */
        .wcu-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 10px;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
        }
        .wcu-grid.in { opacity: 1; transform: translateY(0); }

        /* Card base */
        .wcu-card {
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.065);
          border-radius: 12px;
          padding: 22px 24px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.35s ease, background 0.35s ease, transform 0.35s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .wcu-card:hover {
          border-color: rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.048);
          transform: translateY(-3px);
        }

        /* Large card spans 2 rows */
        .wcu-card-large {
          grid-row: span 2;
        }

        /* Per-card accent top line */
        .wcu-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: var(--c-accent, #c9a96e);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .wcu-card:hover::before { opacity: 1; }

        /* Big decorative number inside card */
        .wcu-card-bg-num {
          position: absolute;
          bottom: -20px; right: -8px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5.5rem;
          font-weight: 700;
          line-height: 1;
          color: rgba(255,255,255,0.03);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          transition: color 0.35s ease;
        }
        .wcu-card:hover .wcu-card-bg-num { color: rgba(255,255,255,0.055); }

        /* Card top row */
        .wcu-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .wcu-card-icon {
          font-size: 1.3rem;
          color: rgba(255,255,255,0.2);
          transition: color 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          line-height: 1;
        }
        .wcu-card:hover .wcu-card-icon {
          color: var(--c-accent, #c9a96e);
          transform: scale(1.15);
        }

        .wcu-card-tag {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 3px 8px;
          border-radius: 100px;
          transition: color 0.3s, border-color 0.3s;
        }
        .wcu-card:hover .wcu-card-tag {
          color: var(--c-accent, #c9a96e);
          border-color: var(--c-accent, #c9a96e);
          opacity: 0.7;
        }

        .wcu-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.15);
          margin-bottom: 6px;
        }

        .wcu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.18rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 8px;
        }
        .wcu-card-large .wcu-card-title {
          font-size: 1.55rem;
        }

        .wcu-card-body {
          font-size: 0.8rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.42);
          margin: 0;
          transition: color 0.35s;
        }
        .wcu-card:hover .wcu-card-body { color: rgba(255,255,255,0.62); }
        .wcu-card-large .wcu-card-body { font-size: 0.875rem; }

        /* ─── Stats strip ─── */
        .wcu-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s;
        }
        .wcu-stats.in { opacity: 1; transform: translateY(0); }

        .wcu-stat {
          background: rgba(201,169,110,0.06);
          border: 1px solid rgba(201,169,110,0.12);
          border-radius: 8px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: background 0.25s, border-color 0.25s;
        }
        .wcu-stat:hover {
          background: rgba(201,169,110,0.1);
          border-color: rgba(201,169,110,0.22);
        }

        .wcu-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 600;
          color: #c9a96e;
          line-height: 1;
          flex-shrink: 0;
        }

        .wcu-stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(201,169,110,0.2);
          flex-shrink: 0;
        }

        .wcu-stat-label {
          font-size: 0.72rem;
          font-weight: 300;
          color: rgba(255,255,255,0.38);
          line-height: 1.4;
          letter-spacing: 0.02em;
        }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .wcu {
            height: auto; max-height: none;
            padding: 60px 24px;
          }
          .wcu-inner { padding: 0; gap: 28px; height: auto; }
          .wcu-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .wcu-card-large { grid-row: span 1; grid-column: span 2; }
          .wcu-bg-num { display: none; }
        }

        @media (max-width: 560px) {
          .wcu-grid { grid-template-columns: 1fr; }
          .wcu-card-large { grid-column: span 1; }
          .wcu-stats { grid-template-columns: 1fr; }
          .wcu-header { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <section className="wcu" ref={sectionRef}>
        <div className="wcu-blob wcu-blob-1" />
        <div className="wcu-blob wcu-blob-2" />
        <div className="wcu-bg-num">WHY</div>

        <div className="wcu-inner">

          {/* ── Header ── */}
          <div className={`wcu-header ${visible ? "in" : ""}`}>
            <div>
              <div className="wcu-label">
                <div className="wcu-label-line" />
                <span className="wcu-label-text">Why Choose Us</span>
              </div>
              <h2 className="wcu-title">
                The difference is in<br /><em>how we work.</em>
              </h2>
            </div>
            <div className="wcu-header-right">
              <Link href="/about" className="wcu-header-cta">
                About the firm →
              </Link>
            </div>
          </div>

          {/* ── Bento Grid ── */}
          <div className={`wcu-grid ${visible ? "in" : ""}`}>

            {/* LARGE CARD */}
            <div
              className="wcu-card wcu-card-large"
              style={{ "--c-accent": reasons[0].accent } as React.CSSProperties}
            >
              <div className="wcu-card-bg-num">{reasons[0].number}</div>
              <div>
                <div className="wcu-card-top">
                  <span className="wcu-card-icon">{reasons[0].icon}</span>
                  <span className="wcu-card-tag">{reasons[0].tag}</span>
                </div>
                <div className="wcu-card-num">{reasons[0].number}</div>
                <h3 className="wcu-card-title">{reasons[0].title}</h3>
                <p className="wcu-card-body">{reasons[0].body}</p>
              </div>
              {/* Mini stat inside large card */}
              <div style={{
                marginTop: "18px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                gap: "20px",
              }}>
                {["240+ Clients", "12+ Years", "30+ Industries"].map((s) => (
                  <div key={s} style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em" }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* SMALL CARDS */}
            {reasons.slice(1).map((r) => (
              <div
                key={r.number}
                className="wcu-card"
                style={{ "--c-accent": r.accent } as React.CSSProperties}
              >
                <div className="wcu-card-bg-num">{r.number}</div>
                <div>
                  <div className="wcu-card-top">
                    <span className="wcu-card-icon">{r.icon}</span>
                    <span className="wcu-card-tag">{r.tag}</span>
                  </div>
                  <div className="wcu-card-num">{r.number}</div>
                  <h3 className="wcu-card-title">{r.title}</h3>
                  <p className="wcu-card-body">{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Stats strip ── */}
          <div className={`wcu-stats ${visible ? "in" : ""}`}>
            {stats.map((s) => (
              <div key={s.label} className="wcu-stat">
                <div className="wcu-stat-val">{s.value}</div>
                <div className="wcu-stat-divider" />
                <div className="wcu-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}