
export type InterviewType = 'Frontend' | 'Backend' | 'HR';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ThemeType = 'nebula' | 'cryo' | 'inferno' | 'system';
export type ColorMode = 'light' | 'dark';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Question {
  id: string;
  text: string;
  category: InterviewType;
  difficulty: Difficulty;
  modelAnswer?: string;
}

export interface InterviewSession {
  type: InterviewType;
  difficulty: Difficulty;
  totalQuestions: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  skipped: string[];
  startTime: number;
  endTime?: number;
}

export interface HistoricalAttempt {
  id: string;
  date: string;
  type: InterviewType;
  difficulty: Difficulty;
  score: number;
  attempted: number;
  total: number;
}
