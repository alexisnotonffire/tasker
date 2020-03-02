import React from 'react';
import {
  Box,
  Card,
  CardHeader,
} from '@material-ui/core';

export type TaskObject = {
  id: string;
  name: string;
  completed: boolean;
}

export type TaskProps = {
  task: TaskObject;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

function Task(props: TaskProps) {
  if (!props.task.completed) {
    return (
      <Box margin="1pt">
        <Card onClick={ () => {props.toggleTask(props.task.id)} }>
          <CardHeader
            title={ props.task.name }
          />
        </Card>
      </Box>
    )
  }
  return null
};

export default Task;