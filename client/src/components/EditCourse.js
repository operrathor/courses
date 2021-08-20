import React from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { TwitterPicker } from 'react-color';
import colorPalette from '../data/colorPalette.json';
import { useCourses } from './CoursesContext';

export default function CourseForm({ course }) {
  const { courses, setCourses } = useCourses();

  function removeCourse(id) {
    setCourses(courses.filter((c) => c.courseId !== id));
  }

  function changeColor(courseId, color) {
    const newCourses = [...courses];
    newCourses.find((c) => c.courseId === courseId).color = color;
    setCourses(newCourses);
  }

  function toggleGroup(courseId, enabledGroups) {
    const newCourses = [...courses];
    newCourses.find((c) => c.courseId === courseId).enabledGroups =
      enabledGroups;
    setCourses(newCourses);
  }

  function handleRemoveButtonClick(e) {
    e.preventDefault();
    removeCourse(course.courseId);
  }

  function handleToggleButtonGroupChange(e, newEnabledGroups) {
    toggleGroup(course.courseId, newEnabledGroups);
  }

  function handleColorPickerChangeComplete(color) {
    changeColor(course.courseId, color.hex);
  }

  return (
    <FormGroup>
      <ToggleButtonGroup
        value={course.enabledGroups}
        onChange={handleToggleButtonGroupChange}
      >
        {course.groups.map((group) => (
          <ToggleButton key={group.groupId} value={group.groupId}>
            {group.groupId}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <TwitterPicker
        color={course.color}
        onChangeComplete={handleColorPickerChangeComplete}
        triangle="hide"
        colors={colorPalette}
      />
      <p>
        <Button
          onClick={handleRemoveButtonClick}
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Remove
        </Button>
      </p>
    </FormGroup>
  );
}
