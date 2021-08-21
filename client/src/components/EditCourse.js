import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { TwitterPicker } from 'react-color';
import { useCourses } from '../CoursesContext';
import colorPalette from '../data/colorPalette.json';
import './EditCourse.css';

export default function CourseForm({ course }) {
  const { courses, setCourses } = useCourses();

  function handleRemoveButtonClick(e) {
    e.preventDefault();
    setCourses(courses.filter((c) => c.courseId !== course.courseId));
  }

  function handleToggleButtonGroupChange(e, enabledGroups) {
    const newCourses = [...courses];
    newCourses.find((c) => c.courseId === course.courseId).enabledGroups =
      enabledGroups;
    setCourses(newCourses);
  }

  function handleColorPickerChangeComplete(color) {
    const newCourses = [...courses];
    newCourses.find((c) => c.courseId === course.courseId).color = color.hex;
    setCourses(newCourses);
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
      <TableContainer component={Paper} className="class-instructors">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="1px">Group</TableCell>
              <TableCell>Instructors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.groups.map((group) => (
              <TableRow
                key={group.groupId}
                className={
                  course.enabledGroups.includes(group.groupId) ? '' : 'disabled'
                }
              >
                <TableCell component="th" scope="row">
                  {group.groupId}
                </TableCell>
                <TableCell>
                  {group.instructors === '' ? 'TBA' : group.instructors}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Typography>
        <Link
          href={`https://lfuonline.uibk.ac.at/public/lfuonline_lv.details?lvnr_id_in=${course.courseId}`}
          target="_blank"
        >
          LFU:online
        </Link>
      </Typography>
    </FormGroup>
  );
}
