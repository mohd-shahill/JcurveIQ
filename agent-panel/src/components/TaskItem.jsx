import React from 'react';

export function TaskItem({ task, events }) {
  const taskEvents = events.filter(e => e.task_id === task.task_id);
  const toolCalls = taskEvents.filter(e => e.type === 'tool_call' || e.type === 'tool_result');
  const partialOutputs = taskEvents.filter(e => e.type === 'partial_output');
  
  const statusColors = {
    running: 'text-blue-600 border-blue-100 bg-blue-50/50',
    complete: 'text-emerald-600 border-emerald-100 bg-emerald-50/50',
    failed: 'text-rose-600 border-rose-100 bg-rose-50/50',
    cancelled: 'text-slate-400 border-slate-100 bg-slate-50/30',
    pending: 'text-slate-300 border-slate-50 font-normal'
  };

  const isCancelledSufficient = task.status === 'cancelled' && task.reason === 'sufficient_data';

  return (
    <div className="card-professional p-5 bg-white group transition-all duration-300 transform-gpu hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{task.agent}</span>
            <div className="h-1 w-1 rounded-full bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-300 font-mono tracking-tighter uppercase">{task.task_id}</span>
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight leading-snug">{task.label}</h3>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className={`px-2 py-0.5 rounded text-[10px] font-black tracking-widest border transition-colors ${statusColors[task.status || 'pending']}`}>
            {isCancelledSufficient ? 'DATA_OPTIMIZED' : (task.status || 'TASK_READY').toUpperCase()}
          </div>
          {task.status === 'running' && (
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" />
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>
      </div>

      {/* Tool Logs */}
      {toolCalls.length > 0 && (
        <div className="mt-5 space-y-2 border-t border-slate-50 pt-4">
          {toolCalls.map((call, i) => (
            <div key={i} className="flex gap-4 group/tool">
              <div className="pt-1.5 opacity-30 group-hover/tool:opacity-60 transition-opacity">
                {call.type === 'tool_call' ? (
                  <svg className="w-3 h-3 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                ) : (
                  <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m7 16-4-4 4-4"/><path d="M3 12h18"/></svg>
                )}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black text-slate-400/80 uppercase tracking-tight mb-0.5">{call.tool}</div>
                <div className="text-xs font-medium text-slate-600 bg-slate-50/50 p-2 rounded-md border border-slate-100 group-hover/tool:border-slate-200 transition-colors">
                  {call.input_summary || call.output_summary}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Output Streams */}
      {partialOutputs.length > 0 && (
        <div className="mt-4 p-4 bg-slate-900 rounded-lg text-slate-300 font-mono text-[10px] leading-relaxed shadow-inner shadow-black/20">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Live Output Stream</span>
          </div>
          <div className="space-y-1.5">
            {partialOutputs.slice(-2).map((out, i) => (
              <div key={i} className={`transition-opacity duration-500 ${out.is_final ? 'text-white font-bold translate-x-1' : 'opacity-70'}`}>
                {`[${out.timestamp.toString().slice(-4)}] ${out.content}`}
                {out.quality_score && (
                  <span className="ml-2 text-[9px] text-emerald-400/80 font-black tracking-widest uppercase">Score: {out.quality_score}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
