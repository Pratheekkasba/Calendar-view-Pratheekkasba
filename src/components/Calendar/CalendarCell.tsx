import type { CalendarEvent } from './CalendarView.types';
import clsx from 'clsx';

type CalendarCellProps = {
  date: Date;
  currentMonth: number;
  today: Date;
  events?: CalendarEvent[];
  onAddEvent?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
};

/**
 * Individual calendar cell component for month view
 * Handles date display, event rendering, and user interactions
 */
export const CalendarCell = ({ date, currentMonth, today, events = [], onAddEvent, onEventClick }: CalendarCellProps) => {
  // Check if this cell represents today's date
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Check if this cell is from a different month (should be grayed out)
  const isOtherMonth = date.getMonth() !== currentMonth;

  return (
    <div
      className={clsx(
        'border border-neutral-200 min-h-[120px] sm:h-32 p-2 transition-colors cursor-pointer hover:bg-neutral-50 overflow-hidden',
        isOtherMonth && 'bg-neutral-50 text-neutral-400'
      )}
      onClick={() => onAddEvent?.(date)}
    >
      {/* Date number and today indicator */}
      <div className="flex justify-between items-start mb-1">
        <span
          className={clsx(
            'text-sm font-medium',
            isToday && 'text-primary-600 font-bold'
          )}
        >
          {date.getDate()}
        </span>
        {isToday && (
          <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {date.getDate()}
          </span>
        )}
      </div>

      {/* Events list - show up to 3 events */}
      <div className="space-y-1 min-h-[60px]">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(event);
            }}
            className="text-xs px-2 py-1 rounded text-white truncate cursor-pointer hover:opacity-80 shadow-sm"
            style={{ backgroundColor: event.color || '#0ea5e9' }}
          >
            {event.title}
          </div>
        ))}
        {events.length > 3 && (
          <button className="text-xs text-primary-600 hover:underline font-medium">
            +{events.length - 3} more
          </button>
        )}
      </div>
    </div>
  );
};
