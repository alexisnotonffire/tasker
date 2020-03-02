import React from 'react';
import {
  Box,
  Card,
  CardHeader,
} from '@material-ui/core';

export type TaskObject = {
  id: string;
  name: string;
}

export type TaskProps = {
  task: TaskObject;
  delTask: (id: string) => void;
}

function Task(props: TaskProps) {
  return (
    <Box margin="1pt">
    <Card onClick={ () => {props.delTask(props.task.id)} }>
      <CardHeader
        title={ props.task.name }
      />
    </Card>
    </Box>
  )
};

export default Task;