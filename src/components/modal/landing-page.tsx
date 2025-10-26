import { useEffect, useState, type ReactNode } from "react";
import {
  Wand2,
  LayoutGrid,
  ShieldCheck,
  Quote,
  Sparkles,
  ArrowRight,
  ChevronUp,
} from "lucide-react";
import SiteNavbar from "../layout/site-navbar";
import SiteFooter from "../layout/site-footer";
import { PricingSection } from "./pricing";
import { TailoringSection } from "./tailoring";
import { TemplatesShowingSection } from "./templates-showing";

function Hero() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <section
      id="landing-hero"
      className={`px-6 pt-8 transition-transform transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        entered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}>
      <div className="relative max-w-4xl mx-auto rounded-2xl border border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(100,116,255,.12), transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 6px)",
          }}
        />
        <div className="relative p-8 lg:p-12 text-center bg-[#0f162a]">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Craft a Resume That Gets You Hired
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Our AI‑powered resume builder helps you create a professional resume
            in minutes. Stand out from the competition and land your dream job.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="#signup"
              className="group rounded-xl bg-white px-5 py-2.5 text-[#0b1220] text-sm font-medium inline-flex items-center gap-2 shadow-[0_12px_40px_rgba(2,6,23,0.35)] hover:bg-white/95">
              <Sparkles className="size-4" />
              Start Free Today
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#templates"
              className="h-11 px-5 rounded-xl bg-white/6 border border-white/12 text-white text-sm inline-flex items-center gap-2">
              <LayoutGrid className="size-4" />
              Browse Templates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className="text-center">
      <h2
        className={`text-4xl md:text-4xl font-extrabold tracking-tight ${
          className ?? ""
        }`}>
        {title}
      </h2>
      <div className="mt-3 flex justify-center">
        <span className="block h-1 w-40 rounded-full bg-[#2b5bd9]" />
      </div>
      {subtitle && <p className="text-white/70 mt-2">{subtitle}</p>}
    </header>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  featured = false,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  featured?: boolean;
}) {
  return (
    <div className="relative overflow-visible rounded-2xl bg-[#0f162a] border border-white/10 p-5">
      {featured && (
        <span className="absolute -top-2 -right-2 rounded-full bg-blue-600/20 text-blue-300 text-[10px] font-semibold px-2 py-1 border border-blue-500/40 shadow-[0_6px_16px_rgba(59,130,246,0.35)]">
          FEATURED
        </span>
      )}
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

function Testimonial({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
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

export default function LandingPageScreen() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("landing-hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowTop(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />
      <Hero />

      {/* Key Features */}
      <section className="max-w-[1100px] mx-auto px-6 mt-14">
        <SectionTitle
          title="Key Features"
          subtitle="Our platform offers a range of features designed to help you create a standout resume."
          className="font-extrabold"
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            featured
            icon={<Wand2 className="size-5" />}
            title="AI‑Powered Generation"
            desc="Let our AI suggest improvements and tailor your resume to specific job descriptions."
          />
          <FeatureCard
            icon={<LayoutGrid className="size-5" />}
            title="Customizable Templates"
            desc="Choose from a variety of professionally designed templates to match your style."
          />
          <FeatureCard
            icon={<ShieldCheck className="size-5" />}
            title="ATS Score & Compatibility"
            desc="Analyze your resume against ATS criteria and get actionable fixes."
          />
        </div>
      </section>

      {/* Templates Showing */}
      <div className="mt-16">
        <TemplatesShowingSection />
      </div>

      {/* Testimonials */}
      <section className="max-w-[1100px] mx-auto px-6 mt-16">
        <SectionTitle title="What Our Users Say" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Testimonial
            name="Sarah Miller"
            role="Software Engineer"
            quote="ResumeAI helped me land my dream job at a top tech company. The AI suggestions were spot‑on!"
          />
          <Testimonial
            name="David Chen"
            role="Marketing Manager"
            quote="It was struggling to update my resume, but ResumeAI made the process simple. Interviews within a week!"
          />
          <Testimonial
            name="Emily Rodriguez"
            role="Graphic Designer"
            quote="The customizable templates allowed me to create a resume that truly reflects my personal brand."
          />
        </div>
      </section>

      {/* Tailoring */}
      <div className="mt-16">
        <TailoringSection />
      </div>

      {/* Pricing: use the dedicated pricing section */}
      <div className="mt-16">
        <PricingSection />
      </div>

      <div className="mt-16">
        <SiteFooter />
      </div>

      {/* Back to Top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-50 h-10 w-10 rounded-full bg-[oklch(0.488_0.243_264.376)] hover:bg-[oklch(0.58_0.24_264.376)] text-white shadow-[0_12px_40px_rgba(2,6,23,0.35)] border border-white/10 grid place-items-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}>
        <ChevronUp className="size-4" />
      </button>
    </div>
  );
}
