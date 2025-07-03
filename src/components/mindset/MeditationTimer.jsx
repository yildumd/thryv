import { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';

const MeditationTimer = ({ presets = [5, 10, 15], backgroundSounds = true }) => {
  const [timeLeft, setTimeLeft] = useState(presets[0] * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Meditation Timer</h3>
      <div className="text-center">
        <div className="text-5xl font-bold my-6">{formatTime(timeLeft)}</div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            {isActive ? <FiPause size={24} /> : <FiPlay size={24} />}
          </button>
          <button 
            onClick={() => {
              setIsActive(false);
              setTimeLeft(selectedPreset * 60);
            }}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FiRefreshCw size={24} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setSelectedPreset(preset);
              setTimeLeft(preset * 60);
            }}
            className={`px-3 py-1 rounded-full ${
              selectedPreset === preset 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {preset} min
          </button>
        ))}
      </div>
    </div>
  );
};

export default MeditationTimer;