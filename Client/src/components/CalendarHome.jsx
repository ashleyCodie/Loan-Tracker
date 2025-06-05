import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"

const localizer = momentLocalizer(moment)

const CalendarHome = () => {
  const events = [
    {
      title: 'Borrower 1',
      start: new Date('2025-01-01'),
      end: new Date('2025-01-01'),
    },
    {
      title: 'Borrower 2',
      start: new Date('2025-01-13'),
      end: new Date('2025-01-13'),
    },
    {
      title: 'Borrower 3',
      start: new Date('2025-01-23'),
      end: new Date('2025-01-23'),
    },
    {
      title: 'Borrower 4',
      start: new Date('2025-01-10'),
      end: new Date('2025-01-10'),
    },
    {
      title: 'Borrower 5',
      start: new Date('2025-01-10'),
      end: new Date('2025-01-10'),
    },
  ]
  return (

        <div className="">
          <h1 className="mt-10 text-3xl underline ml-96 pl-20 font-extrabold">
            Closing Calendar
          </h1>
    
          <div style={{ height: '60vh', width: "100vh", marginLeft: "50vh" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
          >
           
          </Calendar>
        </div>
    </div>
    
  );
};

export default CalendarHome;