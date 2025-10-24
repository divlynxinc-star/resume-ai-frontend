import { Search, Bell, User2, Settings } from "lucide-react";

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/60">
      <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="size-6 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
          <span className="text-white font-semibold">ForgeAI</span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="text-white/80 hover:text-white">Dashboard</a>
          <a href="#" className="text-white font-medium">My Resumes</a>
          <a href="#" className="text-white/80 hover:text-white">Templates</a>
          <a href="#" className="text-white/80 hover:text-white">AI Tools</a>
          <a href="#" className="text-white/80 hover:text-white">Pricing</a>
        </nav>

        {/* Right: search + actions */}
        <div className="flex items-center gap-4 w-[460px] max-w-[50vw]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
            <input
              placeholder="Search templates or resumes..."
              className="w-full rounded-xl bg-white/5 pl-9 pr-3 py-2.5 text-white/80 outline-none border border-white/10 focus:border-white/20"
            />
          </div>
          <button className="rounded-xl p-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-white" aria-label="Notifications">
            <Bell className="size-4" />
          </button>
          <button className="rounded-xl px-3 py-2 bg-[oklch(0.488_0.243_264.376)] text-white text-sm hover:bg-[oklch(0.488_0.243_264.376)/90] inline-flex items-center gap-2">
            <Settings className="size-4" />
            Manage Account
          </button>
          <div className="size-9 rounded-full bg-white/10 border border-white/20 grid place-items-center" aria-label="Profile">
            <User2 className="size-5 text-white/70" />
          </div>
        </div>
      </div>
    </header>
  );
}