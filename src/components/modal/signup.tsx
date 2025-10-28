import type { ReactNode } from "react";
import { SiGoogle, SiLinkedin, SiGithub, SiFacebook } from "react-icons/si";
import { ArrowLeft } from "lucide-react";

function BrandBar() {
  return (
    <div className="h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-white/90">
        <div className="size-5 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
        <span className="font-semibold">Joblynk AI</span>
      </div>
      <a
        href="#login"
        className="rounded-full px-4 py-2 text-sm border border-white/10 bg-white/5 text-white/80 hover:text-white"
      >
        Login
      </a>
    </div>
  );
}

function Input({ label, type = "text", placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/70">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg bg-white/[0.06] px-3.5 py-2.5 text-sm text-white/85 placeholder:text-white/40 outline-none border border-white/10 focus:border-white/20"
      />
    </div>
  );
}

function SocialButton({ icon, label, iconClass }: { icon: ReactNode; label: string; iconClass?: string }) {
  return (
    <button className="flex items-center gap-3 rounded-lg border border-white/12 bg-[#0C1426] px-3.5 py-2.5 text-sm text-white/85 hover:text-white hover:bg-[#0D172B]">
      <div className={`size-5 grid place-items-center ${iconClass ?? "text-white/70"}`}>{icon}</div>
      <span>{label}</span>
    </button>
  );
}

export default function Signup() {
  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <BrandBar />

      <main className="max-w-5xl mx-auto px-6 pb-10">
        <div className="mt-6">
          <button
            onClick={() => { window.location.hash = "#home"; }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="size-3.5" /> Back to Home
          </button>
        </div>
        <div className="text-center mt-6">
          <h1 className="text-2xl md:text-3xl font-bold">Create Your Account</h1>
          <p className="text-white/60 mt-1">Get started with our AI-powered resume builder.</p>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_22rem] gap-6 items-start">
            {/* Left: Form */}
            <div className="space-y-3">
              <Input label="Name" placeholder="Enter your name" />
              <Input label="Email address" type="email" placeholder="Enter your email" />
              <Input label="Password" type="password" placeholder="Enter your password" />
              <Input label="Confirm Password" type="password" placeholder="Confirm your password" />

              <div className="flex items-center gap-3">
                <button
                  className="rounded-xl bg-[oklch(0.488_0.243_264.376)] px-5 py-2 text-white text-sm font-medium shadow-md shadow-[oklch(0.488_0.243_264.376)/30] hover:bg-[oklch(0.488_0.243_264.376)/90]"
                  onClick={() => {
                    try {
                      localStorage.setItem("authToken", "demo-token");
                      const firstShown = localStorage.getItem("firstLoginShown");
                      window.location.hash = firstShown ? "#dashboard" : "#onboarding";
                    } catch {
                      window.location.hash = "#dashboard";
                    }
                  }}
                >
                  Create Account
                </button>
                <a
                  href="#login"
                  className="rounded-xl border border-white/12 bg-[#0C1426] px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-[#0D172B]"
                >
                  Already have an account?
                </a>
              </div>
            </div>

            {/* Right: Social/SSO */}
            <aside className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm font-medium text-white/85">Or sign up with</div>
              <div className="mt-3 space-y-2">
                <SocialButton icon={<SiGoogle />} label="Continue with Google" iconClass="text-[#EA4335]" />
                <SocialButton icon={<SiLinkedin />} label="Continue with LinkedIn" iconClass="text-[#0A66C2]" />
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Decorative background accents to mimic screenshot mood */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(64,196,255,0.08),transparent_70%)]" />
        <div className="absolute -right-24 -bottom-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(132,94,255,0.08),transparent_70%)]" />
      </div>
    </div>
  );
}