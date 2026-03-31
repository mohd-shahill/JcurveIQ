import React from 'react';

export function RunHeader({ query, status, elapsedTime }) {
  const formatTime = (ms) => {
    const seconds = (ms / 1000).toFixed(1);
    return `${seconds}s`;
  };

  const statusColors = {
    idle: 'bg-slate-100 text-slate-500 border-slate-200',
    running: 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm shadow-blue-100',
    complete: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-100',
    error: 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm shadow-rose-100'
  };

  return (
    <div className="border-b border-slate-100 p-6 bg-white transition-all duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-60">System Query</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight max-w-2xl">
            {query}
          </h1>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <div className={`px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${statusColors[status]}`}>
            {status}
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mb-0.5">Runtime</div>
            <div className="text-sm font-mono font-bold text-slate-500 tabular-nums bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
