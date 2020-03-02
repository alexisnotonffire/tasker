import React from 'react';
import Task, { 
  TaskObject,
} from './Task';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";

export type TaskListProps = {
  tasks: TaskObject[];
  delTask: (id: string) => void;
};

function TaskList(props: TaskListProps) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="center" gutterBottom>
        Tasks: x / { props.tasks.length ? props.tasks.length : 0 }
      </Typography>
      <Container maxWidth="sm">
        {
          props.tasks.map(
            (task: TaskObject) => <Task task={ task } delTask={ props.delTask } /> 
          )
        }
      </Container>
    </Container>
  )
};

export default TaskList;