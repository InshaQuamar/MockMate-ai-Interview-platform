
import { Question } from './types';

// Hardcoded question bank with model answers - standard project approach
export const QUESTION_BANK: Question[] = [
  // Frontend
  { 
    id: 'fe-e-1', 
    category: 'Frontend', 
    difficulty: 'Easy', 
    text: 'What is React and why is it used?',
    modelAnswer: 'React is a JavaScript library for building user interfaces. It is used because of its component-based architecture, virtual DOM for performance, and declarative UI approach.'
  },
  { 
    id: 'fe-e-2', 
    category: 'Frontend', 
    difficulty: 'Easy', 
    text: 'Explain the difference between let, const, and var.',
    modelAnswer: 'var is function-scoped and hoisted. let and const are block-scoped. const is used for variables that won\'t be reassigned, while let is for variables that will change.'
  },
  { 
    id: 'fe-m-1', 
    category: 'Frontend', 
    difficulty: 'Medium', 
    text: 'Explain the useEffect hook and its dependency array.',
    modelAnswer: 'useEffect is used for side effects in functional components. The dependency array controls when it runs: empty runs once, specific values run when those change, and no array runs on every render.'
  },
  { 
    id: 'fe-m-2', 
    category: 'Frontend', 
    difficulty: 'Medium', 
    text: 'What is prop drilling and how can you avoid it?',
    modelAnswer: 'Prop drilling is passing data through many layers of components. It can be avoided using React Context API, Redux, or other state management libraries.'
  },
  { 
    id: 'fe-h-1', 
    category: 'Frontend', 
    difficulty: 'Hard', 
    text: 'How does the reconciliation algorithm work in React?',
    modelAnswer: 'Reconciliation is how React updates the DOM. It uses a "diffing" algorithm to compare the new virtual DOM with the previous one and applies only the minimum necessary changes to the real DOM.'
  },
  
  // Backend
  { 
    id: 'be-e-1', 
    category: 'Backend', 
    difficulty: 'Easy', 
    text: 'What is a REST API?',
    modelAnswer: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods like GET, POST, PUT, and DELETE to manage resources.'
  },
  { 
    id: 'be-m-1', 
    category: 'Backend', 
    difficulty: 'Medium', 
    text: 'Explain what middleware is in the context of Express.js.',
    modelAnswer: 'Middleware functions are functions that have access to the request and response objects. They can execute code, modify request/response, or end the request-response cycle.'
  },
  { 
    id: 'be-h-1', 
    category: 'Backend', 
    difficulty: 'Hard', 
    text: 'How does JWT authentication work and what are its security implications?',
    modelAnswer: 'JWT (JSON Web Token) is a compact, URL-safe means of representing claims. It consists of a header, payload, and signature. Security risks include token theft and lack of built-in invalidation.'
  },

  // HR
  { 
    id: 'hr-e-1', 
    category: 'HR', 
    difficulty: 'Easy', 
    text: 'Tell me about yourself.',
    modelAnswer: 'Focus on your academic background, key technical projects, and career aspirations. Connect your skills to the specific job requirements and show enthusiasm.'
  },
  { 
    id: 'hr-m-1', 
    category: 'HR', 
    difficulty: 'Medium', 
    text: 'Why should we hire you over other candidates?',
    modelAnswer: 'Highlight your unique combination of technical skills, problem-solving mindset, and ability to learn quickly. Mention specific project achievements that demonstrate your value.'
  },
  { 
    id: 'hr-h-1', 
    category: 'HR', 
    difficulty: 'Hard', 
    text: 'Describe a challenging situation you faced and how you overcame it.',
    modelAnswer: 'Use the STAR (Situation, Task, Action, Result) method. Focus on the logical steps you took to solve the problem and what you learned from the experience.'
  },
];
