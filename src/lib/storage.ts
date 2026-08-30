import type { StoredAnswers, StoredBookmarks } from "@/types/quiz";

const AKEY = "dp600_answers_v1";
const BKEY = "dp600_bookmarks_v1";
const CKEY = "dp600_config_v1";

export function loadAnswers(): StoredAnswers {
  try {
    return JSON.parse(localStorage.getItem(AKEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveAnswers(a: StoredAnswers) {
  try {
    localStorage.setItem(AKEY, JSON.stringify(a));
  } catch {
    /* quota */
  }
}

export function loadBookmarks(): StoredBookmarks {
  try {
    return JSON.parse(localStorage.getItem(BKEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveBookmarks(b: StoredBookmarks) {
  try {
    localStorage.setItem(BKEY, JSON.stringify(b));
  } catch {
    /* quota */
  }
}

export type QuizMode = "training" | "exam";

export interface AppConfig {
  sound: boolean;
  timerMinutes: number;
  mode: QuizMode;
}

export function loadConfig(): AppConfig {
  try {
    return { sound: true, timerMinutes: 100, mode: "training", ...JSON.parse(localStorage.getItem(CKEY) ?? "{}") };
  } catch {
    return { sound: true, timerMinutes: 100, mode: "training" };
  }
}

export function saveConfig(c: AppConfig) {
  try {
    localStorage.setItem(CKEY, JSON.stringify(c));
  } catch {
    /* quota */
  }
}
