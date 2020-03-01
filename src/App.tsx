import React from 'react'; 
import TaskListManager from './TaskListManager';

function App() {
  const taskList = {
    tasks: [
      {name: 'hoops'},
      {name: 'loops'},
    ]
  };

  return (
    <div className="App">
      <header className="App-header">
        byte me
      </header>
      <TaskListManager taskList={ taskList } />
    </div>
  );
}

export default App;
