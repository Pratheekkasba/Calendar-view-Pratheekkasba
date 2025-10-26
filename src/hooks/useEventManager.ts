import { useState, useCallback } from 'react';
import type { CalendarEvent } from '../components/Calendar/CalendarView.types';

/**
 * Custom hook for managing calendar events
 * Handles CRUD operations and event selection state
 */
export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  // List of all calendar events
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  // Currently selected event for editing
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Add a new event to the calendar
  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }, []);

  // Update an existing event
  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) => prev.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt)));
  }, []);

  // Delete an event by ID
  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }, []);

  // Find an event by ID
  const getEvent = useCallback(
    (eventId: string) => {
      return events.find((e) => e.id === eventId);
    },
    [events]
  );

  // Select an event for editing
  const openEvent = useCallback((event: CalendarEvent) => setSelectedEvent(event), []);
  // Clear event selection
  const closeEvent = useCallback(() => setSelectedEvent(null), []);

  return {
    events,
    selectedEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    openEvent,
    closeEvent,
  };
};
