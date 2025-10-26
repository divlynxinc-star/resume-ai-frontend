import { FiChevronDown } from 'react-icons/fi';
import SiteNavbar from "../layout/site-navbar";
import resumeTemplate from "../../assets/resume-template.png";


function FilterPill({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 px-4 py-2 text-sm hover:bg-white/[0.06] transition">
      <span>{label}</span>
      <FiChevronDown className="h-4 w-4 text-white/70" />
    </button>
  );
}


function TemplateCard({ title, bg }: { title: string; bg: string }) {
  return (
    <div className="w-full">
      <div
        className={`relative group w-full aspect-[4/5] rounded-2xl ${bg} border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.03]`}
      >
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-black/10" />
        <img
          src={resumeTemplate}
          alt="Resume template preview"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[92%] w-auto rounded-lg object-contain bg-white shadow-xl"
        />
        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <button
            onClick={() => (window.location.hash = "#resumes")}
            className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-gray-100 transition"
          >
            Use Template
          </button>
        </div>
        <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-black/10 blur-2xl" />
      </div>
      <div className="mt-3 text-sm text-white/80">{title}</div>
    </div>
  );
}

export default function TemplatesScreen() {
  const cards = [
    { title: 'Modern', bg: 'bg-[#2a3b36]' },
    { title: 'Classic', bg: 'bg-[#3a3327]' },
    { title: 'Creative', bg: 'bg-[#2f3138]' },
    { title: 'ATS-Friendly', bg: 'bg-[#2a4141]' },
    { title: 'Minimalist', bg: 'bg-[#3a3a3a]' },
    { title: 'Professional', bg: 'bg-[#2d343a]' },
    { title: 'Executive', bg: 'bg-[#3b2f2a]' },
    { title: 'Academic', bg: 'bg-[#30383a]' },
    { title: 'Entry-Level', bg: 'bg-[#3a352a]' },
    { title: 'Career Change', bg: 'bg-[#3a2f30]' },
  ];


  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <SiteNavbar />
      <main className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-start justify-between pt-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Choose Your Template</h1>
            <p className="mt-2 text-sm text-white/60">Explore our range of expertly crafted, ATS-friendly resume templates.</p>
          </div>
          <div className="flex items-center gap-3">
            <FilterPill label="Style" />
            <FilterPill label="Industry" />
            <FilterPill label="Popularity" />
          </div>
        </div>

        {/* Static grid of templates */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((c, i) => (
            <TemplateCard key={`${c.title}-${i}`} title={c.title} bg={c.bg} />
          ))}
        </div>
      </main>
    </div>
  );
}
