import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";
import QuestionRenderer from "@/components/QuestionRenderer";
import { allQuestions, randomSubset, orderQuestions } from "@/lib/loadQuestions";
import { loadAnswers, saveAnswers, loadBookmarks, saveBookmarks } from "@/lib/storage";
import { gradeQuestion } from "@/lib/grading";
import { sounds } from "@/lib/sounds";
import type { Answer, QuizQuestion } from "@/types/quiz";

export default function Quiz() {
  const { moduleId = "full" } = useParams();
  const [, nav] = useLocation();

  const questions = useMemo<QuizQuestion[]>(() => {
    if (moduleId === "quick") {
      const cached = sessionStorage.getItem("dp600_quick_questions");
      if (cached) return JSON.parse(cached) as QuizQuestion[];
      const qs = randomSubset(20);
      sessionStorage.setItem("dp600_quick_questions", JSON.stringify(qs));
      return qs;
    }
    return allQuestions();
  }, [moduleId]);

  const minutes = Number(sessionStorage.getItem(moduleId === "quick" ? "dp600_quick_minutes" : "dp600_full_minutes") ?? 100);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>(() => loadAnswers()[moduleId] ?? {});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(loadBookmarks);
  const [showPalette, setShowPalette] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(minutes * 60);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const storeRef = useRef(answers);
  storeRef.current = answers;

  const q = questions[idx] as QuizQuestion | undefined;
  const ans = q ? answers[q.id] ?? [] : [];

  // timer
  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          handleSubmit(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist
  useEffect(() => {
    const all = loadAnswers();
    all[moduleId] = { ...storeRef.current };
    saveAnswers(all);
  }, [answers, moduleId]);

  useEffect(() => saveBookmarks(bookmarks), [bookmarks]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length;

  function setAnswer(a: Answer) {
    setAnswers((prev) => ({ ...prev, [q!.id]: a }));
  }

  function handleSubmit(auto = false) {
    if (submitted) return;
    setSubmitted(true);
    const all = loadAnswers();
    all[moduleId] = { ...storeRef.current, _submitted: true, _score: undefined, _total: questions.length };
    saveAnswers(all);
    sessionStorage.setItem("dp600_result_questions", JSON.stringify(questions));
    sessionStorage.setItem("dp600_result_module", moduleId);
    (auto ? sounds.wrong : sounds.submit)();
    nav(`/results/${moduleId}`);
  }

  if (!q) return <div style={{ padding: "3rem", textAlign: "center" }}>لا توجد أسئلة…</div>;

  const palette = questions.map((qq, i) => {
    const a = answers[qq.id] ?? [];
    const answered = a.length > 0;
    return (
      <button
        key={qq.id}
        onClick={() => { setIdx(i); setShowPalette(false); }}
        className="num-ltr"
        style={{
          width: "2.3rem", height: "2.3rem", borderRadius: "0.55rem", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", border: "1.5px solid var(--line)",
          background: i === idx ? "var(--teal)" : answered ? "var(--violet)" : "var(--panel2)",
          color: i === idx ? "#04160e" : answered ? "#fff" : "var(--mut)",
          boxShadow: bookmarks[qq.id] ? "0 0 0 2px var(--amber)" : undefined,
        }}
        title={`سؤال ${qq.number}${bookmarks[qq.id] ? " (مفضل)" : ""}`}
      >
        {qq.number}
      </button>
    );
  });

  return (
    <div>
      <TopBar>
        <Chip cls={seconds <= 60 ? "timeout" : ""}>⏱ <span className="num-ltr">{mm}:{ss}</span></Chip>
        <Chip>✓ <span className="num-ltr">{answeredCount}/{questions.length}</span></Chip>
        <button className="chip" style={{ background: "rgba(255,255,255,0.18)", cursor: "pointer" }} onClick={() => nav(moduleId === "quick" ? "/" : "/mistakes")}>
          ✕ إنهاء
        </button>
      </TopBar>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1rem 1rem 4rem", display: "grid", gap: "0.9rem" }}>
        {/* progress + palette toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ flex: 1, height: "8px", borderRadius: 99, background: "var(--panel2)", overflow: "hidden", border: "1px solid var(--line)" }}>
            <div style={{ width: `${Math.max(2, (answeredCount / questions.length) * 100)}%`, height: "100%", background: "linear-gradient(90deg,var(--violet2),var(--teal))" }} />
          </div>
          <span className="num-ltr" style={{ fontSize: "0.82rem", color: "var(--mut)", fontWeight: 700 }}>{idx + 1} / {questions.length}</span>
          <button className="btn btn-ghost" style={{ padding: "0.4rem 0.8rem", fontSize: "0.82rem" }} onClick={() => setShowPalette((s) => !s)}>
            ☰ الأسئلة
          </button>
        </div>

        {/* palette */}
        {showPalette && (
          <div className="card">
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>{palette}</div>
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", marginTop: "0.6rem", fontSize: "0.75rem", color: "var(--mut)", flexWrap: "wrap" }}>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--violet)", borderRadius: 3, verticalAlign: "-1px" }} /> مُجاب</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--panel2)", border: "1px solid var(--line)", borderRadius: 3, verticalAlign: "-1px" }} /> بدون إجابة</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--teal)", borderRadius: 3, verticalAlign: "-1px" }} /> الحالي</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", boxShadow: "0 0 0 2px var(--amber)", borderRadius: 3, verticalAlign: "-1px" }} /> مفضل</span>
            </div>
          </div>
        )}

        {/* question body */}
        <div className="card" style={{ display: "grid", gap: "1rem", padding: "1.2rem" }}>
          <div style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
            <span style={{ flex: "none", background: "linear-gradient(135deg,var(--violet),#6d28d9)", color: "#fff", fontWeight: 800, borderRadius: "0.7rem", padding: "0.3rem 0.75rem", fontSize: "0.95rem" }} className="num-ltr">
              {q.number}
            </span>
            {q.category && <span style={{ fontSize: "0.75rem", color: "var(--teal)", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 99, padding: "0.2rem 0.6rem", fontWeight: 700 }}>{q.category}</span>}
            <button
              className="btn btn-ghost" style={{ marginInlineStart: "auto", padding: "0.35rem 0.7rem", fontSize: "0.85rem" }}
              onClick={() => { const next = { ...bookmarks, [q.id]: !bookmarks[q.id] }; setBookmarks(next); }}
              title="أضف/أزل من المفضلة"
            >
              {bookmarks[q.id] ? "★ مفضل" : "☆"}
            </button>
          </div>
          <h2 style={{ margin: 0, fontSize: "1.08rem", lineHeight: 1.8, fontWeight: 700 }}>{q.question}</h2>
          <QuestionRenderer q={q} answer={ans} onChange={setAnswer} submitted={false} />
        </div>

        {/* nav buttons */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button className="btn btn-ghost" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>→ السابق</button>
          {idx < questions.length - 1 ? (
            <button className="btn btn-violet" onClick={() => setIdx(idx + 1)}>التالي ←</button>
          ) : (
            <button className="btn btn-teal" onClick={() => setConfirmOpen(true)}>إنهاء الامتحان وتصحيح النتيجة</button>
          )}
        </div>
      </div>

      {/* confirm dialog */}
      {confirmOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "grid", placeItems: "center", zIndex: 100, padding: "1rem" }} onClick={() => setConfirmOpen(false)}>
          <div className="card" style={{ maxWidth: "420px", width: "100%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>تأكيد التسليم</div>
            <p style={{ color: "var(--mut)", lineHeight: 1.7 }}>
              أجبت على <b className="num-ltr">{answeredCount}</b> من <b className="num-ltr">{questions.length}</b> سؤالاً.
              {answeredCount < questions.length && " سيتم اعتبار الأسئلة غير المُجابة خاطئة."}
            </p>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
              <button className="btn btn-ghost" onClick={() => setConfirmOpen(false)}>متابعة المراجعة</button>
              <button className="btn btn-teal" onClick={() => handleSubmit(false)}>تسليم وتصحيح</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
