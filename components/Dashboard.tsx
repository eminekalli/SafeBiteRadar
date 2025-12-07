import React from 'react';
import { FullReport, RiskLevel } from '../types';
import RiskGauge from './RiskGauge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { MapPin, MessageSquare, AlertCircle, TrendingUp, Users } from 'lucide-react';

interface DashboardProps {
  report: FullReport;
  onOpenReportModal: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ report, onOpenReportModal }) => {
  const { place, analysis, crowd } = report;

  // Transform breakdown for Chart, with safety check
  const chartData = crowd?.symptomBreakdown || [];

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-fade-in">
      {/* Header Info */}
      <div className="bg-slate-900/50 border-b border-slate-800 p-6 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="text-sky-500" />
              {place?.name || "Unknown Location"}
            </h1>
            <p className="text-slate-400 text-sm ml-8">{place?.address || ""}</p>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-yellow-400 font-bold text-lg">★ {place?.googleRating || "N/A"}</div>
             <div className="text-xs text-slate-500">Google Rating</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Risk Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle size={100} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <RiskGauge score={analysis?.riskScore || 0} level={analysis?.riskLevel || RiskLevel.LOW} />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-1">Analysis Summary</h3>
                <p className="text-slate-300 leading-relaxed">{analysis?.summary || "No analysis details available."}</p>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                  <MessageSquare size={14} /> AI Sentiment Findings
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {analysis?.complaintTags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-red-950/40 text-red-400 border border-red-900/50 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {(!analysis?.complaintTags || analysis.complaintTags.length === 0) && <span className="text-emerald-400 text-sm">No major red flags detected.</span>}
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-500">
                   <TrendingUp size={16} />
                   <span>{analysis?.recentTrend || "No trend data"}</span>
                </div>
              </div>

               <div className="bg-sky-950/30 border border-sky-900/30 p-3 rounded-lg">
                 <p className="text-sky-200 text-sm font-semibold">💡 Recommendation: {analysis?.recommendation || "Standard precautions apply."}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Crowd Data Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users className="text-indigo-500" />
              SafeBite Crowd Data
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-white">{crowd?.visitsLast30Days || 0}</div>
                <div className="text-xs text-slate-400">Recent Visits</div>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-red-400">{crowd?.stomachComplaints || 0}</div>
                <div className="text-xs text-slate-400">Complaints</div>
              </div>
            </div>
            
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#1e293b'}}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'None' ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            <div>
               <h3 className="text-xl font-bold text-white mb-2">How do you feel?</h3>
               <p className="text-indigo-200 text-sm mb-6">
                 Help the community by reporting your post-meal experience. Your data helps prevent future outbreaks.
               </p>
            </div>
            <button 
              onClick={onOpenReportModal}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Report Status
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;