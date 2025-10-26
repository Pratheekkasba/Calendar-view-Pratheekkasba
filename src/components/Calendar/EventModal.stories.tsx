import type { Meta, StoryObj } from '@storybook/react';
import { EventModal } from './EventModal';

const meta = {
  title: 'Calendar/EventModal',
  component: EventModal,
  tags: ['autodocs'],
  args: {
    open: true,
    initialDate: new Date(),
    onClose: () => console.log('Modal closed'),
    onSave: (e: any) => console.log('Saved', e),
    onDelete: (id: string) => console.log('Deleted', id),
  },
} satisfies Meta<typeof EventModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEvent: Story = {
  args: {
    event: {
      id: '1',
      title: 'Team Meeting',
      start: new Date(),
      end: new Date(Date.now() + 3600000),
      description: 'Discuss project progress',
      color: '#3b82f6',
    },
  },
};
