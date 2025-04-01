import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Default styles
import '../styles/Calendar.css'; // Custom styles (if separate file)

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      title: task.title,
      start: new Date(task.dueDate!),
      end: new Date(task.dueDate!),
      allDay: true,
      resource: task,
    }));

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="rbc-calendar"
      />
    </div>
  );
}