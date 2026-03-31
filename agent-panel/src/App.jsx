import React, { useState } from 'react';
import { AgentRunPanel } from './components/AgentRunPanel';
import { useAgentRun } from './hooks/useAgentRun';
import successFixture from '../mock/fixtures/run_success.json';
import errorFixture from '../mock/fixtures/run_error.json';

function App() {
  const [activeFixture, setActiveFixture] = useState(null);
  const activeData = activeFixture === 'success' ? successFixture : (activeFixture === 'error' ? errorFixture : []);
  const query = activeData[0]?.query || "";
  
  const { events, status, elapsedTime, start, reset } = useAgentRun(activeData);

  const handleStart = (type) => {
    setActiveFixture(type);
  };

  React.useEffect(() => {
    if (activeFixture) {
      start();
    }
  }, [activeFixture]);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleStart('success')}
              disabled={status === 'running'}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${status === 'running' ? 'bg-slate-50 text-slate-400 border-slate-100 grayscale cursor-not-allowed' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'}`}
            >
              Test Success
            </button>
            <button 
              onClick={() => handleStart('error')}
              disabled={status === 'running'}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${status === 'running' ? 'bg-slate-50 text-slate-400 border-slate-100 grayscale cursor-not-allowed' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'}`}
            >
              Test Error
            </button>
          </div>
          <button 
            onClick={reset}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all font-mono"
          >
            RESET
          </button>
        </div>

        <AgentRunPanel 
          events={events} 
          status={status} 
          elapsedTime={elapsedTime} 
          query={query} 
        />
      </div>
    </div>
  );
}

export default App;
