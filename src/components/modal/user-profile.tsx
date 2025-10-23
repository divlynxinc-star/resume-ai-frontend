import { useState } from 'react';
import type { ReactNode } from 'react';

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
          <a className="text-white/80 hover:text-white transition" href="#">Dashboard</a>
          <a className="text-white/80 hover:text-white transition" href="#">Templates</a>
          <a className="text-white/80 hover:text-white transition" href="#">My Resumes</a>
          <a className="text-white/60 hover:text-white transition" href="#">Cover Letters</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
            <span className="text-white/70 text-xs">?</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/10" />
        </div>
      </div>
    </div>
  );
}

function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  );
}

function LabeledInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-white/80">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full rounded-md bg-[#0e1526] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default function UserProfileScreen() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <TopNav />

      <main className="mx-auto max-w-3xl px-6 pb-12">
        <section className="pt-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        </section>

        {/* Profile */}
        <section className="mt-6">
          <div className="text-white/80 font-medium mb-3">Profile</div>
          <SectionCard>
            <div className="space-y-4">
              <LabeledInput label="Name" placeholder="Enter your name" />
              <LabeledInput label="Email" placeholder="Enter your email" />

              <div className="pt-1">
                <div className="text-sm text-white/80 mb-2">Upload Avatar</div>
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/10" />
                  <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium">Upload</button>
                </div>
              </div>
            </div>
          </SectionCard>
        </section>

        {/* Theme */}
        <section className="mt-8">
          <div className="text-white/80 font-medium mb-3">Theme</div>
          <SectionCard>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  theme === 'light'
                    ? 'border-blue-500/40 text-blue-100 bg-blue-950/30 ring-2 ring-blue-500'
                    : 'border-white/10 text-white/80 bg-white/[0.03]'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  theme === 'dark'
                    ? 'border-blue-500/40 text-blue-100 bg-blue-950/30 ring-2 ring-blue-500'
                    : 'border-white/10 text-white/80 bg-white/[0.03]'
                }`}
              >
                Dark
              </button>
            </div>
          </SectionCard>
        </section>

        {/* Subscription */}
        <section className="mt-8">
          <div className="text-white/80 font-medium mb-3">Subscription</div>
          <SectionCard>
            <div className="text-sm">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-white/90">Current Plan</div>
                  <div className="text-white/50">Free</div>
                </div>
                <div className="text-white/70">Free</div>
              </div>
              <div className="my-3 h-px bg-white/10" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-white/90">Billing</div>
                  <div className="text-white/50">No payment method added</div>
                </div>
                <button className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium">Add</button>
              </div>
            </div>
          </SectionCard>
        </section>

        {/* Account Danger Zone */}
        <section className="mt-8">
          <div className="text-white/80 font-medium mb-3">Account</div>
          <div className="rounded-xl border border-red-500/30 bg-red-900/20 p-5 md:p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Delete Account</div>
                <div className="text-white/70 text-sm">Permanently delete your account and all data.</div>
              </div>
              <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm font-medium">Delete</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}