
import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen pt-24 md:pt-44 pb-12 flex flex-col items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center space-y-6 md:space-y-10 relative">
        
        {/* Hero Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Project Platform v1.0
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-extrabold leading-tight tracking-tight text-slate-900">
            Secure Your Future with <br />
            <span className="text-indigo-gradient">Professional Simulations.</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Practice technical and behavioral interviews with structured feedback. 
            Build confidence, refine your responses, and land your target role.
          </p>
        </div>

        {/* Action Center */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 md:px-0">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base md:text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-xl shadow-blue-200 active:scale-95"
          >
            Start Practice Session
          </button>
          
          <button className="w-full sm:w-auto px-10 py-4 md:py-5 bg-white text-slate-700 hover:bg-slate-50 font-bold text-base md:text-lg rounded-2xl transition-all border border-slate-200 shadow-sm">
            Study Resources
          </button>
        </div>

        {/* Educational markers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-12 md:pt-24">
          <TrustCard 
            title="Curated Modules" 
            desc="Structured interview tracks designed for modern software roles." 
            icon="🎓"
          />
          <TrustCard 
            title="Detailed Reports" 
            desc="Automated analysis to help you improve your delivery and logic." 
            icon="📈"
          />
          <TrustCard 
            title="Placement Ready" 
            desc="Prepare based on industry success standards for freshers." 
            icon="🌍"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 md:mt-40 py-8 md:py-12 border-t border-slate-200 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">IQ</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 tracking-tight">Design and Build by Insha Quamar</span>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight">MockMate Platform • 2026</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[11px] md:text-xs font-semibold text-slate-500">
          <a href="#" className="hover:text-indigo-600 transition-colors">Placement Guide</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Usage Policy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">v1.0</a>
        </div>
      </footer>
    </div>
  );
};

const TrustCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="soft-card p-6 md:p-8 text-left transition-all hover:border-indigo-600 group">
    <div className="text-3xl md:text-4xl mb-4 md:mb-6 bg-slate-50 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl group-hover:bg-indigo-50 transition-colors">{icon}</div>
    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Home;
