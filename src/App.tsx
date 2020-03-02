import React from 'react'; 
import { Box } from '@material-ui/core';
import TaskListManager from './TaskListManager';

function App() {
  const taskList = [
    {id: 'llllllll', name: 'hoops', completed: false},
    {id: 'pppppppp', name: 'loops', completed: false},
  ];

  return (
    <Box display="flex" height='100vh' flexGrow={1} flexDirection="column">
      <TaskListManager taskList={ taskList } />
    </Box>
  );
}

export default App;
