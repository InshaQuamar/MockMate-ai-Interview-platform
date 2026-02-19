
import React from 'react';
import { InterviewProvider, useInterview } from './frontend/state/InterviewContext';
import Navbar from './frontend/components/Navbar';
import Home from './frontend/pages/Home';
import Setup from './frontend/pages/Setup';
import Interview from './frontend/pages/Interview';
import Result from './frontend/pages/Result';
import Resources from './frontend/pages/Resources';
import QuestionBankPage from './frontend/pages/QuestionBankPage';

const AppContent: React.FC = () => {
  const { session, currentView, setView } = useInterview();

  if (session) {
    return session.endTime ? <Result /> : <Interview />;
  }

  switch (currentView) {
    case 'home': return <Home onStart={() => setView('setup')} />;
    case 'setup': return <Setup />;
    case 'resources': return <Resources />;
    case 'question-bank': return <QuestionBankPage />;
    default: return <Home onStart={() => setView('setup')} />;
  }
};

const CalmBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#F8FAFC] overflow-hidden">
      {/* Subtle depth patterns */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px] -mr-96 -mt-96"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] -ml-64 -mb-64"></div>
      
      {/* Refined subtle grid */}
      <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <InterviewProvider>
      <div className="min-h-screen text-slate-900 selection:bg-indigo-100">
        <CalmBackground />
        <Navbar />
        <main className="relative z-10">
          <AppContent />
        </main>
      </div>
    </InterviewProvider>
  );
};

export default App;
