import { useState } from "react";
import type { ReactNode } from "react";
import SiteNavbar from "../layout/site-navbar";
import PageWithSidebar from "../layout/page-with-sidebar";

function PageTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="pt-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{children}</h1>
      {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${className}`}>{children}</div>
  );
}

function LabeledInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <div className="text-xs text-white/60 mb-2">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
      />
    </div>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 rounded-full border ${
        checked ? "bg-blue-600 border-blue-500" : "bg-white/10 border-white/20"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-all ${
          checked ? "translate-x-5 bg-white" : "bg-white/70"
        }`}
      />
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <div className="text-white/80 font-medium mb-3">{title}</div>;
}

export default function AccountManagementScreen() {
  const [twoFA, setTwoFA] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [inAppNotif, setInAppNotif] = useState(true);

  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />
      <PageWithSidebar activeRoute="account" mainClassName="mx-auto max-w-5xl pb-12">
        <PageTitle subtitle="Manage your profile, security, preferences, and privacy">
          Account & Customization Hub
        </PageTitle>

        {/* Profile Information */}
        <section className="mt-8">
          <SectionHeader title="Profile Information" />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-6 items-start">
              <div className="space-y-3">
                <div className="size-28 rounded-full bg-white/10 border border-white/15" />
                <button className="w-full rounded-md bg-white/8 border border-white/12 px-3 py-2 text-sm text-white/80 hover:text-white">
                  Upload New Photo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabeledInput label="Full Name" placeholder="Alex Doe" />
                <LabeledInput label="Email Address" placeholder="alex.doe@example.com" />
              </div>
            </div>
          </Card>
        </section>

        {/* Password & Security */}
        <section className="mt-8">
          <SectionHeader title="Password & Security" />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm text-white/80">Change Password</div>
                <button className="rounded-lg bg-white/8 border border-white/12 px-4 py-2 text-sm hover:bg-white/10">Update Password</button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Two‑Factor Authentication (2FA)</div>
                    <div className="text-xs text-white/60">Extra protection for your account</div>
                  </div>
                  <Switch checked={twoFA} onChange={setTwoFA} />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Subscription & Billing */}
        <section className="mt-8">
          <SectionHeader title="Subscription & Billing" />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="text-sm text-white/70">Current Plan</div>
                <div className="mt-1 text-white font-semibold">Pro</div>
                <div className="mt-2 text-xs text-white/60">AI credits: 540</div>
              </div>
              <div className="flex flex-wrap gap-3 justify-start md:justify-end">
                <a href="#pricing" className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-sm text-white">Upgrade Plan</a>
                <button className="rounded-lg bg-white/8 border border-white/12 px-4 py-2 text-sm">Manage Billing</button>
              </div>
            </div>
          </Card>
        </section>

        {/* Theme & Appearance */}
        <section className="mt-8">
          <SectionHeader title="Theme & Appearance" />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Dark Mode</div>
                  <div className="text-xs text-white/60">Use a darker theme</div>
                </div>
                <Switch checked={darkMode} onChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Accent Color</div>
                  <div className="text-xs text-white/60">Blue highlights</div>
                </div>
                <Switch checked={accentColor} onChange={setAccentColor} />
              </div>
            </div>
          </Card>
        </section>

        {/* Notification Preferences */}
        <section className="mt-8">
          <SectionHeader title="Notification Preferences" />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Email Notifications</div>
                  <div className="text-xs text-white/60">Receive updates and tips by email</div>
                </div>
                <Switch checked={emailNotif} onChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">In‑App Notifications</div>
                  <div className="text-xs text-white/60">Show alerts inside the app</div>
                </div>
                <Switch checked={inAppNotif} onChange={setInAppNotif} />
              </div>
            </div>
          </Card>
        </section>

        {/* Data & Privacy */}
        <section className="mt-8">
          <SectionHeader title="Data & Privacy" />
          <Card className="border-red-500/30 bg-red-900/15">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-sm">Export My Data</button>
              <button className="rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm text-white">Delete My Account</button>
            </div>
          </Card>
        </section>

        {/* Save */}
        <div className="mt-8 flex justify-end">
          <button className="rounded-xl bg-[oklch(0.488_0.243_264.376)] px-5 py-3 text-white text-sm shadow-[0_8px_24px_rgba(43,91,217,0.35)]">
            Save Changes
          </button>
        </div>
      </PageWithSidebar>
    </div>
  );
}