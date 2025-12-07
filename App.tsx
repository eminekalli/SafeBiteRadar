import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldAlert, ScanLine } from 'lucide-react';
import RadarLoader from './components/RadarLoader';
import Dashboard from './components/Dashboard';
import ReportModal from './components/ReportModal';
import { getCurrentLocation } from './services/locationService';
import { generateSafeBiteReport } from './services/geminiService';
import { FullReport } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'scanning' | 'dashboard'>('landing');
  const [report, setReport] = useState<FullReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startRadar = async () => {
    setView('scanning');
    setError(null);
    try {
      // 1. Get Location
      const coords = await getCurrentLocation();
      
      // 2. AI Analysis
      const result = await generateSafeBiteReport(coords);
      
      setReport(result);
      setView('dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to scan location.');
      setView('landing');
    }
  };

  const handleUserReport = (data: any) => {
    // In a real app, send to backend.
    // Here we just acknowledge it visually.
    alert(`Report Submitted: ${data.status}. Thank you for contributing to SafeBite!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-sky-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-40 flex items-center px-6 justify-between">
        <div className="flex items-center gap-2 text-sky-500">
          <ShieldAlert size={28} />
          <span className="font-mono font-bold text-xl tracking-tighter text-white">
            SafeBite<span className="text-sky-500">Radar</span>
          </span>
        </div>
        {view === 'dashboard' && (
           <button 
             onClick={() => setView('landing')}
             className="text-xs text-slate-400 hover:text-white uppercase font-bold"
            >
             Reset
           </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 h-full flex flex-col">
        
        {view === 'landing' && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in">
            <div className="space-y-4 max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Eat Safely. <br/> Everywhere.
              </h1>
              <p className="text-slate-400 text-lg">
                AI-powered food safety intelligence. Detects hidden risks, analyzes reviews for hygiene red flags, and tracks real-time crowd health data.
              </p>
            </div>

            <button
              onClick={startRadar}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-sky-600 font-mono rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 hover:bg-sky-500 hover:scale-105 shadow-[0_0_20px_rgba(2,132,199,0.5)]"
            >
              <ScanLine className="mr-2 animate-pulse" />
              OPEN SAFEBITE RADAR
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 animate-ping opacity-20"></div>
            </button>
            
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm max-w-sm">
                Error: {error}
              </div>
            )}
          </div>
        )}

        {view === 'scanning' && <RadarLoader />}

        {view === 'dashboard' && report && (
          <Dashboard 
            report={report} 
            onOpenReportModal={() => setIsModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {isModalOpen && report && (
        <ReportModal 
          placeName={report.place.name}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUserReport}
        />
      )}
    </div>
  );
};

export default App;