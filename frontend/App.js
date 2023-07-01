import DateNavBar from './NavBar/DateNavBar';
import React, { useState } from 'react';
import NewTaskList from './TaskList/NewTaskList';
import CurrentTaskList from './TaskList/CurrentTaskList';
import TimerComponent from './Timer/timer';
import Button from '@mui/material/Button';

function App({ isSignedIn, wallet }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const [currentTaskList, setCurrentTaskList] = useState([])
  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (
    <div>
      <div>
        <DateNavBar/>
        { isSignedIn
            ? <><span style={{fontSize: "20px", color:"#0066FF"}}>Welcome!  {wallet.accountId}</span><Button onClick={signOut} style={{backgroundColor: "#ffffff", marginTop: "20px", marginBottom: "20px", marginLeft: "20px"}} variant="outlined" size="small">Log out</Button></>
            : <Button onClick={signIn} style={{backgroundColor: "#ffffff",  marginTop: "20px", marginBottom: "20px"}} variant="outlined" size="small">Log into my near wallet</Button>
          }
        <NewTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList}/>
        <CurrentTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList} />
        <TimerComponent expiryTimestamp={time}/>
      </div>
  </div>
  );
}

export default App;
