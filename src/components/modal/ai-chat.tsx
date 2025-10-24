import type { ReactNode } from "react";
import SiteNavbar from "../layout/site-navbar";


function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-white/80 font-semibold text-sm">{children}</h2>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/5 border border-white/12 p-5 sm:p-6 ${className}`}>{children}</div>
  );
}

function BlueChip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <button
      className={`h-8 px-4 rounded-full text-xs font-medium transition-colors ${
        active
          ? "bg-[#2b5bd9] text-white"
          : "bg-white/5 text-white/80 hover:text-white border border-white/10"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-white/60"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-white"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
  );
}

function ChatBubble({ role, children }: { role: "assistant" | "user"; children: ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
        isUser
          ? "bg-[#2b5bd9] text-white"
          : "bg-white/8 border border-white/12 text-white/90"
      }`}>
        {children}
      </div>
    </div>
  );
}

function ChatPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-white/80 text-sm">Chat with AI</div>
      <Card className="relative flex-1 space-y-4 pt-6 pb-6 overflow-hidden bg-[#0e1830] border-white/10">
        {/* decorative side dots inside chat panel */}
        <div className="absolute top-4 left-4 size-6 rounded-full bg-white/8 border border-white/15" />
        <div className="absolute top-36 right-4 size-6 rounded-full bg-white/8 border border-white/15" />

        <div className="flex items-start gap-3">
          <div className="size-8 rounded-full bg-white/10 border border-white/20" />
          <ChatBubble role="assistant">Hi Sarah, how can I help you improve your resume today?</ChatBubble>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <ChatBubble role="user">Can you make my summary more professional?</ChatBubble>
          <div className="size-8 rounded-full bg-white/10 border border-white/20" />
        </div>
      </Card>
      <div className="mt-3 bg-[#0e1830] border border-white/10 rounded-2xl flex items-center p-3">
        <input
          className="flex-1 bg-transparent outline-none text-white/90 placeholder:text-white/50 text-sm px-2"
          placeholder="Type your message..."
        />
        <button className="size-8 rounded-md bg-[#2b5bd9] flex items-center justify-center">
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default function AIChatModal() {
  return (
    <div className="h-svh bg-[#0b1220] text-white overflow-hidden">
      <SiteNavbar />
      <main className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-56px)] overflow-hidden">
        {/* Left: Assistant title, prompts, output */}
        <div className="lg:col-span-2 h-full min-h-0 flex flex-col">
          <h1 className="text-3xl font-semibold">AI Assistant</h1>
          <p className="text-white/60 mt-2">Get instant feedback and suggestions to improve your resume.</p>

          <div className="mt-6">
            <SectionHeading>Example Prompts</SectionHeading>
            <div className="mt-2 flex flex-wrap gap-3">
              <BlueChip active>Make my summary more professional</BlueChip>
              <BlueChip>Improve my work experience descriptions</BlueChip>
              <BlueChip>Suggest skills for my industry</BlueChip>
            </div>
          </div>

          <div className="mt-8 flex-1 grid grid-rows-[auto_1fr] min-h-0">
            <SectionHeading>Output</SectionHeading>
            <Card className="relative min-h-[260px] h-full flex flex-col pb-20">
              <div className="flex items-center justify-end">
                <button className="h-8 w-8 rounded-md bg-white/6 border border-white/12 flex items-center justify-center">
                  <CopyIcon />
                </button>
              </div>
              <div className="flex-1 text-white/50 text-sm flex items-center px-3">AI suggestions will appear here...</div>
              {/* Bottom action buttons anchored inside the card */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-4">
                <button className="h-12 px-5 rounded-xl bg-[#2b5bd9] text-white text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(43,91,217,0.35)] w-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" className="text-white"><path fill="currentColor" d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                  Apply to Resume
                </button>
                <button className="h-12 px-5 rounded-xl bg-white/6 border border-white/12 text-white text-sm w-full">Generate New</button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Chat */}
        <div className="h-full">
          <ChatPanel />
        </div>
      </main>
    </div>
  );
}