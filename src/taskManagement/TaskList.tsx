import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import { Droppable } from 'react-beautiful-dnd';

import Task, { 
  TaskObject,
} from './Task';
import { TaskUpdater } from './taskManagement';

export type TaskListProps = {
  archiveTask: TaskUpdater;
  deleteTask: TaskUpdater;
  tasks: TaskObject[];
  toggleTask: (s: string) => void;
};

function TaskList(props: TaskListProps) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="center" gutterBottom>
        Tasks: { props.tasks.filter((task) => task.completed).length } / { props.tasks.length ? props.tasks.length : 0 }
      </Typography>
      <Droppable droppableId="task-list" type='TASK'>
        {
          (provided) => (
            <div
              ref={ provided.innerRef }
              { ...provided.droppableProps } 
            >
              <Container maxWidth="sm">
                {
                  props.tasks.map(
                    (task: TaskObject, idx) => (
                      <Task 
                        { ...{
                          task: {
                            archiveTask: props.archiveTask,
                            deleteTask: props.deleteTask,
                            task: task,
                            toggleTask: props.toggleTask,
                          },
                          index: idx,
                        }}
                        { ...provided.droppableProps } 
                        key={ task.id }
                      /> 
                    )
                  )
                }
                { provided.placeholder } 
              </Container>
            </div>
          )
        }
      </Droppable>
    </Container>
  )
};

export default TaskList;