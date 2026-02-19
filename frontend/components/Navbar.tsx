
import React, { useState } from 'react';
import { useInterview } from '../state/InterviewContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const { resetSession, setView, currentView, user, logout } = useInterview();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-12">
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group" 
          onClick={resetSession}
        >
          <div className="w-8 h-8 md:w-9 md:h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
            IQ
          </div>
          <div className="flex flex-col -space-y-0.5 md:-space-y-1">
            <span className="text-lg md:text-xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">Mock<span className="text-indigo-600">Mate</span></span>
            <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block">Success Platform</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden lg:flex items-center gap-10">
            <NavLink 
              label="Learning Hub" 
              active={currentView === 'resources'} 
              onClick={() => setView('resources')} 
            />
            <NavLink 
              label="Question Vault" 
              active={currentView === 'question-bank'} 
              onClick={() => setView('question-bank')} 
            />
          </div>
          
          <div className="h-6 w-[1px] bg-slate-200 hidden lg:block"></div>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 md:gap-3 p-1 md:p-1.5 md:pr-4 hover:bg-slate-50 rounded-full border border-slate-200 transition-all group"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-slate-100">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-700 hidden md:block">{user.name.split(' ')[0]}</span>
                <svg className={`w-3 h-3 md:w-4 md:h-4 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 md:w-60 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 md:px-5 md:py-4 border-b border-slate-100 mb-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account</p>
                    <p className="text-xs md:text-sm font-bold text-slate-900 truncate">{user.email}</p>
                  </div>
                  <UserMenuButton label="Learning Hub" onClick={() => setView('resources')} mobileOnly />
                  <UserMenuButton label="Question Bank" onClick={() => setView('question-bank')} mobileOnly />
                  <UserMenuButton label="Profile & Stats" onClick={() => {}} />
                  <div className="h-[1px] bg-slate-100 my-2"></div>
                  <button 
                    onClick={() => { logout(); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 md:px-5 md:py-3 text-[11px] md:text-xs text-rose-600 font-bold hover:bg-rose-50 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="px-5 py-2.5 md:px-8 md:py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

const NavLink = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold transition-all relative ${
      active ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
    }`}
  >
    {label}
    {active && <div className="absolute -bottom-[30px] left-0 w-full h-[3px] bg-indigo-600 rounded-t-full"></div>}
  </button>
);

const UserMenuButton = ({ label, onClick, mobileOnly }: { label: string, onClick: () => void, mobileOnly?: boolean }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 md:px-5 md:py-3 text-[11px] md:text-xs text-slate-600 font-bold hover:text-indigo-600 hover:bg-slate-50 transition-all ${mobileOnly ? 'lg:hidden' : ''}`}
  >
    {label}
  </button>
);

export default Navbar;
