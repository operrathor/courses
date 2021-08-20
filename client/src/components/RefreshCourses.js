import { useState } from 'react';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useCourses } from './CoursesContext';
import { newCourse } from './AddCourse';

export default function RefreshCourses() {
  const { courses, setCourses } = useCourses();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = async () => {
    setOpen(false);
    const newCourses = await Promise.all(
      courses.map(async (course) => {
        try {
          return await newCourse(course.courseId, course.color);
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
  };

  return (
    <>
      <Button
        className="refresh-courses"
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={handleClickOpen}
      >
        Refresh courses
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is going to reactivate all deactivated groups.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProceed} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
