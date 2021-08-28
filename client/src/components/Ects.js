import { Typography } from '@material-ui/core';
import { useCourses } from '../CoursesContext';

export default function Ects() {
  const { courses } = useCourses();
  const ects = courses
    .filter((course) => course.enabledGroups && course.enabledGroups.length > 0)
    .map((course) => course.ects)
    .reduce((sum, courseEcts) => sum + courseEcts, 0.0);
  return (
    <>
      {courses.length > 0 && (
        <p>
          <Typography color="textSecondary">
            Total ECTS points of courses with enabled groups: {ects}
          </Typography>
        </p>
      )}
    </>
  );
}
