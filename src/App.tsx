import React, { useState } from 'react'; 
import { Box } from '@material-ui/core';
import { 
  DragDropContext, 
  OnDragEndResponder, 
} from 'react-beautiful-dnd';
import { TaskObject } from './taskManagement/Task';
import TaskListManager from './taskManagement/TaskListManager';

const uuid = require('uuid/v4')

const init: TaskObject[] = [
  {id: 'scooby', name: 'boop', completed: false},
  {id: 'dooby', name: 'doop', completed: false},
  {id: 'doo', name: 'floop', completed: false},
]

function App() {

  const [taskList, setTaskList] = useState(init);

  const addTask = (name: string) => {
    if (name !== '') {
      let updatedTasks: TaskObject[] = taskList;
      updatedTasks.push(makeTask(name));
      setTaskList(updatedTasks);
    }
  };

  const toggleTask = (id: string) => {
    setTaskList(
      taskList.map(
        (task: TaskObject) => { 
          if (task.id === id) {
            return Object.assign(task, {completed: !task.completed}) 
          }
          return task 
        }
      )
    )
  };

  const deleteTask = (id: string) => {
    let updatedTasks = taskList.filter(
      (task: TaskObject) => { return task.id !== id }
    );
    setTaskList(updatedTasks);
  };

  const makeTask = (taskName: string) => {
    return {
      id: uuid(),
      name: taskName,
      completed: false,
    }
  };

  const onDragEnd: OnDragEndResponder = (result, provided) => { 
    if (!result.destination) {
      setTaskList(taskList.filter((_, i) => i !== result.source.index))
      return
    }

    const updatedTaskList = Array.from(taskList);
    const [removed] = updatedTaskList.splice(result.source.index, 1);
    updatedTaskList.splice(result.destination.index, 0, removed);
    
    console.log(`${result.source.index} => ${result.destination?.index}`)

    setTaskList(updatedTaskList);
    
  }

  return (
    <DragDropContext onDragEnd={ onDragEnd }>
      <Box display="flex" height='100vh' flexGrow={1} flexDirection="column">
        <TaskListManager
          addTask={ addTask }
          deleteTask={ deleteTask } 
          toggleTask={ toggleTask }
          taskList={ taskList } 
        />
      </Box>
    </DragDropContext>
  );
}

export default App;
