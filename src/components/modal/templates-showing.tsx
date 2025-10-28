import resumeTemplate from "../../assets/resume-template.png";

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">{title}</h2>
      <div className="mt-3 flex justify-center"><span className="block h-1 w-40 rounded-full bg-[#2b5bd9]" /></div>
      {subtitle ? (
        <p className="mt-2 text-sm text-white/60 max-w-2xl mx-auto">{subtitle}</p>
      ) : null}
    </div>
  );
}

function TemplateCard({ title, bg }: { title: string; bg: string }) {
  return (
    <div className="flex-none w-72 sm:w-80 lg:w-[22rem] xl:w-[19rem]">
      <div className={`relative group w-full aspect-[4/5] rounded-2xl ${bg} border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden cursor-pointer`}>
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-black/10" />
        <img src={resumeTemplate} alt="Resume template preview" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[92%] w-auto rounded-lg object-contain bg-white shadow-xl" />
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium shadow-md cursor-pointer">View Template</button>
        </div>
        <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-black/10 blur-2xl" />
      </div>
      <div className="mt-3 text-sm text-white/80 truncate">{title}</div>
    </div>
  );
}

export function TemplatesShowingSection() {
  const cards = [
    { title: "Classic", bg: "bg-[#3a3327]" },
    { title: "Creative", bg: "bg-[#2f3138]" },
    { title: "ATS-Friendly", bg: "bg-[#2a4141]" },
    { title: "Minimalist", bg: "bg-[#3a3a3a]" },
    { title: "Professional", bg: "bg-[#2d343a]" },
    { title: "Executive", bg: "bg-[#3b2f2a]" },
    { title: "Academic", bg: "bg-[#30383a]" },
    { title: "Entry-Level", bg: "bg-[#3a352a]" },
    { title: "Career Change", bg: "bg-[#3a2f30]" },
  ];

  const scrollingCards = [...cards, ...cards, ...cards];

  return (
    <section className="max-w-[1100px] mx-auto px-6">
      <style>{`
        @keyframes scrollXFast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .templates-scroll-track { animation: scrollXFast 40s linear infinite; will-change: transform; }
      `}</style>

      <SectionTitle
        title="Choose Your Template"
        subtitle="Select a template to get started with our AI‑powered resume builder."
      />

      <div
        className="mt-8 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        }}
      >
        <div className="templates-scroll-track flex items-start gap-8 w-[200%]">
          {scrollingCards.map((c, i) => (
            <TemplateCard key={`${c.title}-${i}`} title={c.title} bg={c.bg} />
          ))}
        </div>
      </div>
    </section>
  );
}