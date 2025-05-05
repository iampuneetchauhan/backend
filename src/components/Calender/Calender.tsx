import { useState } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay
} from 'date-fns'

const CalendarComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)) // September 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const approvedLeaves = [
    new Date(2024, 8, 8),
    new Date(2024, 8, 14),
    new Date(2024, 8, 21)
  ]

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
  }

  const renderHeader = () => {
    return (
      <div className='flex justify-between items-center mb-2'>
        <button onClick={handlePrevMonth} className='text-purple-700 px-2'>
          ‹
        </button>
        <span className='font-semibold'>
          {format(currentMonth, 'MMMM, yyyy')}
        </span>
        <button onClick={handleNextMonth} className='text-purple-700 px-2'>
          ›
        </button>
      </div>
    )
  }

  const renderDays = () => {
    const days = []
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    for (let i = 0; i < weekDays.length; i++) {
      days.push(
        <div
          key={i}
          className='text-xs text-center font-semibold text-gray-500'
        >
          {weekDays[i]}
        </div>
      )
    }

    return <div className='grid grid-cols-7 mb-2'>{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const isApprovedLeave = approvedLeaves.some(leave =>
          isSameDay(leave, cloneDay)
        )

        days.push(
          <div
            key={day.toString()}
            className={`text-sm text-center py-2 border rounded cursor-pointer transition
            ${isSameMonth(day, monthStart) ? '' : 'text-gray-300'}
            ${
              isSameDay(day, selectedDate ?? new Date())
                ? 'border-2 border-purple-700'
                : 'border-transparent'
            }
            ${isApprovedLeave ? 'bg-purple-100' : ''}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            {format(day, 'd')}
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div className='grid grid-cols-7 gap-1 mb-1' key={day.toString()}>
          {days}
        </div>
      )
      days = []
    }

    return <div>{rows}</div>
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-4 w-[300px]'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-purple-700'>
          Leave Calendar
        </h2>
      </div>

      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <div className='mt-4'>
        <h3 className='text-purple-700 text-sm font-semibold mb-1'>
          Approved Leaves
        </h3>
        <ul className='text-sm text-gray-700 list-disc ml-4 space-y-1'>
          {approvedLeaves.map((leave, idx) => (
            <li key={idx}>{format(leave, 'd MMM yyyy')}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CalendarComponent
