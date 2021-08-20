import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import colorPalette from '../data/colorPalette.json';
import { useCourses } from './CoursesContext';

async function fetchCourse(id) {
  return fetch(`http://localhost:3001/courses/${id}`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error('meh');
    });
}

export async function newCourse(
  id,
  color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
) {
  const course = await fetchCourse(id);
  course.enabledGroups = course.groups.map((g) => g.groupId);
  course.color = color;
  return course;
}

export default function AddCourse() {
  const { courses, setCourses } = useCourses();
  const idRef = useRef();

  async function addCourse(id, color) {
    if (courses.find((c) => id === c.courseId)) {
      return;
    }
    try {
      const course = await newCourse(id, color);
      setCourses(
        courses.concat([course]).sort((c1, c2) => c1.courseId - c2.courseId)
      );
    } catch (err) {
      //
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addCourse(parseInt(idRef.current.value, 10));
    idRef.current.value = '';
  }

  return (
    <Card className="add-course">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input inputRef={idRef} placeholder="Course ID" />{' '}
          <Button type="submit" color="primary" startIcon={<AddIcon />}>
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
