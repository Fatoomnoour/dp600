import { useLocation } from "wouter";
import type { ReactNode } from "react";

export function TopBar({ children }: { children?: ReactNode }) {
  const [, nav] = useLocation();
  const base = import.meta.env.BASE_URL || "/dp600/";
  return (
    <header className="topbar">
      <a className="logo" href={base} onClick={(e) => { e.preventDefault(); nav("/"); }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#a78bfa" />
          <path d="M12 7v10M7 12h10" stroke="#1e1b4b" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        <span>محاكي امتحان <span className="num-ltr">DP-600</span></span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>{children}</div>
    </header>
  );
}

export function Chip({ children, cls = "" }: { children: ReactNode; cls?: string }) {
  return <span className={`chip ${cls}`}>{children}</span>;
}
