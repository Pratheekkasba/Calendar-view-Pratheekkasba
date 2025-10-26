import { useState } from 'react';
import type { CalendarViewProps } from './CalendarView.types';
import type { CalendarEvent } from './CalendarView.types';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { useCalendar } from '../../hooks/useCalendar';
import { useEventManager } from '../../hooks/useEventManager';

/**
 * Main calendar component that handles both month and week views
 * Includes navigation, event management, and responsive design
 */
export const CalendarView = ({
  events: externalEvents,
  initialDate = new Date(),
  viewMode: initialViewMode = 'month',
  onEventClick,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
}: CalendarViewProps) => {
  // Local state for UI interactions
  const [viewMode, setViewMode] = useState<'month' | 'week'>(initialViewMode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Custom hooks for calendar logic
  const { currentDate, goToToday, goToNextMonth, goToPreviousMonth, monthName, year, view, toggleView } = useCalendar(initialDate);
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager(externalEvents);

  // Event handlers for different interactions
  const handleAddEvent = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // Week view creates events directly via TaskPrompt
  const handleAddEventFromWeek = (event: CalendarEvent) => {
    addEvent(event);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(event.start);
    setIsModalOpen(true);
    onEventClick?.(event);
  };

  // Save event - check if it's an update or new event
  const handleSaveEvent = (event: CalendarEvent) => {
    const exists = events.find((e) => e.id === event.id);
    if (exists) {
      updateEvent(event.id, event);
      onEventUpdate?.(event);
    } else {
      addEvent(event);
      onEventCreate?.(event);
    }
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    onEventDelete?.(id);
  };

  const handleViewChange = (mode: 'month' | 'week') => {
    setViewMode(mode);
  };

  return (
    <div className="calendar-container w-full max-w-7xl mx-auto p-4 bg-white rounded-xl shadow-sm border border-neutral-100 overflow-x-auto">
      {/* Responsive header with navigation and view controls */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          {/* Left side: Navigation controls and title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={goToToday}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                Today
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {viewMode === 'month'
                ? `${monthName} ${year}`
                : 'Week View'}
            </h2>
          </div>
          
          {/* Right side: View toggle buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                handleViewChange('month');
                if (view !== 'month') toggleView();
              }}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                view === 'month'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => {
                handleViewChange('week');
                if (view !== 'week') toggleView();
              }}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                view === 'week'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Render the appropriate view based on current selection */}
      {view === 'month' ? (
        <MonthView
          date={currentDate}
          events={events}
          onEventClick={handleEventClick}
          onAddEvent={handleAddEvent}
          onEventCreate={onEventCreate}
          onEventUpdate={onEventUpdate}
          onEventDelete={onEventDelete}
        />
      ) : (
        <WeekView
          date={currentDate}
          events={events}
          onEventClick={handleEventClick}
          onAddEvent={handleAddEventFromWeek}
        />
      )}

      {/* Event creation/editing modal */}
      <EventModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        initialDate={selectedDate}
        event={editingEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};
