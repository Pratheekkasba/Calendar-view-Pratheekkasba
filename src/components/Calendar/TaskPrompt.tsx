import { useState, useEffect, useRef } from 'react';
import { Button } from '../primitives/Button';
import type { CalendarEvent } from './CalendarView.types';

interface TaskPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  initialDate: Date;
  initialTime?: string;
}

/**
 * Quick task creation modal for week view
 * Pre-fills date and time based on clicked time slot
 */
export const TaskPrompt = ({ isOpen, onClose, onSave, initialDate, initialTime }: TaskPromptProps) => {
  // Form state for task creation
  const [form, setForm] = useState({
    taskName: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    notes: '',
  });

  const formRef = useRef<HTMLDivElement>(null);

  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.focus();
    }
  }, [isOpen]);

  // Pre-fill form when modal opens
  useEffect(() => {
    if (isOpen) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = dayNames[initialDate.getDay()];
      const timeStr = initialTime || initialDate.toTimeString().slice(0, 5);
      
      setForm({
        taskName: '',
        dayOfWeek,
        startTime: timeStr,
        endTime: '',
        notes: '',
      });
    }
  }, [isOpen, initialDate, initialTime]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.taskName.trim()) {
      alert('Task name is required');
      return;
    }

    // Create start date/time
    const startDateTime = new Date(initialDate);
    const [startHour, startMinute] = form.startTime.split(':').map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    // Create end date/time (default to 1 hour if not specified)
    const endDateTime = new Date(startDateTime);
    if (form.endTime) {
      const [endHour, endMinute] = form.endTime.split(':').map(Number);
      endDateTime.setHours(endHour, endMinute, 0, 0);
    } else {
      endDateTime.setHours(startDateTime.getHours() + 1);
    }

    // Create the task event
    const taskEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: form.taskName,
      description: form.notes,
      start: startDateTime,
      end: endDateTime,
      color: '#10b981', // Green color for tasks
    };

    onSave(taskEvent);
    onClose();
  };

  // Handle form field changes
  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={formRef}
        tabIndex={-1}
        className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 focus:outline-none animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a task for this week</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Name *
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name"
                value={form.taskName}
                onChange={(e) => handleChange('taskName', e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day of the week
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
                value={form.dayOfWeek}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.startTime}
                  onChange={(e) => handleChange('startTime', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time (optional)
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.endTime}
                  onChange={(e) => handleChange('endTime', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any additional notes..."
                rows={3}
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
