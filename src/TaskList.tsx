import React from 'react';
import Task, { 
  TaskObject,
} from './Task';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";

export type TaskListProps = {
  tasks: TaskObject[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
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
            (task: TaskObject) => 
              <Task 
                task={ task } 
                toggleTask={ props.toggleTask }
                deleteTask={ props.deleteTask } 
              /> 
          )
        }
      </Container>
    </Container>
  )
};

export default TaskList;