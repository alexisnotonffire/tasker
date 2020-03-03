import React, {
  useState,
} from "react";
import TaskList from './TaskList';
import { TaskObject } from './Task';
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Icon,
  TextField,
} from "@material-ui/core";

const uuid = require('uuid/v4');

export type TaskListManagerProps = {
  taskList: TaskObject[];
};

function TaskListManager(props: TaskListManagerProps) {  
  const [taskList, setTaskList] = useState(props.taskList);
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    if (newTaskName !== '') {
      let updatedTasks: TaskObject[] = taskList;
      updatedTasks.push(makeTask(newTaskName));
      setTaskList(updatedTasks);
      setNewTaskName('')
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

  return (    
    <Box display="flex" maxHeight="100vh" flexDirection="column" flexGrow='1'>
      <Box flexGrow='1' maxHeight="100%" overflow="auto">
        <TaskList 
          tasks={taskList} 
          toggleTask={toggleTask}
          deleteTask={deleteTask} 
        />
      </Box>    
      <Box>
        <Container maxWidth="sm">
          <Card>
            <CardContent classes={{ root: {'&:last-child': {paddingBottom: 16}} }}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <TextField
                    fullWidth
                    label="Create a new task"
                    value={newTaskName}
                    onChange={e => setNewTaskName(e.target.value)}
                    onKeyPress={e => { if (e.key === 'Enter') { addTask() }}}
                  />
                </Box>
                <Button
                  onClick={ addTask }>
                  <Icon>add_circle</Icon>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export default TaskListManager