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
import { TaskUpdater } from './taskManagement';

export type TaskListManagerProps = {
  addTask: TaskUpdater;
  archiveTask: TaskUpdater;
  category: TaskCategory;
  changeTaskList: (c: TaskCategory) => void;
  deleteTask: TaskUpdater;
  taskList: TaskObject[];
  toggleTask: TaskUpdater;
};

function TaskListManager(props: TaskListManagerProps) {  
  
  const [newTaskName, setNewTaskName] = useState('');

  return (    
    <Box display="flex" maxHeight="100vh" flexDirection="column" flexGrow='1'>
      <Box flexGrow='1' maxHeight="100%" overflow="auto">
        <ButtonGroup variant="contained">
          { 
            Object.values(TaskCategory).map(
              (category) => (
                <Button 
                  key={ category }
                  color={ category === props.category ? "primary" : "default" }
                  onClick={ () => props.changeTaskList(category) }
                > 
                  { category } 
                </Button>
              )
            )
          }
        </ButtonGroup>
        <TaskList 
          archiveTask={ props.archiveTask }
          deleteTask={ props.deleteTask }
          tasks={ props.taskList } 
          toggleTask={ props.toggleTask }
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
                        props.addTask(newTaskName, props.category); 
                        setNewTaskName(''); 
                      }} 
                    }
                  />
                </Box>
                <Button
                  onClick={ () => {
                    props.addTask(newTaskName, props.category);
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