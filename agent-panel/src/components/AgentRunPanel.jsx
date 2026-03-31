import React, { useMemo } from 'react';
import { RunHeader } from './RunHeader';
import { TaskItem } from './TaskItem';
import { FinalOutput } from './FinalOutput';

export function AgentRunPanel({ events, status, elapsedTime, query }) {
  const tasks = useMemo(() => {
    const taskMap = {};
    events.forEach(event => {
      if (event.type === 'task_spawned') {
        taskMap[event.task_id] = { ...event, status: 'pending' };
      } else if (event.type === 'task_update') {
        if (taskMap[event.task_id]) {
          taskMap[event.task_id] = { ...taskMap[event.task_id], ...event };
        }
      }
    });
    return Object.values(taskMap);
  }, [events]);

  const completionEvent = events.find(e => e.type === 'run_complete');
  const errorEvent = events.find(e => e.type === 'run_error');

  const groupedTasks = useMemo(() => {
    const groups = [];
    let currentGroup = null;
    tasks.forEach(task => {
      if (task.parallel_group) {
        if (currentGroup && currentGroup.id === task.parallel_group) {
          currentGroup.tasks.push(task);
        } else {
          currentGroup = { id: task.parallel_group, tasks: [task] };
          groups.push(currentGroup);
        }
      } else {
        currentGroup = null;
        groups.push({ id: null, tasks: [task] });
      }
    });
    return groups;
  }, [tasks]);

  if (status === 'idle') {
    return (
      <div className="py-24 text-center border border-dashed border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm">
        <div className="w-12 h-12 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Ready for Analysis</h3>
        <p className="text-slate-400 mt-2 font-medium">Select a test scenario to monitor orchestration in real-time.</p>
      </div>
    );
  }

  return (
    <div className="card-professional overflow-hidden">
      <RunHeader query={query} status={status} elapsedTime={elapsedTime} />
      
      <div className="p-8 bg-slate-50/20">
        <div className="space-y-6 relative">
          {/* Main Connector Pipe */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200" />
          
          <div className="space-y-6">
            {groupedTasks.map((group, idx) => (
              <div key={idx} className={group.id ? "ml-8 pl-8 border-l border-slate-100 relative" : "relative pl-8"}>
                {/* Visual node indicator */}
                <div className={`absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full border-2 border-white bg-slate-300 shadow-sm transition-colors ${group.id ? 'bg-slate-200' : ''}`} />
                
                {group.id && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">Concurrent Batch: {group.id}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  {group.tasks.map(task => (
                    <TaskItem key={task.task_id} task={task} events={events} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {errorEvent && (
          <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm flex items-start gap-3 shadow-sm shadow-rose-100">
            <div className="w-5 h-5 mt-0.5 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>
            <div className="flex-1">
              <span className="font-bold block mb-0.5">Execution Interrupted</span>
              <span className="text-xs font-medium opacity-80">{errorEvent.message}</span>
            </div>
          </div>
        )}

        <FinalOutput 
          output={completionEvent?.output || (errorEvent ? { summary: "Intermediate results summary based on partial completion..." } : null)} 
          isError={!!errorEvent} 
        />
      </div>
    </div>
  );
}
