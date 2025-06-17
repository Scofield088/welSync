import React, { useState } from 'react';

const VoiceComponent = () => {
  const [speechText, setSpeechText] = useState('');

  // Call the Flask API to get speech-to-text and text-to-speech result
  const handleVoiceRequest = async () => {
    try {
      const response = await fetch('http://localhost:8080/voice');
      const data = await response.json();
      setSpeechText(data.st); // Store the returned speech text in the state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Speech-to-Text & Text-to-Speech</h1>
      <button onClick={handleVoiceRequest}>Start Speech Recognition</button>
      <p>Recognized Text: {speechText}</p>
    </div>
  );
};

export default VoiceComponent;
