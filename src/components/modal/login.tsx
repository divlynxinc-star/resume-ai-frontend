import { useState } from "react";
import type { ReactNode, FormEvent } from "react";
import { SiGoogle, SiLinkedin } from "react-icons/si";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function TopLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="size-8 rotate-45 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
      <h1 className="mt-6 text-3xl font-semibold text-white">Log in to your account</h1>
      <p className="mt-2 text-white/60">Welcome back to ResumeAI</p>
    </div>
  );
}

function DividerLabel({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-5">
      <div className="h-px bg-white/10" />
      <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-[#0b1220] px-2 text-xs text-white/60">
        {children}
      </span>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[#0C1426] border border-white/12 text-white/80 hover:text-white">
      <span className="text-base">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setStatus("loading");
    await new Promise((res) => setTimeout(res, 800));
    setStatus("idle");
    try {
      localStorage.setItem("authToken", "demo-token");
      const firstShown = localStorage.getItem("firstLoginShown");
      window.location.hash = firstShown ? "#dashboard" : "#onboarding";
    } catch {
      window.location.hash = "#dashboard";
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <TopLogo />

        <div className="relative mt-6">
          {/* Soft glow */}
          <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-b from-blue-500/10 to-indigo-600/10 blur-2xl" aria-hidden />

          <div className="relative rounded-2xl border border-white/10 bg-[#0F1629]/80 backdrop-blur-xl shadow-xl">
            <form onSubmit={onSubmit} className="p-6 sm:p-8">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
                disabled={status === "loading"}
              />

              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-3 w-full rounded-lg border border-white/15 bg-[#0C1426] px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
                disabled={status === "loading"}
              />

              <div className="mt-2 text-right">
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot your password?</a>
              </div>

              {error ? <div className="mt-2 text-xs text-red-400">{error}</div> : null}

              <button
                type="submit"
                onClick={() => onSubmit()}
                disabled={status === "loading" || !isValidEmail(email) || !password}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                {status === "loading" ? "Logging in…" : "Log in"}
              </button>

              <DividerLabel>Or continue with</DividerLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SocialButton icon={<SiGoogle />} label="Google" />
                <SocialButton icon={<SiLinkedin />} label="LinkedIn" />
              </div>

              <div className="mt-5 text-center text-xs text-white/60">
                Don’t have an account?{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}