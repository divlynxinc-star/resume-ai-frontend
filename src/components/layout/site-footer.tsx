function Brand() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="size-6 rounded-md bg-[oklch(0.488_0.243_264.376)]" />
        <span className="text-white font-semibold">ResumeCraft</span>
      </div>
      <p className="text-white/70 text-sm mt-3 max-w-[280px]">
        AI-powered resume builder to help you create professional resumes in minutes.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <a href="#" aria-label="Twitter" className="size-8 rounded-full bg-white/6 border border-white/12 grid place-items-center text-white/70 hover:text-white">𝕏</a>
        <a href="#" aria-label="LinkedIn" className="size-8 rounded-full bg-white/6 border border-white/12 grid place-items-center text-white/70 hover:text-white">in</a>
        <a href="#" aria-label="Instagram" className="size-8 rounded-full bg-white/6 border border-white/12 grid place-items-center text-white/70 hover:text-white">IG</a>
      </div>
    </div>
  );
}

function Column({ title, links }: { title: string; links: { label: string; href?: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold text-white/60 tracking-wide">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href ?? "#"} className="text-white/70 hover:text-white text-sm">
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
            { label: "Features" },
            { label: "Pricing" },
            { label: "Templates" },
            { label: "Dashboard" },
          ]}
        />
        <Column
          title="SUPPORT"
          links={[
            { label: "Help Center" },
            { label: "Contact Us" },
            { label: "Documentation" },
            { label: "FAQ" },
          ]}
        />
        <Column
          title="LEGAL"
          links={[
            { label: "Privacy Policy" },
            { label: "Terms of Service" },
            { label: "Cookie Policy" },
            { label: "Security" },
          ]}
        />
      </div>
      <div className="max-w-[1100px] mx-auto px-6 border-t border-white/10 py-4 text-white/60 text-xs">
        © 2024 ResumeCraft. All rights reserved.
      </div>
    </footer>
  );
}