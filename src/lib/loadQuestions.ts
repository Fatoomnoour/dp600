import { QUESTIONS } from "@/data/questions";
import type { QuizQuestion } from "@/types/quiz";

export function allQuestions(): QuizQuestion[] {
  return QUESTIONS;
}

export function questionByNumber(n: number): QuizQuestion | undefined {
  return QUESTIONS.find((q) => q.number === n);
}

/** Build a shuffled random sub-quiz */
export function randomSubset(count: number): QuizQuestion[] {
  const arr = [...QUESTIONS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}

export function orderQuestions(numbers: number[]): QuizQuestion[] {
  return numbers
    .map((n) => questionByNumber(n))
    .filter((q): q is QuizQuestion => Boolean(q));
}
