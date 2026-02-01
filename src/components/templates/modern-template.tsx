import type { ResumeData } from "../../lib/resume-data";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  editable?: boolean;
  onDataChange?: (data: ResumeData) => void;
}

export default function ModernTemplate({ data, scale = 1, editable = false, onDataChange }: TemplateProps) {
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

  const handleEducationEdit = (index: number, field: string, value: string) => {
    if (!editable || !onDataChange) return;
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onDataChange({ ...data, education: newEducation });
  };

  const handleProjectEdit = (index: number, field: string, value: string) => {
    if (!editable || !onDataChange) return;
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onDataChange({ ...data, projects: newProjects });
  };

  const handleProjectBulletEdit = (projIndex: number, bulletIndex: number, value: string) => {
    if (!editable || !onDataChange) return;
    const newProjects = [...data.projects];
    const newBullets = [...newProjects[projIndex].bullets];
    newBullets[bulletIndex] = value;
    newProjects[projIndex] = { ...newProjects[projIndex], bullets: newBullets };
    onDataChange({ ...data, projects: newProjects });
  };

  const editableProps = (_field: string, _value: string, handler: (v: string) => void) => {
    if (!editable) return {};
    return {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: (e: React.FocusEvent<HTMLElement>) => handler(e.currentTarget.textContent || ""),
      className: "outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded px-0.5 -mx-0.5"
    };
  };

  return (
    <div
      className="bg-white text-gray-900 font-sans"
      style={{
        width: 816,
        minHeight: 1056,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        padding: "40px 48px"
      }}
    >
      {/* Header */}
      <header className="border-b-2 border-blue-500 pb-4 mb-6">
        <h1
          className={`text-3xl font-bold text-blue-600 ${editable ? "outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded px-0.5 -mx-0.5" : ""}`}
          {...(editable && {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: (e: React.FocusEvent<HTMLElement>) => handleEdit("name", e.currentTarget.textContent || "")
          })}
        >
          {data.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
          {data.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-blue-500" />
              <span {...editableProps("email", data.email, (v) => handleEdit("email", v))}>{data.email}</span>
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-blue-500" />
              <span {...editableProps("phone", data.phone, (v) => handleEdit("phone", v))}>{data.phone}</span>
            </span>
          )}
          {data.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span {...editableProps("linkedin", data.linkedin, (v) => handleEdit("linkedin", v))}>{data.linkedin}</span>
            </span>
          )}
          {data.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-blue-500" />
              <span {...editableProps("portfolio", data.portfolio, (v) => handleEdit("portfolio", v))}>{data.portfolio}</span>
            </span>
          )}
        </div>
      </header>

      {/* Experience Section */}
      {data.experiences.length > 0 && data.experiences[0].role && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-semibold text-gray-900 ${editable ? "outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded px-0.5 -mx-0.5" : ""}`}
                      {...(editable && {
                        contentEditable: true,
                        suppressContentEditableWarning: true,
                        onBlur: (e: React.FocusEvent<HTMLElement>) => handleExperienceEdit(idx, "role", e.currentTarget.textContent || "")
                      })}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      <span {...editableProps("company", exp.company, (v) => handleExperienceEdit(idx, "company", v))}>{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="mx-1">•</span>
                          <span {...editableProps("location", exp.location, (v) => handleExperienceEdit(idx, "location", v))}>{exp.location}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    <span {...editableProps("startDate", exp.startDate, (v) => handleExperienceEdit(idx, "startDate", v))}>{exp.startDate}</span>
                    {" - "}
                    <span {...editableProps("endDate", exp.endDate, (v) => handleExperienceEdit(idx, "endDate", v))}>{exp.endDate}</span>
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span {...editableProps(`bullet-${idx}-${bIdx}`, bullet, (v) => handleBulletEdit(idx, bIdx, v))}>{bullet}</span>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-semibold text-gray-900 ${editable ? "outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded px-0.5 -mx-0.5" : ""}`}
                      {...(editable && {
                        contentEditable: true,
                        suppressContentEditableWarning: true,
                        onBlur: (e: React.FocusEvent<HTMLElement>) => handleProjectEdit(idx, "title", e.currentTarget.textContent || "")
                      })}
                    >
                      {project.title}
                    </h3>
                    {project.link && (
                      <p className="text-blue-500 text-xs">{project.link}</p>
                    )}
                  </div>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span {...editableProps(`proj-bullet-${idx}-${bIdx}`, bullet, (v) => handleProjectBulletEdit(idx, bIdx, v))}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && data.education[0].school && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h3
                    className={`font-semibold text-gray-900 ${editable ? "outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded px-0.5 -mx-0.5" : ""}`}
                    {...(editable && {
                      contentEditable: true,
                      suppressContentEditableWarning: true,
                      onBlur: (e: React.FocusEvent<HTMLElement>) => handleEducationEdit(idx, "degree", e.currentTarget.textContent || "")
                    })}
                  >
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <span {...editableProps("school", edu.school, (v) => handleEducationEdit(idx, "school", v))}>{edu.school}</span>
                    {edu.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span {...editableProps("location", edu.location, (v) => handleEducationEdit(idx, "location", v))}>{edu.location}</span>
                      </>
                    )}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="space-y-2">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold text-gray-800">{skillGroup.category}:</span>{" "}
                <span className="text-gray-600">{skillGroup.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
