
import React, { useState } from 'react';
import { QUESTION_BANK } from '../../shared/constants';
import { InterviewType, Difficulty } from '../../shared/types';

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
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="space-y-1 md:space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">Question <span className="text-indigo-600">Vault</span></h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">Browse our curated list of {QUESTION_BANK.length} interview questions.</p>
        </div>
        <div className="text-[10px] md:text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 md:px-4 md:py-2 rounded-full border border-indigo-100 self-start">
          Total: {QUESTION_BANK.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a question..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all text-sm shadow-sm"
              />
              <svg className="absolute right-4 top-3.5 w-4 h-4 md:w-5 md:h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Track</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Frontend', 'Backend', 'HR'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat as any)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all border ${
                      categoryFilter === cat ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff as any)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all border ${
                      difficultyFilter === diff ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Questions List */}
        <main className="lg:col-span-3 space-y-3 md:space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div key={q.id} className="soft-card p-5 md:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 md:gap-6 hover:border-indigo-600/30 transition-all group">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 md:py-1 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {q.category}
                    </span>
                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 md:py-1 rounded border ${
                      q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="text-slate-900 font-bold text-base md:text-lg leading-snug">{q.text}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 md:py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="text-4xl md:text-5xl">🔍</div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900">No questions found</h3>
              <p className="text-slate-500 text-sm md:text-base px-10">Try adjusting your filters or search term to see more results.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuestionBankPage;
