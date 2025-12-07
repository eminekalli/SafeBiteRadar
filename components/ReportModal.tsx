import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface ReportModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  placeName: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ onClose, onSubmit, placeName }) => {
  const [status, setStatus] = useState<'safe' | 'upset' | 'sick' | null>(null);

  const handleSubmit = () => {
    if (!status) return;
    onSubmit({ status, timestamp: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold mb-2 text-white">Crowdsource Health Data</h3>
        <p className="text-slate-400 mb-6 text-sm">
          You are at <span className="text-sky-400 font-semibold">{placeName}</span>. 
          Help others by reporting how you feel after eating.
        </p>

        <div className="space-y-3 mb-8">
          <button
            onClick={() => setStatus('safe')}
            className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${
              status === 'safe' 
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-400' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <CheckCircle size={24} className={status === 'safe' ? 'text-emerald-500' : 'text-slate-500'} />
            <div className="text-left">
              <div className="font-bold">Everything is fine ✅</div>
              <div className="text-xs opacity-70">No symptoms, good hygiene.</div>
            </div>
          </button>

          <button
            onClick={() => setStatus('upset')}
            className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${
              status === 'upset' 
                ? 'bg-amber-950/50 border-amber-500 text-amber-400' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <AlertTriangle size={24} className={status === 'upset' ? 'text-amber-500' : 'text-slate-500'} />
            <div className="text-left">
              <div className="font-bold">Slightly upset ⚠️</div>
              <div className="text-xs opacity-70">Nausea, bloating, or weird taste.</div>
            </div>
          </button>

          <button
            onClick={() => setStatus('sick')}
            className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${
              status === 'sick' 
                ? 'bg-red-950/50 border-red-500 text-red-400' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <AlertOctagon size={24} className={status === 'sick' ? 'text-red-500' : 'text-slate-500'} />
            <div className="text-left">
              <div className="font-bold">Seriously Ill ❌</div>
              <div className="text-xs opacity-70">Vomiting, food poisoning symptoms.</div>
            </div>
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!status}
          className="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-sky-900/20"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ReportModal;