
import React, { useState } from 'react';
import { useInterview } from '../state/InterviewContext';
import { InterviewType, Difficulty } from '../../shared/types';

const Setup: React.FC = () => {
  const { startInterview } = useInterview();
  const [type, setType] = useState<InterviewType>('Frontend');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [count, setCount] = useState(5);

  const tracks: { label: InterviewType, icon: string, desc: string }[] = [
    { label: 'Frontend', icon: '🎨', desc: 'UI, React, and web' },
    { label: 'Backend', icon: '⚙️', desc: 'APIs and architecture' },
    { label: 'HR', icon: '🏢', desc: 'Behavioral skills' },
  ];

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const counts = [5, 10, 15];

  return (
    <div className="min-h-screen pt-24 md:pt-40 pb-12 flex flex-col items-center px-4 md:px-6 bg-[#F8FAFC]">
      <div className="max-w-4xl w-full space-y-8 md:space-y-12">
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">Configure Session</h2>
          <p className="text-slate-500 text-sm md:text-lg font-medium">Select your track and challenge level.</p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* Track Selection */}
          <section className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Learning Track</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {tracks.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setType(t.label)}
                  className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all text-left flex items-center sm:flex-col sm:items-start gap-4 sm:gap-0 ${
                    type === t.label 
                      ? 'bg-white border-indigo-600 shadow-xl ring-1 ring-indigo-600' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="text-2xl md:text-4xl sm:mb-6 bg-slate-50 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl flex-shrink-0">{t.icon}</div>
                  <div>
                    <div className="font-bold text-lg md:text-xl text-slate-900 mb-0.5 md:mb-1">{t.label}</div>
                    <div className="text-[11px] md:text-sm text-slate-500 font-medium leading-tight">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Challenge Level */}
            <section className="space-y-4 md:space-y-6">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Complexity</h3>
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-all ${
                      difficulty === d 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </section>

            {/* Iterations */}
            <section className="space-y-4 md:space-y-6">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Session Depth</h3>
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                {counts.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={`flex-1 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-all ${
                      count === c 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {c} Qs
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <button
          onClick={() => startInterview(type, difficulty, count)}
          className="w-full py-5 md:py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg md:text-xl transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] mt-4 md:mt-8"
        >
          Launch Simulation
        </button>
      </div>
    </div>
  );
};

export default Setup;
