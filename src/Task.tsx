import React from 'react';
import {
  Box,
  Card,
  CardHeader,
} from '@material-ui/core';

export type TaskProps = {
  name: string;
}

function Task(props: TaskProps) {
  return (
    <Box margin="1pt">
    <Card>
      <CardHeader
        title={ props.name }
      />
    </Card>
    </Box>
  )
};

export default Task;