// src/components/FocusTimer.jsx
export default function FocusTimer() {
  // Pomodoro timer with binaural beats integration
  return (
    <div className="focus-session">
      <div className="timer-display">45:00</div>
      <button className="start-button">Start Deep Work</button>
      <audio controls src="/binaural-beats.mp3" />
    </div>
  );
}