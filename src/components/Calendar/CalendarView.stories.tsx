import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';

const meta = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDate: new Date(),
    viewMode: 'month',
  },
};

export const WithEvents: Story = {
  args: {
    initialDate: new Date(),
    viewMode: 'month',
    events: [
      {
        id: '1',
        title: 'Meeting with Team',
        start: new Date(2025, 0, 15, 10, 0),
        end: new Date(2025, 0, 15, 11, 0),
        description: 'Discuss project progress',
        color: '#3b82f6',
      },
      {
        id: '2',
        title: 'Lunch Break',
        start: new Date(2025, 0, 16, 12, 30),
        end: new Date(2025, 0, 16, 13, 30),
        color: '#10b981',
      },
    ],
  },
};

export const WeekView: Story = {
  args: {
    initialDate: new Date(),
    viewMode: 'week',
    events: [
      {
        id: '1',
        title: 'Team Meeting',
        start: new Date(2025, 0, 20, 10, 0),
        end: new Date(2025, 0, 20, 11, 0),
        color: '#3b82f6',
      },
    ],
  },
};
