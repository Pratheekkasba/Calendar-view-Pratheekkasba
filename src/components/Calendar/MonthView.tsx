import type { CalendarEvent } from './CalendarView.types';
import { CalendarCell } from './CalendarCell';
import { filterEventsByDate } from '../../utils/event.utils';

interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent?: (date: Date) => void;
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
}

/**
 * Month view component displaying a full calendar grid
 * Shows 7 columns (days) × 6 rows (weeks) with events
 */
export const MonthView = ({
  date,
  events,
  onEventClick,
  onAddEvent,
}: MonthViewProps) => {
  const today = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Build the 42-cell grid (6 weeks × 7 days)
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const grid: Date[] = [];
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDay);

  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  // Helper to get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return filterEventsByDate(events, date);
  };

  return (
    <div className="w-full max-w-5xl mx-auto overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px bg-neutral-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="bg-neutral-50 py-2 text-center text-sm font-medium text-neutral-700">
              {d}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px bg-neutral-200">
          {grid.map((gridDate) => (
            <CalendarCell
              key={gridDate.toISOString()}
              date={gridDate}
              currentMonth={month}
              today={today}
              events={getEventsForDate(gridDate)}
              onAddEvent={onAddEvent}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
