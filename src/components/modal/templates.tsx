import { useState, useEffect } from "react";
import SiteNavbar from "../layout/site-navbar";
import PageWithSidebar from "../layout/page-with-sidebar";
import { ModernTemplate, ClassicTemplate, CreativeTemplate, ATSFriendlyTemplate } from "../templates";
import { sampleResumeData, type ResumeData } from "../../lib/resume-data";
import { templateConfigs, type TemplateId } from "../../lib/template-config";

interface TemplateCardProps {
  id: TemplateId;
  title: string;
  description: string;
  bg: string;
  data: ResumeData;
}

function TemplateCard({ id, title, description, bg, data }: TemplateCardProps) {
  const renderTemplate = () => {
    const scale = 0.28;
    switch (id) {
      case 'modern':
        return <ModernTemplate data={data} scale={scale} />;
      case 'classic':
        return <ClassicTemplate data={data} scale={scale} />;
      case 'creative':
        return <CreativeTemplate data={data} scale={scale} />;
      case 'ats-friendly':
        return <ATSFriendlyTemplate data={data} scale={scale} />;
      default:
        return <ModernTemplate data={data} scale={scale} />;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative group w-full aspect-[4/5] rounded-2xl ${bg} border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.03] cursor-pointer`}
      >
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-black/10" />

        {/* Live template preview */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl overflow-hidden"
          style={{ width: 228, height: 295 }}
        >
          <div className="overflow-hidden" style={{ width: 228, height: 295 }}>
            {renderTemplate()}
          </div>
        </div>

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <button
            onClick={() => {
              // Save selected template to localStorage and go to Magic Builder
              localStorage.setItem('selectedTemplate', id);
              window.location.hash = '#resumes';
            }}
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-gray-100 cursor-pointer transition mb-2"
          >
            Use Template
          </button>
          <button
            onClick={() => {
              window.location.hash = `#template-preview?template=${id}`;
            }}
            className="px-4 py-2 rounded-full bg-white/20 text-white text-xs font-medium hover:bg-white/30 cursor-pointer transition"
          >
            Preview
          </button>
        </div>
        <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-black/10 blur-2xl" />
      </div>
      <div className="mt-3">
        <div className="text-sm text-white/90 font-medium">{title}</div>
        <div className="text-xs text-white/50 mt-0.5">{description}</div>
      </div>
    </div>
  );
}

export default function TemplatesScreen() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);

  // Load saved resume data from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if the saved data has meaningful content
        if (parsed.name || (parsed.experiences && parsed.experiences[0]?.role)) {
          setResumeData({ ...sampleResumeData, ...parsed });
        }
      }
    } catch (e) {
      // Use sample data if parsing fails
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <SiteNavbar />
      <PageWithSidebar activeRoute="templates" mainClassName="mx-auto max-w-7xl pb-24">
        <div className="flex items-start justify-between pt-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Choose Your Template</h1>
            <p className="mt-2 text-sm text-white/60">Explore our range of expertly crafted, ATS-friendly resume templates.</p>
          </div>
        </div>

        {/* Main templates grid - 4 primary templates */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templateConfigs.map((config) => (
            <TemplateCard
              key={config.id}
              id={config.id}
              title={config.name}
              description={config.description}
              bg={config.bgColor}
              data={resumeData}
            />
          ))}
        </div>

        {/* Tips section */}
        <div className="mt-16 rounded-2xl bg-white/5 border border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Tips for ATS Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-blue-400 font-medium text-sm mb-1">Use Job Keywords</div>
              <p className="text-white/60 text-xs">Include relevant keywords from the job description to improve ATS matching.</p>
            </div>
            <div>
              <div className="text-blue-400 font-medium text-sm mb-1">Keep Layout Simple</div>
              <p className="text-white/60 text-xs">Avoid tables, graphics, and complex formatting that ATS systems struggle to parse.</p>
            </div>
            <div>
              <div className="text-blue-400 font-medium text-sm mb-1">Avoid Images & Tables</div>
              <p className="text-white/60 text-xs">Use plain text wherever possible. ATS cannot read images or extract text from tables.</p>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    </div>
  );
}
