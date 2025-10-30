import type { ReactNode } from "react";
import { FiCheck } from "react-icons/fi";
import SiteNavbar from "../layout/site-navbar";
import PageWithSidebar from "../layout/page-with-sidebar";


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
  labelClassName?: string;
  pop?: boolean;
  popMode?: "hover" | "always";
};

function PlanCard({ title, price, subtitle, button, features, highlight, label, labelClassName, pop, popMode }: PlanProps) {
  const isAlways = pop && popMode === "always";
  return (
    <div
      className={`relative group transition-transform duration-200 ${
        highlight ? "rounded-[26px] p-1 bg-gradient-to-b from-sky-500/40 to-cyan-500/40" : ""
      } ${pop ? (isAlways ? "-translate-y-0.5 scale-[1.02]" : "hover:-translate-y-0.5 hover:scale-[1.02]") : ""}`}
    >
      {pop ? (
        <div className={`pointer-events-none absolute -inset-3 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-2xl ${isAlways ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`} />
      ) : null}
      <div
        className={`relative rounded-2xl bg-[#0F1629] border border-white/10 px-8 py-8 h-full flex flex-col ${
          highlight ? "shadow-[0_0_40px_0_rgba(56,189,248,0.25)]" : ""
        } ${pop ? (isAlways ? "ring-1 ring-cyan-400/40 shadow-[0_18px_50px_rgba(56,189,248,0.35)]" : "ring-1 ring-white/10 group-hover:ring-cyan-400/40 group-hover:shadow-[0_18px_50px_rgba(56,189,248,0.35)]") : ""}`}
      >
        {label ? (
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full text-xs px-3 py-1 ${labelClassName ?? "bg-sky-500 text-white shadow"}`}>
            {label}
          </div>
        ) : null}
        <div className="min-h-[140px]">
          <div className="text-white text-lg font-semibold">{title}</div>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-bold text-white">{price}</span>
            {subtitle ? <span className="text-sm text-white/70">{subtitle}</span> : null}
          </div>
          <p className="mt-2 text-sm text-white/60">
            {title === "Free" && "Perfect for getting started."}
            {title === "Starter" && "Ideal for first-time job seekers."}
            {title === "Premium" && "For professionals aiming high."}
            {title === "Pro" && "For serious career builders."}
            {title === "Enterprise" && "For teams and organizations."}
          </p>
        </div>
        <button
          onClick={() => {
            try {
              sessionStorage.setItem("selectedPlan", JSON.stringify({ title, price, subtitle }));
            } catch {}
            window.location.hash = "subscribe";
          }}
          className={`mt-6 w-full rounded-lg px-5 py-3.5 text-base font-medium cursor-pointer ${highlight ? "bg-sky-500 text-white hover:bg-sky-400" : "bg-[#0C1426] text-white hover:bg-[#0D172B] border border-white/12"}`}
        >
          {button}
        </button>
        <ul className="mt-6 space-y-3 text-base">
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

export function PricingSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-20">
      <div className="flex items-center gap-3">
        <Badge>PAY AS YOU GROW</Badge>
        <Badge>CREDIT-BASED</Badge>
      </div>
      <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">Intelligent Pricing for Your Success</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        Our AI-powered platform operates on a credit system, ensuring you only pay for the features you actually use. Start for free and scale up as your career grows.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="50" label="AI Credits" />
        <StatCard value="12+" label="ATS Friendly Templates" />
        <StatCard value="24h" label="Client Support" />
        <StatCard value="1k+" label="Satisfied Customers" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <PlanCard
          title="Free"
          price="$0"
          subtitle="/ forever"
          button="Get Started"
          features={["5 AI Credits", "Basic Templates", "Standard Support"]}
          label="Head Start"
          labelClassName="bg-white text-[#0b1220] font-bold shadow-[0_8px_20px_rgba(255,255,255,0.25)] border border-white/20"
          pop
          popMode="always"
        />
        <PlanCard
          title="Starter"
          price="$9.99"
          subtitle="/ 50 credits"
          button="Choose Starter"
          features={["50 AI Credits", "All Templates", "Priority Support"]}
        />
        <PlanCard
          title="Premium"
          price="$29.99"
          subtitle="/ 200 credits"
          button="Choose Premium"
          features={["200 AI Credits", "AI Cover Letters", "Premium Support"]}
          highlight
          label="Most Popular"
        />
        <PlanCard
          title="Pro"
          price="$49.99"
          subtitle="/ 500 credits"
          button="Choose Pro"
          features={["500 AI Credits", "Interview Prep Module", "24/7 VIP Support"]}
        />
      </div>
    </section>
  );
}

export default function PricingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#0B1220] text-white">
      <SiteNavbar />
      <PageWithSidebar mainClassName="">
        <PricingSection />
      </PageWithSidebar>
    </div>
  );
}