// src/pages/Modules/Focus.jsx
export default function Focus() {
  return (
    <div className="focus-module">
      <h2>Laser Focus Protocol</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neuro-card">
          <h3>Morning Priming</h3>
          <p>15-minute visualization + intention setting</p>
        </div>
        <div className="neuro-card">
          <h3>Deep Work Blocks</h3>
          <p>3x 90-minute sessions with binaural beats</p>
        </div>
        <div className="neuro-card">
          <h3>Evening Review</h3>
          <p>Journaling + planning next day</p>
        </div>
      </div>
    </div>
  );
}