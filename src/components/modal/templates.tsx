import { FiChevronDown } from 'react-icons/fi';

function TopNav() {
  return (
    <div className="sticky top-0 z-30 w-full bg-[#0b1220]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/60 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <div className="h-3 w-3 bg-white/90 rounded-sm" />
          </div>
          <span className="text-white/90 font-semibold tracking-wide">ResumeCraft</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a className="text-white/80 hover:text-white transition" href="#">Templates</a>
          <a className="text-white/60 hover:text-white transition" href="#">Examples</a>
          <a className="text-white/60 hover:text-white transition" href="#">Pricing</a>
          <a className="text-white/60 hover:text-white transition" href="#">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg text-sm text-white/80 border border-white/10 hover:bg-white/5 transition">Log In</button>
          <button className="px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-[0_8px_30px_rgba(59,130,246,0.35)]">New Resume</button>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 px-4 py-2 text-sm hover:bg-white/[0.06] transition">
      <span>{label}</span>
      <FiChevronDown className="h-4 w-4 text-white/70" />
    </button>
  );
}

function PaperMock() {
  return (
    <div className="absolute inset-6 rounded-lg bg-white shadow-xl">
      <div className="absolute left-5 right-5 top-5 h-2 bg-neutral-300 rounded" />
      <div className="absolute left-5 right-5 top-9 h-2 bg-neutral-300/70 rounded" />
      <div className="absolute left-5 right-5 top-14 h-24 bg-neutral-200 rounded-md" />
      <div className="absolute left-5 right-5 top-40 h-2 bg-neutral-300 rounded" />
      <div className="absolute left-5 right-5 top-44 h-2 bg-neutral-300/70 rounded" />
      <div className="absolute left-5 right-5 top-52 h-20 bg-neutral-200 rounded-md" />
    </div>
  );
}

function TemplateCard({ title, bg }: { title: string; bg: string }) {
  return (
    <div>
      <div className={`relative w-full aspect-[4/5] rounded-2xl ${bg} border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden`}> 
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-black/10" />
        <PaperMock />
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
      <TopNav />
      <main className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between pt-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Choose Your Template</h1>
          <div className="flex items-center gap-3">
            <FilterPill label="Style" />
            <FilterPill label="Industry" />
            <FilterPill label="Popularity" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {cards.map((c) => (
            <TemplateCard key={c.title} title={c.title} bg={c.bg} />
          ))}
        </div>
      </main>
    </div>
  );
}