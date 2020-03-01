import React from 'react';
import Task, { TaskProps } from './Task';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
export type TaskListProps = {
  tasks: TaskProps[];
};

function TaskList(props: TaskListProps) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="center" gutterBottom="true">
        Tasks: x / { props.tasks.length }
      </Typography>
      <Container maxwidth="sm">
        {
          props.tasks.map(
            (task) => <Task {...task}></Task>
          )
        }
      </Container>
    </Container>
  )
};

export default TaskList;