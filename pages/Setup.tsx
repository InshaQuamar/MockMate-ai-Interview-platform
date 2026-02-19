
import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import { InterviewType, Difficulty } from '../types';

const Setup: React.FC = () => {
  const { startInterview } = useInterview();
  const [type, setType] = useState<InterviewType>('Frontend');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [count, setCount] = useState(5);

  const types: { label: InterviewType, icon: string }[] = [
    { label: 'Frontend', icon: '🎨' },
    { label: 'Backend', icon: '⚙️' },
    { label: 'HR', icon: '🤝' },
  ];

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const counts = [5, 10, 15];

  return (
    <div className="min-h-screen pt-32 pb-12 flex flex-col items-center px-6">
      <div className="max-w-3xl w-full space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Configure Your Session</h2>
          <p className="text-gray-400">Tailor your practice session to your target role and skill level.</p>
        </div>

        <div className="space-y-10">
          {/* Interview Type */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Select Interview Track</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {types.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setType(t.label)}
                  className={`p-6 rounded-2xl border transition-all text-left ${
                    type === t.label 
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <div className="font-bold text-lg text-white">{t.label}</div>
                  <div className="text-xs text-gray-400">Questions about {t.label.toLowerCase()} logic.</div>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Difficulty */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Select Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-6 py-3 rounded-xl border transition-all flex-1 text-center font-semibold ${
                      difficulty === d 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </section>

            {/* Question Count */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Question Count</h3>
              <div className="flex flex-wrap gap-2">
                {counts.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={`px-6 py-3 rounded-xl border transition-all flex-1 text-center font-semibold ${
                      count === c 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <button
          onClick={() => startInterview(type, difficulty, count)}
          className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 active:translate-y-0"
        >
          Launch Interview Simulator
        </button>
      </div>
    </div>
  );
};

export default Setup;
