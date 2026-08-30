import type { Answer, QuizQuestion } from "@/types/quiz";

const sorted = (a: string[]) => [...a].sort();
const sameSet = (a: string[], b: string[]) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));

export function isSingleCorrect(selectedAnswer: string, correctAnswer: string): boolean {
  return selectedAnswer === correctAnswer;
}

export function isMultipleCorrect(selectedAnswers: string[], correctAnswers: string[]): boolean {
  return sameSet(selectedAnswers, correctAnswers);
}

export function isYesNoCorrect(
  selectedAnswers: Record<string, string>,
  correctAnswers: Record<string, string>
): boolean {
  const keys = Object.keys(correctAnswers);
  return keys.length > 0 && keys.every((k) => selectedAnswers[k] === correctAnswers[k]);
}

export function isHotspotCorrect(selectedHotspot: string, correctHotspot: string): boolean {
  return selectedHotspot === correctHotspot;
}

export function isDragDropCorrect(
  userMapping: Record<string, string>,
  correctMapping: Record<string, string>
): boolean {
  const zones = Object.keys(correctMapping);
  return zones.length > 0 && zones.every((z) => userMapping[z] === correctMapping[z]);
}

export function toRecord(a: Answer): Record<string, string> {
  const out: Record<string, string> = {};
  a.forEach((x) => {
    const i = x.indexOf(":");
    if (i > 0) out[x.slice(0, i)] = x.slice(i + 1);
  });
  return out;
}

export interface GradeDetail {
  id: string;
  ok: boolean;
  correct: string;
}

export function gradeQuestion(
  q: QuizQuestion,
  ans: Answer | undefined
): { correct: boolean; details: GradeDetail[] } {
  const a = ans ?? [];
  switch (q.type) {
    case "single": {
      const c = q.correctAnswers?.[0] ?? "";
      const pick = a[0] ?? "";
      return { correct: a.length > 0 && isSingleCorrect(pick, c), details: [{ id: pick, ok: pick === c, correct: c }] };
    }
    case "hotspot": {
      const c = q.correctAnswers?.[0] ?? "";
      const pick = a[0] ?? "";
      return { correct: a.length > 0 && isHotspotCorrect(pick, c), details: [{ id: pick, ok: pick === c, correct: c }] };
    }
    case "multiple": {
      const c = q.correctAnswers ?? [];
      return { correct: a.length > 0 && isMultipleCorrect(a, c), details: [] };
    }
    case "yesNo": {
      const sel = toRecord(a);
      const corr: Record<string, string> = {};
      (q.statements ?? []).forEach((s) => (corr[s.id] = s.correctAnswer));
      const details = (q.statements ?? []).map((st) => ({
        id: st.id,
        ok: sel[st.id] === st.correctAnswer,
        correct: st.correctAnswer,
      }));
      return { correct: isYesNoCorrect(sel, corr), details };
    }
    case "dragDrop": {
      const sel = toRecord(a);
      const details = (q.dropZones ?? []).map((z) => ({
        id: z.id,
        ok: sel[z.id] === q.dragCorrect?.[z.id],
        correct: q.dragCorrect?.[z.id] ?? "",
      }));
      return { correct: isDragDropCorrect(sel, q.dragCorrect ?? {}), details };
    }
    default:
      return { correct: false, details: [] };
  }
}

/** Human-readable correct answer text for review/feedback. */
export function correctAnswerText(q: QuizQuestion): string {
  switch (q.type) {
    case "single":
    case "multiple":
      return (q.correctAnswers ?? [])
        .map((id) => q.options?.find((o) => o.id === id)?.text ?? id)
        .join(" ، ");
    case "yesNo":
      return (q.statements ?? [])
        .map((s) => `${s.text} ← ${s.correctAnswer}`)
        .join(" — ");
    case "dragDrop":
      return (q.dropZones ?? [])
        .map((z) => {
          const want = q.dragCorrect?.[z.id];
          const txt = q.dragItems?.find((d) => d.id === want)?.text ?? want;
          return `${z.label}: ${txt}`;
        })
        .join(" — ");
    case "hotspot":
      return (q.hotspots ?? [])
        .filter((h) => q.correctAnswers?.includes(h.id))
        .map((h) => `منطقة ${h.id}`)
        .join(" ، ");
    default:
      return "—";
  }
}

/** Human-readable selected answer text. */
export function selectedAnswerText(q: QuizQuestion, a: Answer | undefined): string {
  const ans = a ?? [];
  if (!ans.length) return "—";
  switch (q.type) {
    case "single":
    case "multiple":
      return ans.map((id) => q.options?.find((o) => o.id === id)?.text ?? id).join(" ، ");
    case "yesNo":
      return (q.statements ?? [])
        .map((s) => {
          const rec = toRecord(ans);
          return `${s.text} ← ${rec[s.id] ?? "—"}`;
        })
        .join(" — ");
    case "dragDrop":
      return (q.dropZones ?? [])
        .map((z) => {
          const rec = toRecord(ans);
          const got = rec[z.id];
          const txt = q.dragItems?.find((d) => d.id === got)?.text ?? got ?? "—";
          return `${z.label}: ${txt}`;
        })
        .join(" — ");
    case "hotspot":
      return ans.map((id) => `منطقة ${id}`).join(" ، ");
    default:
      return ans.join(" ، ");
  }
}

export function scoreQuiz(questions: QuizQuestion[], answers: Record<string, Answer>): {
  score: number;
  total: number;
  correct: QuizQuestion[];
  wrong: { q: QuizQuestion; ans: Answer }[];
} {
  const correct: QuizQuestion[] = [];
  const wrong: { q: QuizQuestion; ans: Answer }[] = [];
  for (const q of questions) {
    const a = answers[q.id] ?? [];
    if (gradeQuestion(q, a).correct) correct.push(q);
    else wrong.push({ q, ans: a });
  }
  return { score: correct.length, total: questions.length, correct, wrong };
}
