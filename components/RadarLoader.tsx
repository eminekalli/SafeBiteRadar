import React from 'react';

const RadarLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-64 h-64">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-radar-line opacity-50"></div>
        {/* Middle Ring */}
        <div className="absolute inset-8 rounded-full border-2 border-radar-line opacity-30"></div>
        {/* Inner Ring */}
        <div className="absolute inset-20 rounded-full border border-radar-line opacity-20"></div>
        
        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-radar-line opacity-20 transform -translate-x-1/2"></div>
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-radar-line opacity-20 transform -translate-y-1/2"></div>

        {/* Scanning Sweep */}
        <div className="absolute inset-0 rounded-full animate-radar-spin origin-center overflow-hidden">
          <div className="w-1/2 h-1/2 bg-gradient-to-tl from-radar-scan/50 to-transparent absolute top-0 left-0 origin-bottom-right rounded-tl-full"></div>
        </div>

        {/* Center Dot */}
        <div className="absolute inset-0 m-auto w-3 h-3 bg-radar-scan rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-pulse-fast"></div>

        {/* Simulated Blips */}
        <div className="absolute top-10 right-10 w-2 h-2 bg-risk-high rounded-full animate-ping opacity-75"></div>
      </div>
      
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-xl font-mono text-radar-scan font-bold tracking-wider animate-pulse">
          SCANNING SECTOR
        </h2>
        <p className="text-slate-400 text-sm">
          Acquiring GPS lock... <br/>
          Triangulating venue... <br/>
          Analyzing bio-risk data...
        </p>
      </div>
    </div>
  );
};

export default RadarLoader;