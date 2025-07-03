import { useState } from 'react';
import MeditationTimer from './MeditationTimer';
import GratitudeJournal from './GratitudeJournal';
import CognitiveExercises from './CognitiveExercises';

const Mindset = () => {
  const dailyPrompts = [
    "What made you smile today?",
    "Who are you thankful for today?",
    "What personal strength did you use today?"
  ];

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-gray-900">Mindset Mastery</h2>
      
      <MeditationTimer 
        presets={[5, 15, 30]}
        backgroundSounds={true}
      />
      
      <GratitudeJournal 
        prompts={dailyPrompts}
        moodTracking={true}
      />
      
      <CognitiveExercises 
        types={['dual-n-back', 'memory-grid']}
      />
    </div>
  );
};

export default Mindset;