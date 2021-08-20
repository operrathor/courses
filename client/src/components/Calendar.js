import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useCourses } from './CoursesContext';

export default function Calendar() {
  const { courses } = useCourses();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let newEvents = [];
    courses.forEach((c) => {
      newEvents = newEvents.concat(
        c.groups
          .filter((g) => c.enabledGroups.includes(g.groupId))
          .flatMap((g) =>
            g.events.map((e) => ({
              title: `${g.groupId} - ${c.title} (${e.location}) ${g.instructors}`,
              start: e.start,
              end: e.end,
              groupId: g.groupId,
              courseId: c.courseId,
              color: c.color,
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
