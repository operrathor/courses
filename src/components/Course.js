import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditCourse from './EditCourse'

export default function Course({ course, onGroupToggle, onColorChange, onRemove }) {
  return (
    <Accordion className='course'>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography><span style={{ color: course.color }}>⬤</span> {course.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditCourse course={course} onGroupToggle={onGroupToggle} onColorChange={onColorChange} onRemove={onRemove} />
      </AccordionDetails>
    </Accordion>
  )
}