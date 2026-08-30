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
      {/* Exhibit images */}
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

      {submitted && q.explanation && (
        <div className="card" style={{ borderColor: g?.correct ? "var(--green)" : "var(--red)", background: g?.correct ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)" }}>
          <div style={{ fontWeight: 800, marginBottom: "0.3rem", color: g?.correct ? "var(--green)" : "var(--red)" }}>
            {g?.correct ? "✓ إجابة صحيحة" : "✗ إجابة خاطئة"}
          </div>
          <div style={{ color: "var(--txt)", lineHeight: 1.7 }}>{q.explanation}</div>
          {q.reference && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
              <a href={q.reference} target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
                المرجع: Microsoft Learn ↖
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
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
          <button key={o.id} className={cls} onClick={() => !submitted && (onChange([o.id]), play(sel))}>
            <span className="mark">{LETTERS[idx] ?? idx + 1}</span>
            <span style={{ flex: 1 }}>{o.text}</span>
            {submitted && correctSet.has(o.id) ? <span style={{ color: "var(--green)", fontWeight: 800 }}>✓</span> : submitted && sel ? <span style={{ color: "var(--red)", fontWeight: 800 }}>✗</span> : null}
          </button>
        );
      })}
      
    </div>
  );
}

/* ---------------- multiple ---------------- */
function Multiple({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const correctSet = new Set(q.correctAnswers ?? []);
  const toggle = (id: string) => {
    onChange(answer.includes(id) ? answer.filter((x) => x !== id) : [...answer, id]);
  };
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
          <button key={o.id} className={cls} onClick={() => !submitted && (toggle(o.id), play(sel))}>
            <span className="mark multi">{sel ? "☑" : "☐"}</span>
            <span style={{ flex: 1 }}>{o.text}</span>
            {submitted && correctSet.has(o.id) ? <span style={{ color: "var(--green)", fontWeight: 800 }}>✓</span> : submitted && sel ? <span style={{ color: "var(--red)", fontWeight: 800 }}>✗</span> : null}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- yes/no statements ---------------- */
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
        </tr>
      </thead>
      <tbody>
        {(q.statements ?? []).map((st, i) => {
          const v = valFor(st);
          const ok = submitted && v === st.correctAnswer;
          const bad = submitted && v !== st.correctAnswer;
          return (
            <tr key={st.id}>
              <td style={{ textAlign: "right" }}>
                <span className="row-idx">{i + 1}.</span> {st.text}
              </td>
              <td className={ok && v === yesLabel ? "ok" : ""}>
                <button className={`ybtn ${v === yesLabel ? (yesLabel === "Yes" || yesLabel === "True" ? "on-yes" : "on-no") : ""}`} disabled={submitted} onClick={() => setVal(st, yesLabel)}>
                  {yesLabel}
                </button>
              </td>
              <td className={ok && v === noLabel ? "ok" : ""}>
                <button className={`ybtn ${v === noLabel ? (noLabel === "No" || noLabel === "False" ? "on-no" : "on-yes") : ""}`} disabled={submitted} onClick={() => setVal(st, noLabel)}>
                  {noLabel}
                </button>
              </td>
              {submitted && (ok || bad) ? (
                <td style={{ width: "2rem" }}>{ok ? <span style={{ color: "var(--green)" }}>✓</span> : <span style={{ color: "var(--red)" }}>✗</span>}</td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------------- hotspot (image regions, %-based) ---------------- */
function Hotspot({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const img = q.image ?? q.images?.[0];
  const correctSet = new Set(q.correctAnswers ?? []);
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      {!img ? (
        <div className="card" style={{ color: "var(--mut)" }}>لا توجد صورة لهذا السؤال</div>
      ) : (
        <div className="hotspot-wrap">
          <img src={img} alt="منطقة النقر" />
          {(q.hotspots ?? []).map((z) => {
            const picked = answer.includes(z.id);
            let cls = "zone";
            if (picked) cls += " picked";
            return (
              <button
                key={z.id}
                className={cls}
                disabled={submitted && !correctSet.has(z.id)}
                style={{ left: z.x + "%", top: z.y + "%", width: z.width + "%", height: z.height + "%" }}
                onClick={() => !submitted && onChange([z.id])}
                title={`منطقة ${z.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- drag & drop with click-to-place fallback ---------------- */
function DragDrop({ q, answer, onChange, submitted }: { q: QuizQuestion; answer: Answer; onChange: (a: Answer) => void; submitted: boolean }) {
  const placedAt = (zid: string) => (answer.find((x) => x.startsWith(zid + ":")) ?? "").split(":")[1] ?? "";
  const setZone = (zid: string, itemId: string) => {
    const rest = answer.filter((x) => !x.startsWith(zid + ":"));
    onChange([...rest, `${zid}:${itemId}`]);
  };
  const itemFor = (id: string) => q.dragItems?.find((d) => d.id === id);
  const zoneOf = (itemId: string) => (answer.find((x) => x.endsWith(":" + itemId)) ?? "").split(":")[0] ?? "";

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {/* items pool */}
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--mut)" }}>العناصر المتاحة (اضغط للاختيار ثم اضغط على الفراغ، أو اسحبها)</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {(q.dragItems ?? []).map((it) => {
            const used = !!zoneOf(it.id);
            return (
              <button
                key={it.id}
                className={`drag-item ${used ? "empty" : submitted ? (q.dragItems && Object.values(q.dragCorrect ?? {}).includes(it.id) ? "ok" : "") : ""}`}
                disabled={used && !submitted}
                draggable={!submitted}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/dd", it.id);
                }}
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
      {/* zones */}
      <div style={{ display: "grid", gap: "0.6rem" }}>
        {(q.dropZones ?? []).map((z) => {
          const placed = placedAt(z.id);
          const item = itemFor(placed);
          let cls = "dd-zone";
          if (placed) cls += " filled";
          const ok = submitted && placed === q.dragCorrect?.[z.id];
          const bad = submitted && placed !== q.dragCorrect?.[z.id];
          return (
            <div key={z.id} className={cls}
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

/* tiny sound hook (feedback) */
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
