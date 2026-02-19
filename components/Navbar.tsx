
import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const { resetSession, setView, currentView, user, logout } = useInterview();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 md:px-12">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={resetSession}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-xl shadow-blue-500/20 italic tracking-tighter text-xl transition-transform group-hover:scale-110">
            IQ
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-bold tracking-tight text-white">Interview<span className="text-blue-500">Ace</span></span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest hidden md:block">by Insha Quamar</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('resources')}
            className={`text-sm font-semibold transition-colors hidden lg:block ${
              currentView === 'resources' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Resources
          </button>
          <button 
            onClick={() => setView('question-bank')}
            className={`text-sm font-semibold transition-colors hidden lg:block ${
              currentView === 'question-bank' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Question Bank
          </button>
          <div className="h-8 w-[1px] bg-white/10 hidden lg:block"></div>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-1 pr-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border border-white/10 object-cover"
                />
                <span className="text-sm font-bold text-white hidden sm:block">{user.name.split(' ')[0]}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 glass border border-white/10 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Profile Settings</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Performance History</button>
                  <div className="h-[1px] bg-white/5 my-2"></div>
                  <button 
                    onClick={() => { logout(); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 font-bold hover:bg-red-500/10 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="px-6 py-2 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-bold transition-all border border-white/10 shadow-lg shadow-white/5"
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

export default Navbar;
