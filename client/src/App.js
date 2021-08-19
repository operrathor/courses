import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import colorPalette from './data/colorPalette.json';
import initialLoad from './data/initialLoad.json';
import './App.css';

const LOCAL_STORAGE_COURSES_KEY = 'courses.courses';
const LOCAL_STORAGE_EVENTS_KEY = 'courses.events';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  async function fetchCourse(id) {
    const data = await fetch(`http://localhost:3001/courses/${id}`).then(
      (res) => res.json()
    );
    return {
      course: {
        id,
        title: data.title,
        groups: data.groups.map((g) => g.groupId),
      },
      courseEvents: data.groups.flatMap((g) => g.events),
    };
  }

  async function newCourse(
    id,
    color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
  ) {
    const { course, courseEvents } = await fetchCourse(id);

    course.enabledGroups = course.groups;
    course.color = color;

    courseEvents.forEach((e) => {
      e.color = color;
    });

    return { course, courseEvents };
  }

  useEffect(() => {
    const storedCourses = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_COURSES_KEY)
    );
    if (storedCourses && storedCourses.length > 0) {
      setCourses(storedCourses);
      setEvents(JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY)));
    } else {
      (async () => {
        const initialLoadData = await Promise.all(
          initialLoad.map(async ({ id, color }) => newCourse(id, color))
        );
        setCourses(initialLoadData.map((p) => p.course));
        setEvents(initialLoadData.flatMap((p) => p.courseEvents));
      })();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(courses));
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(events));
  }, [courses, events]);

  function removeCourse(id) {
    setCourses(courses.filter((c) => c.id !== id));
    setEvents(events.filter((e) => e.extendedProps.courseId !== id));
  }

  function changeColor(courseId, color) {
    const newCourses = [...courses];
    newCourses.find((course) => course.id === courseId).color = color;

    const newEvents = [...events];
    newEvents
      .filter((e) => e.extendedProps.courseId === courseId)
      .forEach((e) => {
        e.color = color;
      });

    setCourses(newCourses);
    setEvents(newEvents);
  }

  function toggleGroup(courseId, enabledGroups) {
    const newCourses = [...courses];
    newCourses.find((course) => course.id === courseId).enabledGroups =
      enabledGroups;

    const newEvents = [...events];
    newEvents
      .filter((e) => e.extendedProps.courseId === courseId)
      .forEach((e) => {
        e.display = enabledGroups.includes(e.groupId) ? 'auto' : 'none';
      });

    setCourses(newCourses);
    setEvents(newEvents);
  }

  async function addCourse(id, color) {
    if (courses.find((c) => id === c.id)) {
      return;
    }
    const { course, courseEvents } = await newCourse(id, color);
    setCourses(courses.concat(course).sort((c1, c2) => c1.id - c2.id));
    setEvents(events.concat(courseEvents));
  }

  return (
    <>
      <CssBaseline />
      <div className="container">
        <main>
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
        </main>
        <aside className="sidebar">
          <h1>Courses</h1>
          <Courses
            courses={courses}
            onGroupToggle={toggleGroup}
            onColorChange={changeColor}
            onRemove={removeCourse}
          />
          <AddCourse onAdd={addCourse} />
        </aside>
      </div>
    </>
  );
}
