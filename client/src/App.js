import CssBaseline from '@material-ui/core/CssBaseline';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import RefreshCourses from './components/RefreshCourses';
import Calendar from './components/Calendar';
import { CoursesProvider } from './CoursesContext';
import './App.css';

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
