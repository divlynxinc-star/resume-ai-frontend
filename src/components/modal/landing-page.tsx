import type { ReactNode } from "react";
import { Wand2, LayoutGrid, Edit3, Check, Quote } from "lucide-react";
import SiteNavbar from "../layout/site-navbar";


function Hero() {
  return (
    <section className="px-6 pt-8">
      <div className="relative max-w-4xl mx-auto rounded-2xl border border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(100,116,255,.12), transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 6px)",
          }}
        />
        <div className="relative p-8 lg:p-12 text-center bg-[#0f162a]">
          <h1 className="text-3xl sm:text-4xl font-semibold">Craft a Resume That Gets You Hired</h1>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Our AI‑powered resume builder helps you create a professional resume in minutes. Stand out from the competition and land your dream job.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button className="rounded-full bg-[oklch(0.488_0.243_264.376)] px-5 py-2 text-white text-sm">Create My Resume</button>
            <button className="rounded-full border border-white/12 px-5 py-2 text-white/80 hover:text-white text-sm">View Examples</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-white/60 max-w-2xl mx-auto">{subtitle}</p> : null}
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-[#0f162a] border border-white/10 p-5">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
          {icon}
        </div>
        <div className="font-medium">{title}</div>
      </div>
      <p className="mt-3 text-sm text-white/60">{desc}</p>
    </div>
  );
}

function Testimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <div className="rounded-2xl bg-[#0f162a] border border-white/10 p-5">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-white/10 border border-white/15" />
        <div>
          <div className="text-white/90 font-medium">{name}</div>
          <div className="text-xs text-white/60">{role}</div>
        </div>
        <Quote className="ml-auto size-4 text-white/30" />
      </div>
      <p className="mt-3 text-sm text-white/70">“{quote}”</p>
    </div>
  );
}

function PriceItem({ tier, price, features, cta, highlight = false }: { tier: string; price: string; features: string[]; cta: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${highlight ? "border-[oklch(0.488_0.243_264.376)/40] bg-[oklch(0.488_0.243_264.376)/10]" : "border-white/10 bg-[#0f162a]"}`}>
      <div className="text-xs text-white/60">{tier}</div>
      <div className="mt-1 text-2xl font-semibold">{price}<span className="text-xs font-normal text-white/50">/month</span></div>
      <div className="mt-4 space-y-2 text-sm">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-white/80">
            <Check className="size-4 text-[oklch(0.488_0.243_264.376)]" /> {f}
          </div>
        ))}
      </div>
      <button className={`mt-5 w-full rounded-xl px-4 py-2 text-sm ${highlight ? "bg-[oklch(0.488_0.243_264.376)] text-white" : "border border-white/12 text-white/80 hover:text-white"}`}>{cta}</button>
    </div>
  );
}

function FooterBar() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="max-w-[1100px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-5 text-white/70">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
        <div className="text-white/50">© 2024 ResumeAI. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function LandingPageScreen() {
  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />
      <Hero />

      {/* Key Features */}
      <section className="max-w-[1100px] mx-auto px-6 mt-14">
        <SectionTitle title="Key Features" subtitle="Our platform offers a range of features designed to help you create a standout resume." />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon={<Wand2 className="size-5" />} title="AI‑Powered Content Generation" desc="Let our AI suggest improvements and tailor your resume to specific job descriptions." />
          <FeatureCard icon={<LayoutGrid className="size-5" />} title="Customizable Templates" desc="Choose from a variety of professionally designed templates to match your style." />
          <FeatureCard icon={<Edit3 className="size-5" />} title="Quick and Easy Editing" desc="Our intuitive interface makes it easy to update and refine your resume on the go." />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1100px] mx-auto px-6 mt-16">
        <SectionTitle title="What Our Users Say" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Testimonial name="Sarah Miller" role="Software Engineer" quote="ResumeAI helped me land my dream job at a top tech company. The AI suggestions were spot‑on!" />
          <Testimonial name="David Chen" role="Marketing Manager" quote="It was struggling to update my resume, but ResumeAI made the process simple. Interviews within a week!" />
          <Testimonial name="Emily Rodriguez" role="Graphic Designer" quote="The customizable templates allowed me to create a resume that truly reflects my personal brand." />
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-[1100px] mx-auto px-6 mt-16">
        <SectionTitle title="Choose Your Plan" subtitle="Start for free, and upgrade when you're ready." />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <PriceItem tier="Basic" price="Free" features={["Limited templates", "Basic AI suggestions", "Standard support"]} cta="Get Started" />
          <PriceItem tier="Premium" price="$19" features={["Unlimited templates", "Advanced AI suggestions", "Priority support"]} cta="Upgrade Now" highlight />
          <PriceItem tier="Professional" price="$39" features={["All premium features", "Dedicated resume consultant", "24/7 support"]} cta="Upgrade Now" />
        </div>
      </section>

      <FooterBar />
    </div>
  );
}