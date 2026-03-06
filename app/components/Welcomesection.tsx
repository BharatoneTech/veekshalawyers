"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function WelcomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ws {
          background: #f9f6f1;
          position: relative;
          overflow: hidden;
          height: 100vh;
          min-height: 580px;
          max-height: 860px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 40px;
          font-family: 'DM Sans', sans-serif;
        }

        /* Gold top border */
        .ws::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #c9a96e 30%, #e2c99a 50%, #c9a96e 70%, transparent);
        }

        /* Dot texture */
        .ws-dots {
          position: absolute; inset: 0;
          opacity: 0.022;
          background-image: radial-gradient(circle, #8b6914 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Watermark */
        .ws-wm {
          position: absolute;
          bottom: -30px; right: -10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 14vw, 160px);
          font-weight: 600;
          color: rgba(201,169,110,0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.03em;
        }

        .ws-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Label */
        .ws-label {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 28px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s, transform 0.7s;
        }
        .ws-label.in { opacity: 1; transform: translateY(0); }
        .ws-label-line { width: 34px; height: 1px; background: #c9a96e; }
        .ws-label-text { font-size: 0.67rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a96e; }

        /* Grid */
        .ws-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 64px;
          align-items: center;
        }

        /* ── LEFT ── */
        .ws-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.4vw, 3rem);
          font-weight: 300;
          line-height: 1.18;
          color: #1a1510;
          margin: 0 0 20px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease 0.12s, transform 0.8s ease 0.12s;
        }
        .ws-heading.in { opacity: 1; transform: translateY(0); }
        .ws-heading em { font-style: italic; color: #a07835; }

        .ws-sig {
          display: flex; align-items: center; gap: 13px;
          padding-top: 20px;
          border-top: 1px solid rgba(0,0,0,0.07);
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s;
        }
        .ws-sig.in { opacity: 1; transform: translateY(0); }
        .ws-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e, #8b6510);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600; color: #fff;
          flex-shrink: 0;
        }
        .ws-sig-name { font-size: 0.88rem; font-weight: 500; color: #1a1510; }
        .ws-sig-role { font-size: 0.7rem; color: rgba(0,0,0,0.38); letter-spacing: 0.04em; margin-top: 1px; }

        /* ── RIGHT ── */
        .ws-right {
          display: flex; flex-direction: column; gap: 18px;
        }

        .ws-note {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease 0.28s, transform 0.8s ease 0.28s;
        }
        .ws-note.in { opacity: 1; transform: translateY(0); }

        .ws-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 400;
          font-style: italic;
          color: #2c1f0a;
          line-height: 1.58;
          border-left: 2px solid #c9a96e;
          padding-left: 18px;
          margin: 0 0 16px;
        }

        .ws-body { display: flex; flex-direction: column; gap: 10px; }
        .ws-body p {
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.78;
          color: rgba(0,0,0,0.54);
          margin: 0;
        }
        .ws-body p strong { font-weight: 500; color: rgba(0,0,0,0.72); }

        /* Pillars */
        .ws-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(0,0,0,0.07);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 4px;
          overflow: hidden;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.46s, transform 0.8s ease 0.46s;
        }
        .ws-pillars.in { opacity: 1; transform: translateY(0); }
        .ws-pillar {
          background: #fff;
          padding: 16px 16px;
          display: flex; flex-direction: column; gap: 5px;
          transition: background 0.2s;
        }
        .ws-pillar:hover { background: #fdf9f4; }
        .ws-pillar-icon { font-size: 1rem; line-height: 1; }
        .ws-pillar-title { font-size: 0.78rem; font-weight: 500; color: #1a1510; }
        .ws-pillar-desc { font-size: 0.67rem; color: rgba(0,0,0,0.38); line-height: 1.45; }

        /* CTA */
        .ws-cta {
          display: flex; align-items: center; gap: 16px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.8s ease 0.62s, transform 0.8s ease 0.62s;
        }
        .ws-cta.in { opacity: 1; transform: translateY(0); }

        .btn-warm {
          display: inline-flex; align-items: center; gap: 9px;
          background: #1a1510; color: #f9f6f1;
          text-decoration: none;
          padding: 11px 24px; border-radius: 3px;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.04em;
          transition: background 0.2s, transform 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-warm:hover { background: #2e2518; transform: translateY(-2px); }
        .btn-warm svg { transition: transform 0.2s; }
        .btn-warm:hover svg { transform: translateX(4px); }

        .btn-outline-warm {
          display: inline-flex; align-items: center; gap: 7px;
          color: #a07835; text-decoration: none;
          font-size: 0.82rem; font-weight: 400; letter-spacing: 0.03em;
          border-bottom: 1px solid rgba(160,120,53,0.3);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-outline-warm:hover { color: #7a5c20; border-color: rgba(122,92,32,0.5); }

        /* Responsive */
        @media (max-width: 900px) {
          .ws { height: auto; max-height: none; padding: 60px 24px; }
          .ws-grid { grid-template-columns: 1fr; gap: 36px; }
          .ws-heading { font-size: clamp(1.8rem, 5vw, 2.4rem); }
        }
        @media (max-width: 560px) {
          .ws-pillars { grid-template-columns: 1fr; }
          .ws-cta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="ws" ref={sectionRef}>
        <div className="ws-dots" />
        <div className="ws-wm">Welcome</div>

        <div className="ws-inner">

          {/* Label */}
          <div className={`ws-label ${visible ? "in" : ""}`}>
            <div className="ws-label-line" />
            <span className="ws-label-text">A Note From Us</span>
          </div>

          <div className="ws-grid">

            {/* LEFT */}
            <div>
              <h2 className={`ws-heading ${visible ? "in" : ""}`}>
                More than consulting —<br />
                a genuine <em>partnership</em><br />
                built on trust.
              </h2>

              <div className={`ws-sig ${visible ? "in" : ""}`}>
                <div className="ws-avatar">A</div>
                <div>
                  <div className="ws-sig-name">Alexandra Reed</div>
                  <div className="ws-sig-role">Founder & Principal Consultant</div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="ws-right">

              <div className={`ws-note ${visible ? "in" : ""}`}>
                <blockquote className="ws-quote">
                  "Every business has untapped potential waiting to be unlocked. We're here to help you find it."
                </blockquote>
                <div className="ws-body">
                  <p>
                    Welcome, and thank you for being here. At our core, we believe that{" "}
                    <strong>great consulting isn't about handing you a report</strong> and walking away.
                    It's about sitting beside you, understanding what keeps you up at night, and working together toward something real.
                  </p>
                  <p>
                    Our approach is always the same:{" "}
                    <strong>listen deeply, think clearly, and act decisively.</strong>
                  </p>
                </div>
              </div>

              {/* Pillars */}
              <div className={`ws-pillars ${visible ? "in" : ""}`}>
                <div className="ws-pillar">
                  <div className="ws-pillar-icon">🤝</div>
                  <div className="ws-pillar-title">Trust First</div>
                  <div className="ws-pillar-desc">Relationships before transactions, always.</div>
                </div>
                <div className="ws-pillar">
                  <div className="ws-pillar-icon">🎯</div>
                  <div className="ws-pillar-title">Clarity</div>
                  <div className="ws-pillar-desc">We cut through noise to what truly matters.</div>
                </div>
                <div className="ws-pillar">
                  <div className="ws-pillar-icon">📈</div>
                  <div className="ws-pillar-title">Results</div>
                  <div className="ws-pillar-desc">Every action tied to measurable outcomes.</div>
                </div>
              </div>

              {/* CTA */}
              <div className={`ws-cta ${visible ? "in" : ""}`}>
                <Link href="/about" className="btn-warm">
                  Meet the Team
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services" className="btn-outline-warm">
                  Explore Services →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}