import { useState, useEffect, useRef } from "react";
import { Download, ArrowLeft, Eye, Edit3, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import SiteNavbar from "../layout/site-navbar";
import PageWithSidebar from "../layout/page-with-sidebar";
import { ModernTemplate, ClassicTemplate, CreativeTemplate, ATSFriendlyTemplate } from "../templates";
import { sampleResumeData, type ResumeData, type Experience, type Education, type SkillCategory, type Project } from "../../lib/resume-data";
import { templateConfigs, type TemplateId, getTemplateConfig } from "../../lib/template-config";

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-white/60 mb-1.5">{children}</div>;
}

function TextInput({ value, onChange, placeholder = "" }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
    />
  );
}

function TextArea({ value, onChange, placeholder = "", rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-lg border border-white/15 bg-[#0C1426] px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/25 resize-none"
    />
  );
}

function CollapsibleSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium hover:bg-white/[0.02] transition"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-white/60" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function TemplateEditorScreen() {
  const previewRef = useRef<HTMLDivElement>(null);

  // Get template from URL or localStorage
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
    const hash = window.location.hash;
    const match = hash.match(/template=([^&]+)/);
    if (match) return match[1] as TemplateId;
    const saved = localStorage.getItem('selectedTemplate');
    return (saved as TemplateId) || 'modern';
  });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('editableResumeData');
      if (saved) return JSON.parse(saved);
      const builderData = localStorage.getItem('resumeData');
      if (builderData) {
        const parsed = JSON.parse(builderData);
        if (parsed.name) return { ...sampleResumeData, ...parsed };
      }
      return sampleResumeData;
    } catch {
      return sampleResumeData;
    }
  });

  const [isEditing, setIsEditing] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Auto-save to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSaveStatus('saving');
      localStorage.setItem('editableResumeData', JSON.stringify(resumeData));
      localStorage.setItem('selectedTemplate', selectedTemplate);
      setTimeout(() => setSaveStatus('saved'), 500);
    }, 1000);
    setSaveStatus('unsaved');
    return () => clearTimeout(timeout);
  }, [resumeData, selectedTemplate]);

  const handleExport = async () => {
    if (!previewRef.current) return;

    // Dynamic import of html2pdf
    const html2pdf = (await import('html2pdf.js')).default;

    const element = previewRef.current.querySelector('.resume-content') as HTMLElement | null;
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const updatePersonal = (field: keyof ResumeData, value: string) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const newExperiences = [...resumeData.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setResumeData({ ...resumeData, experiences: newExperiences });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experiences: [...resumeData.experiences, { role: "", company: "", location: "", startDate: "", endDate: "", bullets: [""] }]
    });
  };

  const removeExperience = (index: number) => {
    setResumeData({ ...resumeData, experiences: resumeData.experiences.filter((_, i) => i !== index) });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { school: "", degree: "", field: "", location: "", startDate: "", endDate: "" }]
    });
  };

  const removeEducation = (index: number) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter((_, i) => i !== index) });
  };

  const updateSkillCategory = (index: number, field: keyof SkillCategory, value: string | string[]) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const addSkillCategory = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { category: "", skills: [] }]
    });
  };

  const removeSkillCategory = (index: number) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter((_, i) => i !== index) });
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: "", link: "", bullets: [""] }]
    });
  };

  const removeProject = (index: number) => {
    setResumeData({ ...resumeData, projects: resumeData.projects.filter((_, i) => i !== index) });
  };

  const renderTemplate = (editable: boolean = false) => {
    const props = {
      data: resumeData,
      scale: 1,
      editable,
      onDataChange: setResumeData
    };

    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'ats-friendly':
        return <ATSFriendlyTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  const config = getTemplateConfig(selectedTemplate);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <SiteNavbar />
      <PageWithSidebar activeRoute="templates" mainClassName="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="flex items-center justify-between py-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.hash = "#templates"}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{config?.name || 'Modern'} Template</h1>
              <p className="text-sm text-white/60 mt-0.5">{config?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Save status */}
            <span className={`text-xs px-2 py-1 rounded ${
              saveStatus === 'saved' ? 'bg-green-500/20 text-green-400' :
              saveStatus === 'saving' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-white/10 text-white/60'
            }`}>
              {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved'}
            </span>

            {/* Template selector */}
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
              className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm outline-none"
            >
              {templateConfigs.map(t => (
                <option key={t.id} value={t.id} className="bg-[#0b1220]">{t.name}</option>
              ))}
            </select>

            {/* Toggle edit/preview */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isEditing ? 'bg-white/10 border border-white/15' : 'bg-blue-600'
              }`}
            >
              {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? 'Preview' : 'Edit'}
            </button>

            {/* Export button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium hover:bg-blue-700 transition"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="flex gap-6 pb-12">
          {/* Left panel - Form editor */}
          {isEditing && (
            <div className="w-[400px] shrink-0 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {/* Personal Info */}
              <CollapsibleSection title="Personal Information">
                <div className="space-y-3">
                  <div>
                    <Label>Full Name</Label>
                    <TextInput value={resumeData.name} onChange={(v) => updatePersonal('name', v)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Email</Label>
                      <TextInput value={resumeData.email} onChange={(v) => updatePersonal('email', v)} />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <TextInput value={resumeData.phone} onChange={(v) => updatePersonal('phone', v)} />
                    </div>
                  </div>
                  <div>
                    <Label>LinkedIn</Label>
                    <TextInput value={resumeData.linkedin} onChange={(v) => updatePersonal('linkedin', v)} />
                  </div>
                  <div>
                    <Label>Portfolio</Label>
                    <TextInput value={resumeData.portfolio} onChange={(v) => updatePersonal('portfolio', v)} />
                  </div>
                </div>
              </CollapsibleSection>

              {/* Experience */}
              <CollapsibleSection title="Experience">
                <div className="space-y-4">
                  {resumeData.experiences.map((exp, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-white/40">Experience {idx + 1}</span>
                        <button onClick={() => removeExperience(idx)} className="p-1 hover:bg-red-500/20 rounded text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <Label>Role</Label>
                        <TextInput value={exp.role} onChange={(v) => updateExperience(idx, 'role', v)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Company</Label>
                          <TextInput value={exp.company} onChange={(v) => updateExperience(idx, 'company', v)} />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <TextInput value={exp.location} onChange={(v) => updateExperience(idx, 'location', v)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Start Date</Label>
                          <TextInput value={exp.startDate} onChange={(v) => updateExperience(idx, 'startDate', v)} placeholder="Jun 2024" />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <TextInput value={exp.endDate} onChange={(v) => updateExperience(idx, 'endDate', v)} placeholder="Present" />
                        </div>
                      </div>
                      <div>
                        <Label>Highlights (one per line)</Label>
                        <TextArea
                          value={exp.bullets.join('\n')}
                          onChange={(v) => updateExperience(idx, 'bullets', v.split('\n').filter(Boolean))}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addExperience}
                    className="w-full py-2 rounded-lg border border-dashed border-white/20 text-sm text-white/60 hover:border-white/40 hover:text-white/80 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>
              </CollapsibleSection>

              {/* Projects */}
              <CollapsibleSection title="Projects">
                <div className="space-y-4">
                  {resumeData.projects.map((project, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-white/40">Project {idx + 1}</span>
                        <button onClick={() => removeProject(idx)} className="p-1 hover:bg-red-500/20 rounded text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <Label>Title</Label>
                        <TextInput value={project.title} onChange={(v) => updateProject(idx, 'title', v)} />
                      </div>
                      <div>
                        <Label>Link (optional)</Label>
                        <TextInput value={project.link || ''} onChange={(v) => updateProject(idx, 'link', v)} />
                      </div>
                      <div>
                        <Label>Description (one per line)</Label>
                        <TextArea
                          value={project.bullets.join('\n')}
                          onChange={(v) => updateProject(idx, 'bullets', v.split('\n').filter(Boolean))}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addProject}
                    className="w-full py-2 rounded-lg border border-dashed border-white/20 text-sm text-white/60 hover:border-white/40 hover:text-white/80 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>
              </CollapsibleSection>

              {/* Education */}
              <CollapsibleSection title="Education">
                <div className="space-y-4">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-white/40">Education {idx + 1}</span>
                        <button onClick={() => removeEducation(idx)} className="p-1 hover:bg-red-500/20 rounded text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <Label>School</Label>
                        <TextInput value={edu.school} onChange={(v) => updateEducation(idx, 'school', v)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Degree</Label>
                          <TextInput value={edu.degree} onChange={(v) => updateEducation(idx, 'degree', v)} />
                        </div>
                        <div>
                          <Label>Field</Label>
                          <TextInput value={edu.field} onChange={(v) => updateEducation(idx, 'field', v)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Location</Label>
                          <TextInput value={edu.location} onChange={(v) => updateEducation(idx, 'location', v)} />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <TextInput value={edu.endDate} onChange={(v) => updateEducation(idx, 'endDate', v)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="w-full py-2 rounded-lg border border-dashed border-white/20 text-sm text-white/60 hover:border-white/40 hover:text-white/80 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>
              </CollapsibleSection>

              {/* Skills */}
              <CollapsibleSection title="Skills">
                <div className="space-y-4">
                  {resumeData.skills.map((skillGroup, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-white/40">Category {idx + 1}</span>
                        <button onClick={() => removeSkillCategory(idx)} className="p-1 hover:bg-red-500/20 rounded text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <Label>Category Name</Label>
                        <TextInput value={skillGroup.category} onChange={(v) => updateSkillCategory(idx, 'category', v)} />
                      </div>
                      <div>
                        <Label>Skills (comma separated)</Label>
                        <TextArea
                          value={skillGroup.skills.join(', ')}
                          onChange={(v) => updateSkillCategory(idx, 'skills', v.split(',').map(s => s.trim()).filter(Boolean))}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addSkillCategory}
                    className="w-full py-2 rounded-lg border border-dashed border-white/20 text-sm text-white/60 hover:border-white/40 hover:text-white/80 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Skill Category
                  </button>
                </div>
              </CollapsibleSection>
            </div>
          )}

          {/* Right panel - Live preview */}
          <div className={`flex-1 ${isEditing ? '' : 'mx-auto'}`}>
            <div
              ref={previewRef}
              className="bg-gray-100 rounded-xl p-8 overflow-auto max-h-[calc(100vh-200px)]"
              style={{ minWidth: isEditing ? 500 : 816 }}
            >
              <div className="resume-content mx-auto shadow-2xl" style={{ width: 816 }}>
                {renderTemplate(false)}
              </div>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    </div>
  );
}
