// Resume data types and sample data

export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  bullets: string[];
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location?: string;
  linkedin: string;
  portfolio: string;
  summary?: string;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  customSections?: { title: string; content: string }[];
}

// Sample resume data based on Abdullah Tahir's resume
export const sampleResumeData: ResumeData = {
  name: "Abdullah Tahir",
  email: "ababdullah216@gmail.com",
  phone: "+923187070410",
  linkedin: "in/ababdullah216",
  portfolio: "abdullahtahir.site/",
  experiences: [
    {
      role: "Associate Software Engineer",
      company: "MicroAgility APAC",
      location: "Islamabad, Pakistan",
      startDate: "June 2025",
      endDate: "Present",
      bullets: [
        "Enhanced front-end responsiveness using React.ts, Tailwind CSS, and ShadCN, delivering a seamless and adaptive user experience.",
        "Integrated RESTful APIs from the backend to the frontend, ensuring smooth data communication and dynamic content rendering.",
        "Developed and integrated multiple custom interactive components for enhanced functionality and user control.",
        "Developed and designed user-facing client portals and front pages, enhancing accessibility and overall usability.",
        "Implemented custom Zod validation schemas to streamline data validation and improve data integrity across the application."
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "FAIR (Football and AI Research)",
      location: "London, UK",
      startDate: "November 2024",
      endDate: "April 2025",
      bullets: [
        "Improved front-end experience using React.js, with performance tweaks like code-splitting and lazy loading to enhance load times.",
        "Contributed to REST API development, optimizing response times and backend efficiency.",
        "Migrated over 2GB of player and match data across 5 major football leagues in MongoDB with zero downtime.",
        "Scraped and mapped data for over 10,000 players from a third-party platform to match structured API data."
      ]
    }
  ],
  education: [
    {
      school: "National University of Computer and Emerging Sciences - FAST",
      degree: "Bachelor's",
      field: "Computer Science",
      location: "Islamabad, Pakistan",
      startDate: "2021",
      endDate: "2025"
    }
  ],
  skills: [
    {
      category: "AI/ML",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "RAG", "Prompt Engineering"]
    },
    {
      category: "Programming Languages",
      skills: ["JavaScript (ES6+)", "Python", "TypeScript", "C++", "C", "C#", "SQL", "Golang (basic)"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js (basic)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "MySQL", "SQL Server", "PostgreSQL", "SQLite", "Redis", "Vector Storage", "Query Optimization"]
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "GitHub Actions (CI/CD)"]
    }
  ],
  projects: [
    {
      title: "Smart Timetable Scheduler",
      link: "github.com/ABAbdulah/Timetable-Scheduling.git",
      bullets: [
        "Developed an AI-driven scheduling system leveraging Genetic Algorithms to optimize university timetables, reducing conflicts between professors, sections, and classrooms.",
        "Implemented constraint-based optimization to prevent overlaps, balance faculty loads, and maximize classroom utilization.",
        "Designed a fitness evaluation mechanism to intelligently prioritize feasible schedules, achieving significant improvements in efficiency.",
        "Applied evolutionary computing techniques (selection, crossover, mutation) to iteratively refine schedules toward optimal solutions."
      ]
    },
    {
      title: "SerenityBot - Chatbot",
      link: "github.com/ABAbdulah/mental-health-companion.git",
      bullets: [
        "Developed domain-specific LLM application using Llama 3 foundation model with custom fine-tuning, RAG implementation, and context-aware prompt engineering for specialized mental health conversations using dataset from HuggingFace.",
        "Implemented advanced NLP pipeline with real-time token streaming, semantic similarity matching, conversation memory management, and multi-turn dialogue optimization for enhanced user engagement.",
        "Engineered full-stack ML platform integrating React-based UI, FastAPI inference server, vector database integration, and automated model monitoring with conversation analytics and user behavior tracking."
      ]
    },
    {
      title: "ARCH360 - AR-powered Visualization Platform",
      subtitle: "Final Year Project - FAST NUCES ISB",
      link: "github.com/ABAbdulah/ARch360.git",
      bullets: [
        "Developing an Augmented Reality (AR)-powered platform to help architects and clients visualize architectural designs in real-time.",
        "Implementing interactive 3D building models with AI-driven customization features, allowing users to modify materials, layouts, and styles on the fly for better design decisions.",
        "Built using Unity and ARCore/ARKit, delivering cross-platform AR experiences with frame rates exceeding 60 FPS for smooth interactions."
      ]
    }
  ]
};

// Empty resume template for new resumes
export const emptyResumeData: ResumeData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  summary: "",
  experiences: [
    {
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: []
    }
  ],
  education: [
    {
      school: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: ""
    }
  ],
  skills: [
    {
      category: "Skills",
      skills: []
    }
  ],
  projects: [],
  customSections: []
};
