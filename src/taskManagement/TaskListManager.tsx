import React, {
  useState,
} from "react";
import { 
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Icon,
  TextField,
} from "@material-ui/core";
import TaskList from './TaskList';
import { 
  TaskCategory,
  TaskObject, 
} from './Task';
import { TaskListUpdater } from './taskManagement';

export type TaskListManagerProps = {
  addTask: (to: TaskObject[], n: string, c?: TaskCategory) => TaskObject[];
  category: TaskCategory;
  changeTaskList: (c: TaskCategory) => void;
  deleteTask: TaskListUpdater;
  taskList: TaskObject[];
  toggleTask: (s: string) => void;
};

function TaskListManager(props: TaskListManagerProps) {  
  
  const [newTaskName, setNewTaskName] = useState('');

  return (    
    <Box display="flex" maxHeight="100vh" flexDirection="column" flexGrow='1'>
      <Box flexGrow='1' maxHeight="100%" overflow="auto">
        <ButtonGroup>
          { 
            Object.values(TaskCategory).map(
              (category) => (<Button onClick={ () => props.changeTaskList(category) }> { category } </Button>)
            )
          }
        </ButtonGroup>
        <TaskList 
          tasks={ props.taskList } 
          toggleTask={ props.toggleTask }
          deleteTask={ props.deleteTask } 
        />
      </Box>    
      <Box>
        <Container maxWidth="sm">
          <Button onClick={ () => localStorage.removeItem('tasks') }><Icon>delete_forever</Icon></Button>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <TextField
                    fullWidth
                    label="Create a new task"
                    value={ newTaskName }
                    onChange={ e => setNewTaskName(e.target.value) }
                    onKeyPress={ e => { 
                      if (e.key === 'Enter') { 
                        props.addTask(props.taskList, newTaskName, props.category); 
                        setNewTaskName(''); 
                      }} 
                    }
                  />
                </Box>
                <Button
                  onClick={ () => {
                    props.addTask(props.taskList, newTaskName, props.category);
                    setNewTaskName(''); 
                  }}>
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