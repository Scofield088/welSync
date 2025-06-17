import React, { useState } from "react";
import WeekGrid from "./WeekGrid";
import SessionTab from "./SessionTab";
import Modal from "./Modal";

const initialWeekData = [
  { day: "Sun", duration: null, type: "", mood: "", notes: "" },
  { day: "Mon", duration: null, type: "", mood: "", notes: "" },
  { day: "Tue", duration: null, type: "", mood: "", notes: "" },
  { day: "Wed", duration: null, type: "", mood: "", notes: "" },
  { day: "Thu", duration: null, type: "", mood: "", notes: "" },
  { day: "Fri", duration: null, type: "", mood: "", notes: "" },
  { day: "Sat", duration: null, type: "", mood: "", notes: "" },
];

const meditationTypes = ["Mindfulness", "Loving-kindness", "Transcendental", "Zen", "Vipassana", "Yoga", "Other"];
const moodOptions = ["Calm", "Relaxed", "Energized", "Focused", "Sleepy", "Anxious", "Neutral"];

export default function MeditationTracker() {
  const [weekData, setWeekData] = useState(initialWeekData);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ duration: "", type: "", mood: "", notes: "" });
  const [activeTab, setActiveTab] = useState("calendar");

  const openModal = (dayIndex) => {
    setSelectedDay(dayIndex);
    setFormData({
      duration: weekData[dayIndex].duration || "",
      type: weekData[dayIndex].type || "",
      mood: weekData[dayIndex].mood || "",
      notes: weekData[dayIndex].notes || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  const saveData = () => {
    setWeekData((prevData) => {
      const updatedData = [...prevData];
      updatedData[selectedDay] = {
        ...updatedData[selectedDay],
        duration: formData.duration,
        type: formData.type,
        mood: formData.mood,
        notes: formData.notes,
      };
      return updatedData;
    });
    closeModal();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Meditation Tracker
      </h1>

      <div className="mb-6">
        <div className="flex space-x-1 rounded-lg bg-muted p-1">
          <button
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === "calendar"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            Weekly Calendar
          </button>
          <button
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === "session"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("session")}
          >
            Record Session
          </button>
        </div>
      </div>

      {activeTab === "calendar" ? (
        <WeekGrid weekData={weekData} openModal={openModal} />
      ) : (
        <SessionTab 
          setWeekData={setWeekData} 
          meditationTypes={meditationTypes}
          moodOptions={moodOptions}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveData}
        formData={formData}
        setFormData={setFormData}
        selectedDay={selectedDay !== null ? weekData[selectedDay].day : ""}
        meditationTypes={meditationTypes}
        moodOptions={moodOptions}
      />
    </div>
  );
}

