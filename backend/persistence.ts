
import { HistoricalAttempt, User } from '../shared/types';

const STORAGE_KEYS = {
  HISTORY: 'interview_history',
  USER: 'interview_user'
};

export const saveUserSession = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export const loadUserSession = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const saveHistory = (history: HistoricalAttempt[]) => {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const loadHistory = (): HistoricalAttempt[] => {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
};
