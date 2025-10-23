import type { ReactNode } from "react";
import { FiLock, FiShield, FiUser, FiKey } from "react-icons/fi";

function TopNav() {
  return (
    <div className="sticky top-0 z-10 w-full bg-[#0B1220]/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="size-6 rotate-45 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
          <span className="text-white font-semibold">ResumeAI</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm">
          <a href="#" className="text-white/70 hover:text-white">Dashboard</a>
          <a href="#" className="text-white/70 hover:text-white">Templates</a>
          <a href="#" className="text-white/70 hover:text-white">Examples</a>
          <a href="#" className="text-white/90 font-medium hover:text-white">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-[oklch(0.61_0.22_246.5)] px-4 py-2 text-sm text-white hover:bg-[oklch(0.61_0.22_246.5)]/90">New Resume</button>
          <div className="size-8 rounded-full bg-white/10 border border-white/10" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-blue-900/40 bg-[#0F1629] p-6 text-white/85">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-blue-700/40 bg-blue-500/5 shadow-[0_0_40px_0_rgba(56,189,248,0.15)]">
        <span className="text-xl text-blue-400">{icon}</span>
      </div>
      <div className="text-white font-semibold">{title}</div>
      <p className="mt-2 text-sm text-white/70">{description}</p>
    </div>
  );
}

function CTABanner() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#132756] p-8 text-center text-white">
      <h3 className="text-xl font-semibold">Have Questions?</h3>
      <p className="mt-2 text-white/80">
        If you have any questions or concerns about our security practices, please don’t hesitate to reach out. Our team is here to help.
      </p>
      <button className="mt-5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_20px_rgba(56,189,248,0.25)] hover:bg-blue-500">
        Contact Security Team
      </button>
    </div>
  );
}

export default function SecurityScreen() {
  return (
    <div className="min-h-screen w-full bg-[#0B1220] text-white">
      <TopNav />

      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h1 className="text-center text-4xl sm:text-5xl font-semibold">Security at its Core</h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-white/75">
          At ResumeAI, we prioritize the security and privacy of your data. Our robust security measures ensure your information is protected at every step.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FiLock />}
            title="Encryption at Every Layer"
            description="We use advanced encryption to protect your data in transit and at rest."
          />
          <FeatureCard
            icon={<FiShield />}
            title="AI Safety Protocols"
            description="Our AI models are built with safety and ethical considerations at the forefront."
          />
          <FeatureCard
            icon={<FiUser />}
            title="Data Anonymization"
            description="We anonymize your data to ensure your personal information remains private."
          />
          <FeatureCard
            icon={<FiKey />}
            title="Access Control & Authentication"
            description="We implement strict access controls and authentication methods to secure your account."
          />
        </div>

        <div className="mt-12">
          <CTABanner />
        </div>
      </section>
    </div>
  );
}