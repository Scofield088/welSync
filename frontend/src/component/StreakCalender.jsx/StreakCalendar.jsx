import React from 'react'

export function StreakCalendar({ daysLogged }) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isLoggedDay = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    return daysLogged.some(loggedDate => new Date(loggedDate).toDateString() === date.toDateString())
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-semibold text-sm py-2">{day}</div>
      ))}
      {Array(firstDayOfMonth).fill(null).map((_, index) => (
        <div key={`empty-${index}`} className="text-center py-2"></div>
      ))}
      {days.map(day => (
        <div 
          key={day} 
          className={`text-center py-2 rounded-full ${
            isLoggedDay(day) ? 'bg-green-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  )
}

