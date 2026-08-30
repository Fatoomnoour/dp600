import { useParams, useLocation } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";
import { orderQuestions } from "@/lib/loadQuestions";
import { loadAnswers, loadBookmarks } from "@/lib/storage";
import { gradeQuestion, scoreQuiz } from "@/lib/grading";
import { useEffect, useState } from "react";
import type { Answer, QuizQuestion } from "@/types/quiz";

export default function Results() {
  const { moduleId = "full" } = useParams();
  const [, nav] = useLocation();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const raw = sessionStorage.getItem("dp600_result_questions");
    if (raw) setQuestions(JSON.parse(raw) as QuizQuestion[]);
    else setQuestions(orderQuestions(Array.from({ length: 102 }, (_, i) => i + 1)));
  }, []);

  const answers = loadAnswers()[moduleId] ?? {};
  const [books] = useState(loadBookmarks);
  const res = questions.length ? scoreQuiz(questions, answers) : null;
  if (!res) return <div style={{ padding: "3rem", textAlign: "center" }}>جارٍ تحميل النتيجة…</div>;

  const pct = Math.round((res.score / res.total) * 100);
  const pass = pct >= 70;
  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <div>
      <TopBar>
        <Chip>{moduleId === "quick" ? "مراجعة سريعة" : "الامتحان الكامل"}</Chip>
        <button className="chip" style={{ background: "rgba(255,255,255,0.18)", cursor: "pointer" }} onClick={() => nav("/")}>🏠 الرئيسية</button>
      </TopBar>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "1rem" }}>
        {/* score ring */}
        <div className="card" style={{ textAlign: "center", padding: "1.6rem 1rem" }}>
          <svg width="150" height="150" viewBox="0 0 128 128" style={{ margin: "0 auto" }}>
            <circle cx="64" cy="64" r={R} fill="none" stroke="var(--panel2)" strokeWidth="11" />
            <circle
              cx="64" cy="64" r={R} fill="none" stroke={pass ? "var(--green)" : "var(--red)"} strokeWidth="11"
              strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
              transform="rotate(-90 64 64)"
            />
            <text x="64" y="61" textAnchor="middle" style={{ fill: "var(--txt)", fontSize: "27px", fontWeight: 800 }} className="num-ltr">{pct}%</text>
            <text x="64" y="82" textAnchor="middle" style={{ fill: "var(--mut)", fontSize: "11px" }} className="num-ltr">{res.score} / {res.total}</text>
          </svg>
          <h1 style={{ margin: "0.6rem 0 0", fontSize: "1.35rem", fontWeight: 800 }}>
            {pass ? "🎉 ناجح — أنت جاهز!" : "📚 لا تزال بحاجة إلى مراجعة"}
          </h1>
          <p style={{ color: "var(--mut)", lineHeight: 1.7, margin: "0.5rem 0 1rem" }}>
            {pass
              ? "عمل رائع! احرص على المراجعة النهائية للأخطاء إن وجدت قبل الامتحان."
              : "راجع الأخطاء أدناه، ثم أعد المحاولة. التكرار يبني الثقة."}
          </p>
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-violet" onClick={() => nav(`/quiz/${moduleId}`)}>إعادة الامتحان</button>
            <button className="btn btn-ghost" onClick={() => nav("/mistakes")}>📕 مراجعة الأخطاء</button>
            <button className="btn btn-ghost" onClick={() => nav("/")}>العودة للرئيسية</button>
          </div>
        </div>

        {/* summary chips */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "0.7rem" }}>
          {[
            { l: "صحيحة", v: res.score, c: "var(--green)" },
            { l: "خاطئة", v: res.wrong.length, c: "var(--red)" },
            { l: "بدون إجابة", v: questions.filter((q) => !answers[q.id]?.length).length, c: "var(--amber)" },
            { l: "صعوبة متوقعة", v: "متوسطة", c: "var(--violet2)" },
          ].map((s) => (
            <div key={s.l} className="card" style={{ textAlign: "center", padding: "0.8rem" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--mut)" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* per-question review */}
        <div style={{ display: "grid", gap: "0.7rem" }}>
          {questions.map((q: QuizQuestion) => {
            const a = (answers[q.id] ?? []) as Answer[];
            const g = gradeQuestion(q, a);
            const correct = g.correct;
            return (
              <details key={q.id} className="card" style={{ borderColor: correct ? "rgba(52,211,153,0.4)" : "rgba(248,113,113,0.45)" }}>
                <summary style={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer", fontWeight: 700, fontSize: "0.93rem" }}>
                  <span style={{ flex: "none", width: "2rem", height: "2rem", borderRadius: "0.5rem", display: "grid", placeItems: "center", fontWeight: 800, color: "#fff", background: correct ? "var(--green)" : "var(--red)" }} className="num-ltr">
                    {q.number}
                  </span>
                  <span style={{ flex: 1 }}>{correct ? "✓" : "✗"} {q.question}</span>
                </summary>
                <div style={{ paddingTop: "0.7rem", display: "grid", gap: "0.6rem" }}>
                  {q.type !== "yesNo" && q.type !== "dragDrop" && q.options?.length ? (
                    <div style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem" }}>
                      {q.options.map((o) => {
                        const isCorrect = q.correctAnswers?.includes(o.id);
                        const picked = a.includes(o.id);
                        return (
                          <div key={o.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: isCorrect ? "var(--green)" : picked ? "var(--red)" : "var(--txt)" }}>
                            <span>{isCorrect ? "✓" : picked ? "✗" : "·"}</span>
                            <span>{o.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : q.type === "yesNo" ? (
                    <div style={{ fontSize: "0.88rem", display: "grid", gap: "0.3rem" }}>
                      {q.statements?.map((st) => (
                        <div key={st.id} style={{ color: a.find((x) => x.startsWith(st.id + ":"))?.split(":")[1] === st.correctAnswer ? "var(--green)" : "var(--red)" }}>
                          {st.text} — <b className="num-ltr">{st.correctAnswer}</b>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.88rem", color: "var(--mut)" }}>راجع السؤال في الامتحان لعرض التفاصيل.</div>
                  )}
                  {q.explanation && <div style={{ fontSize: "0.88rem", lineHeight: 1.7, borderTop: "1px solid var(--line)", paddingTop: "0.6rem" }}>{q.explanation}</div>}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
