import React from "react";

function WeekGrid({ weekData, openModal }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
      {weekData.map((dayData, index) => (
        <div
          key={index}
          className="bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => openModal(index)}
        >
          <div className="px-1 py-4 xl:px-4">
            <h3 className="font-semibold mb-2">{dayData.day}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{dayData.duration ? `${dayData.duration} min` : "No session"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeekGrid;

