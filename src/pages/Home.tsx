import { useLocation } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";
import { QUESTIONS } from "@/data/questions";
import { loadAnswers, loadBookmarks, loadWrong, loadMode, saveMode, loadResults } from "@/lib/storage";
import type { QuizMode } from "@/lib/storage";
import { useState } from "react";

const MODS = [
  { id: "module-full", title: "الامتحان الكامل", desc: "جميع الأسئلة الـ102 بترتيب الأصل — تدريب تدريجي شامل", minutes: 100, icon: "🏆" },
  { id: "module-quick", title: "مراجعة سريعة", desc: "20 سؤالاً عشوائياً مع مؤقت قصير — لمراجعة يومية سريعة", minutes: 15, icon: "⚡" },
];

const MODES: { id: QuizMode; title: string; desc: string; icon: string; badge?: string }[] = [
  { id: "training", title: "وضع التدريب", desc: "تصحيح فوري مع شرح بعد كل سؤال + حفظ الأخطاء تلقائياً", icon: "🎯", badge: "الافتراضي" },
  { id: "exam", title: "وضع المحاكاة", desc: "تظهر النتيجة في النهاية فقط", icon: "⏱️" },
];

export default function Home() {
  const [, nav] = useLocation();
  const [mode, setMode] = useState<QuizMode>(() => loadMode() ?? "training");
  const answers = loadAnswers();
  const bookmarks = loadBookmarks();
  const wrong = loadWrong();
  const results = loadResults()[0];
  const done = Object.values(answers).filter((m) => (m as { _submitted?: boolean })._submitted).length;
  const attempted = QUESTIONS.filter((q) => {
    const m = answers["module-full"] as { [k: string]: unknown } | undefined;
    const a = m && m[q.id];
    return Array.isArray(a) && a.length > 0;
  }).length;

  const pickMode = (m: QuizMode) => { setMode(m); saveMode(m); };
  const start = (id: string) => nav(`/quiz/${id}`);

  const stats = [
    { label: "إجمالي الأسئلة", value: QUESTIONS.length, color: "var(--violet2)" },
    { label: "أسئلة أجبت عنها", value: attempted, color: "var(--teal)" },
    { label: "أخطاء للمراجعة", value: wrong.length, color: "var(--red)" },
    { label: "مفضلة", value: Object.keys(bookmarks).length, color: "#ec4899" },
  ];

  return (
    <div>
      <TopBar>
        <Chip>Microsoft Fabric</Chip>
        <Chip>102 سؤال</Chip>
      </TopBar>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "1.2rem" }}>
        <div className="card" style={{ background: "linear-gradient(135deg,#4c1d95,#6d28d9 60%,#0e7490)", border: "none", padding: "1.6rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800 }}>محاكي امتحان DP-600</h1>
          <p style={{ margin: "0.4rem 0 0", color: "#d8c7ff", lineHeight: 1.7 }}>
            تحضير تفاعلي لشهادة <b>Microsoft Fabric Analytics Engineer</b> — 102 سؤالاً تغطي النمذجة الدلالية، Lakehouse، تحويلات البيانات، الذكاء في Fabric، والأمان.
          </p>
          {results && (
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", color: "#7ee8fa" }}>
              آخر نتيجة: <b className="num-ltr">{results.pct}%</b> ({results.score}/{results.total}) — {new Date(results.at).toLocaleString("ar-EG")}
            </p>
          )}
          <p style={{ margin: "0.6rem 0 0", color: "#ffe4a3", fontSize: "0.85rem" }}>
            ⚠ المحتوى للمراجعة التعليمية ولا يمثل أسئلة الامتحان الرسمية. المرجع:{" "}
            <a href="https://learn.microsoft.com/credentials/certifications/fabric-analytics-engineer/" target="_blank" rel="noreferrer" style={{ color: "#7ee8fa" }}>Microsoft Learn</a>
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.8rem" }}>
          {stats.map((s) => (
            <div key={s.label} className="card" style={{ textAlign: "center", padding: "0.9rem" }}>
              <div className="num-ltr" style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--mut)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: "0.7rem" }}>اختر وضع الدراسة</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "0.8rem" }}>
            {MODES.map((m) => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id} onClick={() => pickMode(m.id)} className="opt"
                  style={{
                    position: "relative", flexDirection: "column", alignItems: "flex-start", gap: "0.3rem",
                    borderColor: active ? "var(--violet)" : "var(--line)",
                    background: active ? "rgba(124,58,237,0.16)" : "var(--panel)",
                    boxShadow: active ? "0 0 0 2px rgba(124,58,237,0.35)" : undefined,
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{m.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: "1rem" }}>{m.title}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--mut)" }}>{m.desc}</span>
                  {m.badge && <span style={{ fontSize: "0.7rem", background: "var(--teal)", color: "#04160e", borderRadius: 99, padding: "0.1rem 0.6rem", fontWeight: 800 }}>{m.badge}</span>}
                  {active && <span style={{ position: "absolute", top: "0.6rem", insetInlineEnd: "0.8rem", color: "var(--teal)", fontWeight: 900 }}>✔</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gap: "0.9rem" }}>
          {MODS.map((m) => (
            <div key={m.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ fontSize: "2rem" }}>{m.icon}</div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{m.title}</div>
                <div style={{ color: "var(--mut)", fontSize: "0.88rem", lineHeight: 1.6 }}>{m.desc}</div>
              </div>
              <button className="btn btn-violet" onClick={() => start(m.id)}>ابدأ الآن</button>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "0.8rem" }}>
          <button className="btn btn-ghost" style={{ padding: "1rem", borderColor: wrong.length ? "rgba(248,113,113,0.5)" : undefined }} onClick={() => nav("/mistakes")}>
            📕 مراجعة الأخطاء {wrong.length > 0 && <span className="num-ltr" style={{ color: "var(--red)", fontWeight: 900 }}>({wrong.length})</span>}
          </button>
          <button className="btn btn-ghost" style={{ padding: "1rem" }} onClick={() => nav("/bookmarks")}>⭐ المفضلة</button>
        </div>
      </div>
    </div>
  );
}
