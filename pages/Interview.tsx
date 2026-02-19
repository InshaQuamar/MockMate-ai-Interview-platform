
import React, { useState, useEffect, useRef } from 'react';
import { useInterview } from '../context/InterviewContext';
// Fix: Import from local backend api service instead of purged interviewEngine
import { fetchExpertSolution as getExpertResponse } from '../backend/api';

const VirtualInterviewer: React.FC<{ isRecording: boolean }> = ({ isRecording }) => {
  return (
    <div className="relative w-full aspect-video md:aspect-square rounded-3xl overflow-hidden glass border border-white/10 bg-black shadow-2xl group">
      {/* Simulated Video Feed Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
        <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex flex-col items-center">
          <div className={`absolute -inset-4 rounded-full bg-blue-500/20 blur-2xl transition-opacity duration-1000 ${isRecording ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
          
          <div className="w-full h-full rounded-full border-4 border-white/5 bg-gray-900 flex items-center justify-center overflow-hidden shadow-inner">
             <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Coach Session" 
              className={`w-full h-full object-cover transition-all duration-700 ${isRecording ? 'scale-110 brightness-110' : 'grayscale-[0.5] opacity-80'}`}
            />
          </div>
          
          <div className="mt-4 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-white tracking-wide uppercase">
            Lead Interviewer: Sarah
          </div>
        </div>

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 blur-[100px]"></div>
        </div>
      </div>

      {isRecording && (
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full animate-in fade-in zoom-in duration-300">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          <span className="text-[10px] font-black text-white uppercase tracking-tighter">Recording</span>
        </div>
      )}

      <div className="absolute bottom-6 left-6 flex items-center gap-1.5">
        <div className="flex gap-0.5">
          <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
          <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
          <div className="w-1 h-4 bg-green-500 rounded-sm"></div>
          <div className="w-1 h-5 bg-green-500 rounded-sm"></div>
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase">Secure Link</span>
      </div>
    </div>
  );
};

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

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
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
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 space-y-4">
           <VirtualInterviewer isRecording={isRecording} />
           <div className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Audio Stream</div>
                  <div className={`text-sm font-bold ${isRecording ? 'text-green-500' : 'text-gray-400'}`}>
                    {isRecording ? 'Streaming Data... ' : 'System Idle'}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`w-1 rounded-full transition-all duration-300 ${isRecording ? 'bg-blue-500 h-4 animate-bounce' : 'bg-white/10 h-2'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="glass p-8 md:p-10 rounded-3xl space-y-8 min-h-[450px] flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${(timeLeft / 90) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-blue-600/20 text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/20">
                  {currentQ.category} • {currentQ.difficulty}
                </span>
                <div className="text-xs font-bold text-gray-500 mt-3 uppercase tracking-tight">Stage {session.currentQuestionIndex + 1} of {session.totalQuestions}</div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight pt-2 tracking-tight">
                  {currentQ.text}
                </h2>
              </div>
              <div className={`text-3xl font-mono font-black ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-white/80'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            {showModelAnswer ? (
              <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 shadow-xl">
                <h4 className="text-sm font-black text-blue-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  Proprietary Solution Guide
                </h4>
                {loadingAnswer ? (
                  <div className="flex items-center gap-3 py-4">
                    <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-400 text-sm font-medium animate-pulse">Fetching expert data...</span>
                  </div>
                ) : (
                  <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line font-medium">{modelAnswer}</p>
                )}
              </div>
            ) : (
              <div className="py-12 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 text-xl">🔍</div>
                 <p className="text-gray-500 text-sm max-w-xs italic">Awaiting candidate input. Prepare your response carefully before initiating the capture.</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleToggleRecording}
                className={`flex-1 min-w-[180px] py-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 shadow-xl ${
                  isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {isRecording ? (
                  <>
                    <div className="w-3 h-3 bg-white rounded-sm animate-spin"></div>
                    Stop Capturing
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                    Begin Answer
                  </>
                )}
              </button>
              
              {!showModelAnswer && (
                <button
                  onClick={handleRevealAnswer}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold border border-white/10 transition-all text-sm uppercase tracking-wider"
                >
                  Show Guide
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 px-2">
            <button
              onClick={endInterview}
              className="text-red-500/60 hover:text-red-500 text-xs font-black uppercase tracking-widest transition-colors"
            >
              Terminate Session
            </button>
            <div className="flex gap-4">
              <button
                onClick={skipQuestion}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold border border-white/10 transition-all text-sm"
              >
                Skip Stage
              </button>
              <button
                onClick={() => nextQuestion("Captured")}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-600/30 active:scale-95 text-sm"
              >
                Confirm & Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
        {session.questions.map((q, idx) => {
          const isCurrent = idx === session.currentQuestionIndex;
          const isAnswered = !!session.answers[q.id];
          const isSkipped = session.skipped.includes(q.id);
          
          return (
            <div 
              key={q.id} 
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isCurrent ? 'bg-blue-500 w-8' : 
                isAnswered ? 'bg-green-500' :
                isSkipped ? 'bg-yellow-500' :
                'bg-white/10'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Interview;
