import type { ReactNode, ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { Wand2, AlertCircle, CheckCircle2 } from "lucide-react";
import SiteNavbar from "../layout/site-navbar";
import PageWithSidebar from "../layout/page-with-sidebar";


function PageHeader({ mode, setMode }: { mode: 'preview' | 'ats'; setMode: (m: 'preview' | 'ats') => void }) {
  const SwitchButton = ({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? 'bg-[oklch(0.488_0.243_264.376)] text-white shadow-lg shadow-blue-500/20'
          : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Magic Builder</h1>
        <p className="text-white/60 mt-2">Build your resume in minutes with our AI-powered tools.</p>
      </div>
      
      <div className="flex items-center gap-2 bg-[#0f162a] p-1.5 rounded-xl border border-white/10 self-start md:self-center">
        <SwitchButton active={mode === 'preview'} onClick={() => setMode('preview')}>Resume Preview</SwitchButton>
        <SwitchButton active={mode === 'ats'} onClick={() => setMode('ats')}>ATS Score</SwitchButton>
      </div>
    </div>
  );
}

// Added: Tab and resume data types
type TabKey = "personal" | "experience" | "education" | "skills" | "summary" | "job" | "custom";

interface Experience {
  role: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

interface Education {
  school: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}

interface JobDetails {
  title: string;
  company: string;
  location?: string;
  description: string;
}

interface CustomSection { title: string; content: string; }

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  summary: string;
  job: JobDetails;
  customSections: CustomSection[];
}

const emptyResume: ResumeData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  experiences: [{ role: "", company: "", location: "", startDate: "", endDate: "", bullets: [] }],
  education: [{ school: "", degree: "", field: "", startDate: "", endDate: "", location: "" }],
  skills: [],
  summary: "",
  job: { title: "", company: "", location: "", description: "" },
  customSections: [],
};

function Tabs({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  const items: { key: TabKey; label: string }[] = [
    { key: "personal", label: "Personal Info" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "summary", label: "Summary" },
    { key: "job", label: "Job Description" },
    { key: "custom", label: "Custom" },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center gap-6 text-sm">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={`relative ${active === it.key ? "text-white" : "text-white/80 hover:text-white"}`}
          >
            {it.label}
            {active === it.key && (
              <span className="absolute -bottom-[10px] left-0 h-[2px] w-full bg-[oklch(0.488_0.243_264.376)]" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-3 h-px bg-white/10" />
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="text-xs text-white/60 mb-2">{children}</div>;
}

// Updated: TextInput now controlled
function TextInput({ placeholder = "", value, onChange, type = "text" }: { placeholder?: string; value?: string; onChange?: (v: string) => void; type?: string }) {
  return (
    <input
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/25"
    />
  );
}

// Added: TextArea component
function TextArea({ placeholder = "", value, onChange, rows = 4 }: { placeholder?: string; value?: string; onChange?: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/25"
    />
  );
}

// Forms per section
function PersonalInfoForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  return (
    <div className="rounded-xl border border-white/10 p-4 bg-white/[0.04]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Full Name</Label>
          <TextInput value={resume.name} onChange={(v) => setResume({ ...resume, name: v })} placeholder="" />
        </div>
        <div>
          <Label>Email</Label>
          <TextInput value={resume.email} onChange={(v) => setResume({ ...resume, email: v })} placeholder="" />
        </div>
        <div>
          <Label>Phone</Label>
          <TextInput value={resume.phone} onChange={(v) => setResume({ ...resume, phone: v })} placeholder="" />
        </div>
        <div>
          <Label>Location</Label>
          <TextInput value={resume.location} onChange={(v) => setResume({ ...resume, location: v })} placeholder="" />
        </div>
        <div className="md:col-span-2">
          <Label>LinkedIn Profile URL</Label>
          <TextInput value={resume.linkedin} onChange={(v) => setResume({ ...resume, linkedin: v })} placeholder="" />
        </div>
        <div className="md:col-span-2">
          <Label>Portfolio URL</Label>
          <TextInput value={resume.portfolio} onChange={(v) => setResume({ ...resume, portfolio: v })} placeholder="" />
        </div>
      </div>
    </div>
  );
}

function ExperienceForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  const updateExp = (idx: number, patch: Partial<Experience>) => {
    const list = [...resume.experiences];
    list[idx] = { ...list[idx], ...patch };
    setResume({ ...resume, experiences: list });
  };
  const updateBulletText = (idx: number, text: string) => {
    updateExp(idx, { bullets: text.split("\n").map((t) => t.trim()).filter(Boolean) });
  };
  const addExp = () => {
    setResume({
      ...resume,
      experiences: [...resume.experiences, { role: "", company: "", location: "", startDate: "", endDate: "", bullets: [] }],
    });
  };
  const removeExp = (idx: number) => {
    setResume({ ...resume, experiences: resume.experiences.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {resume.experiences.map((exp, idx) => (
        <div key={idx} className="rounded-xl border border-white/10 p-4 bg-white/[0.04]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Role</Label>
              <TextInput value={exp.role} onChange={(v) => updateExp(idx, { role: v })} placeholder="" />
            </div>
            <div>
              <Label>Company</Label>
              <TextInput value={exp.company} onChange={(v) => updateExp(idx, { company: v })} placeholder="" />
            </div>
            <div>
              <Label>Location</Label>
              <TextInput value={exp.location ?? ""} onChange={(v) => updateExp(idx, { location: v })} placeholder="" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <TextInput value={exp.startDate ?? ""} onChange={(v) => updateExp(idx, { startDate: v })} placeholder="Jan 2023" />
              </div>
              <div>
                <Label>End Date</Label>
                <TextInput value={exp.endDate ?? ""} onChange={(v) => updateExp(idx, { endDate: v })} placeholder="Present" />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label>Highlights (one per line)</Label>
              <TextArea value={exp.bullets.join("\n")} onChange={(v) => updateBulletText(idx, v)} rows={5} />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="text-sm rounded-md border border-white/20 px-3 py-1 hover:bg-white/[0.06]" onClick={() => removeExp(idx)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-sm text-white" onClick={addExp}>Add Experience</button>
    </div>
  );
}

function EducationForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  const updateEd = (idx: number, patch: Partial<Education>) => {
    const list = [...resume.education];
    list[idx] = { ...list[idx], ...patch };
    setResume({ ...resume, education: list });
  };
  const addEd = () => {
    setResume({
      ...resume,
      education: [...resume.education, { school: "", degree: "", field: "", startDate: "", endDate: "", location: "" }],
    });
  };
  const removeEd = (idx: number) => {
    setResume({ ...resume, education: resume.education.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {resume.education.map((ed, idx) => (
        <div key={idx} className="rounded-xl border border-white/10 p-4 bg-white/[0.04]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>School</Label>
              <TextInput value={ed.school} onChange={(v) => updateEd(idx, { school: v })} />
            </div>
            <div>
              <Label>Degree</Label>
              <TextInput value={ed.degree ?? ""} onChange={(v) => updateEd(idx, { degree: v })} />
            </div>
            <div>
              <Label>Field of Study</Label>
              <TextInput value={ed.field ?? ""} onChange={(v) => updateEd(idx, { field: v })} />
            </div>
            <div>
              <Label>Location</Label>
              <TextInput value={ed.location ?? ""} onChange={(v) => updateEd(idx, { location: v })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <TextInput value={ed.startDate ?? ""} onChange={(v) => updateEd(idx, { startDate: v })} placeholder="Aug 2019" />
              </div>
              <div>
                <Label>End Date</Label>
                <TextInput value={ed.endDate ?? ""} onChange={(v) => updateEd(idx, { endDate: v })} placeholder="May 2023" />
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="text-sm rounded-md border border-white/20 px-3 py-1 hover:bg-white/[0.06]" onClick={() => removeEd(idx)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-sm text-white" onClick={addEd}>Add Education</button>
    </div>
  );
}

function SkillsForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  const [input, setInput] = useState<string>("");
  const addSkill = () => {
    const s = input.trim();
    if (!s) return;
    setResume({ ...resume, skills: [...resume.skills, s] });
    setInput("");
  };
  const removeSkill = (idx: number) => {
    setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <Label>Add Skill</Label>
      <div className="flex gap-2">
        <TextInput value={input} onChange={setInput} placeholder="e.g., React, Node.js, Leadership" />
        <button className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-sm text-white" onClick={addSkill}>Add</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {resume.skills.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-1 text-sm">
            {s}
            <button className="text-white/60 hover:text-white" onClick={() => removeSkill(i)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

function SummaryForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  return (
    <div>
      <Label>Professional Summary</Label>
      <TextArea value={resume.summary} onChange={(v) => setResume({ ...resume, summary: v })} rows={8} />
    </div>
  );
}

function JobDescriptionForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  const updateJob = (patch: Partial<JobDetails>) => {
    setResume({ ...resume, job: { ...resume.job, ...patch } });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label>Job Title</Label>
        <TextInput value={resume.job.title} onChange={(v) => updateJob({ title: v })} placeholder="e.g., Frontend Engineer" />
      </div>
      <div>
        <Label>Company</Label>
        <TextInput value={resume.job.company} onChange={(v) => updateJob({ company: v })} placeholder="e.g., Acme Corp" />
      </div>
      <div>
        <Label>Location</Label>
        <TextInput value={resume.job.location ?? ""} onChange={(v) => updateJob({ location: v })} placeholder="City, Country or Remote" />
      </div>
      <div className="md:col-span-2">
        <Label>Job Description / Key Requirements</Label>
        <TextArea value={resume.job.description} onChange={(v) => updateJob({ description: v })} rows={8} placeholder="Paste the job description here, including responsibilities and qualifications." />
      </div>
    </div>
  );
}

function CustomSectionsForm({ resume, setResume }: { resume: ResumeData; setResume: (r: ResumeData) => void }) {
  const addSection = () => {
    setResume({ ...resume, customSections: [...resume.customSections, { title: "", content: "" }] });
  };
  const updateSection = (idx: number, patch: Partial<CustomSection>) => {
    const list = [...resume.customSections];
    list[idx] = { ...list[idx], ...patch } as CustomSection;
    setResume({ ...resume, customSections: list });
  };
  const removeSection = (idx: number) => {
    setResume({ ...resume, customSections: resume.customSections.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {resume.customSections.map((sec, idx) => (
        <div key={idx} className="rounded-xl border border-white/10 p-4 bg-white/[0.04]">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Section Title</Label>
              <TextInput value={sec.title} onChange={(v) => updateSection(idx, { title: v })} />
            </div>
            <div>
              <Label>Content</Label>
              <TextArea value={sec.content} onChange={(v) => updateSection(idx, { content: v })} rows={6} />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="text-sm rounded-md border border-white/20 px-3 py-1 hover:bg-white/[0.06]" onClick={() => removeSection(idx)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-4 py-2 text-sm text-white" onClick={addSection}>Add Section</button>
    </div>
  );
}

function AIAssistantCard() {
  return (
    <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6">
      <span className="absolute -top-2 -right-2 rounded-full bg-blue-600/20 text-blue-300 text-[10px] font-semibold px-2 py-1 border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.6)]">FEATURED</span>
      <div className="flex items-center gap-2">
        <Wand2 className="size-4 text-white/80" />
        <div className="font-semibold">AI Assistant</div>
      </div>
      <p className="text-sm text-white/60 mt-2">Get personalized suggestions and generate content with AI.</p>
      <a href="#ai-chat" className="mt-4 w-full rounded-lg border border-blue-500/30 bg-transparent px-4 py-2 text-sm text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.1)] transition-all hover:bg-blue-500/10 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] inline-flex items-center justify-center">Generate with Juno AI</a>
    </div>
  );
}

function ResumePreview({ mode }: { mode: 'preview' | 'ats' }) {
  return (
    <div>
      <div className="font-semibold mb-4">{mode === 'preview' ? 'Resume Preview' : 'ATS Score'}</div>

      {mode === 'preview' ? (
        <div className="rounded-2xl bg-[#0f162a] border border-white/10 p-6 flex items-center justify-center">
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
      ) : (
        <div className="rounded-2xl bg-[#0f162a] border border-white/10 p-6 relative overflow-hidden group">
          {/* Background glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <div className="text-sm font-medium text-white/60">Overall ATS Score</div>
              <div className="text-4xl font-bold mt-2 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">86/100</div>
              <div className="text-xs text-emerald-400 mt-2 font-medium flex items-center gap-1.5">
                 <CheckCircle2 className="size-3.5" />
                 <span>Excellent Score</span>
              </div>
            </div>
            
            {/* Circular Progress */}
            <div className="relative size-24">
               <svg className="size-full -rotate-90">
                 <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                 <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="263.89" strokeDashoffset="36.94" strokeLinecap="round" className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">86%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 relative z-10">
            {[
              { label: "Keyword Match", score: 82, desc: "Matched 41/50 role keywords", color: "bg-emerald-500" },
              { label: "Formatting & Structure", score: 88, desc: "Consistent headings, bullet points", color: "bg-blue-500" },
              { label: "Contact Info", score: 95, desc: "Email, phone, LinkedIn present", color: "bg-indigo-500" },
              { label: "Section Detection", score: 78, desc: "All core sections detected", color: "bg-violet-500" },
              { label: "Readability", score: 84, desc: "Clear phrasing and action verbs", color: "bg-sky-500" },
              { label: "ATS Compatibility", score: 89, desc: "Simple layout, parsable text", color: "bg-cyan-500" },
            ].map((item) => (
               <div key={item.label} className="group/item">
                 <div className="flex justify-between text-xs mb-2">
                   <span className="text-white/90 font-medium group-hover/item:text-blue-400 transition-colors">{item.label}</span>
                   <span className="text-white/60 font-mono">{item.score}%</span>
                 </div>
                 <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden ring-1 ring-white/5">
                   <div className={`h-full rounded-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-out`} style={{ width: `${item.score}%` }} />
                 </div>
                 <div className="mt-1.5 text-[11px] text-white/40 leading-relaxed">{item.desc}</div>
               </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <h4 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
              <AlertCircle className="size-4 text-amber-400" />
              Improvement Suggestions
            </h4>
            <div className="space-y-3">
              {[
                "Add keyword “Agile” in Experience section",
                "Consider a dedicated “Skills” header for better parsing",
                "Replace images/icons with plain text for ATS",
                "Use consistent date format (e.g., Jan 2022 – Present)"
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 text-xs text-white/70 group/tip hover:text-white/90 transition-colors">
                  <div className="mt-1 size-1.5 rounded-full bg-amber-500/40 group-hover/tip:bg-amber-400 shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumeBuilderScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [previewMode, setPreviewMode] = useState<'preview' | 'ats'>('preview');
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const raw = localStorage.getItem('resumeData');
      if (!raw) return emptyResume;
      const data = JSON.parse(raw) as Partial<ResumeData>;
      return {
        ...emptyResume,
        ...data,
        experiences: data.experiences ?? emptyResume.experiences,
        education: data.education ?? emptyResume.education,
        skills: data.skills ?? emptyResume.skills,
        summary: data.summary ?? emptyResume.summary,
        job: data.job ?? emptyResume.job,
        customSections: data.customSections ?? emptyResume.customSections,
      };
    } catch {
      return emptyResume;
    }
  });
  // Entry modals state
  const [startModalOpen, setStartModalOpen] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (!file) { setUploadError(null); return; }
    const ext = file.name.toLowerCase().split('.').pop();
    if (ext && (ext === 'pdf' || ext === 'docx')) {
      setUploadError(null);
    } else {
      setUploadError('Please upload a PDF or DOCX file.');
    }
  };

  useEffect(() => {
    try { localStorage.setItem('resumeData', JSON.stringify(resume)); } catch {}
  }, [resume]);

  const order: TabKey[] = ['personal', 'experience', 'education', 'skills', 'summary', 'job', 'custom'];
  const goNext = () => {
    const idx = order.indexOf(activeTab);
    if (idx < order.length - 1) setActiveTab(order[idx + 1]);
  };
  const goPrev = () => {
    const idx = order.indexOf(activeTab);
    if (idx > 0) setActiveTab(order[idx - 1]);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm resume={resume} setResume={setResume} />;
      case 'experience':
        return <ExperienceForm resume={resume} setResume={setResume} />;
      case 'education':
        return <EducationForm resume={resume} setResume={setResume} />;
      case 'skills':
        return <SkillsForm resume={resume} setResume={setResume} />;
      case 'summary':
        return <SummaryForm resume={resume} setResume={setResume} />;
      case 'job':
        return <JobDescriptionForm resume={resume} setResume={setResume} />;
      case 'custom':
        return <CustomSectionsForm resume={resume} setResume={setResume} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-svh bg-[#0b1220] text-white">
      <SiteNavbar />
      <PageWithSidebar activeRoute="my-resumes" mainClassName="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left (main form) */}
        <div className="lg:col-span-2">
          <PageHeader mode={previewMode} setMode={setPreviewMode} />
          <Tabs active={activeTab} onChange={setActiveTab} />

          <div className="mt-6">
            {renderForm()}
          </div>

          <div className="mt-6 flex justify-between">
            <button className="rounded-lg border border-white/15 px-5 py-2 text-sm text-white/80 hover:bg-white/[0.06]" onClick={goPrev}>Back</button>
            <button className="rounded-lg bg-[oklch(0.488_0.243_264.376)] px-5 py-2 text-sm text-white" onClick={goNext}>Save & Next</button>
          </div>
        </div>

        {/* Right side: assistant + preview */}
        <div className="space-y-8">
          <AIAssistantCard />
          <ResumePreview mode={previewMode} />
        </div>
      </PageWithSidebar>

      {/* Start choice modal */}
      {startModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div role="dialog" aria-modal="true" className="w-[520px] max-w-[92vw] rounded-2xl bg-[#0f162a] border border-white/12 p-6">
            <div className="text-lg font-semibold">How would you like to start?</div>
            <p className="text-white/60 mt-1 text-sm">Choose an option to proceed.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white hover:bg-white/10" onClick={() => setStartModalOpen(false)}>Start from scratch</button>
              <button className="rounded-xl bg-[oklch(0.488_0.243_264.376)] px-4 py-3 text-white hover:brightness-110" onClick={() => { setStartModalOpen(false); setUploadModalOpen(true); }}>Build upon existing</button>
            </div>
            <button className="mt-4 text-xs text-white/60 hover:text-white" onClick={() => setStartModalOpen(false)}>Skip</button>
          </div>
        </div>
      )}

      {/* Upload modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div role="dialog" aria-modal="true" className="w-[560px] max-w-[92vw] rounded-2xl bg-[#0f162a] border border-white/12 p-6">
            <div className="text-lg font-semibold">Upload your resume</div>
            <p className="text-white/60 mt-1 text-sm">We support PDF and DOCX formats.</p>
            <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <input type="file" accept=".pdf,.docx" onChange={onFileSelected} className="w-full text-sm file:mr-3 file:rounded-md file:bg-white/10 file:text-white file:px-3 file:py-2 file:border file:border-white/20" />
              {uploadError && <div className="mt-2 text-xs text-red-400">{uploadError}</div>}
              {selectedFile && !uploadError && <div className="mt-2 text-xs text-white/70">Selected: {selectedFile.name}</div>}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button className="rounded-lg px-4 py-2 text-sm bg-white/6 border border-white/12 text-white/80 hover:text-white" onClick={() => { setUploadModalOpen(false); setSelectedFile(null); setUploadError(null); }}>Cancel</button>
              <button disabled={!selectedFile || !!uploadError} className="rounded-lg px-4 py-2 text-sm bg-[oklch(0.488_0.243_264.376)] text-white disabled:opacity-50" onClick={() => { setUploadModalOpen(false); }}>Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}