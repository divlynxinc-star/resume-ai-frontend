import type { ReactNode } from "react";
import { Wand2 } from "lucide-react";
import SiteNavbar from "../layout/site-navbar";


function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-white">Resume Builder</h1>
      <p className="text-white/60 mt-2">Build your resume in minutes with our AI-powered tools.</p>
    </div>
  );
}

function Tabs() {
  const items = [
    { label: "Personal Info", active: true },
    { label: "Experience" },
    { label: "Education" },
    { label: "Skills" },
    { label: "Summary" },
    { label: "Custom" },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center gap-6 text-sm">
        {items.map((it) => (
          <a
            key={it.label}
            href="#"
            className={`relative text-white/80 hover:text-white ${it.active ? "text-white" : ""}`}
          >
            {it.label}
            {it.active && (
              <span className="absolute -bottom-[10px] left-0 h-[2px] w-full bg-[oklch(0.488_0.243_264.376)]" />
            )}
          </a>
        ))}
      </div>
      <div className="mt-3 h-px bg-white/10" />
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="text-xs text-white/60 mb-2">{children}</div>;
}

function TextInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/25"
    />
  );
}

function AIAssistantCard() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex items-center gap-2">
        <Wand2 className="size-4 text-white/80" />
        <div className="font-semibold">AI Assistant</div>
      </div>
      <p className="text-sm text-white/60 mt-2">Get personalized suggestions and generate content with AI.</p>
      <button className="mt-4 w-full rounded-lg bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-sm text-white">Generate with AI</button>
    </div>
  );
}

function ResumePreview() {
  return (
    <div>
      <div className="font-semibold">Resume Preview</div>
      <div className="mt-4 rounded-2xl bg-[#0f162a] border border-white/10 p-6 flex items-center justify-center">
        {/* Beige board background */}
        <div className="w-[280px] h-[380px] rounded-xl bg-[#e9c5a6] shadow-inner flex items-center justify-center">
          {/* Paper */}
          <div className="w-[220px] h-[320px] bg-white rounded-sm shadow-xl">
            <div className="p-4 space-y-2">
              <div className="h-3 w-24 bg-black/70" />
              <div className="h-2 w-36 bg-black/20" />
              <div className="mt-4 space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-2 w-full bg-black/10" />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-2 w-11/12 bg-black/10" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeBuilderScreen() {
  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />
      <main className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left (main form) */}
        <div className="lg:col-span-2">
          <PageHeader />
          <Tabs />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <TextInput placeholder="" />
            </div>
            <div>
              <Label>Email</Label>
              <TextInput placeholder="" />
            </div>
            <div>
              <Label>Phone</Label>
              <TextInput placeholder="" />
            </div>
            <div>
              <Label>Location</Label>
              <TextInput placeholder="" />
            </div>
            <div className="md:col-span-2">
              <Label>LinkedIn Profile URL</Label>
              <TextInput placeholder="" />
            </div>
            <div className="md:col-span-2">
              <Label>Portfolio URL</Label>
              <TextInput placeholder="" />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-5 py-2 text-sm text-white">Next</button>
          </div>
        </div>

        {/* Right side: assistant + preview */}
        <div className="space-y-8">
          <AIAssistantCard />
          <ResumePreview />
        </div>
      </main>
    </div>
  );
}