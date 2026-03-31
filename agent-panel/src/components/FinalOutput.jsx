import React from 'react';

export function FinalOutput({ output, isError }) {
  if (!output) return null;

  return (
    <div className={`mt-10 p-6 border-l-4 rounded-r-xl shadow-sm transition-all duration-500 bg-white ${isError ? 'border-rose-300 bg-rose-50/20' : 'border-blue-400'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
          {isError ? 'Interrupted Analysis' : 'Synthesis Complete'}
        </h2>
        {!isError && <div className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[9px] font-black uppercase tracking-tighter">Verified</div>}
      </div>
      
      <p className="text-base font-semibold text-slate-800 leading-relaxed italic border-b border-slate-100 pb-6 mb-6">
        "{output.summary}"
      </p>
      
      {output.citations && output.citations.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Supporting Documents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {output.citations.map((cite, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3 hover:border-slate-300 hover:bg-white transition-all group">
                <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  {i + 1}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 leading-tight mb-0.5">{cite.title}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{cite.source} · PG {cite.page}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isError && (
        <div className="mt-4 text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
           Partial results displayed due to unrecoverable error.
        </div>
      )}
    </div>
  );
}
