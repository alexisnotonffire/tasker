import React from 'react';
import {
  Box,
  Card,
  CardHeader,
} from '@material-ui/core';

export type TaskProps = {
  id: string;
  name: string;
  delTask: any;
}

function Task(props: TaskProps) {
  return (
    <Box margin="1pt">
    <Card onClick={ () => {props.delTask(props.id)}}>
      <CardHeader
        title={ props.name }
      />
    </Card>
    </Box>
  )
};

export default Task;