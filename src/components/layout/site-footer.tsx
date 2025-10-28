import { Linkedin, Instagram, Mail } from "lucide-react";
import resumeLogo from "../../assets/resume-ai-logo.png";

function Brand() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <img
          src={resumeLogo}
          alt="ResumeCraft AI Logo"
          className="h-14 w-14 rounded-md"
        />
        <span className="text-white font-semibold">Jobsynk AI</span>
      </div>

      <p className="text-white/70 text-sm mt-3 max-w-[280px]">
        Create professional, ATS-friendly, and industry-accepted resumes in minutes
        with our AI-powered builder.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <a
          href="#"
          aria-label="LinkedIn"
          className="size-8 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-white transition"
        >
          <Linkedin className="size-4" />
        </a>

        <a
          href="#"
          aria-label="Instagram"
          className="size-8 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-white transition"
        >
          <Instagram className="size-4" />
        </a>

        <a
          href="mailto:hello@resumecraft.ai"
          aria-label="Email"
          className="size-8 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-white transition"
        >
          <Mail className="size-4" />
        </a>
      </div>
    </div>
  );
}

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href?: string }[];
}) {
  return (
    <div>
      <div className="text-xs font-semibold text-white/60 tracking-wide">
        {title}
      </div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href ?? "#"}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "auto",
                })
              }
              className="text-white/70 hover:text-white text-sm"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="text-white">
      <div className="max-w-[1100px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <Brand />

        <Column
          title="PRODUCT"
          links={[
            { label: "Features", href: "#home" },
            { label: "Pricing", href: "#pricing" },
            { label: "Templates", href: "#templates" },
            { label: "Dashboard", href: "#dashboard" },
          ]}
        />

        <Column
          title="SUPPORT"
          links={[
            { label: "Help Center", href: "#help-center" },
            { label: "Contact Us", href: "#contact-us" },
            { label: "Documentation", href: "#documentation" },
            { label: "FAQ", href: "#faq" },
          ]}
        />

        <Column
          title="LEGAL"
          links={[
            { label: "Privacy Policy", href: "#privacy" },
            { label: "Terms of Service", href: "#terms" },
            { label: "Cookie Policy", href: "#cookie-policy" },
            { label: "Security", href: "#security" },
          ]}
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 border-t border-white/10 py-4 text-white/60 text-xs">
        © 2025 Jobsynk AI. All rights reserved.
      </div>
    </footer>
  );
}
