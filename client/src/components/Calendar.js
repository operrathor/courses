import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useCourses } from '../CoursesContext';

export default function Calendar() {
  const { courses } = useCourses();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let newEvents = [];
    courses.forEach((course) => {
      newEvents = newEvents.concat(
        course.groups
          .filter((group) => course.enabledGroups.includes(group.groupId))
          .flatMap((group) =>
            group.events.map((event) => ({
              title: `${group.groupId} - ${course.title} (${event.location}) ${group.instructors}`,
              start: event.start,
              end: event.end,
              groupId: group.groupId,
              courseId: course.courseId,
              color: course.color,
            }))
          )
      );
    });
    setEvents(newEvents);
  }, [courses]);

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      weekends={false}
      allDaySlot={false}
      slotMinTime="08:00:00"
      slotMaxTime="20:00:00"
      slotDuration="00:15:00"
      slotLabelInterval="01:00:00"
      events={events}
      height="auto"
    />
  );
}
