import React from 'react'; 
import { Box } from '@material-ui/core';
import TaskListManager from './TaskListManager';

function App() {
  const taskList = {
    tasks: [
      {id: 'llllllll', name: 'hoops'},
      {id: 'pppppppp', name: 'loops'},
    ]
  };

  return (
    <Box display="flex" height='100vh' flexGrow={1} flexDirection="column">
      <TaskListManager taskList={ taskList } />
    </Box>
  );
}

export default App;
