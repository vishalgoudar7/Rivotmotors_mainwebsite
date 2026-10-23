import type { ModelComparisonColumn, ModelComparisonRow } from "@/data/modelComparison";
import { ArrowRight, Battery, Gauge, IndianRupee, Navigation, Settings, ShieldCheck, ShoppingBag, Zap } from "lucide-react";

const comparisonIcons = { battery: Battery, range: Navigation, topSpeed: Gauge, charge: Zap, ride: Settings, safety: ShieldCheck, utility: ShoppingBag, startingFrom: IndianRupee } as const;

type ModelComparisonProps = { eyebrow?: string; title?: string; rows: ModelComparisonRow[]; models: ModelComparisonColumn[] };

export function ModelComparison({ eyebrow = "Model Comparison", title = "Compare NX100 variants.", rows, models }: ModelComparisonProps) {
  return (
    <section className="modelComparison" id="model-comparison" aria-labelledby="model-comparison-title">
      <div className="modelComparisonShell">
        <header className="modelComparisonIntro">
          <p className="modelComparisonEyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <h2 id="model-comparison-title">{title === "Compare NX100 variants." ? <>Compare NX100 <strong>variants.</strong></> : title}</h2>
          <i aria-hidden="true" />
          <p className="modelComparisonCopy">Two personalities. The same electric spirit. Choose the variant that fits your riding needs.</p>
          <a className="modelComparisonCta" href="#comparison-cards">Compare in detail <ArrowRight aria-hidden="true" /></a>
        </header>

        <div className="modelComparisonCards" id="comparison-cards" aria-label="NX100 model comparison">
          {models.map((model) => (
            <article className="modelComparisonCard" data-variant={model.id} key={model.id}>
              <header className="modelComparisonCardHead">
                <h3><a href={model.href}>NX100 <strong>{model.id === "sport" ? "Sport" : "Pro"}</strong></a></h3>
                <p>{model.subtitle}</p>
              </header>
              <dl className="modelComparisonSpecs">
                {rows.map((row) => {
                  const RowIcon = comparisonIcons[row.id as keyof typeof comparisonIcons];
                  return (
                    <div className={row.id === "startingFrom" ? "modelComparisonSpec modelComparisonPrice" : "modelComparisonSpec"} key={row.id}>
                      <span className="modelComparisonIcon" aria-hidden="true">{RowIcon ? <RowIcon /> : null}</span>
                      <dt>{row.label}</dt><dd>{model.values[row.id]}</dd>
                    </div>
                  );
                })}
              </dl>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .modelComparison { --comparison-accent:var(--accent); padding:clamp(48px,5vw,76px) clamp(24px,3vw,56px); background:radial-gradient(circle at 72% 44%,color-mix(in srgb,var(--comparison-accent) 5%,transparent),transparent 28%),linear-gradient(180deg,#fff 0%,#fbfcfd 100%); color:#071127; }
        .modelComparisonShell { display:grid; grid-template-columns:minmax(320px,.76fr) minmax(760px,2.24fr); gap:clamp(32px,3.2vw,58px); width:min(100%,1580px); margin:0 auto; align-items:center; }
        .modelComparisonIntro { min-width:0; animation:modelIntroIn .7s cubic-bezier(.2,.75,.25,1) both; }
        .modelComparisonEyebrow { display:flex; align-items:center; gap:15px; margin:0 0 26px; color:var(--comparison-accent); font-size:clamp(12px,.9vw,16px); font-weight:800; letter-spacing:.18em; text-transform:uppercase; white-space:nowrap; }
        .modelComparisonEyebrow span { width:38px; height:3px; background:var(--comparison-accent); }
        .modelComparisonIntro h2 { max-width:440px; margin:0; color:#020718; font-size:clamp(48px,3.7vw,64px); font-weight:900; line-height:1.02; letter-spacing:-.055em; }
        .modelComparisonIntro h2 strong { color:var(--comparison-accent); font-weight:inherit; }
        .modelComparisonIntro>i { display:block; width:92px; height:4px; margin:26px 0 22px 4px; background:var(--comparison-accent); }
        .modelComparisonCopy { max-width:390px; margin:0 0 28px 4px; color:#62708b; font-size:clamp(16px,1.05vw,19px); line-height:1.48; }
        .modelComparisonCta { display:inline-flex; min-width:260px; align-items:center; justify-content:center; gap:14px; margin-left:4px; padding:16px 28px; border-radius:999px; background:var(--comparison-accent); box-shadow:0 12px 28px color-mix(in srgb,var(--comparison-accent) 18%,transparent); color:#fff; font-size:17px; font-weight:700; text-decoration:none; transition:transform .2s ease,box-shadow .2s ease; }
        .modelComparisonCta svg { width:24px; height:24px; }
        .modelComparisonCta:hover { transform:translateY(-2px); box-shadow:0 16px 34px color-mix(in srgb,var(--comparison-accent) 26%,transparent); }
        .modelComparisonCta:focus-visible,.modelComparisonCardHead a:focus-visible { outline:3px solid color-mix(in srgb,var(--comparison-accent) 35%,transparent); outline-offset:4px; }
        .modelComparisonCards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; scroll-margin-top:120px; }
        .modelComparisonCard { overflow:hidden; border:1px solid rgba(7,17,39,.04); border-radius:26px; background:#fffaf6; box-shadow:0 18px 50px rgba(22,36,58,.08); animation:modelCardIn .72s cubic-bezier(.2,.75,.25,1) both; transition:transform .3s ease,box-shadow .3s ease; }
        .modelComparisonCard:nth-child(1) { animation-delay:.1s; }
        .modelComparisonCard:nth-child(2) { animation-delay:.2s; }
        .modelComparisonCard:hover { transform:translateY(-5px); box-shadow:0 24px 58px rgba(22,36,58,.13); }
        .modelComparisonCard[data-variant="pro"] { background:#f7fbfe; }
        .modelComparisonCardHead { padding:28px 22px 22px; background:linear-gradient(135deg,#fff4ec,#fff8f3); text-align:center; }
        .modelComparisonCard[data-variant="pro"] .modelComparisonCardHead { background:linear-gradient(135deg,#eef6fc,#f8fbfd); }
        .modelComparisonCardHead h3 { margin:0; font-size:clamp(28px,2vw,36px); font-weight:900; letter-spacing:-.045em; line-height:1; }
        .modelComparisonCardHead a { color:#020718; text-decoration:none; }
        .modelComparisonCardHead strong { color:var(--comparison-accent); font-weight:inherit; }
        .modelComparisonCardHead p { margin:8px 0 0; color:#62708b; font-size:clamp(14px,.95vw,18px); line-height:1.3; }
        .modelComparisonSpecs { margin:0; padding:0 28px 12px; }
        .modelComparisonSpec { display:grid; grid-template-columns:52px minmax(120px,.9fr) minmax(170px,1.1fr); gap:13px; min-height:64px; align-items:center; border-bottom:1px solid rgba(7,17,39,.1); }
        .modelComparisonSpec:last-child { border-bottom:0; }
        .modelComparisonIcon { display:grid; width:42px; height:42px; place-items:center; border-radius:50%; background:var(--comparison-accent); color:#fff; transition:transform .25s ease; }
        .modelComparisonSpec:hover .modelComparisonIcon { transform:scale(1.08) rotate(-3deg); }
        .modelComparisonCard[data-variant="pro"] .modelComparisonIcon { background:linear-gradient(145deg,#172d4c,#061329); }
        .modelComparisonIcon svg { width:21px; height:21px; stroke-width:1.9; }
        .modelComparisonSpec dt { color:#13203a; font-size:14px; font-weight:700; line-height:1.22; }
        .modelComparisonSpec dd { margin:0; color:#13203a; font-size:13px; font-weight:500; line-height:1.3; }
        .modelComparisonPrice dd { color:#071127; font-size:clamp(20px,1.45vw,26px); font-weight:900; letter-spacing:-.025em; white-space:nowrap; }
        @keyframes modelIntroIn {
          from { opacity:0; transform:translateX(-24px); }
          to { opacity:1; transform:translateX(0); }
        }
        @keyframes modelCardIn {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }
        @media (max-width:1180px) {
          .modelComparisonShell { grid-template-columns:1fr; }
          .modelComparisonIntro { display:grid; grid-template-columns:1fr auto; column-gap:28px; align-items:end; }
          .modelComparisonEyebrow,.modelComparisonIntro h2,.modelComparisonIntro>i,.modelComparisonCopy { grid-column:1; }
          .modelComparisonCta { grid-column:2; grid-row:4; margin-bottom:30px; }
          .modelComparisonIntro h2 { max-width:740px; }
        }
        @media (max-width:760px) {
          .modelComparison { padding:58px 16px 68px; }
          .modelComparisonIntro { display:block; }
          .modelComparisonEyebrow { gap:11px; margin-bottom:24px; }
          .modelComparisonEyebrow span { width:28px; }
          .modelComparisonIntro h2 { font-size:clamp(48px,15vw,68px); }
          .modelComparisonIntro>i { margin:25px 0 20px; }
          .modelComparisonCopy { font-size:20px; }
          .modelComparisonCta { width:100%; min-width:0; margin:0 0 36px; }
          .modelComparisonCards { grid-template-columns:1fr; }
          .modelComparisonCard { border-radius:24px; }
          .modelComparisonCardHead { padding:30px 18px 22px; }
          .modelComparisonSpecs { padding:0 20px 14px; }
          .modelComparisonSpec { grid-template-columns:48px minmax(0,.85fr) minmax(0,1.15fr); gap:12px; min-height:70px; }
          .modelComparisonIcon { width:42px; height:42px; }
          .modelComparisonIcon svg { width:21px; height:21px; }
          .modelComparisonSpec dt,.modelComparisonSpec dd { font-size:13px; }
          .modelComparisonPrice dd { font-size:20px; }
        }
        @media (max-width:420px) {
          .modelComparisonEyebrow { font-size:10px; letter-spacing:.14em; }
          .modelComparisonSpec { grid-template-columns:42px minmax(0,1fr); padding:13px 0; }
          .modelComparisonSpec dt { align-self:end; }
          .modelComparisonSpec dd { grid-column:2; align-self:start; }
        }
        @media (prefers-reduced-motion:reduce) {
          .modelComparisonIntro,.modelComparisonCard { animation:none; }
          .modelComparisonCard,.modelComparisonCta,.modelComparisonIcon { transition:none; }
          .modelComparisonCard:hover,.modelComparisonCta:hover,.modelComparisonSpec:hover .modelComparisonIcon { transform:none; }
        }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparison { background:#080b10!important; color:#f5f7fb; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonIntro h2 { color:#f7f8fa; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonCopy { color:#aab3c1; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonCard { border-color:rgba(255,255,255,.08); background:#151312; box-shadow:0 18px 50px rgba(0,0,0,.3); }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonCard[data-variant="pro"] { background:#10151c; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonCardHead { background:#211813; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonCard[data-variant="pro"] .modelComparisonCardHead { background:#141e2a; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) :is(.modelComparisonCardHead a,.modelComparisonSpec dt,.modelComparisonSpec dd) { color:#edf1f7; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonCardHead p { color:#aab3c1; }
        html:is([data-theme="dark"],[data-rivot-theme="dark"]) .modelComparisonSpec { border-color:rgba(255,255,255,.1); }
      `}</style>
    </section>
  );
}
