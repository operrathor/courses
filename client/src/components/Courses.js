import { useEffect } from 'react';
import Course from './Course';
import { newCourse } from './AddCourse';
import { useCourses } from '../CoursesContext';
import initialLoad from '../data/initialLoad';

const LOCAL_STORAGE_COURSES_KEY = 'courses';

export default function Courses() {
  const { courses, setCourses } = useCourses();

  useEffect(() => {
    const storedCourses = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_COURSES_KEY)
    );
    if (storedCourses) {
      setCourses(storedCourses);
    } else {
      (async () => {
        const newCourses = await Promise.all(
          initialLoad.map(async ({ courseId, color }) => {
            try {
              return await newCourse(courseId, color);
            } catch (err) {
              return null;
            }
          })
        );
        setCourses(
          newCourses
            .filter((course) => course !== null)
            .sort((course1, course2) => course1.courseId - course2.courseId)
        );
      })();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(courses));
  }, [courses]);

  return (
    <>
      {courses.map((course) => (
        <Course key={course.courseId} course={course} />
      ))}
    </>
  );
}
