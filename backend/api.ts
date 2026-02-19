
import { QUESTION_BANK } from '../shared/constants';

/**
 * Service: Reference Answer Provider
 * This module retrieves standardized solutions for project verification.
 */
export const fetchExpertSolution = async (
  questionText: string,
  category: string,
  difficulty: string
): Promise<string> => {
  // Simulate network latency for database fetch
  await new Promise(resolve => setTimeout(resolve, 800));

  // Search local question repository
  const question = QUESTION_BANK.find(q => q.text === questionText);
  
  if (question && question.modelAnswer) {
    return question.modelAnswer;
  }

  return "Standardized reference for this question is currently being populated in the system data store.";
};

/**
 * Service: Performance Report Calculation
 * Logic-based feedback generation based on completion metrics.
 */
export const generatePerformanceFeedback = async (
  attempted: number, 
  total: number, 
  category: string
): Promise<string> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  const score = (attempted / total) * 100;

  // Grade-based conditional logic
  if (score >= 90) {
    return `Excellent completion rate for the ${category} track. You demonstrate readiness for advanced placement assessments.`;
  } else if (score >= 70) {
    return `Satisfactory performance in ${category}. Consistent practice of the missed modules will help reach maximum proficiency.`;
  } else if (score >= 40) {
    return `Baseline achievement. Further study of ${category} fundamentals is recommended before attempting higher difficulty sessions.`;
  } else {
    return `Learning phase. It is suggested to focus on the study resources and revisit this module after foundational review.`;
  }
};
