import { useEffect, useRef, useState, type JSX } from "react";
import { Bell, User2, Settings, Coins, LogOut, MessageSquare, Wand2, FileText, CheckCircle, Building2, Crown } from "lucide-react";
import resumeLogo from "../../assets/resume-ai-logo.png";

export default function SiteNavbar() {
  // Determine current route from hash and build link classes
  const current = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  const linkClass = (route: string) =>
    current === route
      ? "text-white font-semibold"
      : "text-white/80 hover:text-white";

  // Profile dropdown state & refs
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  // Notifications dropdown state & ref
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  // Resolve credits from storage or plan
  const getCredits = () => {
    try {
      const stored = sessionStorage.getItem("userCredits");
      if (stored) {
        const n = parseInt(stored, 10);
        if (!Number.isNaN(n)) return n;
      }
      const planRaw = sessionStorage.getItem("selectedPlan");
      if (planRaw) {
        const parsed = JSON.parse(planRaw ?? '{}');
        switch (parsed?.title) {
          case "Starter": return 50;
          case "Premium": return 200;
          case "Pro": return 500;
          case "Enterprise": return 0;
          case "Free":
          default: return 5;
        }
      }
    } catch {}
    return 5;
  };
  const credits = getCredits();
  // Resolve current subscription plan title, default to Freemium
  const planTitle = (() => {
    try {
      const planRaw = sessionStorage.getItem("selectedPlan");
      if (planRaw) {
        const parsed = JSON.parse(planRaw ?? '{}');
        const t = parsed?.title as string | undefined;
        if (t) return t === "Free" ? "Freemium" : t;
      }
    } catch {}
    return "Freemium";
  })();
  // Notifications count (from sessionStorage or default)
  const [notifCount, setNotifCount] = useState<number>(() => {
    try {
      const raw = sessionStorage.getItem("notificationCount");
      if (raw) {
        const n = parseInt(raw, 10);
        if (!Number.isNaN(n)) return n;
      }
    } catch {}
    return 3; // fallback demo count
  });
  const notifications: { id: string; title: string; desc: string; icon: JSX.Element; time: string }[] = [
    { id: "n1", title: "Resume exported", desc: "Your PDF is ready to download.", icon: <FileText className="size-4 text-blue-400" />, time: "2m" },
    { id: "n2", title: "AI suggestion", desc: "Improve your summary with AI.", icon: <Wand2 className="size-4 text-purple-400" />, time: "10m" },
    { id: "n3", title: "New message", desc: "Recruiter replied to your application.", icon: <MessageSquare className="size-4 text-emerald-400" />, time: "1h" },
    { id: "n4", title: "Plan upgraded", desc: "Premium features unlocked.", icon: <CheckCircle className="size-4 text-cyan-400" />, time: "1d" },
  ];

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const logout = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem("authToken");
    } catch {}
    window.location.hash = "#home";
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/60">
      <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3">
          <img src={resumeLogo} alt="ResumeCraft AI Logo" className="h-10 w-10 rounded-md" />
          <span className="text-white font-semibold text-lg tracking-wide">
            Jobsynk AI
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 ml-16 text-sm">
          <a
            href="#dashboard"
            className={linkClass("dashboard")}
            onClick={(e) => {
              e.preventDefault();
              const token = localStorage.getItem("authToken");
              const firstShown = localStorage.getItem("firstLoginShown");
              if (!token) {
                window.location.hash = "#login";
                return;
              }
              if (!firstShown) {
                window.location.hash = "#onboarding";
                return;
              }
              window.location.hash = "#dashboard";
            }}
          >
            Dashboard
          </a>
          {/*<a href="#resumes" className={linkClass("resumes")} >AI Builder</a>*/}
          <a href="#templates" className={linkClass("templates")} >Templates</a>
          <a href="#tailoring" className={linkClass("tailoring")} >AI Tools</a>
          <a href="#pricing" className={linkClass("pricing")} >Pricing</a>
          <a href="#user-details" className={linkClass("user-details")} >Your Profile</a>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-4 ml-auto relative">
          <button
            onClick={() => { window.location.hash = "#resumes"; }}
            className="rounded-lg px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/80 text-xs hover:text-white"
            aria-label="New Resume"
          >
            + New Resume
          </button>
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="size-8 rounded-full bg-white/10 border border-white/20 grid place-items-center cursor-pointer hover:bg-white/20 transition"
              aria-label="Profile"
            >
              <User2 className="size-4 text-white/70" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-10 w-56 rounded-xl bg-[#0f1629] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <div className="px-3 py-2.5 flex items-center gap-2">
                  <div className="size-7 rounded-md bg-purple-500/20 border border-purple-400/40 grid place-items-center">
                    <Crown className="size-4 text-purple-300" />
                  </div>
                  <div className="text-sm text-white/90">Plan: <span className="font-semibold text-white">{planTitle}</span></div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="px-3 py-2.5 flex items-center gap-2">
                  <div className="size-7 rounded-md bg-yellow-500/20 border border-yellow-400/40 grid place-items-center">
                    <Coins className="size-4 text-yellow-400" />
                  </div>
                  <div className="text-sm text-white/90">Credits: <span className="font-semibold text-white">{credits}</span></div>
                </div>
                <div className="h-px bg-white/10" />
                <button
                  onClick={() => { window.location.hash = "#account"; }}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-2 text-sm text-white/80 hover:text-white hover:bg-white/5"
                >
                  <Settings className="size-4" /> Manage Account
                </button>
                <div className="h-px bg-white/10" />
                <button
                  onClick={() => { window.location.hash = "#enterprise"; }}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-2 text-sm text-white/80 hover:text-white hover:bg-white/5"
                >
                  <Building2 className="size-4" /> Enterprise Plans
                </button>
                <div className="h-px bg-white/10" />
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-2 text-sm text-white/80 hover:text-white hover:bg-white/5"
                >
                  <LogOut className="size-4" /> Logout
                </button>
              </div>
            )}
          </div>
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="size-8 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white grid place-items-center transition relative"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-semibold text-white grid place-items-center border border-white/20 shadow">
                  {notifCount > 99 ? "99+" : notifCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-10 w-80 rounded-xl bg-[#0f1629] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <div className="px-3 py-2.5 flex items-center justify-between">
                  <div className="text-sm text-white/80">Notifications</div>
                  <button
                    className="text-xs text-white/70 hover:text-white"
                    onClick={() => {
                      setNotifCount(0);
                      try { sessionStorage.setItem("notificationCount", "0"); } catch {}
                    }}
                  >
                    Mark all read
                  </button>
                </div>
                <div className="h-px bg-white/10" />
                <ul className="max-h-64 overflow-auto py-2">
                  {notifications.slice(0, 6).map((n) => (
                    <li key={n.id} className="px-3 py-2.5 flex items-start gap-3 hover:bg-white/5">
                      <div className="size-7 rounded-md bg-white/5 border border-white/10 grid place-items-center shrink-0">
                        {n.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white/90 font-medium">{n.title}</div>
                        <div className="text-xs text-white/60">{n.desc}</div>
                      </div>
                      <div className="text-[11px] text-white/50">{n.time}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
