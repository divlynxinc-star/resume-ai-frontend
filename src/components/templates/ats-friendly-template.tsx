import type { ResumeData } from "../../lib/resume-data";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  editable?: boolean;
  onDataChange?: (data: ResumeData) => void;
}

export default function ATSFriendlyTemplate({ data, scale = 1, editable = false, onDataChange }: TemplateProps) {
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

  const editableClass = editable ? "outline-none focus:bg-green-50 focus:ring-1 focus:ring-green-400 rounded px-0.5 -mx-0.5" : "";

  return (
    <div
      className="bg-white text-gray-900 font-sans"
      style={{
        width: 816,
        minHeight: 1056,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        padding: "48px 56px"
      }}
    >
      {/* Header - Simple and ATS-readable */}
      <header className="mb-6">
        <h1
          className={`text-2xl font-bold text-gray-900 ${editableClass}`}
          {...(editable && {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: (e: React.FocusEvent<HTMLElement>) => handleEdit("name", e.currentTarget.textContent || "")
          })}
        >
          {data.name}
        </h1>
        <div className="mt-2 text-sm text-gray-700">
          {[data.email, data.phone, data.linkedin, data.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </div>
        <hr className="mt-4 border-gray-300" />
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-900 uppercase mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {data.experiences.length > 0 && data.experiences[0].role && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-900 uppercase mb-3">Experience</h2>
          <div className="space-y-5">
            {data.experiences.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start flex-wrap gap-1">
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
                    <p className="text-sm text-gray-600">
                      {exp.company} - {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex">
                      <span className="mr-2">-</span>
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
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-900 uppercase mb-3">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  {project.link && (
                    <span className="text-sm text-gray-500">{project.link}</span>
                  )}
                </div>
                {project.subtitle && (
                  <p className="text-sm text-gray-600">{project.subtitle}</p>
                )}
                <ul className="mt-1 space-y-1 text-sm text-gray-700">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex">
                      <span className="mr-2">-</span>
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

      {/* Education Section */}
      {data.education.length > 0 && data.education[0].school && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-900 uppercase mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start flex-wrap gap-1">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {edu.school}, {edu.location}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section - ATS-optimized format */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-900 uppercase mb-3">Skills</h2>
          <div className="space-y-2">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="text-sm text-gray-700">
                <span className="font-semibold">{skillGroup.category}:</span>{" "}
                {skillGroup.skills.join(", ")}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
