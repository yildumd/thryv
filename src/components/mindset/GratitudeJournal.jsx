import { useState } from 'react';

const GratitudeJournal = ({ prompts = [], moodTracking = true }) => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [mood, setMood] = useState(5);
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0] || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEntry.trim()) {
      setEntries([...entries, {
        text: currentEntry,
        mood,
        date: new Date().toISOString(),
        prompt: currentPrompt
      }]);
      setCurrentEntry('');
      // Rotate through prompts
      setCurrentPrompt(prompts[(prompts.indexOf(currentPrompt) + 1) % prompts.length]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Gratitude Journal</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {prompts.length > 0 && (
          <div>
            <p className="text-gray-700 italic">"{currentPrompt}"</p>
          </div>
        )}
        <div>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows={3}
            placeholder="Write what you're grateful for..."
          />
        </div>
        {moodTracking && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mood: {mood}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Entry
        </button>
      </form>
      <div className="mt-6 space-y-3">
        {entries.slice().reverse().map((entry, i) => (
          <div key={i} className="p-3 border-b">
            <p className="font-medium">{entry.prompt}</p>
            <p className="mt-1">{entry.text}</p>
            {moodTracking && (
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 mr-2">Mood:</span>
                <div className="flex">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full mx-px ${i < entry.mood ? 'bg-blue-500' : 'bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GratitudeJournal;