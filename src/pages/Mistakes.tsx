import { useState } from "react";
import { useLocation } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";
import { allQuestions } from "@/lib/loadQuestions";
import { loadWrong, removeWrong, clearWrong } from "@/lib/storage";
import { correctAnswerText, selectedAnswerText } from "@/lib/grading";

export default function Mistakes() {
  const [, nav] = useLocation();
  const [items, setItems] = useState(loadWrong);
  const qMap = new Map(allQuestions().map((q) => [q.id, q]));

  const del = (id: string) => {
    removeWrong(id);
    setItems(loadWrong());
  };
  const delAll = () => {
    if (confirm("حذف كل الأسئلة الخاطئة من قائمة المراجعة؟")) {
      clearWrong();
      setItems([]);
    }
  };

  return (
    <div>
      <TopBar>
        <Chip>📕 مراجعة الأخطاء</Chip>
        <Chip cls="">{items.length} سؤال</Chip>
      </TopBar>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "0.9rem" }}>
        {items.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "2rem 1rem", color: "var(--mut)" }}>
            <div style={{ fontSize: "2.2rem" }}>🎉</div>
            <div style={{ fontWeight: 800, color: "var(--txt)", margin: "0.5rem 0 0.3rem" }}>لا توجد أسئلة خاطئة للمراجعة حالياً</div>
            <div style={{ fontSize: "0.88rem" }}>كل سؤال تجيب عنه إجابةً خاطئة ويضغط «تحقق من الإجابة» يُحفظ هنا تلقائياً.</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button className="btn btn-violet" style={{ flex: 1, minWidth: "200px" }} onClick={() => nav("/quiz/module-wrong")}>
                ▶ بدء اختبار من الأسئلة الخاطئة فقط ({items.length})
              </button>
              <button className="btn btn-danger" onClick={delAll}>🗑 حذف الكل</button>
            </div>

            {items.map((w) => {
              const q = qMap.get(w.questionId);
              if (!q) return null;
              return (
                <div key={w.questionId} className="card" style={{ borderColor: "rgba(248,113,113,0.4)", display: "grid", gap: "0.6rem" }}>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <span className="num-ltr" style={{ flex: "none", background: "var(--red)", color: "#fff", borderRadius: "0.45rem", padding: "0.1rem 0.5rem", fontWeight: 800 }}>{q.number}</span>
                    <div style={{ flex: 1, fontWeight: 700, lineHeight: 1.7 }}>{q.question}</div>
                  </div>

                  <div style={{ display: "grid", gap: "0.35rem", fontSize: "0.9rem" }}>
                    <div style={{ color: "var(--red)" }}>
                      <b>إجابتك:</b> {selectedAnswerText(q, w.selectedAnswer)}
                    </div>
                    <div style={{ color: "var(--green)" }}>
                      <b>الإجابة الصحيحة:</b> {correctAnswerText(q)}
                    </div>
                    {q.explanation && (
                      <div className="explanation" style={{ marginTop: "0.3rem", color: "inherit" }}>
                        <strong>لماذا؟</strong>
                        <p style={{ margin: "0.25rem 0 0", color: "#dbeafe" }}>{q.explanation}</p>
                      </div>
                    )}
                    {q.reference && (
                      <a href={q.reference} target="_blank" rel="noreferrer" style={{ color: "var(--teal)", fontSize: "0.85rem" }}>المرجع: Microsoft Learn ↖</a>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <button className="btn btn-ghost" style={{ fontSize: "0.85rem", padding: "0.4rem 0.9rem" }} onClick={() => nav(`/quiz/module-wrong?focus=${q.number}`)}>
                      🔍 فتح السؤال مرة أخرى
                    </button>
                    <button className="btn btn-ghost" style={{ fontSize: "0.85rem", padding: "0.4rem 0.9rem", color: "var(--red)" }} onClick={() => del(w.questionId)}>
                      ✕ حذف من المراجعة
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
