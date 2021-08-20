import { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import { useCourses } from './CoursesContext';
import colorPalette from '../data/colorPalette.json';

async function fetchCourse(courseId) {
  return fetch(`http://localhost:3001/courses/${courseId}`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error(`Could not fetch or parse course ${courseId}`);
    });
}

export async function newCourse(
  courseId,
  color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
) {
  const course = await fetchCourse(courseId);
  course.enabledGroups = course.groups.map((group) => group.groupId);
  course.color = color;
  return course;
}

export default function AddCourse() {
  const { courses, setCourses } = useCourses();
  const courseIdRef = useRef();

  async function addCourse(courseId, color) {
    if (courses.find((course) => courseId === course.courseId)) {
      return;
    }
    try {
      const course = await newCourse(courseId, color);
      setCourses(
        courses
          .concat([course])
          .sort((course1, course2) => course1.courseId - course2.courseId)
      );
    } catch (err) {
      // eslint-disable-next-line
      console.error(`Could not add course ${courseId}`);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addCourse(parseInt(courseIdRef.current.value, 10));
    courseIdRef.current.value = '';
  }

  return (
    <Card className="add-course">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input inputRef={courseIdRef} placeholder="Course ID" />{' '}
          <Button type="submit" color="primary" startIcon={<AddIcon />}>
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
