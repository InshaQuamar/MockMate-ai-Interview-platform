
import { Question } from './types';

export const QUESTION_BANK: Question[] = [
  // Frontend Easy
  { id: 'fe-e-1', category: 'Frontend', difficulty: 'Easy', text: 'What is React and why is it used?' },
  { id: 'fe-e-2', category: 'Frontend', difficulty: 'Easy', text: 'Explain the difference between let, const, and var.' },
  { id: 'fe-e-3', category: 'Frontend', difficulty: 'Easy', text: 'What are React components?' },
  { id: 'fe-e-4', category: 'Frontend', difficulty: 'Easy', text: 'What is the Virtual DOM?' },
  { id: 'fe-e-5', category: 'Frontend', difficulty: 'Easy', text: 'How do you handle basic styling in React?' },
  
  // Frontend Medium
  { id: 'fe-m-1', category: 'Frontend', difficulty: 'Medium', text: 'Explain the useEffect hook and its dependency array.' },
  { id: 'fe-m-2', category: 'Frontend', difficulty: 'Medium', text: 'What is prop drilling and how can you avoid it?' },
  { id: 'fe-m-3', category: 'Frontend', difficulty: 'Medium', text: 'Explain the difference between controlled and uncontrolled components.' },
  { id: 'fe-m-4', category: 'Frontend', difficulty: 'Medium', text: 'What is the purpose of React.memo?' },
  { id: 'fe-m-5', category: 'Frontend', difficulty: 'Medium', text: 'How do you handle forms in React?' },

  // Frontend Hard
  { id: 'fe-h-1', category: 'Frontend', difficulty: 'Hard', text: 'How does the reconciliation algorithm work in React?' },
  { id: 'fe-h-2', category: 'Frontend', difficulty: 'Hard', text: 'Explain the concept of HOC (Higher-Order Components) vs Hooks.' },
  { id: 'fe-h-3', category: 'Frontend', difficulty: 'Hard', text: 'What are React Portals and when would you use them?' },
  { id: 'fe-h-4', category: 'Frontend', difficulty: 'Hard', text: 'Describe the Fiber architecture in React.' },
  { id: 'fe-h-5', category: 'Frontend', difficulty: 'Hard', text: 'How would you optimize a large-scale React application performance?' },

  // Backend Easy
  { id: 'be-e-1', category: 'Backend', difficulty: 'Easy', text: 'What is a REST API?' },
  { id: 'be-e-2', category: 'Backend', difficulty: 'Easy', text: 'Explain the difference between SQL and NoSQL databases.' },
  { id: 'be-e-3', category: 'Backend', difficulty: 'Easy', text: 'What is HTTP and its common methods (GET, POST, etc.)?' },
  { id: 'be-e-4', category: 'Backend', difficulty: 'Easy', text: 'What is Node.js?' },
  { id: 'be-e-5', category: 'Backend', difficulty: 'Easy', text: 'What is the purpose of environment variables?' },

  // Backend Medium
  { id: 'be-m-1', category: 'Backend', difficulty: 'Medium', text: 'Explain what middleware is in the context of Express.js.' },
  { id: 'be-m-2', category: 'Backend', difficulty: 'Medium', text: 'How do you handle error management in an asynchronous backend?' },
  { id: 'be-m-3', category: 'Backend', difficulty: 'Medium', text: 'What is indexing in a database and why is it used?' },
  { id: 'be-m-4', category: 'Backend', difficulty: 'Medium', text: 'Explain the difference between Authentication and Authorization.' },
  { id: 'be-m-5', category: 'Backend', difficulty: 'Medium', text: 'What are WebSockets and how do they differ from HTTP?' },

  // Backend Hard
  { id: 'be-h-1', category: 'Backend', difficulty: 'Hard', text: 'How does JWT authentication work and what are its security implications?' },
  { id: 'be-h-2', category: 'Backend', difficulty: 'Hard', text: 'Describe a Microservices architecture vs Monolith.' },
  { id: 'be-h-3', category: 'Backend', difficulty: 'Hard', text: 'Explain the CAP theorem.' },
  { id: 'be-h-4', category: 'Backend', difficulty: 'Hard', text: 'How do you handle database transactions and ACID properties?' },
  { id: 'be-h-5', category: 'Backend', difficulty: 'Hard', text: 'What is horizontal vs vertical scaling?' },

  // HR Easy
  { id: 'hr-e-1', category: 'HR', difficulty: 'Easy', text: 'Tell me about yourself.' },
  { id: 'hr-e-2', category: 'HR', difficulty: 'Easy', text: 'What are your strengths and weaknesses?' },
  { id: 'hr-e-3', category: 'HR', difficulty: 'Easy', text: 'Why do you want to work for our company?' },
  { id: 'hr-e-4', category: 'HR', difficulty: 'Easy', text: 'Where do you see yourself in 5 years?' },
  { id: 'hr-e-5', category: 'HR', difficulty: 'Easy', text: 'How do you handle stress?' },

  // HR Medium
  { id: 'hr-m-1', category: 'HR', difficulty: 'Medium', text: 'Why should we hire you over other candidates?' },
  { id: 'hr-m-2', category: 'HR', difficulty: 'Medium', text: 'Describe a time you failed and how you handled it.' },
  { id: 'hr-m-3', category: 'HR', difficulty: 'Medium', text: 'How do you prioritize your tasks when you have multiple deadlines?' },
  { id: 'hr-m-4', category: 'HR', difficulty: 'Medium', text: 'What is your preferred work style: independent or collaborative?' },
  { id: 'hr-m-5', category: 'HR', difficulty: 'Medium', text: 'Tell me about a time you had a conflict with a team member.' },

  // HR Hard
  { id: 'hr-h-1', category: 'HR', difficulty: 'Hard', text: 'Describe a challenging situation you faced at work/college and how you overcame it.' },
  { id: 'hr-h-2', category: 'HR', difficulty: 'Hard', text: 'How would you handle a situation where your manager gives you a task you disagree with?' },
  { id: 'hr-h-3', category: 'HR', difficulty: 'Hard', text: 'Give an example of a time you showed leadership skills.' },
  { id: 'hr-h-4', category: 'HR', difficulty: 'Hard', text: 'What would you do if you realized a project was going to miss its deadline?' },
  { id: 'hr-h-5', category: 'HR', difficulty: 'Hard', text: 'Describe a complex problem you solved recently.' },
];
