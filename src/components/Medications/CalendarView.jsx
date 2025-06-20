import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths
} from 'date-fns';

const CalendarView = ({ medications }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getDayMedications = (date) => {
    // In a real app, this would filter medications based on schedule and date
    return medications.filter(med => {
      // Simple logic - show all medications for demonstration
      return true;
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}

        {dateRange.map(date => {
          const dayMedications = getDayMedications(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isCurrentDay = isToday(date);

          return (
            <div
              key={date.toString()}
              className={`bg-white min-h-24 p-2 relative ${
                !isCurrentMonth ? 'text-gray-300' : ''
              } ${isCurrentDay ? 'bg-blue-50' : ''}`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentDay ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {format(date, 'd')}
              </div>

              {isCurrentMonth && dayMedications.length > 0 && (
                <div className="space-y-1">
                  {dayMedications.slice(0, 2).map((med, index) => (
                    <div
                      key={`${med.id}-${index}`}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded truncate"
                    >
                      {med.name}
                    </div>
                  ))}
                  {dayMedications.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayMedications.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Click on any date to view detailed medication schedule</span>
      </div>
    </div>
  );
};

export default CalendarView;