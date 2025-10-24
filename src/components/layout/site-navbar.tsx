import { Bell, User2, Settings } from "lucide-react";
import resumeLogo from "../../assets/resume-ai-logo.png";

export default function SiteNavbar() {
  // Determine current route from hash and build link classes
  const current = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  const linkClass = (route: string) =>
    current === route
      ? "text-white font-semibold"
      : "text-white/80 hover:text-white";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/60">
      <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3">
          <img src={resumeLogo} alt="ResumeCraft AI Logo" className="h-10 w-10 rounded-md" />
          <span className="text-white font-semibold text-lg tracking-wide">
            ResumeCraft AI
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 ml-16 text-sm">
          <a href="#dashboard" className={linkClass("dashboard")} >Dashboard</a>
          <a href="#resumes" className={linkClass("resumes")} >AI Builder</a>
          <a href="#templates" className={linkClass("templates")} >Templates</a>
          <a href="#tailoring" className={linkClass("tailoring")} >AI Tools</a>
          <a href="#pricing" className={linkClass("pricing")} >Pricing</a>
          <a href="#user-details" className={linkClass("user-details")} >User Details</a>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-4 ml-auto">
          <a
            href="#account"
            className="rounded-lg px-2.5 py-1.5 bg-[oklch(0.488_0.243_264.376)] text-white text-xs hover:bg-[oklch(0.488_0.243_264.376)/90] inline-flex items-center gap-1.5"
          >
            <Settings className="size-3" />
            Manage Account
          </a>
          <button
            onClick={() => { window.location.hash = "#resumes"; }}
            className="rounded-lg px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/80 text-xs hover:text-white"
            aria-label="New Resume"
          >
            + New Resume
          </button>
          <div
            className="size-8 rounded-full bg-white/10 border border-white/20 grid place-items-center cursor-pointer hover:bg-white/20 transition"
            aria-label="Profile"
          >
            <User2 className="size-4 text-white/70" />
          </div>
          <button
            className="size-8 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white grid place-items-center transition"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
