import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditCourse from './EditCourse';

export default function Course({ course }) {
  const atLeastOneGroupEnabled =
    course.enabledGroups && course.enabledGroups.length > 0;
  return (
    <Accordion className="course">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          <span style={{ color: course.color }}>⬤</span>{' '}
          <span style={{ color: atLeastOneGroupEnabled ? '' : 'grey' }}>
            {course.title}
          </span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditCourse course={course} />
      </AccordionDetails>
    </Accordion>
  );
}
