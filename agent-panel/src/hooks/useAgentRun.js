import { useState, useEffect, useRef } from 'react';

export function useAgentRun(fixture) {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, running, complete, error
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);
  const eventIndexRef = useRef(0);

  const reset = () => {
    setEvents([]);
    setStatus('idle');
    setElapsedTime(0);
    setStartTime(null);
    eventIndexRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const start = () => {
    reset();
    setStatus('running');
    setStartTime(Date.now());
    
    // Timer for elapsed time
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 100);
    }, 100);

    // Event emitter
    const processNextEvent = () => {
      if (eventIndexRef.current >= fixture.length) {
        return;
      }

      const nextEvent = fixture[eventIndexRef.current];
      const firstEventTime = fixture[0].timestamp;
      const delay = eventIndexRef.current === 0 
        ? 0 
        : nextEvent.timestamp - fixture[eventIndexRef.current - 1].timestamp;

      // Simulate realistic delay
      // We scale the delay to make it feel "live" but not too slow
      // Requirement: "Do not emit all events at the same tick. The timing is part of the UX"
      setTimeout(() => {
        setEvents(prev => [...prev, nextEvent]);
        
        if (nextEvent.type === 'run_complete') {
          setStatus('complete');
          clearInterval(timerRef.current);
          setElapsedTime(nextEvent.duration_ms);
        } else if (nextEvent.type === 'run_error') {
          setStatus('error');
          clearInterval(timerRef.current);
        }

        eventIndexRef.current++;
        processNextEvent();
      }, delay / 2); // Speed up slightly for better trial UX, but keep the Relative timing
    };

    processNextEvent();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { events, status, elapsedTime, start, reset };
}
