import React from 'react';
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = () => {
    setOpen(false);
    // TODO refactor + error handling (in case course doesn't exist anymore)
    (async () => {
      const data = await Promise.all(
        courses.map(async (c) => {
          try {
            return await newCourse(c.courseId, c.color);
          } catch (err) {
            return null;
          }
        })
      );
      setCourses(
        data
          .filter((i) => i !== null)
          .sort((c1, c2) => c1.courseId - c2.courseId)
      );
    })();
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
