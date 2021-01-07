import React from 'react'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import DeleteIcon from '@material-ui/icons/Delete'
import { TwitterPicker } from 'react-color'
import colorPalette from '../data/colorPalette.json'

export default function CourseForm({ course, onGroupToggle, onColorChange, onRemove }) {
  function handleRemoveButtonClick(e) {
    e.preventDefault()
    onRemove(course.id)
  }

  function handleToggleButtonGroupChange(e, newEnabledGroups) {
    onGroupToggle(course.id, newEnabledGroups)
  }

  function handleColorPickerChangeComplete(color) {
    onColorChange(course.id, color.hex)
  }
  
  return (
    <FormGroup>
      <ToggleButtonGroup value={course.enabledGroups} onChange={handleToggleButtonGroupChange}>
        {course.groups.map(group => (
          <ToggleButton key={group} value={group}>{group}</ToggleButton>
        ))}
      </ToggleButtonGroup>
      <TwitterPicker color={course.color} onChangeComplete={handleColorPickerChangeComplete}
        triangle='hide'
        colors={colorPalette}
      />
      <p>
        <Button onClick={handleRemoveButtonClick} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>Remove</Button>
      </p>
    </FormGroup>
  )
}