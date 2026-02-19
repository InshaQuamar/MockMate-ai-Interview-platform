
import React, { useEffect, useState } from 'react';
import { useInterview } from '../state/InterviewContext';
import { generatePerformanceFeedback as getSessionFeedback } from '../../backend/api';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const Result: React.FC = () => {
  const { session, resetSession } = useInterview();
  const [sessionReview, setSessionReview] = useState<string | null>(null);
  const [loadingReview, setLoadingReview] = useState(true);

  useEffect(() => {
    if (session && session.endTime) {
      const fetchReview = async () => {
        setLoadingReview(true);
        const attempted = Object.keys(session.answers).length;
        const feedback = await getSessionFeedback(attempted, session.totalQuestions, session.type);
        setSessionReview(feedback);
        setLoadingReview(false);
      };
      fetchReview();
    }
  }, [session]);

  if (!session) return null;

  const attemptedCount = Object.keys(session.answers).length;
  const skippedCount = session.skipped.length;
  const score = Math.round((attemptedCount / session.totalQuestions) * 100);

  const pieData = [
    { name: 'Finished', value: attemptedCount },
    { name: 'Incomplete', value: skippedCount },
  ];

  const barData = [
    { name: 'Your Score', value: score },
    { name: 'Target', value: 75 },
  ];

  const COLORS = ['#4F46E5', '#E2E8F0'];

  const getVerdict = () => {
    if (score >= 80) return { text: "Session complete. Selection criteria met.", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" };
    if (score >= 50) return { text: "Average score. Practice missed modules.", color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-100" };
    return { text: "Action required. Review the basics.", color: "text-slate-700", bg: "bg-slate-100", border: "border-slate-200" };
  };

  const verdict = getVerdict();

  return (
    <div className="min-h-screen pt-24 md:pt-40 pb-20 md:pb-24 px-4 md:px-6 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-10 animate-in fade-in zoom-in-95 duration-700">
        
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">Performance Summary</h2>
          <p className="text-slate-500 font-medium text-sm md:text-lg">Detailed report of your {session.type} session.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 soft-card p-6 md:p-14 space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
              <div className="relative w-44 h-44 md:w-56 md:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl md:text-5xl font-extrabold text-slate-900">{score}%</span>
                  <span className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5 md:mt-1">Accuracy</span>
                </div>
              </div>

              <div className="flex-1 w-full space-y-6 md:space-y-8">
                <div className={`p-5 md:p-8 rounded-2xl border ${verdict.bg} ${verdict.border} shadow-sm text-center md:text-left`}>
                  <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 md:mb-2 opacity-70 ${verdict.color}`}>Status Update</p>
                  <p className={`font-bold text-base md:text-lg leading-snug ${verdict.color}`}>{verdict.text}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <Metric icon="📋" val={session.totalQuestions} label="Total" />
                  <Metric icon="✅" val={attemptedCount} label="Solved" />
                  <Metric icon="⏩" val={skippedCount} label="Skipped" />
                </div>
              </div>
            </div>

            <div className="pt-8 md:pt-10 border-t border-slate-100 space-y-4 md:space-y-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-lg md:text-xl">📝</div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-widest">Calculated Feedback</h4>
              </div>
              <div className="p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-100 min-h-[120px] md:min-h-[140px] flex items-center justify-center">
                {loadingReview ? (
                  <div className="flex flex-col items-center gap-3 md:gap-4 text-slate-400">
                    <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest">Syncing Report...</span>
                  </div>
                ) : (
                  <p className="text-slate-600 text-sm md:text-lg leading-relaxed italic font-medium text-center">"{sessionReview}"</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="soft-card p-6 md:p-8 flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-8">Session Comparison</h3>
              <div className="h-40 md:h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: '700'}} />
                    <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}} />
                    <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <button 
                onClick={resetSession}
                className="w-full py-4 md:py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-base md:text-lg transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
              >
                Restart Module
              </button>
              <button 
                onClick={resetSession}
                className="w-full py-4 md:py-5 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-2xl font-bold text-base md:text-lg transition-all shadow-sm"
              >
                Home Dashboard
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-12 md:pt-20 pb-8 md:pb-12 border-t border-slate-200 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">IQ</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 tracking-tight">Design and Build by Insha Quamar</span>
              <span className="text-[11px] text-slate-400 font-medium tracking-tight">MockMate Platform • Project v1.0</span>
            </div>
          </div>
          <p className="text-[11px] md:text-xs text-slate-400 font-medium text-center md:text-right">BTech Final Year Project Submission</p>
        </footer>
      </div>
    </div>
  );
};

const Metric = ({ icon, val, label }: { icon: string, val: number, label: string }) => (
  <div className="text-center p-3 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100">
    <div className="text-lg md:text-xl mb-0.5 md:mb-1">{icon}</div>
    <div className="text-xl md:text-2xl font-extrabold text-slate-900">{val}</div>
    <div className="text-[8px] md:text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5 md:mt-1">{label}</div>
  </div>
);

export default Result;
