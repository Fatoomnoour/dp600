import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";

interface IndexEntry {
  id: string;
  number: number;
  sourcePages: number[];
  type: string;
  imageFiles: string[];
}

const TYPE_AR: Record<string, string> = {
  single: "اختيار واحد",
  multiple: "اختيار متعدد",
  yesNo: "نعم/لا",
  trueFalse: "صح/خطأ",
  hotspot: "مناطق الصورة",
  dragDrop: "سحب وإفلات",
  caseStudy: "دراسة حالة",
};

export default function Admin() {
  const [, nav] = useLocation();
  const [idx, setIdx] = useState<IndexEntry[] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}question-index.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject("HTTP " + r.status)))
      .then((d: IndexEntry[]) => setIdx(d))
      .catch((e) => setErr(String(e)));
  }, []);

  const byType = (idx ?? []).reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});
  const pages = new Set<number>();
  (idx ?? []).forEach((e) => e.sourcePages.forEach((p) => pages.add(p)));

  return (
    <div>
      <TopBar>
        <Chip>🛠 فهرس الأسئلة (Debug)</Chip>
        <button className="chip" style={{ background: "rgba(255,255,255,0.18)", cursor: "pointer" }} onClick={() => nav("/")}>🏠</button>
      </TopBar>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "1rem" }}>
        {err ? (
          <div className="card" style={{ color: "var(--red)" }}>تعذر تحميل الفهرس: {err}</div>
        ) : (
          <>
            <div className="card" style={{ display: "grid", gap: "0.5rem" }}>
              <div className="num-ltr" style={{ fontWeight: 900, fontSize: "1.5rem" }}>Total questions: {idx?.length ?? "…"}</div>
              <div className="num-ltr" style={{ fontWeight: 700, color: "var(--teal)" }}>Total source pages: {pages.size} / 121</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {Object.entries(byType).map(([k, v]) => (
                  <span key={k} className="chip" style={{ background: "rgba(124,58,237,0.25)" }}>
                    {TYPE_AR[k] || k}: <span className="num-ltr">{v}</span>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              {(idx ?? []).map((e) => (
                <div key={e.id} className="card" style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap", padding: "0.7rem 0.9rem" }}>
                  <span className="num-ltr" style={{ fontWeight: 900, color: "var(--violet2)", minWidth: "2.4rem" }}>Q{e.number}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--mut)" }}>
                    Pages: <span className="num-ltr">{e.sourcePages.length === 1 ? e.sourcePages[0] : e.sourcePages[0] + "-" + e.sourcePages[e.sourcePages.length - 1]}</span>
                  </span>
                  <span className="chip" style={{ background: "rgba(45,212,191,0.15)", color: "var(--teal)" }}>{TYPE_AR[e.type] || e.type}</span>
                  <span className="num-ltr" style={{ fontSize: "0.75rem", color: "var(--mut)" }}>{e.imageFiles.length} img</span>
                  <div style={{ display: "flex", gap: "0.2rem", marginInlineStart: "auto", overflow: "hidden" }}>
                    {e.imageFiles.slice(0, 2).map((src) => (
                      <img key={src} src={src} alt="" loading="lazy" style={{ height: "2.6rem", width: "2.2rem", objectFit: "cover", borderRadius: "0.3rem", border: "1px solid var(--line)" }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
