# Calendar-view-Pratheekkasba

A modern, responsive calendar component built with React, TypeScript, and Tailwind CSS.

## Features

- 📅 **Month View**: Full calendar grid with 7×6 layout
- 📊 **Week View**: Detailed weekly schedule with hourly time slots
- ➕ **Event Management**: Create, edit, and delete events
- 🎯 **Task Creation**: Quick task creation from week view
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop
- 🎨 **Modern UI**: Clean, accessible interface with Tailwind CSS
- 📚 **Storybook**: Component documentation and testing

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Storybook** - Component development environment

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pratheekkasba/Calendar-view-Pratheekkasba.git
cd Calendar-view-Pratheekkasba
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Usage

### Basic Calendar

```tsx
import { CalendarView } from './components/Calendar/CalendarView';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CalendarView />
    </div>
  );
}
```

### With Custom Events

```tsx
import { CalendarView } from './components/Calendar/CalendarView';

const events = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2024-01-15T10:00:00'),
    end: new Date('2024-01-15T11:00:00'),
    color: '#0ea5e9'
  }
];

function App() {
  return (
    <CalendarView 
      events={events}
      onEventCreate={(event) => console.log('Created:', event)}
      onEventUpdate={(event) => console.log('Updated:', event)}
      onEventDelete={(id) => console.log('Deleted:', id)}
    />
  );
}
```

## Components

### CalendarView
Main calendar component that handles both month and week views.

### MonthView
Displays a full month grid with events and navigation.

### WeekView
Shows a detailed weekly schedule with hourly time slots.

### EventModal
Modal for creating and editing calendar events.

### TaskPrompt
Quick task creation modal for week view.

## Customization

The calendar can be customized through props and CSS classes:

- **Colors**: Modify the color palette in `tailwind.config.js`
- **Styling**: Use Tailwind classes or custom CSS
- **Events**: Pass custom event handlers for CRUD operations
- **Views**: Switch between month and week views

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Pratheek Kasba**
- GitHub: [@Pratheekkasba](https://github.com/Pratheekkasba)