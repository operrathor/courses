import React from 'react'
import Course from './Course'

export default function Courses({ courses, onGroupToggle, onColorChange, onRemove }) {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} onGroupToggle={onGroupToggle} onColorChange={onColorChange} onRemove={onRemove} />
      ))}
    </>
  )
}