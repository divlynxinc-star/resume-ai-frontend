import type { ResumeData } from "../../lib/resume-data";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  editable?: boolean;
  onDataChange?: (data: ResumeData) => void;
}

export default function CreativeTemplate({ data, scale = 1, editable = false, onDataChange }: TemplateProps) {
  const handleEdit = (field: string, value: string) => {
    if (!editable || !onDataChange) return;
    onDataChange({ ...data, [field]: value });
  };

  const handleExperienceEdit = (index: number, field: string, value: string) => {
    if (!editable || !onDataChange) return;
    const newExperiences = [...data.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    onDataChange({ ...data, experiences: newExperiences });
  };

  const handleBulletEdit = (expIndex: number, bulletIndex: number, value: string) => {
    if (!editable || !onDataChange) return;
    const newExperiences = [...data.experiences];
    const newBullets = [...newExperiences[expIndex].bullets];
    newBullets[bulletIndex] = value;
    newExperiences[expIndex] = { ...newExperiences[expIndex], bullets: newBullets };
    onDataChange({ ...data, experiences: newExperiences });
  };

  const handleProjectBulletEdit = (projIndex: number, bulletIndex: number, value: string) => {
    if (!editable || !onDataChange) return;
    const newProjects = [...data.projects];
    const newBullets = [...newProjects[projIndex].bullets];
    newBullets[bulletIndex] = value;
    newProjects[projIndex] = { ...newProjects[projIndex], bullets: newBullets };
    onDataChange({ ...data, projects: newProjects });
  };

  const editableClass = editable ? "outline-none focus:bg-purple-50 focus:ring-1 focus:ring-purple-400 rounded px-0.5 -mx-0.5" : "";

  return (
    <div
      className="bg-white text-gray-900 font-sans"
      style={{
        width: 816,
        minHeight: 1056,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {/* Purple sidebar header */}
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-72 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-6 min-h-[1056px]">
          {/* Profile section */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
              {data.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h1
              className={`text-2xl font-bold text-center ${editableClass}`}
              {...(editable && {
                contentEditable: true,
                suppressContentEditableWarning: true,
                onBlur: (e: React.FocusEvent<HTMLElement>) => handleEdit("name", e.currentTarget.textContent || "")
              })}
            >
              {data.name}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-purple-200">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-100 break-all">{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-100">{data.phone}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-100 break-all">{data.linkedin}</span>
                </div>
              )}
              {data.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-100 break-all">{data.portfolio}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-purple-200">Skills</h2>
              <div className="space-y-3">
                {data.skills.map((skillGroup, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-semibold text-purple-300 uppercase mb-1">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillGroup.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-xs bg-white/10 px-2 py-0.5 rounded text-purple-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && data.education[0].school && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-purple-200">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                    <p className="text-purple-200 text-xs">{edu.field}</p>
                    <p className="text-purple-300 text-xs mt-1">{edu.school}</p>
                    <p className="text-purple-400 text-xs">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {/* Experience Section */}
          {data.experiences.length > 0 && data.experiences[0].role && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-purple-500"></span>
                Experience
              </h2>
              <div className="space-y-5">
                {data.experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-purple-200">
                    <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-500"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`font-bold text-gray-900 ${editableClass}`}
                          {...(editable && {
                            contentEditable: true,
                            suppressContentEditableWarning: true,
                            onBlur: (e: React.FocusEvent<HTMLElement>) => handleExperienceEdit(idx, "role", e.currentTarget.textContent || "")
                          })}
                        >
                          {exp.role}
                        </h3>
                        <p className="text-purple-600 text-sm font-medium">{exp.company}</p>
                        <p className="text-gray-500 text-xs">{exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex">
                          <span className="text-purple-400 mr-2">▸</span>
                          <span
                            className={editableClass}
                            {...(editable && {
                              contentEditable: true,
                              suppressContentEditableWarning: true,
                              onBlur: (e: React.FocusEvent<HTMLElement>) => handleBulletEdit(idx, bIdx, e.currentTarget.textContent || "")
                            })}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-purple-500"></span>
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, idx) => (
                  <div key={idx} className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      {project.link && (
                        <span className="text-xs text-purple-500">{project.link}</span>
                      )}
                    </div>
                    {project.subtitle && (
                      <p className="text-purple-600 text-xs mb-2">{project.subtitle}</p>
                    )}
                    <ul className="space-y-1 text-sm text-gray-600">
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex">
                          <span className="text-purple-400 mr-2">▸</span>
                          <span
                            className={editableClass}
                            {...(editable && {
                              contentEditable: true,
                              suppressContentEditableWarning: true,
                              onBlur: (e: React.FocusEvent<HTMLElement>) => handleProjectBulletEdit(idx, bIdx, e.currentTarget.textContent || "")
                            })}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
