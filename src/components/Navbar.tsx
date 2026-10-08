import React from 'react';
import {
  Crown,
  LayoutDashboard,
  FileSpreadsheet,
  BookOpen,
  PlusCircle,
  ShieldCheck,
  CheckCircle,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'forms' | 'sop';
  setActiveTab: (tab: 'dashboard' | 'forms' | 'sop') => void;
  onNewSimulation: () => void;
  isSignedInWithGoogle?: boolean;
  onSignInWithGoogle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewSimulation,
  isSignedInWithGoogle = false,
  onSignInWithGoogle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Company Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <Crown className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  PT INDO SULTAN JAYA
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  QA / QC SISTEM
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                SOP Product Recall & Mock Recall • Dok: SOP-Z06_E
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Status
            </button>

            <button
              onClick={() => setActiveTab('forms')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'forms'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Generator Google Forms
            </button>

            <button
              onClick={() => setActiveTab('sop')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'sop'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Acuan SOP-Z06_E
            </button>
          </nav>

          {/* Action Button & User Google Status */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNewSimulation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Simulasi Baru
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1 px-2 font-medium flex items-center gap-1 ${
              activeTab === 'dashboard' ? 'text-indigo-600 font-bold border-b-2 border-indigo-600' : 'text-slate-500'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`py-1 px-2 font-medium flex items-center gap-1 ${
              activeTab === 'forms' ? 'text-indigo-600 font-bold border-b-2 border-indigo-600' : 'text-slate-500'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Google Forms
          </button>
          <button
            onClick={() => setActiveTab('sop')}
            className={`py-1 px-2 font-medium flex items-center gap-1 ${
              activeTab === 'sop' ? 'text-indigo-600 font-bold border-b-2 border-indigo-600' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            SOP Acuan
          </button>
        </div>
      </div>
    </header>
  );
};
