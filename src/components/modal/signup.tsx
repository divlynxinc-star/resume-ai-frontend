import type { ReactNode } from "react";
import { SiGoogle, SiLinkedin, SiGithub, SiFacebook } from "react-icons/si";

function BrandBar() {
  return (
    <div className="h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-white/90">
        <div className="size-5 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
        <span className="font-semibold">ResumeAI</span>
      </div>
      <a
        href="#"
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
        className="w-full rounded-lg bg-white/[0.06] px-4 py-3 text-white/80 placeholder:text-white/40 outline-none border border-white/10 focus:border-white/20"
      />
    </div>
  );
}

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/80 hover:text-white">
      <div className="size-6 grid place-items-center text-white/70">{icon}</div>
      <span className="text-sm">{label}</span>
    </button>
  );
}

export default function Signup() {
  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <BrandBar />

      <main className="max-w-xl mx-auto px-4">
        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold">Create Your Account ✨</h1>
          <p className="text-white/60 mt-2">Get started with our AI-powered resume builder.</p>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="space-y-4">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email address" type="email" placeholder="Enter your email" />
            <Input label="Password" type="password" placeholder="Enter your password" />
            <Input label="Confirm Password" type="password" placeholder="Confirm your password" />

            <button
              className="mt-2 w-full rounded-xl bg-[oklch(0.488_0.243_264.376)] py-3 text-white font-medium shadow-md shadow-[oklch(0.488_0.243_264.376)/30]"
              onClick={() => {
                try {
                  localStorage.setItem("authToken", "demo-token");
                  // First login goes to onboarding
                  const firstShown = localStorage.getItem("firstLoginShown");
                  window.location.hash = firstShown ? "#dashboard" : "#onboarding";
                } catch {
                  window.location.hash = "#dashboard";
                }
              }}
            >
              Create Account
            </button>

            <div className="my-4 flex items-center gap-3 text-white/50">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-xs">Or sign up with</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton icon={<SiGoogle />} label="Continue with Google" />
              <SocialButton icon={<SiLinkedin />} label="Continue with LinkedIn" />
              <SocialButton icon={<SiGithub />} label="Continue with GitHub" />
              <SocialButton icon={<SiFacebook />} label="Continue with Facebook" />
            </div>

            <p className="text-center text-xs text-white/50 mt-6">
              Already have an account? <a href="#" className="text-cyan-300 hover:underline">Login here</a>
            </p>
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