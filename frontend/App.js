import DateNavBar from './NavBar/DateNavBar';
import React, { useState, useEffect} from 'react';
import NewTaskList from './TaskList/NewTaskList';
import CurrentTaskList from './TaskList/CurrentTaskList';
import TimerComponent from './Timer/timer';
import Button from '@mui/material/Button';
import { GetDates } from './utils/DateUtils';
function App({ isSignedIn, wallet, productivityApp}) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const [currentTaskList, setCurrentTaskList] = useState([])
  const [currentDate, setCurrentDate] = useState(GetDates(new Date(), 0)[0].split(',')[1])
  useEffect(() => {
    console.log(productivityApp.getAllTasks());
  }, []);
  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (
    <div>
      <div>
        <DateNavBar setCurrentDate={setCurrentDate} productivityApp={productivityApp} />
        { isSignedIn
            ? <><span style={{fontSize: "20px", color:"#0066FF"}}>Welcome!  {wallet.accountId}</span><Button onClick={signOut} style={{backgroundColor: "#ffffff", marginTop: "20px", marginBottom: "20px", marginLeft: "20px"}} variant="outlined" size="small">Log out</Button></>
            : <Button onClick={signIn} style={{backgroundColor: "#ffffff",  marginTop: "20px", marginBottom: "20px"}} variant="outlined" size="small">Log into my near wallet</Button>
          }
        <NewTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList} currentDate={currentDate} productivityApp={productivityApp} />
        <CurrentTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList} currentDate={currentDate} productivityApp={productivityApp}/>
        <TimerComponent expiryTimestamp={time}/>
      </div>
  </div>
  );
}

export default App;
