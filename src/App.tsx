import React, { useState } from 'react'; 
import { 
  Box,
} from '@material-ui/core';
import { 
  DragDropContext, 
  OnDragEndResponder, 
} from 'react-beautiful-dnd';
import TaskListManager from './taskManagement/TaskListManager';
import {
  addTask,
  archiveTask,
  deleteTask,
  toggleTask,
} from './taskManagement/taskManagement';
import { moveTaskInList } from './taskManagement/taskDrag';
import { 
  getTasks,
  setTasks,
} from './taskManagement/taskStorage';
import { 
  TaskCategory,
  TaskObject, 
} from './taskManagement/Task';

function App() {
  const [category, setCategory] = useState(
    TaskCategory[localStorage.getItem('defaultCategory') as keyof typeof TaskCategory] || TaskCategory.CURRENT
  );
  const [taskList, setTaskList] = useState(getTasks(category));

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

  const updateTaskInList: (t: TaskObject[], f: (t: TaskObject[], s: string, c?: TaskCategory) => TaskObject[]) => (id: string, c?: TaskCategory) => TaskObject[] = (tasks, fn) => {
    return (id: string, category?: TaskCategory) => {
      const newTasks: TaskObject[] = fn(tasks, id, category);
      setTasks(newTasks, category || TaskCategory.CURRENT);
      setTaskList(getTasks(category));
      return newTasks;
    }
  }

  const changeTaskList: (c: TaskCategory) => void = (category) => {
    setCategory(category);
    setTaskList(getTasks(category));
  }

  return (
    <DragDropContext onDragEnd={ onDragEnd }>
      <Box display="flex" height='100vh' flexGrow={1} flexDirection="column">
        <TaskListManager
          addTask={ updateTaskInList(taskList, addTask) }
          archiveTask={ updateTaskInList(taskList, archiveTask) }
          category={ category }
          changeTaskList={ changeTaskList }
          deleteTask={ updateTaskInList(taskList, deleteTask) } 
          taskList={ taskList }
          toggleTask={ updateTaskInList(taskList, toggleTask) }
        />
      </Box>
    </DragDropContext>
  );
}

export default App;
