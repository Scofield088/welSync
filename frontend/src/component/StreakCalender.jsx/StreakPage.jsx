import React, { useState } from 'react'
import { StreakCalendar } from './StreakCalendar'

export function StreakPage() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [longestStreak, setLongestStreak] = useState(14)
  const [totalEntries, setTotalEntries] = useState(32)
  
  // This would typically come from your backend or state management
  const streakData = {
    currentStreak,
    longestStreak,
    totalEntries,
    // This is dummy data, replace with actual user data
    daysLogged: [
      "2023-05-01", "2023-05-02", "2023-05-03", "2023-05-04", "2023-05-05", 
      "2023-05-06", "2023-05-07", "2023-05-09", "2023-05-10", "2023-05-11"
    ]
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Your Journal Streak</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Current Streak</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold">{currentStreak} days</div>
          <p className="text-xs text-gray-500">Keep it up! You're doing great!</p>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
            <div 
              className="h-full bg-black rounded-full" 
              style={{width: `${(currentStreak / longestStreak) * 100}%`}}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Longest Streak</h2>
            <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">{longestStreak} days</span>
          </div>
          <div className="text-2xl font-bold">{longestStreak} days</div>
          <p className="text-xs text-gray-500">Your personal best!</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium text-gray-600">Total Entries</h2>
            <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">{totalEntries}</span>
          </div>
          <div className="text-2xl font-bold">{totalEntries}</div>
          <p className="text-xs text-gray-500">Journal entries completed</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Streak Calendar</h2>
        <p className="text-sm text-gray-600 mb-4">Visualize your journaling consistency</p>
        <StreakCalendar daysLogged={streakData.daysLogged} />
      </div>

      <a href="/blogs">
      <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200">
        Write Today's Journal Entry
      </button>
      </a>
    </div>
  )
}

