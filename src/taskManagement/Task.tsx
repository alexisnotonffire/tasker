import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Icon,
} from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

import { TaskUpdater } from "./taskManagement";

export type TaskObject = {
  archived: boolean;
  category: TaskCategory;
  completed: boolean;
  id: string;
  index: number | null;
  name: string;
}

export enum TaskCategory {
  CURRENT = 'current', // needs to be done now
  SOON = 'soon',       // needs to be done soon
  GOALS = 'goals',     // would like to do at some point
  PLANNED = 'planned', // needs to be done at some point
}

export type TaskProps = {
  archiveTask: TaskUpdater;
  deleteTask: TaskUpdater;
  task: TaskObject;
  toggleTask: TaskUpdater;
}

function Task(props: TaskProps) {
  return props.task.completed ? <div /> : (
    <Box margin="1pt">
      <Card>
        <CardHeader
          title={ props.task.name }
          action={
            <Box>
              <Button onClick={ () => props.deleteTask(props.task.id, props.task.category) }>
                <Icon>delete_forever</Icon>
              </Button>
              <Button onClick={ () => props.archiveTask(props.task.id, props.task.category) }>
                <Icon>archive</Icon>
              </Button>
              <Button  onClick={ () => props.toggleTask(props.task.id, props.task.category) }>
                <Icon>check_circle</Icon>
              </Button>
            </Box>
          }
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