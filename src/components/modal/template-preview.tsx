import { useState, useEffect } from "react";
import { ArrowLeft, Edit3, X } from "lucide-react";
import SiteNavbar from "../layout/site-navbar";
import PageWithSidebar from "../layout/page-with-sidebar";
import { ModernTemplate, ClassicTemplate, CreativeTemplate, ATSFriendlyTemplate } from "../templates";
import { sampleResumeData, type ResumeData } from "../../lib/resume-data";
import { templateConfigs, type TemplateId, getTemplateConfig } from "../../lib/template-config";

export default function TemplatePreviewScreen() {
  // Get template from URL
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
    const hash = window.location.hash;
    const match = hash.match(/template=([^&]+)/);
    if (match) return match[1] as TemplateId;
    return 'modern';
  });

  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);

  // Load saved resume data from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('editableResumeData') || localStorage.getItem('resumeData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name || (parsed.experiences && parsed.experiences[0]?.role)) {
          setResumeData({ ...sampleResumeData, ...parsed });
        }
      }
    } catch {
      // Use sample data if parsing fails
    }
  }, []);

  const renderTemplate = () => {
    const props = { data: resumeData, scale: 1 };
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
      <PageWithSidebar activeRoute="templates" mainClassName="mx-auto max-w-[1200px]">
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
              <h1 className="text-2xl font-bold">{config?.name || 'Modern'} Template Preview</h1>
              <p className="text-sm text-white/60 mt-0.5">{config?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Template selector */}
            <select
              value={selectedTemplate}
              onChange={(e) => {
                const newTemplate = e.target.value as TemplateId;
                setSelectedTemplate(newTemplate);
                window.location.hash = `#template-preview?template=${newTemplate}`;
              }}
              className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm outline-none"
            >
              {templateConfigs.map(t => (
                <option key={t.id} value={t.id} className="bg-[#0b1220]">{t.name}</option>
              ))}
            </select>

            {/* Use Template button */}
            <button
              onClick={() => {
                localStorage.setItem('selectedTemplate', selectedTemplate);
                window.location.hash = '#resumes';
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium hover:bg-blue-700 transition"
            >
              <Edit3 className="w-4 h-4" />
              Use This Template
            </button>

            {/* Close button */}
            <button
              onClick={() => window.location.hash = "#templates"}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Full-size preview */}
        <div className="flex justify-center pb-12">
          <div className="bg-gray-100 rounded-xl p-8 overflow-auto max-h-[calc(100vh-220px)]">
            <div className="shadow-2xl" style={{ width: 816 }}>
              {renderTemplate()}
            </div>
          </div>
        </div>
      </PageWithSidebar>
    </div>
  );
}
