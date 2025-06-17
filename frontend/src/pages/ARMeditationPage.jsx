import React from 'react';
import { ARMeditationRoom } from '../component/ArMeditationRoom/ARMeditationRoom';

export default function ARMeditationPage() {
  return (
    <div className="ar-meditation-page">
      <h1 className="sr-only">AR Meditation Room</h1>
      <ARMeditationRoom />
      <div className="fixed top-4 left-4 z-10 bg-white bg-opacity-75 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Welcome to Your AR Meditation Room</h2>
        <p className="text-sm">
          Allow camera access and move your device around to explore the space. 
          Find a comfortable spot and begin your meditation practice.
        </p>
      </div>
    </div>
  );
}

