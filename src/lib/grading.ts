import type { Answer, QuizQuestion } from "@/types/quiz";

/** Exact-match grading per question type */
export function gradeQuestion(q: QuizQuestion, ans: Answer | undefined): {
  correct: boolean;
  details: { id: string; ok: boolean; correct: string }[];
} {
  const a = ans ?? [];
  if (!a.length) return { correct: false, details: [] };

  switch (q.type) {
    case "single":
    case "hotspot": {
      const correct = q.correctAnswers?.[0];
      const pick = a[0];
      return {
        correct: pick === correct,
        details: [{ id: pick, ok: pick === correct, correct: correct ?? "" }],
      };
    }
    case "multiple": {
      const correct = [...(q.correctAnswers ?? [])].sort().join("|");
      const pick = [...a].sort().join("|");
      return { correct: pick === correct, details: [] };
    }
    case "yesNo": {
      const stats = (q.statements ?? []).map((st) => {
        const ok = (a.find((x) => x.startsWith(st.id + ":")) ?? "")
          .split(":")[1] === st.correctAnswer;
        return { id: st.id, ok, correct: st.correctAnswer };
      });
      return { correct: stats.every((d) => d.ok), details: stats };
    }
    case "dragDrop": {
      let allOk = true;
      const details: { id: string; ok: boolean; correct: string }[] = [];
      for (const z of q.dropZones ?? []) {
        const entry = a.find((x) => x.startsWith(z.id + ":")) ?? "";
        const placedItem = entry.split(":")[1] ?? "";
        const want = q.dragCorrect?.[z.id] ?? "";
        const ok = placedItem === want;
        if (!ok) allOk = false;
        details.push({ id: z.id, ok, correct: want });
      }
      return { correct: allOk && details.length > 0, details };
    }
    default:
      return { correct: false, details: [] };
  }
}

/** Score an ordered list of questions with answers */
export function scoreQuiz(questions: QuizQuestion[], answers: Record<string, Answer>): {
  score: number;
  total: number;
  correct: QuizQuestion[];
  wrong: { q: QuizQuestion; ans: Answer }[];
} {
  const correct: QuizQuestion[] = [];
  const wrong: { q: QuizQuestion; ans: Answer }[] = [];
  for (const q of questions) {
    if (gradeQuestion(q, answers[q.id]).correct) correct.push(q);
    else wrong.push({ q, ans: answers[q.id] ?? [] });
  }
  return { score: correct.length, total: questions.length, correct, wrong };
}
