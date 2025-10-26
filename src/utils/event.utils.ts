import type { CalendarEvent } from '../components/Calendar/CalendarView.types';

/**
 * Generate sample events for testing and demonstration
 * Creates random events across the current month
 */
export const generateSampleEvents = (): CalendarEvent[] => {
  const today = new Date();
  const events: CalendarEvent[] = [];

  // Add events for the current month
  for (let i = 1; i <= 15; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    
    // Add 1-3 events per day randomly
    const numEvents = Math.floor(Math.random() * 3) + 1;
    const colors = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let j = 0; j < numEvents; j++) {
      const hour = Math.floor(Math.random() * 10) + 9; // 9 AM to 6 PM
      const start = new Date(date);
      start.setHours(hour, 0, 0);
      const end = new Date(start);
      end.setHours(hour + 1, 0, 0);
      
      events.push({
        id: `${i}-${j}`,
        title: `Event ${j + 1} on Day ${i}`,
        start,
        end,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  return events;
};

export const filterEventsByDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
};

export const filterEventsByMonth = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
};

export const filterEventsByWeek = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });
};

export const sortEventsByStartTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
};

export const getEventsForDay = (events: CalendarEvent[], day: number, month: number, year: number): CalendarEvent[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  });
};

export const getEventsForHour = (events: CalendarEvent[], hour: number): CalendarEvent[] => {
  return events.filter((event) => {
    return new Date(event.start).getHours() === hour;
  });
};

export const hasOverlappingEvents = (events: CalendarEvent[]): boolean => {
  const sortedEvents = sortEventsByStartTime(events);
  
  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const currentEnd = new Date(sortedEvents[i].end);
    const nextStart = new Date(sortedEvents[i + 1].start);
    
    if (currentEnd > nextStart) {
      return true;
    }
  }
  
  return false;
};

export const groupEventsByDay = (events: CalendarEvent[]): Record<string, CalendarEvent[]> => {
  const grouped: Record<string, CalendarEvent[]> = {};
  
  events.forEach((event) => {
    const eventDate = new Date(event.start);
    const key = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    
    grouped[key].push(event);
  });
  
  return grouped;
};
