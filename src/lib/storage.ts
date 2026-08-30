import type {
  Answer,
  StoredAnswers,
  StoredBookmarks,
  WrongReviewItem,
  StoredResults,
  CurrentPosition,
} from "@/types/quiz";

const AKEY = "dp600_answers";
const CKEY = "dp600_current_question";
const WKEY = "dp600_wrong_answers";
const RKEY = "dp600_reviewed_questions";
const MKEY = "dp600_mode";
const RESKEY = "dp600_results";
const BKEY = "dp600_bookmarks";
const CFKEY = "dp600_config_v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
}

/* ---------------- answers ---------------- */
export function loadAnswers(): StoredAnswers {
  return read<StoredAnswers>(AKEY, {});
}
export function saveAnswers(a: StoredAnswers) {
  write(AKEY, a);
}

/* ---------------- current position ---------------- */
export function loadCurrent(): CurrentPosition | null {
  return read<CurrentPosition | null>(CKEY, null);
}
export function saveCurrent(p: CurrentPosition) {
  write(CKEY, p);
}

/* ---------------- wrong answers review ---------------- */
export function loadWrong(): WrongReviewItem[] {
  return read<WrongReviewItem[]>(WKEY, []);
}

/** Add a wrong question idempotently: keep the FIRST attempt only. */
export function addWrong(item: Omit<WrongReviewItem, "createdAt"> & { createdAt?: string }) {
  const list = loadWrong();
  const exists = list.some((x) => x.questionId === item.questionId);
  if (!exists) {
    list.push({ ...item, createdAt: item.createdAt ?? new Date().toISOString() });
    write(WKEY, list);
  }
}

export function removeWrong(questionId: string) {
  write(
    WKEY,
    loadWrong().filter((x) => x.questionId !== questionId)
  );
}

export function clearWrong() {
  write(WKEY, []);
}

/* ---------------- reviewed ---------------- */
export function loadReviewed(): string[] {
  return read<string[]>(RKEY, []);
}
export function addReviewed(questionId: string) {
  const cur = loadReviewed();
  if (!cur.includes(questionId)) write(RKEY, [...cur, questionId]);
}

/* ---------------- mode ---------------- */
export type QuizMode = "training" | "exam";
export function loadMode(): QuizMode {
  return read<QuizMode>(MKEY, "training");
}
export function saveMode(m: QuizMode) {
  write(MKEY, m);
}

/* ---------------- results ---------------- */
export function loadResults(): StoredResults[] {
  return read<StoredResults[]>(RESKEY, []);
}
export function saveResult(r: StoredResults) {
  const cur = loadResults();
  write(RESKEY, [r, ...cur.filter((x) => x.moduleId !== r.moduleId)].slice(0, 10));
}

/* ---------------- bookmarks ---------------- */
export function loadBookmarks(): StoredBookmarks {
  return read<StoredBookmarks>(BKEY, {});
}
export function saveBookmarks(b: StoredBookmarks) {
  write(BKEY, b);
}

/* ---------------- config ---------------- */
export interface AppConfig {
  sound: boolean;
  timerMinutes: number;
  autoRemoveWrong: boolean;
}
export function loadConfig(): AppConfig {
  return { sound: true, timerMinutes: 100, autoRemoveWrong: false, ...read<Partial<AppConfig>>(CFKEY, {}) };
}
export function saveConfig(c: AppConfig) {
  write(CFKEY, c);
}

/* ---------------- helpers for review text ---------------- */
export function answerLabel(ids: string[] | undefined, qTextById: (id: string) => string | undefined): string {
  return (ids ?? []).map((id) => qTextById(id) ?? id).join(" ، ") || "—";
}
