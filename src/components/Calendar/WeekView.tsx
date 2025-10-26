import { useState } from 'react';
import type { CalendarEvent } from './CalendarView.types';
import { TaskPrompt } from './TaskPrompt';

interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent?: (event: CalendarEvent) => void;
}

/**
 * Week view component with time slots and task creation
 * Shows 7 days × 24 hours with clickable time slots
 */
export const WeekView = ({ date, events, onEventClick, onAddEvent }: WeekViewProps) => {
  // State for task creation modal
  const [taskPromptOpen, setTaskPromptOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  // Calculate the start of the week (Sunday)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  // Generate 7 days for the week
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  // Generate 24 hours for time slots
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  // Helper to check if a date is today
  const isToday = (dayDate: Date) => {
    const today = new Date();
    return (
      dayDate.getDate() === today.getDate() &&
      dayDate.getMonth() === today.getMonth() &&
      dayDate.getFullYear() === today.getFullYear()
    );
  };

  // Get events for a specific day
  const getDayEvents = (day: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  // Handle clicking on a time slot to create a task
  const handleTimeSlotClick = (day: Date, hour: number) => {
    setSelectedDate(day);
    setSelectedTime(`${hour.toString().padStart(2, '0')}:00`);
    setTaskPromptOpen(true);
  };

  // Handle saving a new task
  const handleTaskSave = (event: CalendarEvent) => {
    onAddEvent?.(event);
    setTaskPromptOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto border border-neutral-200 rounded-lg overflow-hidden bg-white overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header with day names */}
        <div className="grid grid-cols-8 bg-neutral-100 border-b border-neutral-200">
          <div className="bg-neutral-200 text-center py-2 text-sm font-medium text-neutral-700">
            Time
          </div>
          {days.map((day) => (
            <div
              key={day.toDateString()}
              className={`py-2 text-center text-sm font-medium ${
                isToday(day) ? 'bg-blue-50 text-blue-600' : 'text-neutral-700'
              }`}
            >
              <div>{day.toLocaleDateString('default', { weekday: 'short' })}</div>
              <div className={`text-lg ${isToday(day) ? 'font-bold' : ''}`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-8 h-[600px] overflow-y-auto">
          {/* Time column */}
          <div className="flex flex-col border-r border-neutral-200 bg-neutral-50">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 flex items-start justify-end pr-2 text-xs text-neutral-500 border-b border-neutral-100"
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => (
            <div key={day.toISOString()} className="relative border-r border-neutral-100">
              {hours.map((_, i) => (
                <div
                  key={i}
                  className="h-16 border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer group relative"
                  onClick={() => handleTimeSlotClick(day, i)}
                  title={`Click to add task at ${i}:00`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                      + Add Task
                    </div>
                  </div>
                </div>
              ))}

              {/* Render events for this day */}
              {getDayEvents(day).map((event) => {
                const startDate = new Date(event.start);
                const endDate = new Date(event.end);
                const startHour = startDate.getHours();
                const startMinute = startDate.getMinutes();
                const endHour = endDate.getHours();
                const endMinute = endDate.getMinutes();

                // Calculate position and height in pixels
                const top = (startHour * 64) + (startMinute / 60) * 64 + 2;
                const height = Math.max(
                  ((endHour * 64 + (endMinute / 60) * 64) - (startHour * 64 + (startMinute / 60) * 64)) - 4,
                  24
                );

                return (
                  <div
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className="absolute left-1 right-1 text-xs text-white p-1 px-2 rounded cursor-pointer hover:opacity-80 overflow-hidden shadow-sm"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      backgroundColor: event.color || '#0ea5e9',
                    }}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    {height > 32 && (
                      <div className="text-xs opacity-90 truncate mt-0.5">
                        {startDate.toLocaleTimeString('default', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <TaskPrompt
        isOpen={taskPromptOpen}
        onClose={() => setTaskPromptOpen(false)}
        onSave={handleTaskSave}
        initialDate={selectedDate}
        initialTime={selectedTime}
      />
    </div>
  );
};
