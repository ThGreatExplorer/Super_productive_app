import DateNavBar from './NavBar/DateNavBar';
import React, { useState } from 'react';
import NewTaskList from './TaskList/NewTaskList';
import CurrentTaskList from './TaskList/CurrentTaskList'

function App() {
  const [currentTaskList, setCurrentTaskList] = useState([])

  return (
    <div>
      <DateNavBar/>
      <NewTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList}/>
      <CurrentTaskList currentTaskList={currentTaskList} />
    </div>
  );
}

export default App;