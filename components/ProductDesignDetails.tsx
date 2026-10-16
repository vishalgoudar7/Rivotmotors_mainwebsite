"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import proSideFootrestImage from "@/asset/Model/Pro/Design/1.jpeg";
import proDiscImage from "@/asset/Model/Pro/Design/dual-disc-card-v2.png";
import proTailLampImage from "@/asset/Model/Pro/Design/3.jpeg";
import proChargingImage from "@/asset/Model/Pro/Design/Neon Green EV Charging Port.png";

type DetailCard = {
  title: string;
  copy: string;
  image: StaticImageData;
  className: string;
};

const proDesignDetails: DetailCard[] = [
  {
    title: "Premium LED Tail Lamp",
    copy: "Distinctive rear signature with modern visibility.",
    image: proTailLampImage,
    className: "tailLamp",
  },
  {
    title: "Side Footrest",
    copy: "Added comfort and support for your passenger.",
    image: proSideFootrestImage,
    className: "proFootrest",
  },
  {
    title: "Dual Disc Control",
    copy: "Strong braking confidence for everyday rides.",
    image: proDiscImage,
    className: "proDisc",
  },
  {
    title: "Onboard Charging",
    copy: "Simple, convenient everyday charging.",
    image: proChargingImage,
    className: "proCharging",
  },
];

export function ProductDesignDetails() {
  const details = proDesignDetails;
  const sectionRef = useRef<HTMLElement>(null);
  const [revealReady, setRevealReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    setRevealReady(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8%" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`productDesignDetails isProDesign${revealReady ? " isRevealReady" : ""}${isVisible ? " isVisible" : ""}`}
      id="details"
      aria-labelledby="product-design-details-title"
    >
      <div className="productDesignIntro">
        <p>Design</p>
        <h2 id="product-design-details-title">A closer look at what makes it <span>unique.</span></h2>
        <small>Thoughtful details. Everyday comfort. Timeless RIVOT style.</small>
      </div>

      <div className="productDesignGrid">
        {details.map((detail) => (
          <article className={`productDesignCard ${detail.className}`} key={detail.title}>
            <Image
              src={detail.image}
              alt={`RIVOT NX100 ${detail.title}`}
              fill
              sizes="(max-width: 900px) 100vw, 28vw"
            />
            <div className="productDesignShade" aria-hidden="true" />
            <div>
              <h3>{detail.title}</h3>
              <p>{detail.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .productDesignDetails {
          display: grid;
          grid-template-columns: minmax(270px, 380px) minmax(0, 1fr);
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
          min-height: calc(100svh - 88px);
          padding: clamp(64px, 7vw, 96px) clamp(26px, 6vw, 96px);
          background:
            radial-gradient(circle at 8% 18%, rgba(239, 116, 48, .1), transparent 25%),
            linear-gradient(135deg, #fff 0%, #fafafa 54%, #f1f3f4 100%);
          color: #080808;
          font-family: inherit;
        }

        .productDesignDetails :is(h2, h3, p, small) {
          font-family: inherit;
        }

        .productDesignIntro {
          min-width: 0;
          padding-left: 0;
        }

        .productDesignDetails.isRevealReady .productDesignIntro,
        .productDesignDetails.isRevealReady .productDesignCard {
          will-change: opacity, transform, filter;
          transition:
            opacity .72s ease,
            transform .9s cubic-bezier(.16, 1, .3, 1),
            filter .72s ease;
        }

        .productDesignDetails.isRevealReady:not(.isVisible) .productDesignIntro {
          opacity: 0;
          transform: translate3d(-44px, 0, 0);
          filter: blur(8px);
        }

        .productDesignDetails.isRevealReady:not(.isVisible) .productDesignCard {
          opacity: 0;
          transform: translate3d(0, 38px, 0) scale(.96);
          filter: blur(8px);
        }

        .productDesignDetails.isVisible .productDesignIntro,
        .productDesignDetails.isVisible .productDesignCard {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
        }

        .productDesignDetails.isRevealReady .productDesignCard:nth-child(1) { transition-delay: .14s; }
        .productDesignDetails.isRevealReady .productDesignCard:nth-child(2) { transition-delay: .25s; }
        .productDesignDetails.isRevealReady .productDesignCard:nth-child(3) { transition-delay: .36s; }
        .productDesignDetails.isRevealReady .productDesignCard:nth-child(4) { transition-delay: .47s; }
        .productDesignDetails.isRevealReady .productDesignCard:nth-child(5) { transition-delay: .58s; }

        .productDesignIntro p {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 28px;
          color: #ef7430;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .productDesignIntro p::after {
          content: "";
          width: 70px;
          height: 1px;
          background: #ef7430;
        }

        .productDesignIntro h2 {
          max-width: 370px;
          margin: 0;
          color: #070707;
          font-size: 48px;
          font-weight: 800;
          line-height: .98;
          letter-spacing: 0;
        }

        .productDesignIntro h2 span {
          color: #ef7430;
        }

        .productDesignIntro small {
          display: block;
          max-width: 330px;
          margin-top: 24px;
          color: #5f6b73;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.38;
        }

        .productDesignGrid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: minmax(230px, 1fr);
          gap: 16px;
          min-width: 0;
        }

        .productDesignCard {
          position: relative;
          min-height: 230px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, .1);
          border-radius: 18px;
          background: #171919;
          box-shadow: 0 20px 44px rgba(17, 17, 17, .12);
          transform: none;
        }

        .productDesignCard img {
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          transition: transform .45s ease;
        }

        .productDesignCard:hover img {
          transform: scale(1.045);
        }

        .productDesignCard.footrest img {
          object-fit: cover;
          object-position: center 62%;
        }

        .productDesignShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,.05) 22%, rgba(0,0,0,.82) 100%),
            linear-gradient(90deg, rgba(0,0,0,.24), transparent 66%);
          z-index: 1;
        }

        .productDesignCard div:last-child {
          position: absolute;
          inset: auto 0 0;
          z-index: 2;
          padding: clamp(20px, 2vw, 28px);
          color: #fff;
        }

        .productDesignCard div:last-child::before {
          content: "";
          display: block;
          width: 38px;
          height: 3px;
          margin-bottom: 12px;
          border-radius: 999px;
          background: #ef7430;
        }

        .productDesignCard h3 {
          max-width: 210px;
          margin: 0;
          color: #fff;
          font-size: clamp(21px, 1.55vw, 26px);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .productDesignCard p {
          max-width: 230px;
          margin: 9px 0 0;
          color: rgba(255, 255, 255, .78);
          font-size: 16px;
          font-weight: 500;
          line-height: 1.3;
        }

        .productDesignCard.seat {
          grid-column: span 2;
        }

        .productDesignCard.wheel {
          grid-column: span 2;
        }

        .productDesignCard.mirror {
          grid-column: span 2;
        }

        .productDesignCard.grab {
          grid-column: span 3;
        }

        .productDesignCard.drive {
          grid-column: span 3;
        }

        .productDesignDetails.isProDesign {
          grid-template-columns: minmax(300px, .72fr) minmax(0, 1.9fr);
          gap: clamp(38px, 4vw, 72px);
          min-height: calc(100svh - 88px);
          padding: clamp(52px, 5vw, 78px) clamp(30px, 4vw, 68px);
          background:
            radial-gradient(ellipse at 10% 4%, rgba(239,116,48,.09), transparent 22%),
            radial-gradient(ellipse at 78% 100%, rgba(239,116,48,.08), transparent 26%),
            linear-gradient(135deg, #fff 0%, #fafafa 54%, #f1f3f4 100%);
          color: #080808;
          overflow: hidden;
        }

        .productDesignDetails.isProDesign::before {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 31%;
          background:
            linear-gradient(176deg, transparent 0 24%, rgba(17,17,17,.025) 24.3% 24.7%, transparent 25%),
            radial-gradient(ellipse at 34% 100%, rgba(17,17,17,.04), transparent 32%);
          opacity: .7;
          pointer-events: none;
        }

        .productDesignDetails.isProDesign {
          position: relative;
        }

        .isProDesign .productDesignIntro,
        .isProDesign .productDesignGrid {
          position: relative;
          z-index: 1;
        }

        .isProDesign .productDesignIntro h2 {
          color: #070707;
          font-size: clamp(46px, 3.25vw, 62px);
          line-height: .98;
          letter-spacing: -.045em;
        }

        .isProDesign .productDesignIntro small {
          color: #5f6b73;
          font-size: 17px;
        }

        .isProDesign .productDesignGrid {
          grid-template-columns: minmax(310px, .92fr) minmax(0, 1.12fr) minmax(190px, .8fr);
          grid-template-rows: minmax(260px, 1fr) minmax(260px, 1fr);
          gap: 14px;
          min-height: min(70vh, 700px);
        }

        .isProDesign .productDesignCard {
          min-height: 0;
          border-color: rgba(239,116,48,.72);
          border-radius: 16px;
          background: #0b0c0c;
          box-shadow: 0 18px 50px rgba(0,0,0,.36), inset 0 0 22px rgba(239,116,48,.08);
        }

        .isProDesign .productDesignCard::after {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: 3;
          border-radius: inherit;
          box-shadow: inset 0 0 12px rgba(255,111,35,.2);
          pointer-events: none;
        }

        .isProDesign .productDesignCard img {
          filter: brightness(.66) contrast(1.22) saturate(.82) sepia(.08);
          transition: transform .45s ease, filter .35s ease;
        }

        .isProDesign .productDesignCard:hover img {
          filter: brightness(.76) contrast(1.18) saturate(.9) sepia(.06);
        }

        .isProDesign .productDesignCard.tailLamp {
          grid-column: 1;
          grid-row: 1 / 3;
        }

        .isProDesign .productDesignCard.proFootrest {
          grid-column: 2 / 4;
          grid-row: 1;
        }

        .isProDesign .productDesignCard.proDisc {
          grid-column: 2;
          grid-row: 2;
        }

        .isProDesign .productDesignCard.proCharging {
          grid-column: 3;
          grid-row: 2;
        }

        .isProDesign .productDesignCard.tailLamp img {
          object-position: center 38%;
        }

        .isProDesign .productDesignCard.proFootrest img {
          object-position: 60% 63%;
        }

        .isProDesign .productDesignCard.proDisc img {
          object-fit: cover;
          object-position: center;
          background: #0b0c0c;
        }

        .isProDesign .productDesignCard.proDisc:hover img {
          transform: none;
        }

        .isProDesign .productDesignCard.proCharging img {
          object-position: 54% 42%;
        }

        .isProDesign .productDesignShade {
          background:
            linear-gradient(180deg, rgba(7,8,8,.2) 0%, rgba(7,8,8,.06) 34%, rgba(2,3,3,.42) 62%, rgba(2,3,3,.96) 100%),
            radial-gradient(circle at 14% 84%, rgba(239,116,48,.16), transparent 42%),
            linear-gradient(90deg, rgba(4,5,5,.24), transparent 58%);
        }

        .isProDesign .productDesignCard div:last-child {
          padding: clamp(20px, 2vw, 30px);
        }

        .isProDesign .productDesignCard h3 {
          max-width: 300px;
          font-size: clamp(22px, 1.55vw, 29px);
        }

        .isProDesign .productDesignCard p {
          max-width: 300px;
          color: rgba(255,255,255,.86);
          font-size: 16px;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignDetails {
          background:
            radial-gradient(circle at 12% 8%, rgba(239, 116, 48, .08), transparent 30%),
            linear-gradient(180deg, #080909 0%, #0d0f0f 100%) !important;
          color: #f5f5f2;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignDetails.isProDesign {
          background:
            radial-gradient(ellipse at 10% 4%, rgba(255,255,255,.2), transparent 20%),
            radial-gradient(ellipse at 78% 100%, rgba(239,116,48,.18), transparent 24%),
            radial-gradient(ellipse at 18% 82%, rgba(255,255,255,.08), transparent 30%),
            linear-gradient(118deg, #111314 0%, #050607 43%, #0b0c0d 100%) !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro h2 {
          color: #f5f5f2 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro h2 span {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro p {
          color: #ef7430 !important;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignIntro small {
          color: #aeb4b4;
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignCard {
          border-color: rgba(255, 255, 255, .12) !important;
          background: #151717 !important;
          box-shadow: 0 18px 42px rgba(0, 0, 0, .34);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignShade {
          background:
            linear-gradient(180deg, rgba(0,0,0,.08) 22%, rgba(0,0,0,.88) 100%),
            linear-gradient(90deg, rgba(0,0,0,.3), transparent 66%);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) :is(.productDesignCard h3, .productDesignCard p) {
          color: #fff !important;
          text-shadow: 0 5px 18px rgba(0, 0, 0, .58);
        }

        html:is([data-theme="dark"], [data-rivot-theme="dark"]) .productDesignCard p {
          color: rgba(255, 255, 255, .8) !important;
        }

        @media (max-width: 1000px) {
          .productDesignDetails {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-block: 64px;
          }

          .productDesignIntro {
            padding-left: 0;
          }

          .productDesignIntro h2,
          .productDesignIntro small {
            max-width: 620px;
          }

          .productDesignDetails.isProDesign {
            grid-template-columns: 1fr;
          }

          .isProDesign .productDesignGrid {
            min-height: 720px;
          }
        }

        @media (max-width: 720px) {
          .productDesignDetails {
            padding: 48px 14px 56px;
          }

          .productDesignGrid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }

          .productDesignCard,
          .productDesignCard:hover img {
            transform: none;
          }

          .productDesignCard.seat,
          .productDesignCard.wheel,
          .productDesignCard.mirror,
          .productDesignCard.grab,
          .productDesignCard.drive {
            grid-column: auto;
          }

          .productDesignCard {
            min-height: 270px;
          }

          .productDesignIntro h2 {
            font-size: 42px;
          }

          .productDesignDetails.isProDesign {
            padding: 52px 14px 58px;
          }

          .isProDesign .productDesignGrid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: none;
            min-height: 0;
          }

          .isProDesign .productDesignCard.tailLamp,
          .isProDesign .productDesignCard.proFootrest,
          .isProDesign .productDesignCard.proDisc,
          .isProDesign .productDesignCard.proCharging {
            grid-column: auto;
            grid-row: auto;
            min-height: 330px;
          }

          .isProDesign .productDesignCard.tailLamp {
            min-height: 480px;
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .productDesignIntro,
          .productDesignCard {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
