export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
}

export type ViewMode = 'month' | 'week';

export interface CalendarViewProps {
  events?: CalendarEvent[];
  initialDate?: Date;
  viewMode?: ViewMode;
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
}
