import React from 'react';
import {
  Box,
  Card,
  CardHeader,
} from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

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
  return (<div/>)
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