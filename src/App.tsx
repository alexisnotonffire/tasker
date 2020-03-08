import React, { useState } from 'react'; 
import { Box } from '@material-ui/core';
import { 
  DragDropContext, 
  OnDragEndResponder, 
} from 'react-beautiful-dnd';
import TaskListManager from './taskManagement/TaskListManager';
import {
  addTask,
  deleteTask,
  toggleTask,
} from './taskManagement/taskManagement';
import { moveTaskInList } from './taskManagement/taskDrag';
import { 
  getTasks,
  setTasks,
} from './taskManagement/taskStorage';
import { TaskObject } from './taskManagement/Task';

function App() {

  const [taskList, setTaskList] = useState(getTasks());

  const onDragEnd: OnDragEndResponder = (provided) => {
    const tasks = (provided.destination != null) 
      ? moveTaskInList(
        taskList, 
        provided.source.index, 
        provided.destination?.index
      ) 
      : deleteTask(taskList, taskList[provided.source.index].id)

    setTaskList(tasks)
  }

  const toggleAppTask: (s: string) => void = (id) => {
    const tasks: TaskObject[] = toggleTask(taskList, id)
    setTaskList(tasks);
    setTasks(tasks);
  }

  return (
    <DragDropContext onDragEnd={ onDragEnd }>
      <Box display="flex" height='100vh' flexGrow={1} flexDirection="column">
        <TaskListManager
          addTask={ addTask }
          deleteTask={ deleteTask } 
          toggleTask={ toggleAppTask }
          taskList={ taskList } 
        />
      </Box>
    </DragDropContext>
  );
}

export default App;
