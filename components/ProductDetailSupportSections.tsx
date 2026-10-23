"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import chargingBackground from "@/asset/rivot_support_background_images (1)/rivot-charging-background.webp";
import storeBackground from "@/asset/rivot_support_background_images (1)/rivot-store-background.webp";

export function ProductDetailSupportSections({ includeBestFit = true }: { includeBestFit?: boolean }) {
  const supportSectionRef = useRef<HTMLElement>(null);
  const [supportVisible, setSupportVisible] = useState(false);

  useEffect(() => {
    const section = supportSectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setSupportVisible(true);
      return;
    }

    const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSupportVisible(true);
        observer.disconnect();
      },
      {
        threshold: isSmallScreen ? 0.06 : 0.14,
        rootMargin: isSmallScreen ? "0px 0px -3%" : "0px 0px -8%",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={supportSectionRef}
        className={`rivotSupport rivotSupportAnimated${supportVisible ? " isVisible" : ""}`}
        id="support"
        aria-labelledby="rivot-support-title"
      >
        <div className="rivotSupportShell">
          <div className="rivotSupportIntro">
            <div className="rivotSupportLead">
              <h2 id="rivot-support-title">Here for <em>every ride.</em></h2>
              <p>From showroom to charging and beyond — RIVOT is with you at every step of your journey.</p>
            </div>

            <div className="rivotSupportBenefits" aria-label="RIVOT support benefits">
              <article>
                <span><svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="10" r="4.5"/><path d="M7.5 26c.6-5.2 3.5-8 8.5-8s7.9 2.8 8.5 8"/></svg></span>
                <div><h3>Expert guidance</h3><p>Get the right advice from EV specialists.</p></div>
              </article>
              <article>
                <span><svg viewBox="0 0 32 32" fill="none"><path d="M18 3 9 17h7l-2 12 9-15h-7l2-11Z"/></svg></span>
                <div><h3>Charging access</h3><p>Tap into a growing charging network.</p></div>
              </article>
              <article>
                <span><svg viewBox="0 0 32 32" fill="none"><path d="M24 13c0 6-8 15-8 15S8 19 8 13a8 8 0 1 1 16 0Z"/><circle cx="16" cy="13" r="2.5"/></svg></span>
                <div><h3>Nationwide support</h3><p>Service and care across India.</p></div>
              </article>
              <article>
                <span><svg viewBox="0 0 32 32" fill="none"><path d="M7 17v-3a9 9 0 0 1 18 0v3"/><rect x="4" y="16" width="5" height="9" rx="2"/><rect x="23" y="16" width="5" height="9" rx="2"/><path d="M23 25c-1 3-3 4-7 4"/></svg></span>
                <div><h3>Quick assistance</h3><p>Real help, when you need it.</p></div>
              </article>
            </div>
          </div>

          <div className="rivotSupportCards">
            <article className="rivotSupportCard rivotSupportStore">
              <div className="rivotSupportImage">
                <Image src={storeBackground} alt="RIVOT electric scooters inside a RIVOT showroom" fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="rivotSupportCardBody">
                <div className="rivotSupportCardCopy">
                  <p className="rivotSupportEyebrow">RIVOT Stores</p>
                  <h3>Visit a <em>RIVOT</em> store</h3>
                  <p>Experience our electric scooters up close. Get expert guidance, book a test ride, and explore the full range.</p>
                  <Link href="/book-now" className="rivotSupportCta">Find a store <span aria-hidden="true">→</span></Link>
                </div>
                <ul>
                  <li><span aria-hidden="true">◎</span> Explore the range</li>
                  <li><span aria-hidden="true">▣</span> Book a test ride</li>
                  <li><span aria-hidden="true">♙</span> Get expert advice</li>
                </ul>
              </div>
            </article>

            <article className="rivotSupportCard rivotSupportCharge">
              <div className="rivotSupportImage">
                <Image src={chargingBackground} alt="RIVOT flashCharge charging station" fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="rivotSupportCardBody">
                <div className="rivotSupportCardCopy">
                  <p className="rivotSupportEyebrow">Charging Network</p>
                  <h3>Charge with confidence</h3>
                  <p>Access a growing network of RIVOT flashCharge stations across key cities and highways.</p>
                  <Link href="/products" className="rivotSupportCta">Explore charging network <span aria-hidden="true">→</span></Link>
                </div>
                <ul>
                  <li><span aria-hidden="true">⌖</span> Find charging stations</li>
                  <li><span aria-hidden="true">ϟ</span> Fast &amp; reliable charging</li>
                  <li><span aria-hidden="true">◇</span> Coverage across India</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {includeBestFit ? <section className="rivotBestFit" aria-labelledby="best-fit-title">
        <div className="rivotBestFitShell">
          <div className="rivotBestFitHeader">
            <h2 id="best-fit-title">A best fit for your Scooter</h2>
            <p>There&apos;s more under the hood.</p>
          </div>

          <div className="rivotBestFitGrid">
            <article className="rivotBestFitCard rivotBestFitAccessories">
              <Image src="/images/shop/accessories.optimized.webp" alt="RIVOT scooter accessories" fill sizes="(max-width: 1000px) 100vw, 33vw" className="rivotBestFitCardImage" />
              <h3>Accessories</h3>
              <p>There&apos;s more under the hood.</p>
              <Link href="/merchandise" className="rivotBestFitCta">
                Shop accessories <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </article>

            <Link href="/legal/warranty" className="rivotBestFitCard" aria-label="View RIVOT extended warranty">
              <Image src="/images/shop/battery.optimized.webp" alt="Battery and motor extended warranty" fill sizes="(max-width: 1000px) 100vw, 33vw" className="rivotBestFitCardImage" />
              <p className="rivotBestFitEyebrow rivotBestFitGreenText">Extended Warranty</p>
              <h3>Battery + Motor</h3>
              <p>Engineered for a longer, smarter ride.</p>
              <span className="rivotBestFitCta">Explore more</span>
            </Link>

            <article className="rivotBestFitCard rivotBestFitSubscription">
              <Image src="/images/shop/smart-care.optimized.webp" alt="Smart Care extended scooter coverage" fill sizes="(max-width: 1000px) 100vw, 33vw" className="rivotBestFitCardImage" />
              <p className="rivotBestFitEyebrow rivotBestFitBlueText">Subscription</p>
              <h3>Smart Care</h3>
              <p>Extended Warranty &amp; Care for your Simple Scooters.</p>
              <Link href="/legal/subscriptions" className="rivotBestFitCta">
                Explore more
              </Link>
            </article>
          </div>
        </div>
      </section> : null}

      <style>{`
        .rivotSupport {
          position: relative;
          display: flex;
          min-height: calc(100svh - 84px);
          align-items: center;
          padding: clamp(30px, 4vh, 48px) clamp(20px, 3.5vw, 58px);
          overflow: hidden;
          background:
            radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 30%),
            linear-gradient(135deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 92%, var(--surface) 8%) 54%, var(--bg) 100%);
          color: var(--text);
        }

        .rivotSupport::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(118deg, transparent 0 22%, color-mix(in srgb, var(--surface) 46%, transparent) 22.1% 41%, transparent 41.1%),
            linear-gradient(135deg, transparent 0 73%, color-mix(in srgb, var(--border) 30%, transparent) 73.1%, transparent 93%);
          pointer-events: none;
        }

        .rivotSupportShell {
          position: relative;
          width: min(100%, 1540px);
          margin: 0 auto;
        }

        .rivotSupportAnimated .rivotSupportLead,
        .rivotSupportAnimated .rivotSupportBenefits article,
        .rivotSupportAnimated .rivotSupportCard {
          opacity: 0;
          will-change: transform, opacity;
          transition:
            opacity .72s cubic-bezier(.22, 1, .36, 1),
            transform .82s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotSupportAnimated .rivotSupportLead { transform: translate3d(-42px, 18px, 0); }
        .rivotSupportAnimated .rivotSupportBenefits article { transform: translate3d(0, 30px, 0); }
        .rivotSupportAnimated .rivotSupportCard:first-child { transform: translate3d(-48px, 36px, 0); }
        .rivotSupportAnimated .rivotSupportCard:last-child { transform: translate3d(48px, 36px, 0); }

        .rivotSupportAnimated.isVisible :is(.rivotSupportLead, .rivotSupportBenefits article, .rivotSupportCard) {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .rivotSupportAnimated .rivotSupportBenefits article:nth-child(1) { transition-delay: .1s; }
        .rivotSupportAnimated .rivotSupportBenefits article:nth-child(2) { transition-delay: .17s; }
        .rivotSupportAnimated .rivotSupportBenefits article:nth-child(3) { transition-delay: .24s; }
        .rivotSupportAnimated .rivotSupportBenefits article:nth-child(4) { transition-delay: .31s; }
        .rivotSupportAnimated .rivotSupportCard:first-child { transition-delay: .24s; }
        .rivotSupportAnimated .rivotSupportCard:last-child { transition-delay: .36s; }

        @media (prefers-reduced-motion: reduce) {
          .rivotSupportAnimated :is(.rivotSupportLead, .rivotSupportBenefits article, .rivotSupportCard) {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .rivotSupportIntro {
          display: grid;
          grid-template-columns: minmax(420px, .95fr) minmax(680px, 1.25fr);
          gap: clamp(34px, 5vw, 80px);
          align-items: end;
          margin-bottom: clamp(22px, 3vh, 34px);
        }

        .rivotSupportLead h2 {
          margin: 0;
          color: var(--text);
          font-size: clamp(44px, 4vw, 64px);
          font-weight: 900;
          line-height: .98;
          letter-spacing: -.055em;
          white-space: nowrap;
        }

        .rivotSupportLead h2 em {
          color: #ff5f18;
          font-style: normal;
        }

        .rivotSupportLead > p {
          max-width: 650px;
          margin: 12px 0 0;
          color: var(--muted);
          font-size: clamp(15px, 1.05vw, 18px);
          font-weight: 500;
          line-height: 1.4;
        }

        .rivotSupportBenefits {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .rivotSupportBenefits article {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          padding: 0 clamp(12px, 1.5vw, 24px);
          border-left: 1px solid var(--border);
          text-align: center;
        }

        .rivotSupportBenefits article:first-child { border-left: 0; }

        .rivotSupportBenefits span,
        .rivotSupportCardBody li span {
          display: grid;
          width: 46px;
          height: 46px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(239, 116, 48, .18);
          border-radius: 50%;
          background: color-mix(in srgb, var(--surface) 90%, var(--accent) 10%);
          color: var(--text);
        }

        .rivotSupportBenefits svg {
          width: 23px;
          height: 23px;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .rivotSupportBenefits h3 {
          margin: 10px 0 0;
          color: var(--text);
          font-size: 14px;
          font-weight: 850;
          line-height: 1.2;
          letter-spacing: -.02em;
        }

        .rivotSupportBenefits p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 12px;
          font-weight: 500;
          line-height: 1.4;
        }

        .rivotSupportCards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .rivotSupportCard {
          overflow: hidden;
          border: 1px solid rgba(239, 116, 48, .26);
          border-radius: 18px;
          background: color-mix(in srgb, var(--surface) 94%, transparent);
          box-shadow: 0 18px 42px var(--shadow);
        }

        .rivotSupportCharge { border-color: rgba(37, 167, 93, .25); }

        .rivotSupportImage {
          position: relative;
          height: clamp(220px, 18vw, 300px);
          margin: 10px 10px 0;
          overflow: hidden;
          border-radius: 11px;
          background: #e9edf0;
        }

        .rivotSupportImage img {
          object-fit: cover;
          object-position: center;
          transition: transform .6s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotSupportCard:hover .rivotSupportImage img { transform: scale(1.025); }

        .rivotSupportCardBody {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(205px, .75fr);
          gap: 18px;
          align-items: end;
          padding: 16px 20px 20px;
        }

        .rivotSupportEyebrow {
          margin: 0 0 8px;
          color: #f05b19;
          font-size: 12px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .rivotSupportCharge .rivotSupportEyebrow { color: #16833e; }

        .rivotSupportCardCopy h3 {
          margin: 0;
          color: var(--text);
          font-size: clamp(25px, 1.9vw, 32px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.045em;
        }

        .rivotSupportCardCopy h3 em {
          color: #d52c1e;
          font-style: normal;
        }

        .rivotSupportCardCopy > p:not(.rivotSupportEyebrow) {
          max-width: 520px;
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.45;
        }

        .rivotSupportCta {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          gap: 22px;
          margin-top: 13px;
          padding: 0 13px 0 22px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff651c, #f1490d);
          color: #fff;
          font-size: 14px;
          font-weight: 850;
          box-shadow: 0 10px 24px rgba(241, 73, 13, .18);
        }

        .rivotSupportCta span {
          display: grid;
          width: 27px;
          height: 27px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .9);
          color: #f1490d;
          font-size: 18px;
        }

        .rivotSupportCharge .rivotSupportCta {
          background: linear-gradient(135deg, #159a46, #08762e);
          box-shadow: 0 10px 24px rgba(8, 118, 46, .18);
        }

        .rivotSupportCharge .rivotSupportCta span { color: #08762e; }

        .rivotSupportCardBody ul {
          display: grid;
          gap: 7px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .rivotSupportCardBody li {
          display: flex;
          align-items: center;
          gap: 11px;
          color: var(--muted);
          font-size: 13px;
          font-weight: 650;
          white-space: nowrap;
        }

        .rivotSupportCardBody li span {
          width: 31px;
          height: 31px;
          border-color: rgba(239, 116, 48, .22);
          font-size: 19px;
        }

        .rivotSupportCharge .rivotSupportCardBody li span {
          border-color: rgba(37, 167, 93, .22);
          background: color-mix(in srgb, var(--surface) 90%, #25a75d 10%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupport {
          background:
            radial-gradient(circle at 88% 10%, rgba(226, 122, 66, .1), transparent 30%),
            linear-gradient(135deg, var(--bg), var(--surface) 54%, var(--bg)) !important;
          color: #fff;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupportLead h2,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupportBenefits h3,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupportCardCopy h3 { color: #f7f8f8; }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupportCard { background: #141718; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupportBenefits span { background: #191b1d; color: #fff; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.rivotSupportLead > p, .rivotSupportBenefits p, .rivotSupportCardCopy > p:not(.rivotSupportEyebrow), .rivotSupportCardBody li) { color: #aeb7c2; }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotSupportBenefits article { border-left-color: rgba(255, 255, 255, .12); }

        @media (max-width: 1180px) {
          .rivotSupport { min-height: 0; padding-block: 56px; }
          .rivotSupportIntro { grid-template-columns: 1fr; align-items: start; }
          .rivotSupportLead h2 { white-space: normal; }
          .rivotSupportBenefits { max-width: 900px; }
          .rivotSupportCards { grid-template-columns: 1fr; }
          .rivotSupportImage { height: clamp(260px, 43vw, 420px); }
        }

        @media (max-width: 700px) {
          .rivotSupport { min-height: 0; padding: 42px 12px; }
          .rivotSupportAnimated .rivotSupportLead {
            transform: translate3d(0, 28px, 0) scale(.98);
            transition-duration: .58s, .68s;
          }
          .rivotSupportAnimated .rivotSupportBenefits article {
            transition-duration: .52s, .62s;
          }
          .rivotSupportAnimated .rivotSupportBenefits article:nth-child(odd) { transform: translate3d(-24px, 16px, 0); }
          .rivotSupportAnimated .rivotSupportBenefits article:nth-child(even) { transform: translate3d(24px, 16px, 0); }
          .rivotSupportAnimated .rivotSupportCard:first-child,
          .rivotSupportAnimated .rivotSupportCard:last-child {
            transform: translate3d(0, 34px, 0) scale(.965);
            transition-duration: .6s, .72s;
          }
          .rivotSupportAnimated.isVisible :is(.rivotSupportLead, .rivotSupportBenefits article, .rivotSupportCard) {
            transform: translate3d(0, 0, 0) scale(1);
          }
          .rivotSupportAnimated .rivotSupportBenefits article:nth-child(1) { transition-delay: .12s; }
          .rivotSupportAnimated .rivotSupportBenefits article:nth-child(2) { transition-delay: .2s; }
          .rivotSupportAnimated .rivotSupportBenefits article:nth-child(3) { transition-delay: .28s; }
          .rivotSupportAnimated .rivotSupportBenefits article:nth-child(4) { transition-delay: .36s; }
          .rivotSupportAnimated .rivotSupportCard:first-child { transition-delay: .42s; }
          .rivotSupportAnimated .rivotSupportCard:last-child { transition-delay: .54s; }
          .rivotSupportIntro { gap: 26px; margin-bottom: 20px; }
          .rivotSupportLead h2 { font-size: clamp(32px, 10vw, 40px); line-height: 1; }
          .rivotSupportLead > p { margin-top: 10px; font-size: 14px; line-height: 1.45; }
          .rivotSupportBenefits { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 0; }
          .rivotSupportBenefits article { padding-inline: 8px; }
          .rivotSupportBenefits article:nth-child(3) { border-left: 0; }
          .rivotSupportBenefits span { width: 40px; height: 40px; }
          .rivotSupportBenefits svg { width: 20px; height: 20px; }
          .rivotSupportBenefits h3 { margin-top: 8px; font-size: 12px; }
          .rivotSupportBenefits p { margin-top: 4px; font-size: 11px; line-height: 1.35; }
          .rivotSupportCards { gap: 14px; }
          .rivotSupportCard { border-radius: 14px; }
          .rivotSupportImage { height: clamp(185px, 56vw, 220px); margin: 7px 7px 0; border-radius: 9px; }
          .rivotSupportCardBody { grid-template-columns: 1fr; gap: 14px; padding: 15px; }
          .rivotSupportEyebrow { margin-bottom: 6px; font-size: 10px; }
          .rivotSupportCardCopy h3 { font-size: clamp(22px, 7vw, 27px); }
          .rivotSupportCardCopy > p:not(.rivotSupportEyebrow) { margin-top: 6px; font-size: 12px; }
          .rivotSupportCardBody ul { gap: 6px; }
          .rivotSupportCardBody li { gap: 9px; font-size: 12px; white-space: normal; }
          .rivotSupportCardBody li span { width: 28px; height: 28px; font-size: 16px; }
          .rivotSupportCta { width: 100%; min-height: 42px; justify-content: space-between; margin-top: 11px; font-size: 13px; }
        }

        @media (max-width: 390px) {
          .rivotSupport { padding: 36px 10px; }
          .rivotSupportLead h2 { font-size: 31px; letter-spacing: -.045em; }
          .rivotSupportLead > p { font-size: 13px; }
          .rivotSupportBenefits { gap: 20px 0; }
          .rivotSupportBenefits h3 { font-size: 11.5px; }
          .rivotSupportBenefits p { font-size: 10.5px; }
          .rivotSupportImage { height: 184px; }
          .rivotSupportCardBody { padding: 13px; }
          .rivotSupportCardCopy h3 { font-size: 22px; }
        }

        @media (max-width: 700px) and (prefers-reduced-motion: reduce) {
          .rivotSupportAnimated :is(.rivotSupportLead, .rivotSupportBenefits article, .rivotSupportCard) {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .rivotReach {
          padding: clamp(8px, 1.5vw, 18px) clamp(10px, 2vw, 22px) clamp(64px, 7vw, 92px);
          background: #050606;
          color: #f5f5f2;
          overflow: hidden;
        }

        .rivotReachPanel {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0;
          width: min(100%, 1360px);
          margin: 0 auto;
          border-radius: 16px;
          background: #111313;
          box-shadow:
            0 12px 34px rgba(17, 17, 17, .08),
            inset 0 0 0 1px rgba(255, 255, 255, .12);
        }

        .rivotReachCard {
          position: relative;
          display: grid;
          grid-template-columns: minmax(185px, .78fr) minmax(240px, 1.08fr);
          min-height: clamp(250px, 24vw, 330px);
          overflow: hidden;
          background: #111313;
        }

        .rivotReachStore {
          border-radius: 16px 0 0 16px;
        }

        .rivotReachCharge {
          border-left: 1px solid rgba(255, 255, 255, .12);
          border-radius: 0 16px 16px 0;
        }

        .rivotReachCard::before {
          content: "";
          position: absolute;
          left: -40px;
          bottom: -42px;
          width: 220px;
          height: 120px;
          opacity: .16;
          background-image: radial-gradient(rgba(239, 116, 48, .62) 1px, transparent 1px);
          background-size: 10px 10px;
        }

        .rivotReachCopy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(42px, 4.2vw, 62px) clamp(24px, 3.2vw, 46px) clamp(28px, 2.8vw, 40px);
        }

        .rivotReachIcon {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          margin-bottom: 16px;
          border: 1px solid rgba(239, 116, 48, .18);
          border-radius: 13px;
          color: #ef7430;
          background: #1a1c1c;
          box-shadow: 0 10px 24px rgba(239, 116, 48, .1);
        }

        .rivotReachIcon svg {
          width: 26px;
          height: 26px;
        }

        .rivotReachCopy > p {
          margin: 0 0 18px;
          color: #ef7430;
          font-size: 15px;
          font-weight: 900;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .rivotReachCopy h2 {
          margin: 0;
          color: #f5f5f2;
          font-size: clamp(30px, 3vw, 46px);
          font-weight: 800;
          line-height: .98;
          letter-spacing: -.055em;
        }

        .rivotReachCopy small {
          display: block;
          max-width: 255px;
          margin-top: 16px;
          color: #c7cbc7;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.55;
        }

        .rivotReachArrow {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          margin-top: 24px;
          border-radius: 50%;
          background: #ef7430;
          color: #fff;
          font-size: 23px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 12px 24px rgba(239, 116, 48, .24);
        }

        .rivotReachCharge .rivotReachCopy > p,
        .rivotReachCharge .rivotReachIcon,
        .rivotReachCharge .rivotReachArrow {
          color: #25a75d;
        }

        .rivotReachCharge .rivotReachIcon {
          border-color: rgba(37, 167, 93, .2);
          box-shadow: 0 10px 24px rgba(37, 167, 93, .1);
        }

        .rivotReachCharge .rivotReachArrow {
          background: #25a75d;
          color: #fff;
          box-shadow: 0 12px 24px rgba(37, 167, 93, .22);
        }

        .rivotReachMedia {
          position: relative;
          min-height: 100%;
          margin: 18px 18px 18px 0;
          border-radius: 0 14px 14px 0;
          clip-path: polygon(17% 0, 93% 0, 100% 7%, 100% 93%, 93% 100%, 17% 100%, 0 50%);
          background: #111;
        }

        .rivotReachMedia img {
          object-fit: cover;
          object-position: center;
        }

        .rivotReachCharge .rivotReachMedia {
          margin-right: 18px;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReach {
          background: #080909 !important;
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachPanel,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCard {
          background: #111313 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachPanel {
          box-shadow:
            0 18px 46px rgba(0, 0, 0, .38),
            inset 0 0 0 1px rgba(255, 255, 255, .12);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge {
          border-left-color: rgba(255, 255, 255, .12);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachIcon {
          background: #1a1c1c !important;
          border-color: rgba(239, 116, 48, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge .rivotReachIcon {
          border-color: rgba(37, 167, 93, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCopy h2,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCopy small {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachStore .rivotReachCopy > p {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge .rivotReachCopy > p {
          color: #39c976 !important;
        }

        .rivotBestFit {
          position: relative;
          padding: clamp(54px, 6vw, 82px) clamp(16px, 4vw, 48px) clamp(54px, 6vw, 82px);
          background:
            radial-gradient(circle at 12% 8%, rgba(239, 116, 48, .12), transparent 28%),
            radial-gradient(circle at 88% 82%, rgba(239, 116, 48, .08), transparent 32%),
            linear-gradient(180deg, #fff 0%, #fbfaf8 54%, #f6f3ef 100%);
          color: #151515;
          overflow: hidden;
        }

        .rivotBestFit::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(132deg, transparent 0 58%, rgba(239, 116, 48, .08) 58.15% 58.35%, transparent 58.55%),
            repeating-linear-gradient(90deg, rgba(17, 17, 17, .025) 0 1px, transparent 1px 112px);
          pointer-events: none;
        }

        .rivotBestFitShell {
          position: relative;
          width: min(100%, 1160px);
          margin: 0 auto;
        }

        .rivotBestFitHeader {
          position: relative;
          text-align: center;
        }

        .rivotBestFitHeader > p {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          margin: 0 0 10px;
          color: #ef7430;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .24em;
          line-height: 1;
          text-transform: uppercase;
        }

        .rivotBestFitHeader > p::before,
        .rivotBestFitHeader > p::after {
          content: "";
          width: 20px;
          height: 2px;
          background: #ef7430;
        }

        .rivotBestFitHeader h2 {
          margin: 0;
          color: #10161a;
          font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .rivotBestFitHeader small {
          display: block;
          margin: 8px 0 0;
          color: #606c74;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
        }

        .rivotBestFitGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 28px);
          margin-top: clamp(28px, 3.2vw, 42px);
          align-items: stretch;
        }

        .rivotBestFitCard {
          position: relative;
          display: grid;
          min-height: 330px;
          grid-template-rows: 130px auto auto 1fr auto;
          justify-items: center;
          align-items: start;
          padding: 34px 28px 32px;
          border: 1px solid rgba(17, 17, 17, .045);
          border-radius: 18px;
          background: rgba(255, 255, 255, .88);
          box-shadow: 0 18px 48px rgba(24, 28, 31, .06);
          text-align: center;
          overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }

        .rivotBestFitCard::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 0%, rgba(239, 116, 48, .055), transparent 42%),
            linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(239, 116, 48, .018));
          pointer-events: none;
        }

        .rivotBestFitCard:hover {
          transform: translateY(-3px);
          border-color: rgba(239, 116, 48, .18);
          box-shadow: 0 24px 54px rgba(40, 27, 18, .12);
        }

        .rivotBestFitShield {
          position: relative;
          z-index: 1;
          display: grid;
          width: 108px;
          height: 108px;
          place-items: center;
          margin: 0 auto 14px;
          color: #5e86ff;
          filter: drop-shadow(0 18px 26px rgba(94, 134, 255, .18));
        }

        .rivotBestFitShield svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .rivotBestFitShieldGreen {
          color: #29d86f;
          filter: drop-shadow(0 18px 26px rgba(41, 216, 111, .18));
        }

        .rivotBestFitShieldBlue {
          color: #5e86ff;
        }

        .rivotBestFitCard h3 {
          position: relative;
          z-index: 1;
          margin: 14px 0 0;
          color: #10161a;
          font-size: 26px;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: 0;
        }

        .rivotBestFitCard > p {
          position: relative;
          z-index: 1;
          max-width: 260px;
          margin: 12px 0 0;
          color: #606c74;
          font-size: 14px;
          font-weight: 650;
          line-height: 1.35;
        }

        .rivotBestFitEyebrow {
          position: relative;
          z-index: 1;
          margin: 4px 0 0;
          color: #ef7430;
          font-size: 11px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: .34em;
          text-transform: uppercase;
        }

        .rivotBestFitBlueText {
          color: #5e86ff;
        }

        .rivotBestFitGreenText {
          color: #16c766;
        }

        .rivotBestFitPill,
        .rivotBestFitDisabled {
          position: relative;
          z-index: 1;
          align-self: end;
          display: inline-flex;
          min-width: 140px;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          margin-top: 34px;
          border: 0;
          border-radius: 999px;
          background: #f2f2f2;
          color: #10161a;
          font: inherit;
          font-size: 14px;
          font-weight: 750;
          line-height: 1;
          box-shadow: inset 0 0 0 1px rgba(17, 17, 17, .02);
          transition: transform .2s ease, background .2s ease, color .2s ease;
        }

        .rivotBestFitDisabled {
          color: #aab0b4;
          cursor: not-allowed;
        }

        .rivotBestFitPill:hover,
        .rivotBestFitPill:focus-visible {
          background: #ef7430;
          color: #fff;
          outline: none;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .rivotReach {
            padding-bottom: 54px;
          }

          .rivotReachPanel {
            grid-template-columns: 1fr;
            gap: 14px;
            padding-top: 54px;
            border-radius: 16px;
            box-shadow: none;
          }

          .rivotReachCard {
            grid-template-columns: minmax(190px, .85fr) minmax(240px, 1.15fr);
            border-radius: 16px;
            box-shadow:
              0 14px 36px rgba(17, 17, 17, .08),
              inset 0 0 0 1px rgba(17, 17, 17, .05);
          }

          .rivotReachCharge {
            border-left: 0;
          }

          .rivotBestFit {
            padding: 48px 20px 54px;
          }

          .rivotBestFitGrid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-inline: auto;
          }

          .rivotBestFitCard {
            min-height: 320px;
          }
        }

        @media (max-width: 560px) {
          .rivotReach {
            padding: 20px 12px 44px;
          }

          .rivotReachPanel {
            gap: 14px;
            padding-top: 50px;
          }

          .rivotReachCard {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .rivotReachCopy {
            padding: 28px 22px 22px;
          }

          .rivotReachMedia {
            min-height: 240px;
            margin: 0;
            border-radius: 14px 14px 0 0;
            clip-path: none;
            order: -1;
          }

          .rivotBestFit {
            padding: 46px 12px;
          }

          .rivotBestFitHeader h2 {
            font-size: clamp(28px, 9vw, 36px);
          }

          .rivotBestFitGrid {
            gap: 14px;
            margin-top: 26px;
          }

          .rivotBestFitCard {
            min-height: 300px;
            padding: 28px 18px;
            border-radius: 16px;
          }

          .rivotBestFitShield {
            width: 96px;
            height: 96px;
          }

          .rivotBestFitCard h3 {
            font-size: 23px;
          }
        }

        /* Match the access-network cards used on the home page. */
        .rivotReach {
          padding: clamp(28px, 3vw, 48px) clamp(18px, 4vw, 64px) clamp(64px, 7vw, 92px);
          background: var(--bg);
          color: #111;
        }

        .rivotReachPanel {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 28px);
          width: min(100%, 1360px);
          padding: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .rivotReachCard {
          grid-template-columns: minmax(0, .96fr) minmax(0, 1.04fr);
          min-height: clamp(250px, 24vw, 330px);
          border: 0;
          border-radius: 24px;
          background: var(--surface);
          box-shadow: 0 18px 46px var(--shadow);
          transition: transform .35s cubic-bezier(.22, 1, .36, 1), box-shadow .35s ease;
        }

        .rivotReachStore {
          border-radius: 24px;
          background: linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 91%, #ef7430 9%) 100%);
        }

        .rivotReachCharge {
          border: 0;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 91%, #25a75d 9%) 100%);
        }

        .rivotReachCopy {
          min-width: 0;
          padding: clamp(42px, 4.2vw, 62px) clamp(24px, 2.2vw, 36px) clamp(28px, 2.8vw, 40px);
        }

        .rivotReachIcon {
          background: #fff;
        }

        .rivotReachCopy h2 {
          max-width: 100%;
          color: #050505;
          font-size: clamp(34px, 2.45vw, 46px);
          overflow-wrap: normal;
          text-wrap: balance;
        }

        .rivotReachCharge .rivotReachCopy h2 {
          font-size: clamp(32px, 2.3vw, 43px);
        }

        .rivotReachCopy small {
          color: #42464d;
        }

        .rivotReachArrow {
          display: inline-flex;
          width: auto;
          min-width: 176px;
          height: 52px;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 0 16px 0 22px;
          border: 1px solid rgba(255, 255, 255, .26);
          border-radius: 999px;
          background: linear-gradient(135deg, #ff833e, #ef6725);
          color: #fff;
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
        }

        .rivotReachArrow b {
          font-size: 14px;
          font-weight: 850;
          letter-spacing: -.01em;
        }

        .rivotReachArrow span {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .18);
        }

        .rivotReachArrow:hover {
          filter: brightness(1.04);
          transform: translateY(-3px);
        }

        .rivotReachCharge .rivotReachArrow {
          background: linear-gradient(135deg, #2cc771, #159d51);
          color: #fff;
        }

        .rivotReachMedia,
        .rivotReachCharge .rivotReachMedia {
          z-index: 1;
          min-width: 0;
          margin: 18px 18px 18px 0;
          overflow: hidden;
          border: 0;
          border-radius: 20px;
          clip-path: none;
          box-shadow: 0 14px 32px rgba(17, 17, 17, .14);
        }

        .rivotReachMedia img {
          transition: transform .45s cubic-bezier(.22, 1, .36, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .rivotReachCard:hover {
            transform: translateY(-7px);
            box-shadow: 0 30px 66px rgba(17, 17, 17, .14);
          }

          .rivotReachCard:hover .rivotReachMedia img {
            transform: scale(1.045);
          }
        }

        @media (min-width: 1001px) {
          .rivotReachCard {
            display: block;
            min-height: clamp(390px, 31vw, 500px);
            isolation: isolate;
          }

          .rivotReachCopy {
            width: 52%;
            min-height: clamp(390px, 31vw, 500px);
            padding: clamp(34px, 3.2vw, 52px) clamp(26px, 3vw, 48px);
          }

          .rivotReachCopy h2 {
            font-size: clamp(36px, 2.8vw, 52px);
          }

          .rivotReachCharge .rivotReachCopy h2 {
            font-size: clamp(34px, 2.55vw, 48px);
          }

          .rivotReachMedia,
          .rivotReachCharge .rivotReachMedia {
            position: absolute;
            inset: 16px 16px 16px auto;
            width: 51%;
            min-height: 0;
            margin: 0;
            border-radius: 42% 20px 20px 42%;
          }

          .rivotReachStore .rivotReachMedia img { object-position: 57% center; }
          .rivotReachCharge .rivotReachMedia img { object-position: 55% center; }
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachPanel {
          background: transparent !important;
          box-shadow: none;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachStore {
          background: linear-gradient(135deg, #111313 0%, #1c1511 100%) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotReachCharge {
          background: linear-gradient(135deg, #111313 0%, #102018 100%) !important;
        }

        @media (max-width: 1000px) {
          .rivotReachPanel {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .rivotReachCard {
            grid-template-columns: minmax(190px, .85fr) minmax(240px, 1.15fr);
          }
        }

        @media (max-width: 560px) {
          .rivotReach {
            padding: 20px 12px 44px;
          }

          .rivotReachPanel {
            padding: 0;
          }

          .rivotReachCard {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .rivotReachCopy {
            padding: 28px 22px 22px;
          }

          .rivotReachMedia,
          .rivotReachCharge .rivotReachMedia {
            min-height: 240px;
            margin: 0;
            border-radius: 14px 14px 0 0;
            order: -1;
          }
        }

        /* Keep the product-page shop section in sync with the home-page cards. */
        .rivotBestFit {
          min-height: calc(100svh - 88px);
          display: flex;
          align-items: center;
          padding: clamp(22px, 3vh, 32px) clamp(16px, 4vw, 48px);
          background: #f7f7f5;
        }

        .rivotBestFitShell { width: min(100%, 1320px); }

        .rivotBestFitHeader h2 {
          font-size: clamp(32px, 3.2vw, 44px);
          line-height: .95;
          letter-spacing: -.055em;
        }

        .rivotBestFitHeader > p {
          display: block;
          margin: 8px 0 0;
          color: #777d84;
          font-size: 15px;
          font-weight: 750;
          letter-spacing: 0;
          line-height: 1.35;
          text-transform: none;
        }

        .rivotBestFitHeader > p::before,
        .rivotBestFitHeader > p::after { display: none; }

        .rivotBestFitGrid { margin-top: clamp(22px, 3vh, 32px); }

        .rivotBestFitCard,
        .rivotBestFitSubscription {
          position: relative;
          display: flex;
          height: clamp(390px, calc(100svh - 285px), 470px);
          min-height: 0;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(28px, 2.5vw, 40px);
          border: 0;
          border-radius: 14px;
          background: #111313;
          text-align: center;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 18px 40px rgba(17, 19, 19, .12);
        }

        .rivotBestFitCard::before,
        .rivotBestFitAccessories::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(5, 7, 8, .76) 0%, rgba(5, 7, 8, .42) 25%, rgba(5, 7, 8, .1) 52%, rgba(5, 7, 8, .62) 78%, rgba(5, 7, 8, .96) 100%);
          pointer-events: none;
        }

        .rivotBestFitCardImage {
          z-index: 0;
          object-fit: cover;
          object-position: center;
          transition: transform .6s cubic-bezier(.22, 1, .36, 1);
        }

        .rivotBestFitCard:hover {
          transform: none;
          border-color: transparent;
          box-shadow: 0 18px 40px rgba(17, 19, 19, .12);
        }

        .rivotBestFitCard:hover .rivotBestFitCardImage { transform: scale(1.035); }

        .rivotBestFitCard > *:not(.rivotBestFitCardImage) {
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 14px rgba(0, 0, 0, .72);
        }

        .rivotBestFitCard .rivotBestFitEyebrow,
        .rivotBestFitSubscription .rivotBestFitEyebrow {
          margin: 0 0 12px;
          font-size: 12px;
          line-height: 1.1;
        }

        .rivotBestFitCard h3,
        .rivotBestFitSubscription h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(28px, 2.1vw, 36px);
          letter-spacing: -.045em;
        }

        .rivotBestFitCard > p:not(.rivotBestFitEyebrow),
        .rivotBestFitSubscription > p:not(.rivotBestFitEyebrow) {
          max-width: 330px;
          margin-top: 8px;
          color: rgba(255,255,255,.78);
          font-size: clamp(14px, 1vw, 16px);
          line-height: 1.35;
          text-align: center;
        }

        .rivotBestFitCta {
          position: relative;
          z-index: 2;
          display: inline-flex;
          min-width: 0;
          min-height: 52px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: auto;
          padding: 0 28px;
          border: 1px solid #ef7430;
          border-radius: 12px;
          background: #ef7430;
          color: #fff;
          font-size: 15px;
          font-weight: 850;
          line-height: 1;
        }

        @media (max-width: 1000px) {
          .rivotBestFit {
            min-height: 0;
            display: block;
            padding: clamp(58px, 8vw, 88px) clamp(16px, 4vw, 48px);
          }

          .rivotBestFitGrid {
            grid-template-columns: 1fr;
            width: min(100%, 620px);
            margin-inline: auto;
          }

          .rivotBestFitCard,
          .rivotBestFitSubscription {
            height: clamp(430px, 76vw, 540px);
            min-height: clamp(430px, 76vw, 540px);
          }
        }

        @media (max-width: 560px) {
          .rivotBestFitCard,
          .rivotBestFitSubscription {
            height: 430px;
            min-height: 430px;
            padding: 26px 22px;
            border-radius: 12px;
          }

          .rivotBestFitCta { width: 100%; }
        }
      `}</style>
    </>
  );
}
