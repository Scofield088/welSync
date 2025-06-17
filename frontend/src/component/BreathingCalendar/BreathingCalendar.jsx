import React, { useState } from "react";
import WeekGrid from "./WeekGrid";
import Modal from "./Modal";

import SessionTab from './SessionTab'

const initialWeekData = [
  { day: "Sun", duration: null, notes: "" },
  { day: "Mon", duration: null, notes: "" },
  { day: "Tue", duration: null, notes: "" },
  { day: "Wed", duration: null, notes: "" },
  { day: "Thu", duration: null, notes: "" },
  { day: "Fri", duration: null, notes: "" },
  { day: "Sat", duration: null, notes: "" },
];

function BreathingCalendar() {
  const [weekData, setWeekData] = useState(initialWeekData);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ duration: "", notes: "" });
  const [activeTab, setActiveTab] = useState("calendar");

  const openModal = (dayIndex) => {
    setSelectedDay(dayIndex);
    setFormData({
      duration: weekData[dayIndex].duration || "",
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
        notes: formData.notes,
      };
      return updatedData;
    });
    closeModal();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Breathing Activity Tracker
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
        <SessionTab setWeekData={setWeekData} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveData}
        formData={formData}
        setFormData={setFormData}
        selectedDay={selectedDay !== null ? weekData[selectedDay].day : ""}
      />
    </div>
  );
}

export default BreathingCalendar;

