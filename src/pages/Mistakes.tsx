import { TopBar, Chip } from "@/components/Navbar";
import { allQuestions } from "@/lib/loadQuestions";
import { loadAnswers } from "@/lib/storage";
import { gradeQuestion } from "@/lib/grading";
import { useMemo } from "react";
import type { Answer } from "@/types/quiz";

export default function Mistakes() {
  const answers = loadAnswers();
  const wrong = useMemo(() => {
    const out: { n: number; q: string; e: string; r?: string }[] = [];
    for (const [mod, store] of Object.entries(answers)) {
      if (!store._submitted) continue;
      for (const q of allQuestions()) {
        const a: Answer | undefined = store[q.id];
        if (!a?.length) continue;
        if (!gradeQuestion(q, a).correct) {
          out.push({ n: q.number, q: q.question, e: q.explanation ?? "", r: q.reference });
        }
      }
    }
    return out;
  }, [answers]);

  return (
    <div>
      <TopBar>
        <Chip>📕 مراجعة الأخطاء</Chip>
        <Chip cls="">{wrong.length} خطأ</Chip>
      </TopBar>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "0.8rem" }}>
        {wrong.length === 0 && (
          <div className="card" style={{ textAlign: "center", color: "var(--mut)" }}>لا توجد أخطاء مسجلة بعد — أكمل امتحاناً أولاً.</div>
        )}
        {wrong.map((w, i) => (
          <details key={i} className="card" style={{ borderColor: "rgba(248,113,113,0.4)" }}>
            <summary style={{ display: "flex", gap: "0.6rem", cursor: "pointer", fontWeight: 700, fontSize: "0.93rem" }}>
              <span style={{ flex: "none", background: "var(--red)", color: "#fff", borderRadius: "0.45rem", padding: "0.1rem 0.5rem", fontWeight: 800 }} className="num-ltr">{w.n}</span>
              <span style={{ flex: 1 }}>{w.q}</span>
            </summary>
            <div style={{ paddingTop: "0.6rem", borderTop: "1px solid var(--line)", marginTop: "0.6rem", fontSize: "0.9rem", lineHeight: 1.8 }}>
              {w.e && <div>{w.e}</div>}
              {w.r && (
                <div style={{ marginTop: "0.4rem" }}>
                  <a href={w.r} target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>المرجع: Microsoft Learn ↖</a>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
