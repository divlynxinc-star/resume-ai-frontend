import { useState, type ReactNode } from "react";
import {
  Home,
  FileText,
  LayoutGrid,
  Wand2,
  Settings,
  HelpCircle,
  MessagesSquare,
  LogOut,
  Rocket,
  Edit2,
  Download,
  Trash,
  Coins,
  X,
} from "lucide-react";
import SiteNavbar from "../layout/site-navbar";

export function Sidebar({ activeRoute }: { activeRoute?: string }) {
  const current = (activeRoute ?? (typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "dashboard")) || "dashboard";
  // Sidebar rotating tips
  const tips: { title: string; icon: ReactNode; points: string[]; link?: string }[] = [
    {
      title: "ATS Tips",
      icon: <FileText className="size-4" />,
      points: ["Use job keywords", "Keep layout simple", "Avoid images and tables"],
      link: "#tailoring",
    },
    {
      title: "AI Chat",
      icon: <MessagesSquare className="size-4" />,
      points: ["Ask for better wording", "Generate bullet points", "Iterate quickly in chat"],
      link: "#ai-chat",
    },
    {
      title: "Resume Builder",
      icon: <Wand2 className="size-4" />,
      points: ["Start from a template", "Fill core sections", "Export or share"],
      link: "#resumes",
    },
  ];
  const [tipIndex, setTipIndex] = useState(0);
  const nextTip = () => setTipIndex((i) => (i + 1) % tips.length);
  const currentTip = tips[tipIndex];
  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0b1220] text-white/90">
      <div className="h-16 flex items-center px-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">ResumeAI</span>
          <span className="text-xs text-white/60">Your Career Catalyst</span>
        </div>
      </div>
      <nav className="px-3 py-2 divide-y divide-white/10">
        <NavItem icon={<Home className="size-4" />} label="Dashboard" route="dashboard" active={current === "dashboard"} />
        <NavItem icon={<FileText className="size-4" />} label="My Resumes" route="my-resumes" active={current === "my-resumes"} />
        <NavItem icon={<LayoutGrid className="size-4" />} label="Templates" route="templates" active={current === "templates"} />
        <NavItem icon={<Wand2 className="size-4" />} label="AI Tailoring" route="tailoring" active={current === "tailoring"} />
        <NavItem icon={<MessagesSquare className="size-4" />} label="Interviews" route="interview" active={current === "interview"} />
        <NavItem icon={<Settings className="size-4" />} label="Settings" route="account" active={current === "account"} />
        <NavItem icon={<HelpCircle className="size-4" />} label="Help Center" route="help-center" active={current === "help-center"} />
      </nav>
      <div className="mt-2 h-px bg-white/10 mx-3" />
      <div className="mt-auto px-3 py-4 space-y-3">
        {/* Rotating tips box */}
        <div className="rounded-xl bg-white/5 border border-white/12 p-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-white/10 grid place-items-center">
              {currentTip.icon}
            </div>
            <div className="text-sm font-medium text-white">{currentTip.title}</div>
            <div className="ml-auto text-xs text-white/50">{tipIndex + 1} / {tips.length}</div>
          </div>
          <ul className="mt-2 text-xs text-white/70 space-y-1 list-disc list-inside">
            {currentTip.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            {currentTip.link && (
              <a href={currentTip.link} className="text-xs text-cyan-300 hover:text-white">Open</a>
            )}
            <button onClick={nextTip} className="rounded-lg px-3 py-1 text-xs bg-white/6 border border-white/12 text-white/80 hover:text-white">Next</button>
          </div>
        </div>
        <button className="mt-4 w-full rounded-xl bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30]" onClick={() => (window.location.hash = "#pricing")}> 
          Upgrade Plan
        </button>
        <div className="h-px bg-white/10" />
        <button className="w-full rounded-xl px-4 py-2 text-white/70 hover:text-white flex items-center gap-2" onClick={() => (window.location.hash = "#home")}> 
          <LogOut className="size-4" /> Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, route, active = false }: { icon: ReactNode; label: string; route: string; active?: boolean }) {
  return (
    <button
      onClick={() => (window.location.hash = `#${route}`)}
      className={
        "w-full text-left flex items-center gap-3 rounded-xl px-4 py-2 text-sm cursor-pointer transition-colors " +
        (active ? "bg-white/5 text-white" : "text-white/70 hover:bg-white/5 hover:text-white")
      }
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


function HeroCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Alex!</h2>
          <p className="text-white/60 mt-1">Ready to land your dream job? Let’s get started.</p>
        </div>
        <button className="rounded-xl bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30]" onClick={() => (window.location.hash = "#resumes")}> 
          Create New Resume
        </button>
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="grid grid-cols-4 gap-4">
      <FeatureCard icon={<FileText className="size-5" />} title="My Resumes" desc="View and manage your documents." onClick={() => (window.location.hash = "#my-resumes")} />
      <FeatureCard icon={<Wand2 className="size-5" />} title="AI Tailoring" desc="Optimize your resume for any job." onClick={() => (window.location.hash = "#tailoring")} />
      <FeatureCard icon={<LayoutGrid className="size-5" />} title="Credits Remaining" desc="150 AI credits left." dot onClick={() => (window.location.hash = "#pricing")} />
      <FeatureCard icon={<LayoutGrid className="size-5" />} title="Templates Library" desc="Browse professional designs." onClick={() => (window.location.hash = "#templates")} />
    </section>
  );
}

function FeatureCard({ icon, title, desc, dot, onClick }: { icon: ReactNode; title: string; desc: string; dot?: boolean; onClick?: () => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white hover:bg-white/[0.06] cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-[#0f162a] border border-cyan-400/30 text-cyan-400 shadow-[0_0_24px_rgba(56,189,248,0.18)] grid place-items-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold truncate">{title}</span>
            {dot && <span className="size-2 rounded-full bg-cyan-400" />}
          </div>
          <p className="text-sm text-white/60 truncate">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="border-t border-white/10">
        <div className="grid grid-cols-[1fr_160px_160px] px-6 py-3 text-white/60 text-sm">
          <span>Name</span>
          <span className="text-right">Last Edited</span>
          <span className="text-right">Actions</span>
        </div>
        {[
          { name: "Software Engineer Resume", date: "2023-11-15" },
          { name: "Product Manager Resume", date: "2023-10-20" },
          { name: "Marketing Specialist Resume", date: "2023-09-05" },
        ].map((row, i) => (
          <div key={row.name} className={"grid grid-cols-[1fr_160px_160px] items-center px-6 py-3 text-white " + (i % 2 === 0 ? "bg-white/[0.02]" : "")}> 
            <span className="truncate">{row.name}</span>
            <span className="text-right text-white/70">{row.date}</span>
            <div className="flex items-center justify-end gap-3 text-white/70">
              <button className="hover:text-white" title="Edit" onClick={() => (window.location.hash = "#resumes")}><Edit2 className="size-4" /></button>
              <button className="hover:text-white" title="Download" onClick={() => (window.location.hash = "#resumes")}><Download className="size-4" /></button>
              <button className="hover:text-red-400" title="Delete"><Trash className="size-4 text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white">
      <div className="mx-auto w-fit rounded-full bg-cyan-500/20 p-3 border border-cyan-400/30 mb-4">
        <Rocket className="size-6 text-cyan-300" />
      </div>
      <h3 className="text-xl font-semibold">Unlock Your Full Potential</h3>
      <p className="text-white/60 mt-1">Upgrade to Pro to access unlimited AI resume reviews, advanced templates, and priority support.</p>
      <button className="mt-5 rounded-xl bg-[oklch(0.488_0.243_264.376)] px-5 py-2.5 text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30]" onClick={() => (window.location.hash = "#pricing")}>
        Explore Pro Plans
      </button>
    </section>
  );
}

function CreditsGuidelineNote({ onClose }: { onClose: () => void }) {
  return (
    <div className="rounded-lg border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white/80 flex items-center gap-2">
      <div className="size-6 rounded-md bg-yellow-500/20 border border-yellow-400/40 grid place-items-center">
        <Coins className="size-4 text-yellow-400" />
      </div>
      <span>Tip: Tap your profile icon in the top bar to see your available credits.</span>
      <button
        onClick={onClose}
        className="ml-auto size-7 rounded-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 grid place-items-center"
        aria-label="Close tip"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export default function DashboardModal() {
  const [showCreditsTip, setShowCreditsTip] = useState(true);
  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />
      <div className="grid grid-cols-[260px_1fr] min-h-[calc(100vh-56px)]">
        <Sidebar activeRoute="dashboard" />
        <div className="px-6 py-6 space-y-6">
          {showCreditsTip && (
            <CreditsGuidelineNote onClose={() => setShowCreditsTip(false)} />
          )}
          <HeroCard />
          <FeatureCards />
          <RecentActivity />
          <PromoBanner />
        </div>
      </div>
    </div>
  );
}