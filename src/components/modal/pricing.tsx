import type { ReactNode } from "react";
import { FiCheck } from "react-icons/fi";

function TopNav() {
  return (
    <div className="sticky top-0 z-10 w-full bg-[#0B1220]/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="size-6 rotate-45 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
          <span className="text-white font-semibold">ResumeAI</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm">
          <a href="#" className="text-white/70 hover:text-white">Templates</a>
          <a href="#" className="text-white/70 hover:text-white">Examples</a>
          <a href="#" className="text-white font-medium">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-[oklch(0.61_0.22_246.5)] px-4 py-2 text-sm text-white hover:bg-[oklch(0.61_0.22_246.5)]/90">New Resume</button>
          <div className="size-8 rounded-full bg-white/10 border border-white/10" />
        </div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative rounded-xl p-px bg-gradient-to-r from-cyan-500/30 to-indigo-600/30">
      <div className="rounded-xl bg-[#0F1629] border border-white/10 px-8 py-6 text-center">
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="mt-1 text-sm text-white/60">{label}</div>
      </div>
    </div>
  );
}

type PlanProps = {
  title: string;
  price: string;
  subtitle?: string;
  button: string;
  features: string[];
  highlight?: boolean;
  label?: string;
};

function PlanCard({ title, price, subtitle, button, features, highlight, label }: PlanProps) {
  return (
    <div className={
      `relative ${highlight ? "rounded-[26px] p-1 bg-gradient-to-b from-sky-500/40 to-cyan-500/40" : ""}`
    }>
      <div className={`relative rounded-2xl bg-[#0F1629] border border-white/10 px-6 py-6 h-full ${highlight ? "shadow-[0_0_40px_0_rgba(56,189,248,0.25)]" : ""}`}>
        {label ? (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 text-white text-xs px-3 py-1 shadow">
            {label}
          </div>
        ) : null}
        <div className="text-white text-lg font-semibold">{title}</div>
        <div className="mt-2 flex items-end gap-1">
          <span className="text-3xl font-bold text-white">{price}</span>
          {subtitle ? <span className="text-sm text-white/70">{subtitle}</span> : null}
        </div>
        <p className="mt-2 text-sm text-white/60">
          {title === "Free" && "Perfect for getting started."}
          {title === "Starter" && "Ideal for first-time job seekers."}
          {title === "Premium" && "For professionals aiming high."}
          {title === "Pro" && "For serious career builders."}
          {title === "Enterprise" && "For teams and organizations."}
        </p>
        <button className={`mt-5 w-full rounded-lg px-4 py-3 text-sm font-medium ${highlight ? "bg-sky-500 text-white hover:bg-sky-400" : "bg-[#0C1426] text-white hover:bg-[#0D172B] border border-white/12"}`}>
          {button}
        </button>
        <ul className="mt-5 space-y-2 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-white/85">
              <FiCheck className="text-sky-400" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PricingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#0B1220] text-white">
      <TopNav />

      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex items-center gap-3">
          <Badge>PAY AS YOU GROW</Badge>
          <Badge>CREDIT-BASED</Badge>
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl font-semibold">Intelligent Pricing for Your Success</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Our AI-powered platform operates on a credit system, ensuring you only pay for the features you actually use. Start for free and scale up as your career grows.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value="50" label="AI Credits" />
          <StatCard value="200+" label="Templates" />
          <StatCard value="48h" label="Support" />
          <StatCard value="10k+" label="Happy Users" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <PlanCard
            title="Free"
            price="$0"
            subtitle="/ forever"
            button="Get Started"
            features={["5 AI Credits", "Basic Templates", "Standard Support"]}
          />
          <PlanCard
            title="Starter"
            price="$9"
            subtitle="/ 50 credits"
            button="Choose Starter"
            features={["50 AI Credits", "All Templates", "Priority Support"]}
          />
          <PlanCard
            title="Premium"
            price="$29"
            subtitle="/ 200 credits"
            button="Choose Premium"
            features={["200 AI Credits", "AI Cover Letters", "Premium Support"]}
            highlight
            label="Most Popular"
          />
          <PlanCard
            title="Pro"
            price="$49"
            subtitle="/ 500 credits"
            button="Choose Pro"
            features={["500 AI Credits", "Interview Prep Module", "24/7 VIP Support"]}
          />
          <PlanCard
            title="Enterprise"
            price="Custom"
            subtitle={undefined}
            button="Contact Sales"
            features={["Custom Credit Pool", "Team Management", "Dedicated Account Manager"]}
          />
        </div>
      </section>
    </div>
  );
}