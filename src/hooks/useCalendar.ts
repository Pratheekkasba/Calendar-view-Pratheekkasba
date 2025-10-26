import { useState, useCallback } from 'react';

/**
 * Custom hook for managing calendar state and navigation
 * Handles date navigation, view switching, and month/year display
 */
export const useCalendar = (initialDate: Date = new Date()) => {
  // Current date being displayed
  const [currentDate, setCurrentDate] = useState(initialDate);
  // Current view mode (month or week)
  const [view, setView] = useState<'month' | 'week'>('month');

  // Navigate by a specific number of months
  const navigate = useCallback((direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  // Jump to a specific date
  const goToDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  // Reset to today's date
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Move to next month
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  // Move to previous month
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  // Switch between month and week views
  const toggleView = useCallback(() => {
    setView(prev => prev === 'month' ? 'week' : 'month');
  }, []);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return {
    currentDate,
    navigate,
    goToDate,
    goToToday,
    goToNextMonth,
    goToPreviousMonth,
    toggleView,
    monthName,
    year,
    view,
  };
};
