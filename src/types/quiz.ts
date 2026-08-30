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

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  minutes: number;
  questionNumbers: number[];
}

/* Module store: questionId -> Answer, plus reserved meta keys */
export type ModuleStore = Record<string, unknown> & { [k: string]: any };
export interface StoredAnswers { [moduleId: string]: ModuleStore; }
export interface StoredBookmarks { [questionId: string]: boolean; }
