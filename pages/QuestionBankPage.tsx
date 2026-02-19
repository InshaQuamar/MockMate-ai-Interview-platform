
import React, { useState } from 'react';
import { QUESTION_BANK } from '../constants';
import { InterviewType, Difficulty } from '../types';

const QuestionBankPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<InterviewType | 'All'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');

  const filteredQuestions = QUESTION_BANK.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || q.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white">Question <span className="text-blue-500">Vault</span></h1>
          <p className="text-gray-400">Browse and study our comprehensive list of {QUESTION_BANK.length} curated interview questions.</p>
        </div>
        <div className="text-sm font-bold text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
          Total Questions: {QUESTION_BANK.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a question..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Track</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Frontend', 'Backend', 'HR'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    categoryFilter === cat ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    difficultyFilter === diff ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Questions List */}
        <main className="lg:col-span-3 space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div key={q.id} className="glass p-6 rounded-2xl border border-white/5 flex items-start justify-between gap-6 hover:border-white/10 transition-all">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/10">
                      {q.category}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                      q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500 border-green-500/10' :
                      q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/10' :
                      'bg-red-500/10 text-red-500 border-red-500/10'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold text-lg leading-relaxed">{q.text}</h4>
                </div>
                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-5xl">🔍</div>
              <h3 className="text-xl font-bold text-white">No questions found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuestionBankPage;
