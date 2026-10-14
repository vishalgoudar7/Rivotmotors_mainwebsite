"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import engineeredScooter from "@/asset/Model/Pro/Engineer/post 899.jpg.jpeg";
import advancedLighting from "@/asset/Model/Pro/Engineer/post 2 44D.png";
import motorEfficiency from "@/asset/Model/Pro/Engineer/motor.jpeg";
import enduranceTesting from "@/asset/Model/Pro/Engineer/0sds000.png";

type EngineeringCard = {
  title: string;
  description: string;
  image: StaticImageData;
  className: string;
};

const engineeringCards: EngineeringCard[] = [
  {
    title: "Crafted to Perform",
    description: "A precise balance of design, technology and everyday practicality.",
    image: engineeredScooter,
    className: "isCrafted",
  },
  {
    title: "Advanced Lighting",
    description: "Engineered to stand out with focused, intelligent illumination.",
    image: advancedLighting,
    className: "isLighting",
  },
  {
    title: "Motor Efficiency",
    description: "A high-performance motor designed for confident real-world riding.",
    image: motorEfficiency,
    className: "isMotor",
  },
  {
    title: "Built to Endure",
    description: "Tested for demanding conditions, so every ride feels worry-free.",
    image: enduranceTesting,
    className: "isEndurance",
  },
];

export function ProductEngineeringShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: .14 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engineered"
      className={`proEngineering${isVisible ? " isVisible" : ""}`}
      aria-labelledby="pro-engineering-title"
    >
      <div className="proEngineeringIntro">
        <p className="proEngineeringEyebrow"><span>Engineered</span><i aria-hidden="true" /></p>
        <h2 id="pro-engineering-title"><span>Built with purpose.</span><span>Driven by <em>innovation.</em></span></h2>
        <p className="proEngineeringLead">
          Designed for style, strength, and performance. Every detail engineered for a better ride.
        </p>

      </div>

      <div className="proEngineeringGallery">
        {engineeringCards.map((card) => (
          <article className={`proEngineeringCard ${card.className}`} key={card.title}>
            <Image src={card.image} alt={`${card.title} for the RIVOT NX100 Pro`} fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="proEngineeringShade" />
            <div className="proEngineeringCardCopy">
              <h3>{card.title}</h3>
              <small>{card.description}</small>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .proEngineering {
          position: relative;
          display: grid;
          grid-template-columns: minmax(310px, .55fr) minmax(0, 1.45fr);
          gap: clamp(38px, 4.4vw, 78px);
          box-sizing: border-box;
          height: calc(100svh - 118px);
          min-height: 640px;
          max-height: 820px;
          padding: clamp(24px, 3.2vh, 40px) clamp(24px, 4.2vw, 78px);
          overflow: hidden;
          background:
            linear-gradient(118deg, transparent 0 68%, rgba(239,116,48,.07) 68.2% 68.45%, transparent 68.7%),
            radial-gradient(circle at 92% 16%, rgba(239,116,48,.12), transparent 25%),
            #fbfaf8;
          color: #111313;
        }

        .proEngineering::before {
          content: "";
          position: absolute;
          left: 16%;
          top: 112px;
          width: 34%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff6b26, transparent);
          transform: rotate(-8deg);
          transform-origin: left center;
          pointer-events: none;
        }

        .proEngineeringIntro {
          position: relative;
          z-index: 2;
          align-self: center;
          max-width: 510px;
        }

        .proEngineeringEyebrow {
          display: flex;
          align-items: center;
          gap: 18px;
          margin: 0 0 22px;
          color: #f16627;
          font-size: 12px !important;
          font-weight: 900 !important;
          letter-spacing: .24em !important;
          text-transform: uppercase;
        }

        .proEngineeringEyebrow i {
          width: 64px;
          height: 1px;
          background: linear-gradient(90deg, #f16627, transparent);
        }

        .proEngineering.proEngineering h2 {
          margin: 0;
          color: #090a0a;
          font-size: clamp(34px, 2.55vw, 40px) !important;
          font-weight: 900 !important;
          line-height: 1.02 !important;
          letter-spacing: -.05em !important;
        }

        .proEngineering h2 em {
          color: #ff5f18;
          font-style: normal;
        }

        .proEngineering h2 > span {
          display: block;
          white-space: nowrap;
        }

        .proEngineeringLead {
          max-width: 470px;
          margin: 22px 0 0;
          color: #606870;
          font-size: 16px !important;
          line-height: 1.48 !important;
        }

        .proEngineeringGallery {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          gap: 14px;
          min-width: 0;
          min-height: 0;
          height: 100%;
        }

        .proEngineeringCard {
          position: relative;
          min-width: 0;
          overflow: hidden;
          border: 0;
          border-radius: 22px;
          background: #080909;
          box-shadow: 0 20px 44px rgba(20,18,16,.14);
          isolation: isolate;
        }

        .proEngineeringCard img {
          object-fit: cover;
          transition: transform .8s cubic-bezier(.22,1,.36,1), filter .8s ease;
        }

        .proEngineeringCard:hover img { transform: scale(1.035); filter: saturate(1.08); }
        .proEngineeringCard.isCrafted img { object-position: center 61%; }
        .proEngineeringCard.isLighting img { object-position: center 48%; }
        .proEngineeringCard.isMotor img { object-position: center 48%; }
        .proEngineeringCard.isEndurance img { object-position: center 63%; }

        .proEngineeringShade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(0deg, rgba(3,4,5,.9) 0%, rgba(3,4,5,.44) 28%, transparent 62%);
          pointer-events: none;
        }

        .proEngineeringCardCopy {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          width: auto;
          padding: clamp(18px, 1.6vw, 26px);
          color: #fff;
          text-shadow: 0 3px 16px rgba(0,0,0,.7);
        }

        .proEngineeringCardCopy h3 { margin: 0; color: #fff; font-size: clamp(20px, 1.4vw, 24px); line-height: 1.1; letter-spacing: -.035em; }
        .proEngineeringCardCopy small { display: block; max-width: 330px; margin-top: 6px; color: rgba(255,255,255,.88); font-size: 14px !important; line-height: 1.35 !important; }

        .proEngineeringIntro > *,
        .proEngineeringCard {
          opacity: 0;
          transform: translateY(28px);
        }

        .proEngineering.isVisible .proEngineeringIntro > *,
        .proEngineering.isVisible .proEngineeringCard {
          opacity: 1;
          transform: translateY(0);
          transition: opacity .72s ease, transform .86s cubic-bezier(.16,1,.3,1);
        }

        .proEngineering.isVisible .proEngineeringIntro > :nth-child(1) { transition-delay: .04s; }
        .proEngineering.isVisible .proEngineeringIntro > :nth-child(2) { transition-delay: .12s; }
        .proEngineering.isVisible .proEngineeringIntro > :nth-child(3) { transition-delay: .2s; }
        .proEngineering.isVisible .proEngineeringCard:nth-child(1) { transition-delay: .12s; }
        .proEngineering.isVisible .proEngineeringCard:nth-child(2) { transition-delay: .22s; }
        .proEngineering.isVisible .proEngineeringCard:nth-child(3) { transition-delay: .32s; }
        .proEngineering.isVisible .proEngineeringCard:nth-child(4) { transition-delay: .42s; }

        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .proEngineering {
          background: radial-gradient(circle at 90% 12%, rgba(255,95,24,.1), transparent 27%), #090b0c;
          color: #f5f5f2;
        }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .proEngineering.proEngineering h2 { color: #f5f5f2; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .proEngineeringLead { color: #aeb4b7; }

        @media (max-width: 1100px) {
          .proEngineering { grid-template-columns: 1fr; height: auto; min-height: 0; max-height: none; padding-block: 64px; }
          .proEngineeringIntro { max-width: 720px; }
          .proEngineeringGallery { min-height: 760px; }
        }

        @media (max-width: 680px) {
          .proEngineering { padding: 58px 16px; }
          .proEngineering.proEngineering h2 { font-size: clamp(36px, 10vw, 46px) !important; }
          .proEngineering h2 > span { white-space: normal; }
          .proEngineeringGallery { display: grid; grid-template-columns: 1fr; grid-template-rows: none; min-height: 0; gap: 12px; }
          .proEngineeringCard,
          .proEngineeringCard.isCrafted,
          .proEngineeringCard.isLighting,
          .proEngineeringCard.isMotor,
          .proEngineeringCard.isEndurance { grid-column: 1; grid-row: auto; min-height: 360px; border-width: 4px; border-radius: 16px; }
          .proEngineeringCard.isMotor { min-height: 280px; }
          .proEngineeringCardCopy { width: auto; padding: 24px; }
          .proEngineeringCard.isCrafted img { object-position: center 60%; }
          .proEngineeringCard.isEndurance img { object-position: center 62%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .proEngineeringIntro > *,
          .proEngineeringCard { opacity: 1 !important; transform: none !important; transition: none !important; }
          .proEngineeringCard img { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
