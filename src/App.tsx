import React from 'react';
import TaskList from './TaskList';

const taskList = [
  { name: "do me" },
  { name: "touch me" },
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        byte me
      </header>
      <TaskList tasks={taskList}></TaskList>
    </div>
  );
}

export default App;
