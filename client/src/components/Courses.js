import React, { useEffect } from 'react';
import Course from './Course';
import { newCourse } from './AddCourse';
import { useCourses } from './CoursesContext';
import initialLoad from '../data/initialLoad.json';

const LOCAL_STORAGE_COURSES_KEY = 'courses';

export default function Courses() {
  const { courses, setCourses } = useCourses();

  useEffect(() => {
    const storedCourses = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_COURSES_KEY)
    );
    if (storedCourses && storedCourses.length > 0) {
      setCourses(storedCourses);
    } else {
      (async () => {
        const initialLoadData = await Promise.all(
          initialLoad.map(async ({ id, color }) => newCourse(id, color))
        );
        setCourses(initialLoadData.sort((c1, c2) => c1.courseId - c2.courseId));
      })();
    }
    // eslint-disable-next-line
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
