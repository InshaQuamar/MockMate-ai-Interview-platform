
import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Placement Ready Engineering
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          Master Your Interviews <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            With Expert Insight.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Simulated Frontend, Backend, and HR environments designed by industry veterans. 
          Analyze your performance with our proprietary feedback engine and crack your dream role.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
          >
            Start Practice Session
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all">
            Browse Vault
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          <FeatureCard 
            title="Professional Simulation" 
            desc="Engineered sessions that replicate high-pressure placement environments." 
            icon="⏱️"
          />
          <FeatureCard 
            title="Expert Response Engine" 
            desc="Review curated solution guides modeled after top tech company standards." 
            icon="🏢"
          />
          <FeatureCard 
            title="Strategic Analytics" 
            desc="Deep-dive into your attempt patterns with custom performance charts." 
            icon="📊"
          />
        </div>
      </div>

      <footer className="mt-20 py-8 border-t border-white/5 w-full max-w-4xl text-center">
        <p className="text-gray-500 text-sm font-medium">
          Designed and Developed with ❤️ by <span className="text-blue-500 font-bold">Insha Quamar</span>
        </p>
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2">© 2026 InterviewAce IQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="glass p-6 rounded-2xl text-left border border-white/5 hover:border-blue-500/30 transition-all group">
    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;
