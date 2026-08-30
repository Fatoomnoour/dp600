import type { Answer, QuizQuestion, YesNoStatement } from "@/types/quiz";
import { gradeQuestion } from "@/lib/grading";

interface Props {
  q: QuizQuestion;
  answer: Answer;
  onChange: (a: Answer) => void;
  submitted: boolean;
}

const LETTERS = ["أ", "ب", "ج", "د", "هـ", "و", "ز"];

export default function QuestionRenderer({ q, answer, onChange, submitted }: Props) {
  const g = submitted ? gradeQuestion(q, answer) : null;

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {(q.images?.length ?? 0) > 0 && (
        <details className="card" open>
          <summary style={{ fontWeight: 700, cursor: "pointer" }}>الملحق / مخطط السؤال ({q.images!.length} صفحة)</summary>
          <div style={{ display: "grid", gap: "0.7rem", marginTop: "0.7rem" }}>
            {q.images!.map((src, k) => (
              <img key={k} src={src} alt={`ملحق السؤال ${q.number}`} style={{ width: "100%", borderRadius: "0.7rem", border: "1px solid var(--line)" }} loading="lazy" />
            ))}
          </div>
        </details>
      )}

      {q.type === "single" && <Single q={q} answer={answer} onChange={onChange} submitted={submitted} />}
      {q.type === "multiple" && <Multiple q={q} answer={answer} onChange={onChange} submitted={submitted} />}
      {q.type === "yesNo" && <YesNo q={q} answer={answer} onChange={onChange} submitted={submitted} />}
      {q.type === "hotspot" && <Hotspot q={q} answer={answer} onChange={onChange} submitted={submitted} />}
      {q.type === "dragDrop" && <DragDrop q={q} answer={answer} onChange={onChange} submitted={submitted} />}

      {submitted && (
        <div className={`feedback ${g?.correct ? "correct" : "incorrect"}`}>
          <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.02rem" }}>
            {g?.correct ? "إجابة صحيحة ✓" : "إجابة خاطئة ✕"}
          </h3>
          {!g?.correct && <p style={{ margin: "0 0 0.3rem", fontWeight: 700 }}>الإجابة الصحيحة: {correctAnswerSummary(q)}</p>}
          <div className="explanation">
            <strong>لماذا؟</strong>
            <p style={{ margin: "0.25rem 0 0" }}>{q.explanation || "لا يتوفر شرح لهذا السؤال حالياً."}</p>
          </div>
          {q.reference && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
              <a href={q.reference} target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>المرجع: Microsoft Learn ↖</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function correctAnswerSummary(q: QuizQuestion): string {
  switch (q.type) {
    case "single":
    case "multiple": {
      const texts = (q.correctAnswers ?? [])
        .map((id) => q.options?.find((o) => o.id === id)?.text)
        .filter(Boolean);
      return texts.length ? texts.join(" ، ") : (q.correctAnswers ?? []).join(" ، ");
    }
    case "yesNo":
      return (q.statements ?? []).map((s) => `${s.text} ← ${s.correctAnswer}`).join(" — ");
    case "dragDrop":
      return (q.dropZones ?? []).map((z) => {
        const want = q.dragCorrect?.[z.id];
        const txt = q.dragItems?.find((d) => d.id === want)?.text ?? want;
        return `${z.label}: ${txt}`;
      }).join(" — ");
    case "hotspot":
      return (q.hotspots ?? [])
        .filter((h) => q.correctAnswers?.includes(h.id))
        .map((h) => `منطقة ${h.id}`)
        .join(" ، ") || (q.correctAnswers ?? []).join(" ، ");
    default:
      return (q.correctAnswers ?? []).join(" ، ");
  }
}

/* ---------------- single ---------------- */
function Single({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const correctSet = new Set(q.correctAnswers ?? []);
  return (
    <div style={{ display: "grid", gap: "0.6rem" }}>
      {(q.options ?? []).map((o, idx) => {
        const sel = answer.includes(o.id);
        let cls = "opt";
        if (sel) cls += " selected";
        if (submitted) {
          if (correctSet.has(o.id)) cls += " correct";
          else if (sel) cls += " wrong";
        }
        return (
          <button key={o.id} className={cls} disabled={submitted} onClick={() => { onChange([o.id]); play(!sel); }}>
            <span className="mark">{LETTERS[idx] ?? (idx + 1)}</span>
            <span style={{ flex: 1 }}>{o.text}</span>
            {submitted && correctSet.has(o.id) ? <span style={{ color: "var(--green)", fontWeight: 800 }}>✓</span>
              : submitted && sel ? <span style={{ color: "var(--red)", fontWeight: 800 }}>✗</span> : null}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- multiple ---------------- */
function Multiple({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const correctSet = new Set(q.correctAnswers ?? []);
  const toggle = (id: string) => onChange(answer.includes(id) ? answer.filter((x) => x !== id) : [...answer, id]);
  return (
    <div style={{ display: "grid", gap: "0.6rem" }}>
      {(q.options ?? []).map((o, idx) => {
        const sel = answer.includes(o.id);
        let cls = "opt";
        if (sel) cls += " selected";
        if (submitted) {
          if (correctSet.has(o.id) && sel) cls += " correct";
          else if (correctSet.has(o.id)) cls += " correct-miss";
          else if (sel) cls += " wrong";
        }
        let tag: string | null = null;
        if (submitted) {
          if (correctSet.has(o.id) && sel) tag = "✓ صحيح وتم اختياره";
          else if (correctSet.has(o.id) && !sel) tag = "! صحيح لكن لم تختره";
          else if (sel) tag = "✗ خاطئ وتم اختياره";
        }
        return (
          <div key={o.id} style={{ display: "grid", gap: "0.2rem" }}>
            <button className={cls} disabled={submitted} onClick={() => toggle(o.id)}>
              <span className="mark multi">{sel ? "☑" : "☐"}</span>
              <span style={{ flex: 1 }}>{o.text}</span>
            </button>
            {tag && <div className="opt-status">{tag}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- yes/no ---------------- */
function YesNo({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const isBool = (q.statements ?? []).some((s: YesNoStatement) => s.correctAnswer === "True" || s.correctAnswer === "False");
  const yesLabel = isBool ? "True" : "Yes";
  const noLabel = isBool ? "False" : "No";
  const valFor = (st: YesNoStatement) => {
    const entry = answer.find((x) => x.startsWith(st.id + ":"));
    return entry ? entry.split(":")[1] : "";
  };
  const setVal = (st: YesNoStatement, v: string) => {
    const rest = answer.filter((x) => !x.startsWith(st.id + ":"));
    onChange([...rest, `${st.id}:${v}`]);
  };
  return (
    <table className="statements">
      <thead>
        <tr>
          <th>العبارة</th>
          <th style={{ width: "4.5rem" }}>{yesLabel}</th>
          <th style={{ width: "4.5rem" }}>{noLabel}</th>
          {submitted && <th style={{ width: "2rem" }}>✓/✗</th>}
        </tr>
      </thead>
      <tbody>
        {(q.statements ?? []).map((st, i) => {
          const v = valFor(st);
          const ok = submitted && v === st.correctAnswer;
          const bad = submitted && v && v !== st.correctAnswer;
          return (
            <tr key={st.id}>
              <td style={{ textAlign: "right" }}>
                <span className="row-idx">{i + 1}.</span> {st.text}
              </td>
              <td>
                <button
                  className={`ybtn ${v === yesLabel ? (yesLabel === "Yes" || yesLabel === "True" ? "on-yes" : "on-no") : ""} ${submitted && st.correctAnswer === yesLabel ? "is-correct" : ""} ${bad && v === yesLabel ? "is-wrong" : ""}`}
                  disabled={submitted} onClick={() => setVal(st, yesLabel)}>{yesLabel}</button>
              </td>
              <td>
                <button
                  className={`ybtn ${v === noLabel ? (noLabel === "No" || noLabel === "False" ? "on-no" : "on-yes") : ""} ${submitted && st.correctAnswer === noLabel ? "is-correct" : ""} ${bad && v === noLabel ? "is-wrong" : ""}`}
                  disabled={submitted} onClick={() => setVal(st, noLabel)}>{noLabel}</button>
              </td>
              {submitted && (
                <td>{ok ? <span style={{ color: "var(--green)", fontWeight: 900 }}>✓</span> : <span style={{ color: "var(--red)", fontWeight: 900 }}>✗</span>}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------------- hotspot ---------------- */
function Hotspot({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const img = q.image ?? q.images?.[0];
  const correctSet = new Set(q.correctAnswers ?? []);
  const picked = answer[0];
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      {!img ? (
        <div className="card" style={{ color: "var(--mut)" }}>لا توجد صورة لهذا السؤال</div>
      ) : (
        <div className="hotspot-wrap">
          <img src={img} alt="منطقة النقر" />
          {(q.hotspots ?? []).map((z) => {
            let cls = "zone";
            if (picked === z.id && !submitted) cls += " picked";
            if (submitted && correctSet.has(z.id)) cls += " zone-correct";
            if (submitted && picked === z.id && !correctSet.has(z.id)) cls += " zone-wrong";
            return (
              <button
                key={z.id} className={cls} disabled={submitted}
                style={{ left: z.x + "%", top: z.y + "%", width: z.width + "%", height: z.height + "%" }}
                onClick={() => onChange([z.id])} title={`منطقة ${z.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- drag & drop ---------------- */
function DragDrop({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const placedAt = (zid: string) => (answer.find((x) => x.startsWith(zid + ":")) ?? "").split(":")[1] ?? "";
  const setZone = (zid: string, itemId: string) => {
    const rest = answer.filter((x) => !x.startsWith(zid + ":"));
    if (itemId) onChange([...rest, `${zid}:${itemId}`]);
    else onChange(rest);
  };
  const itemFor = (id: string) => q.dragItems?.find((d) => d.id === id);
  const zoneOf = (itemId: string) => (answer.find((x) => x.endsWith(":" + itemId)) ?? "").split(":")[0] ?? "";

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--mut)" }}>العناصر المتاحة (اضغط للاختيار ثم اضغط على الفراغ، أو اسحبها)</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {(q.dragItems ?? []).map((it) => {
            const used = !!zoneOf(it.id);
            return (
              <button
                key={it.id}
                className={`drag-item ${used ? "empty" : ""}`}
                disabled={used || submitted}
                draggable={!submitted}
                onDragStart={(e) => e.dataTransfer.setData("text/dd", it.id)}
                onClick={() => {
                  if (submitted || used) return;
                  const z = q.dropZones?.find((zz) => !placedAt(zz.id));
                  if (z) setZone(z.id, it.id);
                }}
              >
                {it.text}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid", gap: "0.6rem" }}>
        {(q.dropZones ?? []).map((z) => {
          const placed = placedAt(z.id);
          const item = itemFor(placed);
          const ok = submitted && placed === q.dragCorrect?.[z.id];
          const bad = submitted && placed && placed !== q.dragCorrect?.[z.id];
          let cls = "dd-zone";
          if (placed) cls += " filled";
          if (ok) cls += " dd-ok";
          if (bad) cls += " dd-bad";
          return (
            <div
              key={z.id} className={cls}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (submitted) return;
                const id = e.dataTransfer.getData("text/dd");
                if (id) setZone(z.id, id);
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--mut)" }}>{z.label}:</span>
              {item ? (
                <span className={`drag-item ${ok ? "ok" : bad ? "bad" : ""}`} onClick={() => !submitted && setZone(z.id, "")}>
                  {item.text} <span style={{ fontSize: "0.75rem" }}>{ok ? "✓" : bad ? "✗" : "✕"}</span>
                </span>
              ) : (
                <span style={{ color: "var(--mut)", fontSize: "0.85rem" }}>اضغط عنصراً ثم هذا الفراغ</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function play(wasSelected: boolean) {
  try {
    const A = window.AudioContext;
    const ctx = new A();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = wasSelected ? 500 : 700;
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.09);
  } catch {
    /* noop */
  }
}
