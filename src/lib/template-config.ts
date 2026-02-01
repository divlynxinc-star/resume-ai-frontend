// Template configuration system

export type TemplateId = 'modern' | 'classic' | 'creative' | 'ats-friendly';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  bgColor: string;
  accentColor: string;
  previewBg: string;
}

export const templateConfigs: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with a professional touch',
    bgColor: 'bg-[#2a3b36]',
    accentColor: '#3b82f6',
    previewBg: '#f8fafc'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format preferred by conservative industries',
    bgColor: 'bg-[#3a3327]',
    accentColor: '#1e40af',
    previewBg: '#ffffff'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals',
    bgColor: 'bg-[#2f3138]',
    accentColor: '#8b5cf6',
    previewBg: '#faf5ff'
  },
  {
    id: 'ats-friendly',
    name: 'ATS-Friendly',
    description: 'Optimized for Applicant Tracking Systems',
    bgColor: 'bg-[#2a4141]',
    accentColor: '#059669',
    previewBg: '#ffffff'
  }
];

export function getTemplateConfig(id: TemplateId): TemplateConfig | undefined {
  return templateConfigs.find(t => t.id === id);
}
