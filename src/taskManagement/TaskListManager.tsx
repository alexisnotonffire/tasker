import React, {
  useState,
} from "react";
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Icon,
  TextField,
} from "@material-ui/core";
import TaskList from './TaskList';
import { TaskObject } from './Task';
import { TaskListUpdater } from './taskManagement';

export type TaskListManagerProps = {
  taskList: TaskObject[];
  addTask: TaskListUpdater;
  deleteTask: TaskListUpdater;
  toggleTask: (s: string) => void;
};

function TaskListManager(props: TaskListManagerProps) {  
  
  const [newTaskName, setNewTaskName] = useState('');

  return (    
    <Box display="flex" maxHeight="100vh" flexDirection="column" flexGrow='1'>
      <Box flexGrow='1' maxHeight="100vh" overflow="auto">
        <TaskList 
          tasks={ props.taskList } 
          toggleTask={ props.toggleTask }
          deleteTask={ props.deleteTask } 
        />
      </Box>    
      <Box>
        <Container maxWidth="sm">
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
                        props.addTask(props.taskList, newTaskName); 
                        setNewTaskName(''); 
                      }} 
                    }
                  />
                </Box>
                <Button
                  onClick={ () => {
                    props.addTask(props.taskList, newTaskName);
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