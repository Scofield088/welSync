import React, { useState } from 'react';
import { BiSolidMicrophone } from 'react-icons/bi';

const VoiceInput = ({ handleVoiceInput }) => {
  const [listening, setListening] = useState(false);
  const [speechText, setSpeechText] = useState('');

  const handleVoice = async () => {
    setListening(true);
    setSpeechText('');
    try {
      const response = await fetch('http://localhost:8080/voice'); // Adjust the endpoint to match your Flask server
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const receivedText = data.st; // Assuming Flask returns `{ "st": "recognized speech text" }`
      setSpeechText(receivedText);
      setListening(false);

      // Pass the received speech text to the Chat component
      handleVoiceInput(receivedText);
    } catch (error) {
      console.error('Error during voice recognition:', error);
      setSpeechText('Error: Unable to recognize speech. Please try again.');
      setListening(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-100 to-blue-300 h-full flex flex-col items-center">
      <p className="text-4xl font-bold text-gray-800 pt-12">Voice Input</p>
      <div className="text-8xl flex flex-col items-center mt-16">
        <div className="h-56 flex items-center justify-center">
          <button
            className="bg-blue-500 w-44 h-44 hover:w-48 hover:h-48 transition-all flex items-center justify-center rounded-full shadow-lg text-white"
            onClick={handleVoice}
            disabled={listening}
          >
            <BiSolidMicrophone size={80} />
          </button>
        </div>
        <p className="text-2xl mt-6 text-gray-700">
          {listening ? 'Listening...' : 'Click to Start Speaking'}
        </p>
        {speechText && (
          <p className="mt-4 text-xl bg-white p-4 rounded-lg shadow-lg text-gray-800">
            {speechText}
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
