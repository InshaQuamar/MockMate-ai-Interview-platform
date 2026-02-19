
import React, { useState } from 'react';
import { useInterview } from '../state/InterviewContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useInterview();
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'google' | 'manual' | null>(null);

  if (!isOpen) return null;

  const handleSimulatedLogin = async (type: 'google' | 'manual') => {
    setIsLoading(true);
    setLoadingType(type);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser = {
      name: type === 'google' ? "Insha Quamar" : "Guest Developer",
      email: type === 'google' ? "insha@google.com" : "guest@mockmate.iq",
      avatar: type === 'google' 
        ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
        : "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150"
    };

    login(mockUser);
    setIsLoading(false);
    setLoadingType(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />
      <div className="relative w-full max-w-md glass border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 md:p-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight pt-4">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Sign in to track your placement progress.</p>
          </div>

          <button 
            disabled={isLoading}
            onClick={() => handleSimulatedLogin('google')}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-black rounded-2xl font-bold transition-all hover:bg-gray-100 shadow-lg shadow-white/5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && loadingType === 'google' ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {isLoading && loadingType === 'google' ? 'Connecting...' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">or use</span>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
            <button 
              disabled={isLoading}
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${authMethod === 'email' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Email
            </button>
            <button 
              disabled={isLoading}
              onClick={() => setAuthMethod('mobile')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${authMethod === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Mobile
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSimulatedLogin('manual'); }}>
            {authMethod === 'email' ? (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                    <button type="button" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Forgot?</button>
                  </div>
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-gray-400 text-sm font-bold">+91</div>
                  <input 
                    required
                    type="tel" 
                    placeholder="98765 43210"
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                  />
                </div>
              </div>
            )}
            
            <button 
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && loadingType === 'manual' && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading && loadingType === 'manual' ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>
          <p className="text-center text-xs text-gray-500">
            Don't have an account? <button className="text-blue-500 font-bold hover:underline">Sign up for free</button>
          </p>
        </div>
        {!isLoading && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
