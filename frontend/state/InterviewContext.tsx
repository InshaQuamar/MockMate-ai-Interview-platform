
import React, { createContext, useContext, useState, useEffect } from 'react';
import { InterviewSession, InterviewType, Difficulty, Question, HistoricalAttempt, User, ThemeType } from '../../shared/types';
import { QUESTION_BANK } from '../../shared/constants';
import * as Persistence from '../../backend/persistence';

export type AppView = 'home' | 'setup' | 'resources' | 'question-bank';

interface InterviewContextType {
  session: InterviewSession | null;
  history: HistoricalAttempt[];
  currentView: AppView;
  user: User | null;
  theme: ThemeType;
  themeColor: string; 
  startInterview: (type: InterviewType, difficulty: Difficulty, count: number) => void;
  nextQuestion: (answer?: string) => void;
  skipQuestion: () => void;
  endInterview: () => void;
  resetSession: () => void;
  setView: (view: AppView) => void;
  login: (userData: User) => void;
  logout: () => void;
  setTheme: (theme: ThemeType) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [history, setHistory] = useState<HistoricalAttempt[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [user, setUser] = useState<User | null>(null);
  const [theme, setThemeState] = useState<ThemeType>('nebula');

  useEffect(() => {
    setHistory(Persistence.loadHistory());
    setUser(Persistence.loadUserSession());
    
    const savedTheme = localStorage.getItem('app_theme') as ThemeType;
    if (savedTheme && ['nebula', 'cryo', 'inferno', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('app_theme', newTheme);
  };

  const themeColorMap: Record<ThemeType, string> = {
    nebula: 'violet',
    cryo: 'sky',
    inferno: 'amber',
    system: 'lime',
  };

  const themeColor = themeColorMap[theme];

  const login = (userData: User) => {
    setUser(userData);
    Persistence.saveUserSession(userData);
  };

  const logout = () => {
    setUser(null);
    Persistence.saveUserSession(null);
    setCurrentView('home');
  };

  const startInterview = (type: InterviewType, difficulty: Difficulty, count: number) => {
    const pool = QUESTION_BANK.filter(q => q.category === type && q.difficulty === difficulty);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
    
    setSession({
      type, difficulty, totalQuestions: shuffled.length, questions: shuffled,
      currentQuestionIndex: 0, answers: {}, skipped: [], startTime: Date.now()
    });
  };

  const finalizeInterview = (answers: Record<string, string>, skipped: string[]) => {
    if (!session) return;
    const attemptedCount = Object.keys(answers).length;
    const score = Math.round((attemptedCount / session.totalQuestions) * 100);
    
    const attempt: HistoricalAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      type: session.type, difficulty: session.difficulty,
      score, attempted: attemptedCount, total: session.totalQuestions
    };

    const updatedHistory = [attempt, ...history].slice(0, 10);
    setHistory(updatedHistory);
    Persistence.saveHistory(updatedHistory);

    setSession({ ...session, answers, skipped, endTime: Date.now() });
  };

  const nextQuestion = (answer?: string) => {
    if (!session) return;
    const newAnswers = { ...session.answers };
    if (answer) newAnswers[session.questions[session.currentQuestionIndex].id] = answer;

    if (session.currentQuestionIndex + 1 < session.totalQuestions) {
      setSession({ ...session, currentQuestionIndex: session.currentQuestionIndex + 1, answers: newAnswers });
    } else {
      finalizeInterview(newAnswers, session.skipped);
    }
  };

  const skipQuestion = () => {
    if (!session) return;
    const newSkipped = [...session.skipped, session.questions[session.currentQuestionIndex].id];
    if (session.currentQuestionIndex + 1 < session.totalQuestions) {
      setSession({ ...session, currentQuestionIndex: session.currentQuestionIndex + 1, skipped: newSkipped });
    } else {
      finalizeInterview(session.answers, newSkipped);
    }
  };

  const resetSession = () => { setSession(null); setCurrentView('home'); };
  const setView = (view: AppView) => setCurrentView(view);
  const endInterview = () => session && finalizeInterview(session.answers, session.skipped);

  return (
    <InterviewContext.Provider value={{ 
      session, history, currentView, user, theme, themeColor,
      startInterview, nextQuestion, skipQuestion, endInterview, resetSession, setView, login, logout, setTheme
    }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('Context error');
  return context;
};
