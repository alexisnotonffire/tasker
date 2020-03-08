import React from 'react';
import {
  Box,
  Card,
  CardHeader,
} from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

import { TaskListUpdater } from "./taskManagement";

export type TaskObject = {
  id: string;
  name: string;
  completed: boolean;
  index: number;
}

export type TaskProps = {
  task: TaskObject;
  toggleTask: (s: string) => void;
  deleteTask: TaskListUpdater;
}

function Task(props: TaskProps) {
  return props.task.completed ? <div /> : (
    <Box margin="1pt">
      <Card onClick={ () => { props.toggleTask(props.task.id) } }>
        <CardHeader
          title={ props.task.name }
        />
      </Card>
    </Box>
  )
};

type DraggableTaskProps = {
  task: TaskProps;
  index: number;
}

function draggableTask(props: DraggableTaskProps) {
  return (
    <Draggable 
      key={ props.task.task.id } 
      draggableId={ props.task.task.id } 
      index={ props.index }
      >
      {
        (provided) => (
          <div
            ref={ provided.innerRef } 
            { ...provided.draggableProps } 
            { ...provided.dragHandleProps }
          >
            <Task { ...props.task }/>
          </div>
        )
      }
    </Draggable>
  )
}

export default draggableTask;