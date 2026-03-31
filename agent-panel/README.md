# JcurveIQ Agent Run Panel

A real-time visualization dashboard for observing autonomous research agents executing complex, multi-step workflows. The interface makes parallel execution, task dependencies, retries, and intermediate outputs legible to non-technical users.

---

## Core Features

### Real-time Event Simulation
Simulates an agent orchestration pipeline with realistic timing, reflecting how tasks spawn, execute, fail, retry, and complete.

### Task Lifecycle Visualization
Tracks each task across states (`running`, `failed`, `retry`, `cancelled`, `complete`) with clear transitions and history.

### Parallel Execution Awareness
Groups tasks belonging to the same `parallel_group`, making concurrent work visually distinguishable from sequential execution.

### Streaming Outputs (Partial + Final)
Displays intermediate outputs (`is_final: false`) in real-time, while highlighting final results prominently.

### Failure & Recovery Handling
Accurately represents retry flows (`failed → running`) and distinguishes recoverable vs terminal failures.

### Graceful Cancellation Handling
Handles `cancelled` tasks (e.g., `sufficient_data`) as neutral/intentional outcomes rather than errors.

---

## How to Run Locally

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## Switching Between Fixtures

Use the controls in the header:

- **Test Success** → Full workflow with parallel tasks, retry, and final synthesis  
- **Test Error** → Partial run ending in unrecoverable failure  
- **Reset** → Clears current state  

---

## Tradeoffs

To meet time constraints, I prioritized **accurate state modeling and event-driven rendering** over visual polish and animations. The focus was on making task execution, retries, and partial outputs easy to understand for analysts.

With more time, I would:
- Improve visual hierarchy and interaction design
- Add richer visualization for dependencies (graph view)
- Enhance agent thought visibility with contextual UI
- Optimize performance for large-scale runs

---

## Known Gaps & Future Improvements

- Graph-based visualization for large workflows  
- Detailed inspector for tool payloads  
- Persistent run history  
- Playback controls (pause/rewind live runs)  
- Accessibility improvements for live updates  

---

## AI Usage Disclosure

This project was built with assistance from AI tools for ideation and code guidance. All implementation decisions, state modeling, and final code structure were designed and validated independently.

---

## Project Structure

```text
mock/         # Event fixtures for success/error scenarios
src/
  components/ # UI components (AgentRunPanel, TaskItem, etc.)
  hooks/      # State management and event orchestration logic
  App.jsx     # Main application entry
DECISIONS.md  # Detailed architectural reasoning
```

---

## Decisions

Detailed reasoning for ambiguous requirements (agent thoughts, partial outputs, parallel layout, cancellation handling, dependencies) is documented in:

`DECISIONS.md`

