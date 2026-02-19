
import React, { useState, useEffect, useRef } from 'react';
import { useInterview } from '../state/InterviewContext';
import { fetchExpertSolution as getExpertResponse } from '../../backend/api';

const Interview: React.FC = () => {
  const { session, nextQuestion, skipQuestion, endInterview } = useInterview();
  const [timeLeft, setTimeLeft] = useState(90);
  const [isRecording, setIsRecording] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [modelAnswer, setModelAnswer] = useState<string | null>(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentQ = session?.questions[session.currentQuestionIndex];

  useEffect(() => {
    setTimeLeft(90);
    setShowModelAnswer(false);
    setModelAnswer(null);
    startTimer();
    return () => stopTimer();
  }, [session?.currentQuestionIndex]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleRevealAnswer = async () => {
    if (!currentQ) return;
    setShowModelAnswer(true);
    if (!modelAnswer) {
      setLoadingAnswer(true);
      const answer = await getExpertResponse(currentQ.text, currentQ.category, currentQ.difficulty);
      setModelAnswer(answer);
      setLoadingAnswer(false);
    }
  };

  if (!session || !currentQ) return null;

  return (
    <div className="min-h-screen pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
        {/* Module Placeholder */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6">
          <div className="soft-card overflow-hidden bg-slate-900 aspect-video lg:aspect-square relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-2 md:space-y-4">
                   <div className="w-24 h-24 md:w-48 md:h-48 rounded-full border-4 border-slate-700 bg-slate-800 overflow-hidden mx-auto shadow-2xl">
                     <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400" 
                      alt="Practice Module" 
                      className="w-full h-full object-cover grayscale opacity-90"
                    />
                   </div>
                   <div className="bg-slate-800/80 backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-xl border border-slate-700 inline-block">
                     <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">Training Active</p>
                   </div>
                </div>
             </div>
             
             {isRecording && (
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 bg-emerald-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg font-bold text-[9px] md:text-[10px] uppercase tracking-widest shadow-lg animate-pulse">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                  Status: Recording
                </div>
             )}
          </div>

          <div className="soft-card p-4 md:p-6 flex items-center justify-between">
             <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm md:text-base">🎙️</div>
                <div>
                   <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Audio Stream</p>
                   <p className={`text-xs md:text-sm font-bold ${isRecording ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {isRecording ? 'Capturing Answer' : 'Waiting Input'}
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Question Panel */}
        <div className="lg:col-span-8 space-y-4 md:space-y-6">
           <div className="soft-card p-6 md:p-14 min-h-[400px] md:min-h-[500px] flex flex-col justify-between relative overflow-hidden bg-white">
              <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-slate-100">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-1000" 
                  style={{ width: `${(timeLeft / 90) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-4 md:space-y-8">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-indigo-50 text-[9px] md:text-[10px] font-bold text-indigo-600 uppercase tracking-widest rounded-lg border border-indigo-100">
                    {session.type} Module
                  </span>
                  <div className={`text-2xl md:text-3xl font-display font-bold ${timeLeft < 20 ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                
                <div className="space-y-2 md:space-y-4">
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Step {session.currentQuestionIndex + 1} of {session.totalQuestions}</p>
                  <h2 className="text-xl md:text-4xl font-display font-bold text-slate-900 leading-tight">
                    {currentQ.text}
                  </h2>
                </div>
              </div>

              <div className="my-6 md:my-10">
                 {showModelAnswer ? (
                   <div className="p-4 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                        <span className="text-base md:text-xl">💡</span>
                        <h4 className="text-[10px] md:text-xs font-bold text-indigo-600 uppercase tracking-widest">Reference Guide</h4>
                      </div>
                      {loadingAnswer ? (
                        <div className="flex items-center gap-2 md:gap-3 py-2 md:py-4 text-slate-400">
                           <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                           <span className="text-xs md:text-sm font-medium animate-pulse">Loading Reference...</span>
                        </div>
                      ) : (
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium italic">"{modelAnswer}"</p>
                      )}
                   </div>
                 ) : (
                   <div className="py-10 md:py-16 border-2 border-dashed border-slate-200 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center px-6 md:px-10">
                      <p className="text-slate-400 text-sm md:text-base font-medium max-w-sm">Prepare your answer and click record to begin.</p>
                   </div>
                 )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                 <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-full sm:flex-1 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 md:gap-3 ${
                      isRecording ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
                    }`}
                 >
                    {isRecording ? 'Stop Recording' : 'Begin Answer'}
                 </button>
                 {!showModelAnswer && (
                   <button
                    onClick={handleRevealAnswer}
                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-5 text-slate-600 hover:text-indigo-600 font-bold text-[10px] md:text-sm uppercase tracking-widest transition-colors"
                   >
                    See Reference
                   </button>
                 )}
              </div>
           </div>

           <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-2 md:px-4">
              <button onClick={endInterview} className="text-slate-400 hover:text-rose-600 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">Close Session</button>
              <div className="flex w-full sm:w-auto gap-3 md:gap-4">
                 <button onClick={skipQuestion} className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors">Skip</button>
                 <button onClick={() => nextQuestion("Saved")} className="flex-1 sm:flex-none px-8 md:px-10 py-3 md:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-md active:scale-95">Save & Next</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
