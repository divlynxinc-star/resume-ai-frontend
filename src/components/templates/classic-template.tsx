import type { ResumeData } from "../../lib/resume-data";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  editable?: boolean;
  onDataChange?: (data: ResumeData) => void;
}

export default function ClassicTemplate({ data, scale = 1, editable = false, onDataChange }: TemplateProps) {
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

  const editableClass = editable ? "outline-none focus:bg-yellow-50 focus:ring-1 focus:ring-yellow-400 rounded px-0.5 -mx-0.5" : "";

  return (
    <div
      className="bg-white text-gray-900 font-serif"
      style={{
        width: 816,
        minHeight: 1056,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        padding: "48px 56px"
      }}
    >
      {/* Header - Centered traditional style */}
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1
          className={`text-4xl font-bold text-gray-900 tracking-wide ${editableClass}`}
          {...(editable && {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: (e: React.FocusEvent<HTMLElement>) => handleEdit("name", e.currentTarget.textContent || "")
          })}
        >
          {data.name.toUpperCase()}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-3 mt-3 text-sm text-gray-700">
          {data.email && <span>{data.email}</span>}
          {data.phone && (
            <>
              <span className="text-gray-400">|</span>
              <span>{data.phone}</span>
            </>
          )}
          {data.linkedin && (
            <>
              <span className="text-gray-400">|</span>
              <span>{data.linkedin}</span>
            </>
          )}
          {data.portfolio && (
            <>
              <span className="text-gray-400">|</span>
              <span>{data.portfolio}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {data.experiences.length > 0 && data.experiences[0].role && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experiences.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
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
                  <span className="text-sm text-gray-600 italic">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 italic">
                  {exp.company}, {exp.location}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc list-outside ml-4">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className={editableClass}
                      {...(editable && {
                        contentEditable: true,
                        suppressContentEditableWarning: true,
                        onBlur: (e: React.FocusEvent<HTMLElement>) => handleBulletEdit(idx, bIdx, e.currentTarget.textContent || "")
                      })}
                    >
                      {bullet}
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
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  {project.link && (
                    <span className="text-xs text-gray-500">{project.link}</span>
                  )}
                </div>
                {project.subtitle && (
                  <p className="text-sm text-gray-600 italic">{project.subtitle}</p>
                )}
                <ul className="mt-1 space-y-1 text-sm text-gray-700 list-disc list-outside ml-4">
                  {project.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className={editableClass}
                      {...(editable && {
                        contentEditable: true,
                        suppressContentEditableWarning: true,
                        onBlur: (e: React.FocusEvent<HTMLElement>) => handleProjectBulletEdit(idx, bIdx, e.currentTarget.textContent || "")
                      })}
                    >
                      {bullet}
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
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-700 italic">
                    {edu.school}, {edu.location}
                  </p>
                </div>
                <span className="text-sm text-gray-600">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="space-y-1">
            {data.skills.map((skillGroup, idx) => (
              <p key={idx} className="text-sm text-gray-700">
                <span className="font-semibold">{skillGroup.category}:</span>{" "}
                {skillGroup.skills.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
