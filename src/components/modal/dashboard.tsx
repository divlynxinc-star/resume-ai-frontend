import type { ReactNode } from "react";
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
} from "lucide-react";
import SiteNavbar from "../layout/site-navbar";

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0b1220] text-white/90">
      <div className="h-16 flex items-center px-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">ResumeAI</span>
          <span className="text-xs text-white/60">Your Career Catalyst</span>
        </div>
      </div>
      <nav className="px-3 py-2 space-y-1">
        <NavItem icon={<Home className="size-4" />} label="Dashboard" active />
        <NavItem icon={<FileText className="size-4" />} label="My Resumes" />
        <NavItem icon={<LayoutGrid className="size-4" />} label="Templates" />
        <NavItem icon={<Wand2 className="size-4" />} label="AI Tailoring" />
        <NavItem icon={<MessagesSquare className="size-4" />} label="Interviews" />
        <NavItem icon={<Settings className="size-4" />} label="Settings" />
        <NavItem icon={<HelpCircle className="size-4" />} label="Help Center" />
      </nav>
      <div className="mt-auto px-3 py-4 space-y-3">
        <button className="w-full rounded-xl bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30]">
          Upgrade Plan
        </button>
        <button className="w-full rounded-xl px-4 py-2 text-white/70 hover:text-white flex items-center gap-2">
          <LogOut className="size-4" /> Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-xl px-4 py-2 text-sm cursor-pointer transition-colors " +
        (active ? "bg-white/5 text-white" : "text-white/70 hover:bg-white/5 hover:text-white")
      }
    >
      {icon}
      <span>{label}</span>
    </div>
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
        <button className="rounded-xl bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30]">
          Create New Resume
        </button>
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="grid grid-cols-4 gap-4">
      <FeatureCard icon={<FileText className="size-5" />} title="My Resumes" desc="View and manage your documents." />
      <FeatureCard icon={<Wand2 className="size-5" />} title="AI Tailoring" desc="Optimize your resume for any job." />
      <FeatureCard icon={<LayoutGrid className="size-5" />} title="Credits Remaining" desc="150 AI credits left." dot />
      <FeatureCard icon={<LayoutGrid className="size-5" />} title="Templates Library" desc="Browse professional designs." />
    </section>
  );
}

function FeatureCard({ icon, title, desc, dot }: { icon: ReactNode; title: string; desc: string; dot?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-lg bg-white/10 grid place-items-center">
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
              <button className="hover:text-white" title="Edit"><Edit2 className="size-4" /></button>
              <button className="hover:text-white" title="Download"><Download className="size-4" /></button>
              <button className="hover:text-white" title="Delete"><Trash className="size-4" /></button>
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
      <button className="mt-5 rounded-xl bg-[oklch(0.488_0.243_264.376)] px-5 py-2.5 text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30]">
        Explore Pro Plans
      </button>
    </section>
  );
}

export default function DashboardModal() {
  return (
    <div className="h-svh bg-[#0b1220] text-white overflow-hidden">
      <SiteNavbar />
      <div className="grid grid-cols-[260px_1fr] h-[calc(100vh-56px)]">
        <Sidebar />
        <div className="px-6 py-6 space-y-6">
          <HeroCard />
          <FeatureCards />
          <RecentActivity />
          <PromoBanner />
        </div>
      </div>
    </div>
  );
}