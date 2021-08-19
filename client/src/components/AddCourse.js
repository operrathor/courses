import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';

export default function AddCourse({ onAdd }) {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(idRef.current.value);
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
