import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import RefreshCourses from './components/RefreshCourses';
import './App.css';
import { CoursesProvider } from './components/CoursesContext';
import Calendar from './components/Calendar';

export default function App() {
  return (
    <>
      <CssBaseline />
      <CoursesProvider>
        <div className="container">
          <main>
            <Calendar />
          </main>
          <aside className="sidebar">
            <h1>Courses</h1>
            <Courses />
            <AddCourse />
            <RefreshCourses />
          </aside>
        </div>
      </CoursesProvider>
    </>
  );
}
