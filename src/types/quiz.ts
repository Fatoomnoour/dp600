export type QuestionType = "single" | "multiple" | "yesNo" | "hotspot" | "dragDrop";

export interface QuestionOption { id: string; text: string; image?: string; }
export interface YesNoStatement { id: string; text: string; correctAnswer: string; }
export interface HotspotRegion { id: string; x: number; y: number; width: number; height: number; }
export interface DragItem { id: string; text: string; image?: string; }
export interface DropZone { id: string; label: string; }

export interface QuizQuestion {
  id: string;
  number: number;
  type: QuestionType;
  question: string;
  image?: string;
  images?: string[];
  sourcePages?: number[];
  fullImages?: string[];
  answerImage?: string;
  options?: QuestionOption[];
  correctAnswers?: string[];
  explanation?: string;
  reference?: string;
  category?: string;
  statements?: YesNoStatement[];
  hotspots?: HotspotRegion[];
  dragItems?: DragItem[];
  dropZones?: DropZone[];
  dragCorrect?: Record<string, string>;
}

export type Answer = string[];

export interface WrongReviewItem {
  questionId: string;
  questionNumber?: number;
  sourcePages?: number[];
  type?: string;
  selectedAnswer: Answer;
  correctAnswer: Answer;
  questionImages?: string[];
  explanation?: string;
  createdAt: string;
}

export interface StoredResults {
  moduleId: string;
  score: number;
  total: number;
  pct: number;
  at: string;
}

export interface CurrentPosition {
  moduleId: string;
  idx: number;
}

export interface ModuleStore {
  [key: string]: any;
}
export interface StoredAnswers {
  [moduleId: string]: ModuleStore;
}

export interface StoredBookmarks {
  [questionId: string]: boolean;
}

export type AnswerMap = Record<string, Answer>;
