import { useEffect, useState } from "react";
import SiteNavbar from "../layout/site-navbar";
import { Sidebar } from "./dashboard";
import noResumeIllustration from "../../assets/no-resume.png";

// Lightweight types. Adjust if your builder persists richer resume data.
interface ResumeItem {
  id: string;
  title: string;
  updatedAt?: string;
}

function SleepingKoala() {
  return (
    <div className="relative mx-auto w-[150px] sm:w-[200px] md:w-[300px] lg:w-[370px]">
      <img
        src={noResumeIllustration}
        alt="No resumes"
        className="block w-full h-auto object-contain select-none brightness-115 contrast-105 saturate-110"
        draggable={false}
      />
      <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full mix-blend-screen opacity-40 bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.22)_35%,rgba(255,255,255,0.08)_65%,transparent_100%)]" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center">
      <SleepingKoala />
      <div className="mt-2 flex flex-col items-center text-center gap-5">
        <h2 className="text-xl font-semibold">No Resumes Created Yet!</h2>
        <p className="text-white/70 max-w-md">
          You haven’t created any resumes. Kickstart your journey by building your first resume.
        </p>
        <button
          onClick={() => {
            window.location.hash = "#resumes"; // Link to builder
          }}
          className="px-5 py-2.5 rounded-xl bg-[oklch(0.488_0.243_264.376)] text-white shadow-md shadow-[oklch(0.488_0.243_264.376)/30] hover:brightness-110 transition-colors"
        >
          Create Your First Resume
        </button>
      </div>
    </div>
  );
}

function ResumeCard({ item }: { item: ResumeItem }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex flex-col gap-3 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium">{item.title || "Untitled Resume"}</h3>
          {item.updatedAt && (
            <p className="text-xs text-white/60">Updated {item.updatedAt}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            window.location.hash = "#resumes"; // Edit in builder
          }}
          className="px-3 py-1.5 text-sm rounded-md bg-white text-black hover:bg-white/90"
        >
          Edit
        </button>
        <button
          onClick={() => {
            // Placeholder: implement download from stored data when available
            alert("Download is not set up yet. We can wire this to export from the builder.");
          }}
          className="px-3 py-1.5 text-sm rounded-md border border-white/20 hover:bg-white/[0.06]"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default function MyResumesScreen() {
  const [resumes, setResumes] = useState<ResumeItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("resumes");
      if (!raw) {
        setResumes([]);
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Normalize a bit in case of partial data
        setResumes(
          parsed.map((r: any, idx: number) => ({
            id: r?.id ?? String(idx),
            title: r?.title ?? "Untitled Resume",
            updatedAt: r?.updatedAt,
          }))
        );
      } else {
        setResumes([]);
      }
    } catch (e) {
      console.warn("Failed to parse resumes from localStorage", e);
      setResumes([]);
    }
  }, []);

  const hasResumes = resumes.length > 0;

  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />

      <div className="grid grid-cols-[260px_1fr] min-h-[calc(100vh-56px)]">
        <Sidebar activeRoute="my-resumes" />
        <main className="px-6 py-4">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-start">
              <h1 className="text-2xl font-semibold">My Resumes</h1>
            </div>

            <div className="mt-4">
              {!hasResumes ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 grid justify-items-center items-start min-h-[320px]">
                  <EmptyState />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resumes.map((item) => (
                    <ResumeCard key={item.id} item={item} />)
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}