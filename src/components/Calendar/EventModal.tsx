import { useState, useEffect } from 'react';
import type { CalendarEvent } from './CalendarView.types';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  initialDate: Date;
  event?: CalendarEvent | null;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
}

/**
 * Modal for creating and editing calendar events
 * Handles form state, validation, and event persistence
 */
export const EventModal = ({ open, onClose, initialDate, event, onSave, onDelete }: EventModalProps) => {
  // Form state for event creation/editing
  const [form, setForm] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    start: initialDate,
    end: initialDate,
    color: '#0ea5e9',
  });

  useEffect(() => {
    if (event) {
      setForm({
        id: event.id,
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        color: event.color,
      });
    } else {
      setForm({
        title: '',
        description: '',
        start: initialDate,
        end: initialDate,
        color: '#0ea5e9',
      });
    }
  }, [event, initialDate]);

  const handleChange = (key: keyof CalendarEvent, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.title?.trim()) {
      alert('Title is required');
      return;
    }
    if (!form.start || !form.end) {
      alert('Start and end dates are required');
      return;
    }
    const eventToSave: CalendarEvent = {
      id: form.id || Date.now().toString(),
      title: form.title,
      description: form.description || '',
      start: form.start,
      end: form.end,
      color: form.color || '#0ea5e9',
    };
    onSave(eventToSave);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && event) {
      if (confirm('Are you sure you want to delete this event?')) {
        onDelete(event.id);
        onClose();
      }
    }
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Modal isOpen={open} onClose={onClose} title={event ? 'Edit Event' : 'Add Event'}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Event title"
            value={form.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
          <textarea
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description (optional)"
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.start ? formatDateForInput(new Date(form.start)) : ''}
            onChange={(e) => handleChange('start', new Date(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.end ? formatDateForInput(new Date(form.end)) : ''}
            onChange={(e) => handleChange('end', new Date(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-neutral-700">Color</label>
          <input
            type="color"
            value={form.color || '#0ea5e9'}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-12 h-8 cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            {event && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
