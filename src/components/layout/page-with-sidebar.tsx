import type { ReactNode } from "react";
import { Sidebar } from "../modal/dashboard";

export default function PageWithSidebar({
  children,
  activeRoute,
  mainClassName,
}: {
  children: ReactNode;
  activeRoute?: string;
  mainClassName?: string;
}) {
  return (
    <div className="grid grid-cols-[260px_1fr] min-h-[calc(100vh-56px)]">
      <Sidebar activeRoute={activeRoute} />
      <div className={"px-6 py-6 " + (mainClassName ?? "")}>{children}</div>
    </div>
  );
}