"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import chargingBackground from "@/asset/rivot_support_background_images (1)/rivot-charging-background.webp";
import storeBackground from "@/asset/rivot_support_background_images (1)/rivot-store-background.webp";
import accessoriesBackground from "@/asset/rivot_optimized_images/rivot-accessories-card.png";
import batteryPackBackground from "@/asset/rivot_optimized_images/rivot-battery-pack.webp";
import vehicleWarrantyShowroom from "@/asset/RIVOT Scooters in a Warm Showroom.webp";

export function ProductDetailSupportSections({ includeBestFit = true }: { includeBestFit?: boolean }) {
  const supportSectionRef = useRef<HTMLElement>(null);
  const warrantySectionRef = useRef<HTMLElement>(null);
  const [supportVisible, setSupportVisible] = useState(false);
  const [warrantyVisible, setWarrantyVisible] = useState(false);

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

  useEffect(() => {
    const section = warrantySectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setWarrantyVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setWarrantyVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
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

      {includeBestFit ? <section
        ref={warrantySectionRef}
        className={`rivotWarranty rivotWarrantyAnimated${warrantyVisible ? " isVisible" : ""}`}
        aria-labelledby="rivot-warranty-title"
      >
        <div className="rivotWarrantyShell">
          <header className="rivotWarrantyHeader">
            <p>RIVOT WARRANTY</p>
            <h2 id="rivot-warranty-title">Power That Lasts. <em>Care That Continues.</em></h2>
            <span>Designed for durability and supported by warranty coverage for your vehicle and essential components.</span>
          </header>

          <div className="rivotWarrantyGrid">
            <article className="rivotWarrantyCard">
              <div className="rivotWarrantyImage">
                <Image src={vehicleWarrantyShowroom} alt="Graphite and white electric scooters displayed in a premium showroom" fill sizes="(max-width: 760px) 100vw, 32vw" />
              </div>
              <div className="rivotWarrantyCardBody">
                <span className="rivotWarrantyIcon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><circle cx="10" cy="23" r="5"/><circle cx="24" cy="23" r="5"/><path d="M10 23h8l-4-9H8M17 9h4l3 14M14 14h6M7 9h5"/></svg></span>
                <div><h3>Vehicle Warranty</h3><strong>5 Years</strong><p>Coverage for manufacturing defects.</p></div>
              </div>
            </article>

            <article className="rivotWarrantyCard">
              <div className="rivotWarrantyImage rivotWarrantyBatteryImage">
                <Image src={batteryPackBackground} alt="RIVOT electric scooter battery pack" fill sizes="(max-width: 760px) 100vw, 32vw" />
              </div>
              <div className="rivotWarrantyCardBody">
                <span className="rivotWarrantyIcon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><rect x="6" y="8" width="20" height="19" rx="2"/><path d="M12 8V5h8v3M17 12l-5 8h5l-2 4 6-8h-5l1-4Z"/></svg></span>
                <div><h3>Battery Warranty</h3><strong>5 Years</strong><p>Coverage for the battery pack and BMS.</p></div>
              </div>
            </article>

            <aside className="rivotWarrantyReasons" aria-label="Why RIVOT warranty matters">
              <h3>Why it matters</h3>
              <ul>
                <li><span aria-hidden="true">✓</span> Manufacturing defect protection</li>
                <li><span aria-hidden="true">✓</span> Authorized service support</li>
                <li><span aria-hidden="true">✓</span> Genuine parts</li>
              </ul>
              <Link href="/legal/warranty" className="rivotWarrantyCta">Explore Warranty <span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        </div>
      </section> : null}

      {includeBestFit ? <section className="rivotBestFit rivotBestFitReference" aria-labelledby="best-fit-title">
        <div className="rivotBestFitShell">
          <div className="rivotBestFitHeader">
            <p>RIVOT SUPPORT</p>
            <h2 id="best-fit-title">Ride Longer. <em>Worry Less.</em></h2>
            <small>Accessories, advanced battery technology and smart care —<br />all designed to keep you moving.</small>
          </div>

          <div className="rivotBestFitGrid">
            <article className="rivotBestFitCard rivotBestFitAccessories">
              <Image src={accessoriesBackground} alt="RIVOT helmet, riding jacket, scooter cover and accessories" fill sizes="(max-width: 1000px) 100vw, 33vw" className="rivotBestFitCardImage" />
              <div className="rivotBestFitCopy">
                <span className="rivotBestFitIcon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 20c-1-7 3-12 9-12s10 5 9 12M9 21c3-3 11-3 14 0M8 24c4-3 12-3 16 0M5 13l4 2M27 13l-4 2"/><path d="M6 20v5l4-1M26 20v5l-4-1"/></svg></span>
                <h3>Accessories</h3>
                <p>Premium accessories<br />for style, safety and<br />convenience.</p>
              </div>
              <Link href="/merchandise" className="rivotBestFitArrow" aria-label="Explore RIVOT accessories"><span aria-hidden="true">→</span></Link>
            </article>

            <article className="rivotBestFitCard rivotBestFitSubscription">
              <Image src={storeBackground} alt="RIVOT scooters at an authorized showroom and service location" fill sizes="(max-width: 1000px) 100vw, 33vw" className="rivotBestFitCardImage" />
              <div className="rivotBestFitCopy">
                <span className="rivotBestFitIcon rivotBestFitIconGreen" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3c4 3 8 4 12 4v8c0 7-5 12-12 15C9 27 4 22 4 15V7c4 0 8-1 12-4Z"/><path d="m11 16 3 3 7-8"/></svg></span>
                <h3>Smart Care</h3>
                <p>Regular service and<br />complete peace of mind.</p>
              </div>
              <Link href="/legal/subscriptions" className="rivotBestFitArrow" aria-label="Explore RIVOT Smart Care"><span aria-hidden="true">→</span></Link>
            </article>
          </div>

          <div className="rivotBestFitBenefits" aria-label="RIVOT ownership benefits">
            <article><span aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M20 5a7 7 0 0 0-8 9L4 22l6 6 8-8a7 7 0 0 0 9-8l-5 5-5-2-2-5 5-5Z"/></svg></span><div><h3>Genuine Parts</h3><p>Built for reliability</p></div></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="6"/><path d="m16 3 2 4 4-2 2 4 4 1-1 5 3 3-3 4 1 4-5 1-3 3-4-2-4 2-3-4-5-1 1-5-3-3 3-4-1-4 5-1 3-3Z"/></svg></span><div><h3>Expert Support</h3><p>Always here for you</p></div></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M25 13c0 7-9 16-9 16S7 20 7 13a9 9 0 1 1 18 0Z"/><circle cx="16" cy="13" r="3"/></svg></span><div><h3>Authorized Service Network</h3><p>Across India</p></div></article>
            <article><span aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m16 3 4 8 9 1-6.5 6 2 9-8.5-4.5L7.5 27l2-9L3 12l9-1 4-8Z"/></svg></span><div><h3>Best Ownership Experience</h3><p>Ride with confidence</p></div></article>
          </div>
        </div>
      </section> : null}

      <style>{`
        .rivotWarranty {
          --accent: #ef7430;
          display: flex;
          min-height: calc(100svh - 84px);
          align-items: center;
          padding: clamp(30px, 4svh, 48px) clamp(18px, 4vw, 64px);
          background: radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 34%), #fbfbfa;
          color: #0b0c0d;
        }

        .rivotWarrantyShell { width: min(100%, 1560px); margin: 0 auto; text-align: center; }
        .rivotWarrantyAnimated .rivotWarrantyHeader > *,
        .rivotWarrantyAnimated .rivotWarrantyCard,
        .rivotWarrantyAnimated .rivotWarrantyReasons {
          opacity: 0;
          will-change: transform, opacity;
          transition: opacity .72s cubic-bezier(.22, 1, .36, 1), transform .82s cubic-bezier(.22, 1, .36, 1);
        }
        .rivotWarrantyAnimated .rivotWarrantyHeader > * { transform: translate3d(0, 24px, 0); }
        .rivotWarrantyAnimated .rivotWarrantyCard:first-child { transform: translate3d(-44px, 28px, 0); }
        .rivotWarrantyAnimated .rivotWarrantyCard:nth-child(2) { transform: translate3d(0, 34px, 0); }
        .rivotWarrantyAnimated .rivotWarrantyReasons { transform: translate3d(44px, 28px, 0); }
        .rivotWarrantyAnimated.isVisible .rivotWarrantyHeader > *,
        .rivotWarrantyAnimated.isVisible .rivotWarrantyCard,
        .rivotWarrantyAnimated.isVisible .rivotWarrantyReasons { opacity: 1; transform: translate3d(0, 0, 0); }
        .rivotWarrantyAnimated .rivotWarrantyHeader > p { transition-delay: .04s; }
        .rivotWarrantyAnimated .rivotWarrantyHeader h2 { transition-delay: .11s; }
        .rivotWarrantyAnimated .rivotWarrantyHeader > span { transition-delay: .18s; }
        .rivotWarrantyAnimated .rivotWarrantyCard:first-child { transition-delay: .24s; }
        .rivotWarrantyAnimated .rivotWarrantyCard:nth-child(2) { transition-delay: .34s; }
        .rivotWarrantyAnimated .rivotWarrantyReasons { transition-delay: .44s; }

        @media (prefers-reduced-motion: reduce) {
          .rivotWarrantyAnimated .rivotWarrantyHeader > *,
          .rivotWarrantyAnimated .rivotWarrantyCard,
          .rivotWarrantyAnimated .rivotWarrantyReasons {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
        .rivotWarrantyHeader > p {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          margin: 0 0 12px;
          color: var(--accent);
          font-size: clamp(13px, .9vw, 17px);
          font-weight: 900;
          letter-spacing: .03em;
        }
        .rivotWarrantyHeader > p::before, .rivotWarrantyHeader > p::after { content: ""; width: 66px; height: 3px; background: currentColor; }
        .rivotWarrantyHeader h2 { margin: 0; color: var(--text); font-size: clamp(32px, 2.8vw, 48px); font-weight: 950; line-height: 1; letter-spacing: -.05em; }
        .rivotWarrantyHeader h2 em { color: var(--accent); font-style: normal; }
        .rivotWarrantyHeader > span { display: block; max-width: 850px; margin: 10px auto 0; color: #6f809b; font-size: clamp(15px, 1.05vw, 19px); font-weight: 600; line-height: 1.35; }

        .rivotWarrantyGrid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: clamp(14px, 1.4vw, 22px); margin-top: clamp(20px, 2.5svh, 30px); text-align: left; }
        .rivotWarrantyCard, .rivotWarrantyReasons { overflow: hidden; border: 1px solid rgba(15, 23, 42, .06); border-radius: 28px; background: #fff; box-shadow: 0 20px 50px rgba(30, 40, 60, .08); }
        .rivotWarrantyImage { position: relative; height: clamp(170px, 14vw, 230px); overflow: hidden; background: #f2f2f0; }
        .rivotWarrantyImage img { object-fit: cover; object-position: 53% 62%; transition: transform .55s ease; }
        .rivotWarrantyBatteryImage img { object-position: center; }
        .rivotWarrantyCard:hover .rivotWarrantyImage img { transform: scale(1.035); }
        .rivotWarrantyCardBody { display: flex; align-items: center; gap: 16px; padding: 16px 20px 18px; }
        .rivotWarrantyIcon { display: grid; width: 58px; height: 58px; flex: 0 0 58px; place-items: center; border-radius: 16px; background: color-mix(in srgb, var(--surface) 80%, var(--accent) 20%); color: var(--accent); }
        .rivotWarrantyIcon svg { width: 34px; height: 34px; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .rivotWarrantyCardBody > div { padding-left: 16px; border-left: 1px solid #91a0b5; }
        .rivotWarrantyCardBody h3 { margin: 0 0 5px; font-size: clamp(17px, 1.2vw, 22px); font-weight: 900; letter-spacing: -.035em; }
        .rivotWarrantyCardBody strong { display: block; font-size: clamp(21px, 1.55vw, 28px); font-weight: 950; line-height: 1.05; letter-spacing: -.04em; }
        .rivotWarrantyCardBody p { margin: 6px 0 0; color: #6f809b; font-size: clamp(12px, .85vw, 15px); }
        .rivotWarrantyReasons { display: flex; flex-direction: column; justify-content: center; padding: clamp(24px, 2.7vw, 44px); background: linear-gradient(135deg, var(--surface) 20%, color-mix(in srgb, var(--surface) 91%, var(--accent) 9%) 100%); }
        .rivotWarrantyReasons h3 { margin: 0 0 22px; font-size: clamp(28px, 2.2vw, 38px); font-weight: 950; letter-spacing: -.05em; }
        .rivotWarrantyReasons ul { display: grid; gap: 20px; margin: 0; padding: 0; list-style: none; }
        .rivotWarrantyReasons li { display: flex; align-items: center; gap: 16px; font-size: clamp(15px, 1.05vw, 19px); font-weight: 650; }
        .rivotWarrantyReasons li span { display: grid; width: 36px; height: 36px; flex: 0 0 36px; place-items: center; border-radius: 50%; background: var(--accent); color: #fff; font-size: 22px; font-weight: 900; }
        .rivotWarrantyCta { display: inline-flex; min-height: 54px; align-self: flex-start; align-items: center; gap: 22px; margin-top: clamp(22px, 2.5svh, 30px); padding: 0 25px 0 32px; border-radius: 999px; background: var(--accent); color: #fff; font-size: clamp(15px, 1vw, 18px); font-weight: 900; box-shadow: 0 16px 34px color-mix(in srgb, var(--accent) 24%, transparent); transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .rivotWarrantyCta span { font-size: 28px; line-height: 1; }
        .rivotWarrantyCta:hover { transform: translateY(-3px); background: color-mix(in srgb, var(--accent) 84%, #000); box-shadow: 0 20px 40px color-mix(in srgb, var(--accent) 30%, transparent); }

        @media (max-width: 1100px) {
          .rivotWarrantyGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .rivotWarrantyReasons { grid-column: 1 / -1; }
          .rivotWarrantyReasons ul { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        }

        @media (max-width: 700px) {
          .rivotWarranty { padding: 56px 16px; }
          .rivotWarrantyHeader > p { gap: 14px; margin-bottom: 16px; }
          .rivotWarrantyHeader > p::before, .rivotWarrantyHeader > p::after { width: 34px; height: 2px; }
          .rivotWarrantyHeader h2 { font-size: clamp(32px, 9.5vw, 44px); }
          .rivotWarrantyHeader > span { font-size: 16px; }
          .rivotWarrantyGrid { grid-template-columns: 1fr; margin-top: 32px; }
          .rivotWarrantyCard, .rivotWarrantyReasons { border-radius: 22px; }
          .rivotWarrantyImage { height: 250px; }
          .rivotWarrantyCardBody { gap: 15px; padding: 20px; }
          .rivotWarrantyIcon { width: 60px; height: 60px; flex-basis: 60px; border-radius: 16px; }
          .rivotWarrantyIcon svg { width: 34px; height: 34px; }
          .rivotWarrantyCardBody > div { padding-left: 15px; }
          .rivotWarrantyCardBody strong { font-size: 25px; }
          .rivotWarrantyReasons { grid-column: auto; padding: 30px 24px; }
          .rivotWarrantyReasons h3 { margin-bottom: 24px; }
          .rivotWarrantyReasons ul { grid-template-columns: 1fr; gap: 18px; }
          .rivotWarrantyCta { min-height: 62px; gap: 22px; margin-top: 34px; padding: 0 27px 0 33px; }
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotWarranty { background: radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 34%), var(--bg); color: var(--text); }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.rivotWarrantyCard, .rivotWarrantyReasons) { border-color: var(--border); background: var(--surface); }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotWarrantyReasons { background: linear-gradient(135deg, var(--surface), color-mix(in srgb, var(--surface) 90%, var(--accent) 10%)); }
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotWarrantyCardBody > div { border-color: var(--border); }

        .rivotSupport {
          --accent: #ef7430;
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
          color: var(--accent);
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
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
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
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          border-radius: 18px;
          background: color-mix(in srgb, var(--surface) 94%, transparent);
          box-shadow: 0 18px 42px var(--shadow);
        }

        .rivotSupportCharge { border-color: color-mix(in srgb, var(--accent) 30%, transparent); }

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
          color: var(--accent);
          font-size: 12px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .rivotSupportCharge .rivotSupportEyebrow { color: var(--accent); }

        .rivotSupportCardCopy h3 {
          margin: 0;
          color: var(--text);
          font-size: clamp(25px, 1.9vw, 32px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.045em;
        }

        .rivotSupportCardCopy h3 em {
          color: var(--accent);
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
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 850;
          box-shadow: 0 10px 24px color-mix(in srgb, var(--accent) 22%, transparent);
        }

        .rivotSupportCta span {
          display: grid;
          width: 27px;
          height: 27px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .9);
          color: var(--accent);
          font-size: 18px;
        }

        .rivotSupportCharge .rivotSupportCta {
          background: var(--accent);
          box-shadow: 0 10px 24px color-mix(in srgb, var(--accent) 22%, transparent);
        }

        .rivotSupportCharge .rivotSupportCta span { color: var(--accent); }

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
          border-color: color-mix(in srgb, var(--accent) 26%, transparent);
          font-size: 19px;
        }

        .rivotSupportCharge .rivotSupportCardBody li span {
          border-color: color-mix(in srgb, var(--accent) 26%, transparent);
          background: color-mix(in srgb, var(--surface) 90%, var(--accent) 10%);
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

        /* Product support showcase */
        .rivotBestFit {
          min-height: 0;
          display: block;
          padding: clamp(46px, 4.5vw, 78px) clamp(18px, 3vw, 54px) 18px;
          background:
            linear-gradient(128deg, rgba(242, 126, 52, .12) 0 9%, transparent 9.1% 21%, rgba(247, 181, 130, .09) 21.1% 29%, transparent 29.1% 100%),
            linear-gradient(180deg, #fff 0%, #fdfdfc 100%);
        }

        .rivotBestFit::before {
          background:
            linear-gradient(132deg, transparent 0 74%, rgba(239, 116, 48, .055) 74.1% 81%, transparent 81.1%),
            linear-gradient(48deg, transparent 0 88%, rgba(239, 116, 48, .12) 88.1%);
        }

        .rivotBestFitShell { width: min(100%, 1760px); }

        .rivotBestFitHeader > p {
          display: inline-flex;
          gap: 18px;
          margin: 0 0 24px;
          color: var(--accent);
          font-size: clamp(14px, 1.15vw, 21px);
          letter-spacing: 0;
        }

        .rivotBestFitHeader > p::before,
        .rivotBestFitHeader > p::after {
          display: block;
          width: clamp(28px, 2.8vw, 52px);
          height: 2px;
          background: var(--accent);
        }

        .rivotBestFitHeader h2 {
          font-size: clamp(42px, 4.2vw, 72px);
          line-height: .96;
          letter-spacing: -.052em;
        }

        .rivotBestFitHeader h2 em {
          color: var(--accent);
          font-style: normal;
        }

        .rivotBestFitHeader small {
          margin-top: 18px;
          color: #667793;
          font-size: clamp(16px, 1.45vw, 25px);
          font-weight: 500;
          line-height: 1.3;
        }

        .rivotBestFitGrid {
          grid-template-columns: 1.03fr 1.03fr 1.08fr;
          gap: clamp(16px, 1.5vw, 28px);
          margin-top: clamp(28px, 2.8vw, 46px);
        }

        .rivotBestFitCard,
        .rivotBestFitSubscription {
          height: clamp(390px, 32vw, 515px);
          min-height: 390px;
          display: block;
          padding: clamp(88px, 7vw, 116px) clamp(22px, 2.1vw, 40px) 24px;
          border: 1px solid rgba(21, 25, 29, .04);
          border-radius: 22px;
          background: #f6f3f0;
          text-align: left;
          box-shadow: 0 16px 36px rgba(37, 42, 48, .08);
        }

        .rivotBestFitCard::before,
        .rivotBestFitAccessories::before {
          z-index: 1;
          background: linear-gradient(180deg, rgba(255,255,255,.97) 0%, rgba(255,255,255,.84) 27%, rgba(255,255,255,.12) 54%, rgba(255,255,255,.01) 100%);
        }

        .rivotBestFitBattery::before {
          background:
            linear-gradient(118deg, rgba(255,255,255,.98) 0 35%, rgba(255,241,229,.77) 48%, rgba(255,137,61,.12) 70%, rgba(255,137,61,.04) 100%),
            linear-gradient(180deg, rgba(255,255,255,.9), transparent 52%);
        }

        .rivotBestFitSubscription::before {
          background: linear-gradient(180deg, rgba(237,249,255,.96) 0%, rgba(237,249,255,.76) 28%, rgba(237,249,255,.08) 56%);
        }

        .rivotBestFitCardImage {
          object-position: center 60%;
          filter: saturate(1.03) brightness(1.06);
        }

        .rivotBestFitBattery .rivotBestFitCardImage {
          object-position: center bottom;
          filter: saturate(.9) brightness(1.35) sepia(.12);
          transform: scale(1.42);
        }

        .rivotBestFitBattery:hover .rivotBestFitCardImage { transform: scale(1.46); }

        .rivotBestFitSubscription .rivotBestFitCardImage {
          object-position: 68% center;
          filter: saturate(1.08) brightness(1.1);
        }

        .rivotBestFitReference .rivotBestFitCardImage {
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          object-position: center bottom;
        }

        .rivotBestFitReference .rivotBestFitBattery .rivotBestFitCardImage {
          inset: -2% -6% !important;
          width: 112% !important;
          height: 104% !important;
          max-width: none !important;
          object-fit: cover;
          object-position: center bottom;
          filter: saturate(.96) brightness(1.04) sepia(.04);
          transform: skewX(3deg) scale(1.03);
        }

        .rivotBestFitReference .rivotBestFitSubscription .rivotBestFitCardImage {
          inset: 0 !important;
          height: 100% !important;
          object-position: 68% center;
        }

        .rivotBestFitCopy {
          position: absolute !important;
          top: 20px;
          left: clamp(22px, 2.1vw, 40px);
          z-index: 3 !important;
          width: min(72%, 310px);
          text-align: left;
          text-shadow: none !important;
        }

        .rivotBestFitIcon {
          position: static !important;
          display: grid;
          width: 64px;
          height: 64px;
          place-items: center;
          border-radius: 50%;
          background: color-mix(in srgb, var(--surface) 78%, var(--accent) 22%);
          color: var(--accent);
          text-shadow: none !important;
        }

        .rivotBestFitIcon svg { width: 38px; height: 38px; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
        .rivotBestFitBattery .rivotBestFitIcon svg { fill: currentColor; stroke: none; }
        .rivotBestFitIconGreen { color: var(--accent); background: color-mix(in srgb, var(--surface) 78%, var(--accent) 22%); }

        .rivotBestFitCard h3,
        .rivotBestFitSubscription h3 {
          position: relative;
          z-index: 3;
          width: max-content;
          max-width: 100%;
          margin: 12px 0 0;
          color: #090b0d;
          font-size: clamp(25px, 2vw, 37px);
          line-height: 1;
          letter-spacing: -.045em;
          text-shadow: none;
          text-transform: uppercase;
        }

        .rivotBestFitCopy > p {
          position: relative;
          z-index: 3;
          max-width: 300px;
          margin: 10px 0 0;
          color: #52657f;
          font-size: clamp(15px, 1.25vw, 21px);
          font-weight: 500;
          line-height: 1.3;
          text-align: left;
          text-shadow: none;
        }

        .rivotBestFitArrow {
          position: absolute !important;
          right: 22px;
          bottom: 22px;
          z-index: 4 !important;
          display: grid;
          width: 50px;
          height: 50px;
          place-items: center;
          border: 2px solid rgba(255,255,255,.8);
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-size: 26px;
          font-weight: 700;
          line-height: 1;
          text-shadow: none !important;
          box-shadow: 0 10px 24px color-mix(in srgb, var(--accent) 30%, transparent);
          transition: transform .22s ease, background .22s ease, box-shadow .22s ease;
        }

        .rivotBestFitArrow:hover { transform: skewX(3deg) scale(1.08); background: color-mix(in srgb, var(--accent) 84%, #000); box-shadow: 0 14px 30px color-mix(in srgb, var(--accent) 40%, transparent); }
        .rivotBestFitArrow:focus-visible { outline: 3px solid #111; outline-offset: 3px; }

        @media (hover: hover) and (pointer: fine) {
          .rivotBestFitReference .rivotBestFitCard { transition: transform .25s ease, box-shadow .25s ease; }
          .rivotBestFitReference .rivotBestFitCard:hover { transform: skewX(-3deg) translateY(-5px); box-shadow: 0 24px 48px rgba(30,38,46,.14); }
          .rivotBestFitReference .rivotBestFitBattery:hover .rivotBestFitCardImage { transform: skewX(3deg) scale(1.06); }
        }

        .rivotBestFitBenefits {
          position: relative;
          display: grid;
          grid-template-columns: .85fr .9fr 1.15fr 1.05fr;
          margin-top: 16px;
          padding: 12px 18px;
          border: 1px solid rgba(21,25,29,.035);
          border-radius: 20px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 10px 30px rgba(30,38,46,.07);
        }

        .rivotBestFitBenefits article { display: flex; min-width: 0; align-items: center; gap: 16px; padding: 0 26px; border-left: 1px solid #aeb9c7; }
        .rivotBestFitBenefits article:first-child { border-left: 0; }
        .rivotBestFitBenefits article > span { display: grid; width: 64px; height: 64px; flex: 0 0 64px; place-items: center; border-radius: 50%; background: color-mix(in srgb, var(--surface) 82%, var(--accent) 18%); color: var(--accent); }
        .rivotBestFitBenefits svg { width: 38px; height: 38px; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
        .rivotBestFitBenefits h3 { margin: 0; color: #101215; font-size: clamp(14px, 1.12vw, 20px); line-height: 1.15; }
        .rivotBestFitBenefits p { margin: 4px 0 0; color: #657690; font-size: clamp(12px, 1vw, 17px); line-height: 1.2; }

        @media (max-width: 1000px) {
          .rivotBestFit { padding: 54px 18px 22px; }
          .rivotBestFitHeader small br { display: none; }
          .rivotBestFitGrid { grid-template-columns: 1fr; width: min(100%, 680px); }
          .rivotBestFitCard, .rivotBestFitSubscription { height: clamp(410px, 70vw, 520px); min-height: 410px; }
          .rivotBestFitBenefits { grid-template-columns: repeat(2, 1fr); gap: 20px 0; margin-top: 18px; }
          .rivotBestFitBenefits article:nth-child(3) { border-left: 0; }
        }

        @media (max-width: 420px) {
          .rivotBestFitHeader > p { margin-bottom: 18px; font-size: 13px; }
          .rivotBestFitHeader h2 { font-size: clamp(36px, 11vw, 48px); }
          .rivotBestFitHeader small { font-size: 15px; }
          .rivotBestFitCard, .rivotBestFitSubscription { height: 420px; min-height: 420px; padding: 90px 22px 22px; }
          .rivotBestFitCopy { left: 22px; width: calc(100% - 44px); }
          .rivotBestFitIcon { width: 58px; height: 58px; }
          .rivotBestFitBenefits { grid-template-columns: 1fr; padding: 6px 16px; }
          .rivotBestFitBenefits article, .rivotBestFitBenefits article:nth-child(3) { min-height: 82px; padding: 10px 4px; border-left: 0; border-top: 1px solid #d4d9df; }
          .rivotBestFitBenefits article:first-child { border-top: 0; }
          .rivotBestFitBenefits article > span { width: 54px; height: 54px; flex-basis: 54px; }
          .rivotBestFitBenefits svg { width: 32px; height: 32px; }
          .rivotBestFitBenefits h3 { font-size: 15px; }
          .rivotBestFitBenefits p { font-size: 13px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rivotBestFitReference .rivotBestFitCard,
          .rivotBestFitReference .rivotBestFitCardImage,
          .rivotBestFitArrow { transition: none !important; }
        }

        /* Keep this shared showcase isolated from legacy homepage card rules. */
        .rivotBestFit.rivotBestFitReference {
          --accent: #ef7430;
          min-height: calc(100svh - 88px);
          display: flex;
          align-items: center;
          padding: clamp(28px, 4svh, 58px) clamp(18px, 3vw, 54px) clamp(18px, 2.5svh, 30px);
          background: var(--bg, #fff);
        }

        .rivotBestFit.rivotBestFitReference::before { display: none; }

        .rivotBestFitReference .rivotBestFitShell {
          display: grid;
          grid-template-columns: minmax(290px, 330px) minmax(0, 1fr);
          column-gap: clamp(18px, 2vw, 30px);
          width: min(100%, 1760px);
        }
        .rivotBestFitReference .rivotBestFitHeader { grid-column: 1 / -1; }
        .rivotBestFitReference .rivotBestFitHeader > p { display: inline-flex; margin: 0 0 clamp(14px, 2svh, 22px); color: var(--accent); font-size: clamp(14px, 1.05vw, 20px); }
        .rivotBestFitReference .rivotBestFitHeader > p::before,
        .rivotBestFitReference .rivotBestFitHeader > p::after { display: block; }
        .rivotBestFitReference .rivotBestFitHeader h2 { font-size: clamp(42px, 4vw, 70px); line-height: .96; letter-spacing: -.052em; }
        .rivotBestFitReference .rivotBestFitHeader small { margin-top: clamp(10px, 1.6svh, 17px); font-size: clamp(16px, 1.3vw, 23px); }
        .rivotBestFitReference .rivotBestFitGrid { grid-column: 2; grid-row: 2; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: stretch; gap: clamp(16px, 1.5vw, 28px); width: 100%; margin: clamp(22px, 2.7svh, 38px) 0 0; }
        .rivotBestFitReference .rivotBestFitBenefits {
          grid-column: 1;
          grid-row: 2;
          grid-template-columns: 1fr;
          align-self: stretch;
          margin-top: clamp(22px, 2.7svh, 38px);
          overflow: hidden;
          padding: 12px 20px;
          border: 1px solid color-mix(in srgb, var(--accent) 14%, var(--border));
          border-radius: 22px;
          background: linear-gradient(145deg, var(--surface), color-mix(in srgb, var(--surface) 94%, var(--accent) 6%));
          box-shadow: 0 18px 40px var(--shadow);
        }
        .rivotBestFitReference .rivotBestFitBenefits article {
          min-height: 0;
          gap: 14px;
          padding: 14px 2px;
          border-left: 0;
          border-top: 1px solid var(--border);
        }
        .rivotBestFitReference .rivotBestFitBenefits article:first-child { border-top: 0; }
        .rivotBestFitReference .rivotBestFitBenefits article > span { width: 50px; height: 50px; flex-basis: 50px; }
        .rivotBestFitReference .rivotBestFitBenefits svg { width: 29px; height: 29px; }
        .rivotBestFitReference .rivotBestFitBenefits h3 { font-size: clamp(15px, 1vw, 18px); line-height: 1.12; }
        .rivotBestFitReference .rivotBestFitBenefits p { margin-top: 4px; font-size: clamp(12px, .9vw, 15px); }

        .rivotBestFitReference .rivotBestFitCard,
        .rivotBestFitReference .rivotBestFitSubscription {
          display: block;
          box-sizing: border-box;
          height: 100%;
          min-height: 390px;
          padding: clamp(88px, 7vw, 116px) clamp(22px, 2.1vw, 40px) 24px;
          border: 1px solid color-mix(in srgb, var(--accent) 10%, rgba(21,25,29,.08));
          border-radius: 22px;
          background: #f6f3f0;
          text-align: left;
          transform: skewX(-3deg);
          transform-origin: center;
        }

        .rivotBestFitReference .rivotBestFitCard::before,
        .rivotBestFitReference .rivotBestFitAccessories::before {
          z-index: 1;
          background: linear-gradient(180deg, rgba(248,249,250,.98) 0%, rgba(248,249,250,.96) 30%, rgba(248,249,250,.7) 46%, rgba(248,249,250,.08) 67%, rgba(248,249,250,0) 100%);
        }

        .rivotBestFitReference .rivotBestFitBattery {
          background:
            linear-gradient(138deg, rgba(255,255,255,.96) 0 31%, rgba(255,239,226,.8) 31.2% 59%, rgba(255,174,113,.58) 59.2% 100%),
            #fff5ed;
        }

        .rivotBestFitReference .rivotBestFitBattery::before {
          background:
            linear-gradient(130deg, rgba(255,255,255,.98) 0 31%, rgba(255,244,235,.48) 45%, rgba(255,149,75,.02) 65%),
            linear-gradient(180deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.7) 30%, transparent 53%);
        }

        .rivotBestFitReference .rivotBestFitSubscription::before {
          background: linear-gradient(180deg, rgba(236,249,255,.99) 0%, rgba(236,249,255,.97) 31%, rgba(236,249,255,.75) 47%, rgba(236,249,255,.08) 69%, rgba(4,18,9,.04) 100%);
        }

        .rivotBestFitReference .rivotBestFitCard h3,
        .rivotBestFitReference .rivotBestFitSubscription h3 { margin-top: clamp(9px, 1.2svh, 12px); color: #090b0d; font-size: clamp(25px, 1.85vw, 35px); text-shadow: none; }
        .rivotBestFitReference .rivotBestFitCardImage { object-fit: cover; }

        .rivotBestFitReference .rivotBestFitCopy,
        .rivotBestFitReference .rivotBestFitArrow {
          transform: skewX(3deg);
        }

        .rivotBestFitReference .rivotBestFitAccessories .rivotBestFitCardImage,
        .rivotBestFitReference .rivotBestFitSubscription .rivotBestFitCardImage {
          inset: -2% -6% !important;
          width: 112% !important;
          height: 104% !important;
          max-width: none !important;
          transform: skewX(3deg) scale(1.03);
        }

        .rivotBestFitReference .rivotBestFitAccessories .rivotBestFitCardImage {
          inset: -2% -6% !important;
          width: 112% !important;
          height: 104% !important;
          object-fit: cover;
          object-position: center;
          transform: skewX(3deg) scale(1.03);
        }

        .rivotBestFitReference .rivotBestFitSubscription .rivotBestFitCardImage {
          object-position: 68% 72%;
        }

        .rivotBestFitReference .rivotBestFitBattery .rivotBestFitCardImage {
          transform: skewX(3deg) scale(1.03);
        }

        @media (min-width: 1024px) {
          .rivotBestFitReference .rivotBestFitAccessories .rivotBestFitCopy { width: 45%; }
          .rivotBestFitReference .rivotBestFitBattery .rivotBestFitCopy { width: 66%; }
          .rivotBestFitReference .rivotBestFitSubscription .rivotBestFitCopy { width: 54%; }
        }

        @media (min-width: 1024px) and (max-height: 900px) {
          .rivotBestFit.rivotBestFitReference {
            padding-top: clamp(20px, 2.7svh, 28px);
            padding-bottom: 14px;
          }

          .rivotBestFitReference .rivotBestFitHeader > p {
            margin-bottom: 12px;
            font-size: clamp(13px, .95vw, 17px);
          }

          .rivotBestFitReference .rivotBestFitHeader h2 {
            font-size: clamp(38px, 3.5vw, 58px);
          }

          .rivotBestFitReference .rivotBestFitHeader small {
            margin-top: 8px;
            font-size: clamp(14px, 1.15vw, 19px);
          }

          .rivotBestFitReference .rivotBestFitGrid { margin-top: clamp(16px, 2svh, 24px); }

          .rivotBestFitReference .rivotBestFitCard,
          .rivotBestFitReference .rivotBestFitSubscription {
            height: clamp(350px, 43svh, 410px);
            min-height: 350px;
          }

          .rivotBestFitReference .rivotBestFitCopy { top: 16px; }
          .rivotBestFitReference .rivotBestFitIcon { width: 54px; height: 54px; }
          .rivotBestFitReference .rivotBestFitIcon svg { width: 32px; height: 32px; }
          .rivotBestFitReference .rivotBestFitCard h3,
          .rivotBestFitReference .rivotBestFitSubscription h3 { margin-top: 8px; font-size: clamp(23px, 1.65vw, 30px); }
          .rivotBestFitReference .rivotBestFitCopy > p { margin-top: 7px; font-size: clamp(14px, 1.08vw, 17px); }
          .rivotBestFitReference .rivotBestFitArrow { right: 18px; bottom: 18px; width: 44px; height: 44px; font-size: 23px; }
          .rivotBestFitReference .rivotBestFitBenefits { margin-top: 12px; padding-block: 8px; }
          .rivotBestFitReference .rivotBestFitBenefits article > span { width: 54px; height: 54px; flex-basis: 54px; }
          .rivotBestFitReference .rivotBestFitBenefits svg { width: 32px; height: 32px; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .rivotBestFitReference .rivotBestFitGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 100%; }
        }

        @media (max-width: 1023px) {
          .rivotBestFit.rivotBestFitReference { min-height: 0; display: block; }
          .rivotBestFitReference .rivotBestFitShell { display: block; }
          .rivotBestFitReference .rivotBestFitBenefits {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 18px;
          }
          .rivotBestFitReference .rivotBestFitBenefits article {
            min-height: 76px;
            padding: 10px 18px;
            border-top: 0;
            border-left: 1px solid #aeb9c7;
          }
          .rivotBestFitReference .rivotBestFitBenefits article:nth-child(odd) { border-left: 0; }
          .rivotBestFitReference .rivotBestFitCard,
          .rivotBestFitReference .rivotBestFitSubscription,
          .rivotBestFitReference .rivotBestFitCopy,
          .rivotBestFitReference .rivotBestFitArrow,
          .rivotBestFitReference .rivotBestFitAccessories .rivotBestFitCardImage,
          .rivotBestFitReference .rivotBestFitSubscription .rivotBestFitCardImage,
          .rivotBestFitReference .rivotBestFitBattery .rivotBestFitCardImage { transform: none; }

          .rivotBestFitArrow:hover { transform: scale(1.08); }
        }

        @media (max-width: 767px) {
          .rivotBestFit.rivotBestFitReference { padding: 54px 18px 22px; }
          .rivotBestFitReference .rivotBestFitGrid { grid-template-columns: 1fr; width: min(100%, 680px); }
          .rivotBestFitReference .rivotBestFitCard,
          .rivotBestFitReference .rivotBestFitSubscription { height: clamp(410px, 70vw, 520px); min-height: 410px; }
        }

        @media (max-width: 560px) {
          .rivotBestFitReference .rivotBestFitCard,
          .rivotBestFitReference .rivotBestFitSubscription { height: 420px; min-height: 420px; padding: 90px 22px 22px; }
          .rivotBestFitReference .rivotBestFitBenefits { grid-template-columns: 1fr; }
          .rivotBestFitReference .rivotBestFitBenefits article,
          .rivotBestFitReference .rivotBestFitBenefits article:nth-child(odd) { border-left: 0; border-top: 1px solid #aeb9c7; }
          .rivotBestFitReference .rivotBestFitBenefits article:first-child { border-top: 0; }
        }

        .rivotBestFitReference .rivotBestFitCard,
        .rivotBestFitReference .rivotBestFitSubscription,
        .rivotBestFitReference .rivotBestFitBattery {
          background: #272b2f !important;
          border-color: rgba(15,18,21,.14) !important;
          box-shadow: 0 20px 44px rgba(18,22,26,.16);
        }

        .rivotBestFitReference .rivotBestFitCardImage {
          filter: brightness(.78) saturate(.94) contrast(1.02) !important;
        }

        .rivotBestFitReference .rivotBestFitCard::before,
        .rivotBestFitReference .rivotBestFitAccessories::before,
        .rivotBestFitReference .rivotBestFitBattery::before,
        .rivotBestFitReference .rivotBestFitSubscription::before {
          background: linear-gradient(180deg, rgba(24,28,32,.86) 0%, rgba(24,28,32,.72) 30%, rgba(24,28,32,.38) 49%, rgba(24,28,32,.03) 72%, rgba(24,28,32,0) 100%) !important;
        }

        .rivotBestFitReference .rivotBestFitCard h3,
        .rivotBestFitReference .rivotBestFitSubscription h3 {
          color: #f6f7f8 !important;
          text-shadow: none !important;
        }

        .rivotBestFitReference .rivotBestFitCopy > p {
          color: #fff !important;
          font-weight: 650;
          text-shadow: 0 2px 10px rgba(0, 0, 0, .82) !important;
        }

        .rivotBestFitReference .rivotBestFitIcon,
        .rivotBestFitReference .rivotBestFitIconGreen { background: color-mix(in srgb, #272b2f 78%, var(--accent) 22%); }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitCard h3,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitSubscription h3 {
          color: #f6f7f8 !important;
          text-shadow: none !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitCopy > p {
          color: #fff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, .88) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitCard,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitSubscription,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBattery {
          background: #151719 !important;
          border-color: rgba(255,255,255,.1) !important;
          box-shadow: 0 20px 46px rgba(0,0,0,.34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitCardImage {
          filter: brightness(.48) saturate(.78) contrast(1.04) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitCard::before,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitAccessories::before,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBattery::before,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitSubscription::before {
          background: linear-gradient(180deg, rgba(15,18,21,.98) 0%, rgba(15,18,21,.94) 30%, rgba(15,18,21,.66) 49%, rgba(15,18,21,.08) 72%, rgba(15,18,21,0) 100%) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference :is(.rivotBestFitIcon, .rivotBestFitIconGreen) {
          background: color-mix(in srgb, #151719 74%, var(--accent) 26%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBenefits {
          background: #151719 !important;
          border-color: rgba(255,255,255,.12) !important;
          box-shadow: 0 18px 42px rgba(0,0,0,.3);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBenefits h3 {
          color: #f5f6f7 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBenefits p {
          color: #aab6c5 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBenefits article {
          border-left-color: rgba(255,255,255,.16) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBenefits article > span {
          background: #2a211c !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitHeader small {
          color: #91a3bd !important;
        }

        .rivotBestFitReference .rivotBestFitBenefits,
        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .rivotBestFitReference .rivotBestFitBenefits {
          padding-inline: 0;
          border: 0 !important;
          border-radius: 0;
          background: transparent !important;
          box-shadow: none;
        }
      `}</style>
    </>
  );
}
