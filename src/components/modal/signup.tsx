import type { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import resumeLogo from "../../assets/resume-ai-logo.png";

function BrandBar() {
  return (
    <div className="h-16 flex items-center justify-between px-6">
      <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img src={resumeLogo} alt="Jobsynk AI Logo" className="h-8 w-8 rounded-md" />
        <span className="text-white text-xl font-black tracking-tight">Jobsynk AI</span>
      </a>
      <a 
        href="#home"
        className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </a>
    </div>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-white/70 ml-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white/90 placeholder:text-white/30 outline-none border border-white/10 focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
      />
    </div>
  );
}

function SocialButton({
  icon,
  label,
  iconClass,
}: {
  icon: ReactNode;
  label: string;
  iconClass?: string;
}) {
  return (
    <button className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all">
      <div className={`size-5 grid place-items-center transition-transform group-hover:scale-110 ${iconClass ?? "text-white/70"}`}>{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function Signup() {
  return (
    <div className="min-h-svh bg-[#0b1220] text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0b1220] to-[#0b1220]" />
         <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-[120px]" />
         <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <BrandBar />

        <main className="max-w-5xl mx-auto px-6 pb-10 flex flex-col items-center justify-center min-h-[calc(100svh-4rem)]">
          <div className="w-full max-w-4xl">
            <div className="mb-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  Create Your Account
                </h1>
                <p className="text-white/60 text-lg">Get started with our AI-powered resume builder.</p>
              </div>
            </div>

            <section className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-black/50">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_20rem] gap-10">
                {/* Left: Form */}
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <Input label="Name" placeholder="Enter your name" />
                     <Input label="Email address" type="email" placeholder="Enter your email" />
                  </div>
                  <Input label="Password" type="password" placeholder="Create a password" />
                  <Input label="Confirm Password" type="password" placeholder="Confirm your password" />

                  <div className="pt-4 flex items-center justify-between gap-4 flex-wrap">
                    <button
                      className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                      className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      Already have an account?
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {/* Right: Social/SSO */}
                <aside className="flex flex-col justify-center space-y-6">
                  <div className="text-center lg:text-left">
                    <div className="text-sm font-medium text-white/90">Or sign up with</div>
                    <div className="text-xs text-white/50 mt-1">Quick access with your existing accounts</div>
                  </div>
                  <div className="space-y-3">
                    <SocialButton icon={<FcGoogle />} label="Sign up with Google" iconClass="text-xl" />
                  </div>
                  <div className="text-xs text-white/30 text-center px-4 leading-relaxed">
                    By clicking continue, you agree to our <a href="#" className="underline hover:text-white/50">Terms of Service</a> and <a href="#" className="underline hover:text-white/50">Privacy Policy</a>.
                  </div>
                </aside>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

