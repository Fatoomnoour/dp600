import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useSearch } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";
import QuestionRenderer from "@/components/QuestionRenderer";
import { allQuestions, randomSubset, orderQuestions } from "@/lib/loadQuestions";
import {
  loadAnswers, saveAnswers, loadBookmarks, saveBookmarks,
  loadWrong, addWrong, removeWrong, addReviewed, loadMode,
  loadCurrent, saveCurrent, saveResult,
} from "@/lib/storage";
import { gradeQuestion } from "@/lib/grading";
import { sounds } from "@/lib/sounds";
import type { Answer, QuizQuestion } from "@/types/quiz";

export default function Quiz() {
  const { moduleId: rawModuleId = "module-full" } = useParams();
  const moduleId = rawModuleId;
  const [, nav] = useLocation();
  const search = useSearch();
  const focusNum = Number(new URLSearchParams(search).get("focus") || 0);
  const mode = loadMode() ?? "training";

  const wrongItems = useMemo(() => loadWrong(), []);
  const wrongIds = useMemo(() => new Set(wrongItems.map((w) => w.questionId)), [wrongItems]);

  const questions = useMemo<QuizQuestion[]>(() => {
    if (moduleId === "module-wrong") {
      const all = allQuestions();
      const map = new Map(all.map((q) => [q.id, q]));
      const list = wrongItems.map((w) => map.get(w.questionId)).filter((q): q is QuizQuestion => Boolean(q));
      return orderQuestions(list.map((q) => q.number));
    }
    if (moduleId === "module-quick") {
      const cached = sessionStorage.getItem("dp600_quick_questions");
      if (cached) return JSON.parse(cached) as QuizQuestion[];
      const qs = randomSubset(20);
      sessionStorage.setItem("dp600_quick_questions", JSON.stringify(qs));
      return qs;
    }
    return allQuestions();
  }, [moduleId, wrongItems]);

  const stored = useMemo(() => loadAnswers()[moduleId] ?? {}, [moduleId]);
  const savedPos = loadCurrent();

  const [idx, setIdxRaw] = useState<number>(() => {
    if (focusNum) {
      const fi = questions.findIndex((qq) => qq.number === focusNum);
      if (fi >= 0) return fi;
    }
    if (moduleId === "module-wrong" && savedPos?.moduleId === "module-wrong") return savedPos.idx ?? 0;
    if (moduleId === "module-full" && savedPos?.moduleId === "module-full") return savedPos.idx ?? 0;
    return typeof stored._idx === "number" ? stored._idx : 0;
  });
  const setIdx = (i: number) => {
    setIdxRaw(i);
    saveCurrent({ moduleId, idx: i });
  };

  const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
    const out: Record<string, Answer> = {};
    for (const [k, v] of Object.entries(stored)) {
      if (k.startsWith("_")) continue;
      if (Array.isArray(v)) out[k] = v as Answer;
    }
    return out;
  });
  const [graded, setGraded] = useState<Record<string, boolean>>(() => (stored._graded as Record<string, boolean>) ?? {});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(loadBookmarks);
  const [showPalette, setShowPalette] = useState(false);
  const [seconds, setSeconds] = useState<number>(() => (typeof stored._seconds === "number" ? stored._seconds : 100 * 60));
  const [confirmOpen, setConfirmOpen] = useState(false);

  const q = questions[idx] as QuizQuestion | undefined;
  const ans: Answer = q ? answers[q.id] ?? [] : [];
  const isGraded = q ? !!graded[q.id] : false;
  const g = isGraded && q ? gradeQuestion(q, ans) : null;
  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length;

  useEffect(() => {
    const all = loadAnswers();
    all[moduleId] = { ...answers, _idx: idx, _graded: graded, _seconds: seconds, _mode: mode };
    saveAnswers(all);
  }, [answers, idx, graded, seconds, mode, moduleId]);
  useEffect(() => saveBookmarks(bookmarks), [bookmarks]);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          finishExam(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finishExam(auto: boolean) {
    const all = loadAnswers();
    all[moduleId] = { ...answers, _idx: idx, _seconds: 0, _mode: mode, _submitted: true };
    saveAnswers(all);
    const total = questions.length;
    const score = questions.filter((qq) => gradeQuestion(qq, answers[qq.id] ?? []).correct).length;
    saveResult({ moduleId, score, total, pct: Math.round((score / total) * 100), at: new Date().toISOString() });
    sessionStorage.setItem("dp600_result_questions", JSON.stringify(questions));
    sessionStorage.setItem("dp600_result_module", moduleId);
    (auto ? sounds.wrong : sounds.submit)();
    setTimeout(() => nav(`/results/${moduleId}`), 300);
  }

  function setAnswer(a: Answer) {
    if (!q || isGraded) return;
    setAnswers((prev) => ({ ...prev, [q.id]: a }));
  }

  function checkQuestion() {
    if (!q || !ans.length || isGraded) return;
    const result = gradeQuestion(q, ans);
    setGraded((prev) => ({ ...prev, [q.id]: true }));
    addReviewed(q.id);
    if (result.correct) {
      sounds.correct();
    } else {
      sounds.wrong();
      addWrong({
        questionId: q.id,
        selectedAnswer: ans,
        correctAnswer: q.correctAnswers ?? [],
      });
    }
  }

  function retryQuestion() {
    if (!q) return;
    setAnswers((prev) => { const nx = { ...prev }; delete nx[q.id]; return nx; });
    setGraded((prev) => { const nx = { ...prev }; delete nx[q.id]; return nx; });
  }

  if (!q) return <div style={{ padding: "3rem", textAlign: "center" }}>لا توجد أسئلة…</div>;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const palette = questions.map((qq, i) => {
    const a = answers[qq.id] ?? [];
    const answered = a.length > 0;
    const gg = !!graded[qq.id];
    const isReview = wrongIds.has(qq.id);
    let bg = "var(--panel2)";
    let fg = "var(--mut)";
    if (i === idx) { bg = "#3b82f6"; fg = "#fff"; }
    else if (gg) { bg = gradeQuestion(qq, a).correct ? "var(--green)" : "var(--red)"; fg = "#fff"; }
    else if (answered) { bg = "var(--panel2)"; fg = "var(--txt)"; }
    return (
      <button
        key={qq.id} className="num-ltr" onClick={() => { setIdx(i); setShowPalette(false); }}
        style={{
          width: "2.3rem", height: "2.3rem", borderRadius: "0.55rem", fontWeight: 800, fontSize: "0.85rem",
          cursor: "pointer", border: `1.5px solid ${i === idx ? "#60a5fa" : "var(--line)"}`,
          background: bg, color: fg,
          boxShadow: isReview ? "0 0 0 2px var(--amber)" : undefined,
        }}
        title={`سؤال ${qq.number}${isReview ? " (خطأ - للمراجعة)" : ""}`}
      >
        {qq.number}
      </button>
    );
  });

  return (
    <div>
      <TopBar>
        {mode === "training" ? <Chip>🎯 وضع التدريب</Chip> : <Chip>⏱️ وضع المحاكاة</Chip>}
        <Chip cls={seconds <= 60 ? "timeout" : ""}>⏱ <span className="num-ltr">{mm}:{ss}</span></Chip>
        <Chip>✓ <span className="num-ltr">{answeredCount}/{questions.length}</span></Chip>
        <button className="chip" style={{ background: "rgba(255,255,255,0.18)", cursor: "pointer" }} onClick={() => (mode === "training" ? nav("/") : finishExam(false))}>
          ✕ {mode === "training" ? "خروج" : "إنهاء"}
        </button>
      </TopBar>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1rem 1rem 4rem", display: "grid", gap: "0.9rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "120px", height: "8px", borderRadius: 99, background: "var(--panel2)", overflow: "hidden", border: "1px solid var(--line)" }}>
            <div style={{ width: `${Math.max(2, (answeredCount / questions.length) * 100)}%`, height: "100%", background: "linear-gradient(90deg,var(--violet2),var(--teal))" }} />
          </div>
          <span className="num-ltr" style={{ fontSize: "0.82rem", color: "var(--mut)", fontWeight: 700 }}>{idx + 1} / {questions.length}</span>
          <button className="btn btn-ghost" style={{ padding: "0.4rem 0.8rem", fontSize: "0.82rem" }} onClick={() => setShowPalette((s) => !s)}>☰ الأسئلة</button>
        </div>

        {showPalette && (
          <div className="card">
            <div className="pal-grid" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>{palette}</div>
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", marginTop: "0.6rem", fontSize: "0.75rem", color: "var(--mut)", flexWrap: "wrap" }}>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "#3b82f6", borderRadius: 3, verticalAlign: "-1px" }} /> الحالي</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--green)", borderRadius: 3, verticalAlign: "-1px" }} /> صحيحة</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--red)", borderRadius: 3, verticalAlign: "-1px" }} /> خاطئة</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--panel2)", border: "1px solid var(--line)", borderRadius: 3, verticalAlign: "-1px" }} /> بدون إجابة</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", boxShadow: "0 0 0 2px var(--amber)", borderRadius: 3, verticalAlign: "-1px" }} /> خطأ للمراجعة</span>
            </div>
          </div>
        )}

        <div className="qwrap card" style={{ display: "grid", gap: "1rem", padding: "1.2rem" }}>
          <div style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", flexWrap: "wrap" }}>
            <span className="num-ltr" style={{ flex: "none", background: "linear-gradient(135deg,var(--violet),#6d28d9)", color: "#fff", fontWeight: 800, borderRadius: "0.7rem", padding: "0.3rem 0.75rem", fontSize: "0.95rem" }}>{q.number}</span>
            {q.category && <span style={{ fontSize: "0.75rem", color: "var(--teal)", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 99, padding: "0.2rem 0.6rem", fontWeight: 700 }}>{q.category}</span>}
            <button className="btn btn-ghost" style={{ marginInlineStart: "auto", padding: "0.35rem 0.7rem", fontSize: "0.85rem" }} onClick={() => { setBookmarks((bm) => ({ ...bm, [q.id]: !bm[q.id] })); }} title="أضف/أزل من المفضلة">
              {bookmarks[q.id] ? "★ مفضل" : "☆"}
            </button>
          </div>
          <h2 className="qtext" style={{ margin: 0, fontSize: "1.08rem", lineHeight: 1.8, fontWeight: 700 }}>{q.question}</h2>
          <QuestionRenderer q={q} answer={ans} onChange={setAnswer} submitted={isGraded} />
        </div>

        <div className="navbtns" style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn btn-ghost" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>→ السابق</button>

          {mode === "training" ? (
            !isGraded ? (
              <button className="btn btn-teal check-btn" style={{ flex: 1, minWidth: "160px", fontSize: "1rem" }} disabled={!ans.length} onClick={checkQuestion}>
                تحقق من الإجابة
              </button>
            ) : (
              <>
                {!g?.correct && (
                  <button className="btn btn-danger" onClick={retryQuestion}>إعادة المحاولة</button>
                )}
                <button className="btn btn-violet" style={{ flex: 1, minWidth: "140px" }} onClick={() => (idx < questions.length - 1 ? setIdx(idx + 1) : finishExam(false))}>
                  {idx < questions.length - 1 ? "السؤال التالي ←" : "عرض النتيجة"}
                </button>
              </>
            )
          ) : (
            <>
              {idx < questions.length - 1 ? (
                <button className="btn btn-violet" style={{ flex: 1 }} onClick={() => setIdx(idx + 1)}>التالي ←</button>
              ) : (
                <button className="btn btn-teal" style={{ flex: 1 }} onClick={() => setConfirmOpen(true)}>إنهاء الامتحان وتصحيح النتيجة</button>
              )}
            </>
          )}
        </div>
      </div>

      {confirmOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "grid", placeItems: "center", zIndex: 100, padding: "1rem" }} onClick={() => setConfirmOpen(false)}>
          <div className="card" style={{ maxWidth: "420px", width: "100%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>تأكيد التسليم</div>
            <p style={{ color: "var(--mut)", lineHeight: 1.7 }}>
              أجبت على <b className="num-ltr">{answeredCount}</b> من <b className="num-ltr">{questions.length}</b> سؤالاً.
              {answeredCount < questions.length && " سيتم اعتبار الأسئلة غير المُجابة خاطئة."}
            </p>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-ghost" onClick={() => setConfirmOpen(false)}>متابعة المراجعة</button>
              <button className="btn btn-teal" onClick={() => finishExam(false)}>تسليم وتصحيح</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
