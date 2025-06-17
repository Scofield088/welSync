import React, { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

const moods = [
  { emoji: '😀', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
];

function MoodCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [moodData, setMoodData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startOfMonth = currentDate.startOf('month').day();
  const daysInMonth = currentDate.daysInMonth();
  const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

  const handleMoodChange = (day, mood) => {
    setMoodData((prev) => ({ ...prev, [day]: mood }));
    setIsModalOpen(false); // Close the modal after selecting an emoji
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < totalCells; i++) {
      const day = i - startOfMonth + 1;
      const isCurrentMonth = day > 0 && day <= daysInMonth;
      const dayKey = currentDate.format('YYYY-MM') + `-${day}`;

      days.push(
        <div
          key={i}
          className={`border h-20 flex flex-col justify-center items-center cursor-pointer ${
            isCurrentMonth ? 'bg-white' : 'bg-gray-100'
          }`}
          onClick={() => {
            setSelectedDay(dayKey);
            setIsModalOpen(true); // Open the modal
          }}
        >
          {isCurrentMonth && (
            <>
              <div>{day}</div>
              <div
                className="text-2xl"
              >
                {moodData[dayKey] || <span>&nbsp;</span>}
              </div>
            </>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>

      {/* Modal for Emoji Selection */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Select Your Mood</h2>
              <div className="grid grid-cols-5 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodChange(selectedDay, mood.emoji)}
                    className="text-3xl"
                    aria-label={mood.label}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MoodCalendar;
