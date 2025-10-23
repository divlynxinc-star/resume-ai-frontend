function TopNav() {
  return (
    <div className="sticky top-0 z-30 w-full bg-[#0b1220]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/60 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <div className="h-3 w-3 bg-white/90 rounded-sm" />
          </div>
          <span className="text-white/90 font-semibold tracking-wide">ResumeAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a className="text-white/80 hover:text-white transition" href="#">Templates</a>
          <a className="text-white/60 hover:text-white transition" href="#">Examples</a>
          <a className="text-white/60 hover:text-white transition" href="#">Pricing</a>
          <a className="text-white/60 hover:text-white transition" href="#">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg text-sm text-white/80 border border-white/10 hover:bg-white/5 transition">Log In</button>
          <button className="px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-[0_8px_30px_rgba(59,130,246,0.35)]">New Resume</button>
          <div className="h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/10" />
        </div>
      </div>
    </div>
  );
}

function AvatarMock({ tone = 'from-orange-200 to-rose-200' }: { tone?: string }) {
  return (
    <div className={`w-full h-36 rounded-lg bg-gradient-to-br ${tone} relative overflow-hidden`}> 
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute left-8 top-8 w-16 h-16 rounded-full bg-neutral-300/70 blur-sm" />
      <div className="absolute left-14 top-16 w-24 h-14 rounded-full bg-neutral-400/60 blur-md" />
    </div>
  );
}

function TestimonialCard({ title, body, tone }: { title: string; body: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:bg-white/[0.04] transition">
      <AvatarMock tone={tone} />
      <h3 className="mt-4 text-white font-semibold">“{title}”</h3>
      <p className="mt-3 text-white/70 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function CTABanner() {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-indigo-700 to-blue-700 text-white p-8 md:p-10 shadow-[0_20px_60px_rgba(29,78,216,0.35)]">
      <h3 className="text-center text-2xl md:text-3xl font-bold">Ready to take the next step?</h3>
      <p className="mt-3 text-center text-white/80 text-sm md:text-[15px]">Join thousands of professionals who have successfully advanced their careers with ResumeAI.</p>
      <div className="mt-6 flex justify-center">
        <button className="px-5 py-2 rounded-lg bg-white text-blue-700 font-medium hover:bg-white/90 transition shadow">Create My Resume</button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/60">
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
        <div>© 2024 ResumeAI. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function TestimonialsScreen() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <TopNav />
      <main className="mx-auto max-w-7xl px-6">
        <section className="pt-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">What people say about ResumeAI</h1>
          <p className="mt-4 text-white/70">Discover how our users transformed their careers.</p>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <TestimonialCard
            title="ResumeAI transformed my job search!"
            body="I was struggling to articulate my skills and experience effectively. ResumeAI's AI-powered suggestions helped me create a resume that truly stands out. Within weeks, I received multiple interview invitations and landed a fantastic role in marketing."
            tone="from-orange-200 to-rose-200"
          />
          <TestimonialCard
            title="I landed my dream job thanks to ResumeAI."
            body="After countless rejections, I turned to ResumeAI. The platform's intuitive interface and expert guidance helped me craft a resume that perfectly highlighted my qualifications. I'm now working in a leading tech company, a position I wouldn't have secured without ResumeAI."
            tone="from-amber-200 to-pink-200"
          />
          <TestimonialCard
            title="ResumeAI is a game-changer!"
            body="I've tried other resume builders, but ResumeAI is in a league of its own. The AI-driven insights and customizable templates made the process incredibly easy. I highly recommend it to anyone looking to advance their career."
            tone="from-peach-200 to-rose-200"
          />
        </section>

        <section className="mt-16 mb-6 flex justify-center">
          <CTABanner />
        </section>

        <Footer />
      </main>
    </div>
  );
}