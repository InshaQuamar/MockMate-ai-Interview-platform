
import React, { createContext, useContext, useState, useEffect } from 'react';
import { InterviewSession, InterviewType, Difficulty, Question, HistoricalAttempt, User } from '../types';
import { QUESTION_BANK } from '../constants';

export type AppView = 'home' | 'setup' | 'resources' | 'question-bank';

interface InterviewContextType {
  session: InterviewSession | null;
  history: HistoricalAttempt[];
  currentView: AppView;
  user: User | null;
  startInterview: (type: InterviewType, difficulty: Difficulty, count: number) => void;
  nextQuestion: (answer?: string) => void;
  skipQuestion: () => void;
  endInterview: () => void;
  resetSession: () => void;
  setView: (view: AppView) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [history, setHistory] = useState<HistoricalAttempt[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('interview_history');
    if (storedHistory) setHistory(JSON.parse(storedHistory));
    
    const storedUser = localStorage.getItem('interview_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const saveToHistory = (newAttempt: HistoricalAttempt) => {
    const updated = [newAttempt, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('interview_history', JSON.stringify(updated));
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('interview_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('interview_user');
    setCurrentView('home');
  };

  const startInterview = (type: InterviewType, difficulty: Difficulty, count: number) => {
    const pool = QUESTION_BANK.filter(q => q.category === type && q.difficulty === difficulty);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
    
    setSession({
      type,
      difficulty,
      totalQuestions: shuffled.length,
      questions: shuffled,
      currentQuestionIndex: 0,
      answers: {},
      skipped: [],
      startTime: Date.now(),
    });
  };

  const nextQuestion = (answer?: string) => {
    if (!session) return;
    
    const currentQ = session.questions[session.currentQuestionIndex];
    const newAnswers = { ...session.answers };
    if (answer) newAnswers[currentQ.id] = answer;

    if (session.currentQuestionIndex + 1 < session.totalQuestions) {
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex + 1,
        answers: newAnswers
      });
    } else {
      finalizeInterview(newAnswers, session.skipped);
    }
  };

  const skipQuestion = () => {
    if (!session) return;
    const currentQ = session.questions[session.currentQuestionIndex];
    const newSkipped = [...session.skipped, currentQ.id];

    if (session.currentQuestionIndex + 1 < session.totalQuestions) {
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex + 1,
        skipped: newSkipped
      });
    } else {
      finalizeInterview(session.answers, newSkipped);
    }
  };

  const finalizeInterview = (answers: Record<string, string>, skipped: string[]) => {
    if (!session) return;
    const attemptedCount = Object.keys(answers).length;
    const score = (attemptedCount / session.totalQuestions) * 100;
    
    const attempt: HistoricalAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      type: session.type,
      difficulty: session.difficulty,
      score: Math.round(score),
      attempted: attemptedCount,
      total: session.totalQuestions
    };

    saveToHistory(attempt);
    setSession({
      ...session,
      answers,
      skipped,
      endTime: Date.now()
    });
  };

  const endInterview = () => {
    if (session) {
      finalizeInterview(session.answers, session.skipped);
    }
  };

  const resetSession = () => {
    setSession(null);
    setCurrentView('home');
  };

  const setView = (view: AppView) => {
    setCurrentView(view);
  };

  return (
    <InterviewContext.Provider value={{ 
      session, history, currentView, user,
      startInterview, nextQuestion, skipQuestion, endInterview, resetSession, setView, login, logout
    }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('useInterview must be used within InterviewProvider');
  return context;
};
