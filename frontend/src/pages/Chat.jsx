import React, { useState, useRef, useEffect } from 'react';
import { HiOutlinePaperClip, HiOutlineGlobeAlt, HiOutlineMicrophone } from 'react-icons/hi2';
import { BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import Header from '../component/Chatbot/ui/Header';
import MessageActions from '../component/Chatbot/ui/MessageActions';
import BotMessage from '../component/Chatbot/BotMessage';
import UserMessage from '../component/Chatbot/UserMessage';
import TextInput from '../component/Chatbot/TextInput';
import VoiceInput from '../component/Chatbot/VoiceInput';
import QuizModal from '../component/Chatbot/QuizModal';

const Chat = () => {
  const [isVoiceActivated, setVoiceActivated] = useState(false);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [showQuizButton, setShowQuizButton] = useState(true);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hi! How are you feeling today?' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleMessageAdd = async (type, message) => {
    setChatHistory((prevHistory) => [...prevHistory, { type, message }]);

    if (type === 'user') {
      setIsGenerating(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: message }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: 'bot', message: data.data },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: 'bot', message: 'Oops! Something went wrong.' },
        ]);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleVoiceInput = (speechText) => {
    if (speechText) {
      handleMessageAdd('user', speechText);
    }
  };

  const handleQuizSubmit = (quizResponse) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: 'user', message: `Quiz Response: ${quizResponse}` },
    ]);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: 'bot', message: 'Thank you for sharing your feelings!' },
    ]);
  };

  const handleQuizButtonClick = () => {
    setQuizModalOpen(true);
    setShowQuizButton(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Message copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleLike = (index) => {
    console.log('Liked message at index:', index);
  };

  const handleDislike = (index) => {
    console.log('Disliked message at index:', index);
  };

  const handleReadAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col bg-gray-50" style={{ height: `calc(100vh - 70px)` }}>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'items-start gap-4'}`}>
              {chat.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white flex-shrink-0">
                  AI
                </div>
              )}
              <div className={`max-w-[80%] ${chat.type === 'user' ? '' : ''} rounded-2xl px-4 py-2`}>
                {chat.type === 'user' ? (
                  <UserMessage message={chat.message} />
                ) : (
                  <BotMessage message={chat.message} />
                )}
                {chat.type === 'bot' && (
                  <MessageActions
                    onCopy={() => handleCopy(chat.message)}
                    onLike={() => handleLike(index)}
                    onDislike={() => handleDislike(index)}
                    onReadAloud={() => handleReadAloud(chat.message)}
                  />
                )}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white flex-shrink-0">
                AI
              </div>
              <div className="bg-white rounded-2xl px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-150" />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex items-center ">
            <TextInput handleMessageAdd={handleMessageAdd} />
            <div className="absolute right-2 flex items-center gap-2">
              <button
                onClick={() => setVoiceActivated(!isVoiceActivated)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isVoiceActivated ? (
                  <BiSolidMicrophoneOff className="w-6 h-6 text-gray-500" />
                ) : (
                  <BiSolidMicrophone className="w-6 h-6 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Input Overlay */}
      {isVoiceActivated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
              <VoiceInput handleVoiceInput={handleVoiceInput} />
              <button
                onClick={() => setVoiceActivated(false)}
                className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Stop Recording
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onSubmit={handleQuizSubmit}
      />

      {/* Quiz Button */}
      {showQuizButton && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
          <button
            className="bg-black my-8 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            onClick={handleQuizButtonClick}
          >
            Would you like to understand your feelings better?
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;

