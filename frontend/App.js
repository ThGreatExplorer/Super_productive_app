import DateNavBar from './NavBar/DateNavBar';
import React, { useState } from 'react';
import NewTaskList from './TaskList/NewTaskList';
import CurrentTaskList from './TaskList/CurrentTaskList';
import TimerComponent from './Timer/timer';
import Button from '@mui/material/Button';
import near from './svg/near.svg';
import SVG from 'react-inlinesvg';
import Spotify_api from './spotify_api/spotify';
import "bootstrap/dist/css/bootstrap.min.css";

function App({ isSignedIn, wallet }) {
  const [currentTaskList, setCurrentTaskList] = useState([])
  const [currentBalance, setCurrentBalance] = useState(0)
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (
    <div>
      <div>
        <DateNavBar/>
        <div style={{display: 'flex', justifyContent:"space-between"}}>
        { isSignedIn
            ? <><span style={{fontSize: "20px", color:"#0066FF"}}>Welcome!  {wallet.accountId}</span><Button onClick={signOut} style={{backgroundColor: "#ffffff", marginTop: "20px", marginBottom: "20px", marginLeft: "20px"}} variant="outlined" size="small">Log out</Button></>
            : <Button onClick={signIn} style={{backgroundColor: "#ffffff",  marginTop: "20px", marginBottom: "20px"}} variant="outlined" size="small">Log into my near wallet</Button>
          }
        { isSignedIn && <Button style={{backgroundColor: "#ffffff", marginTop: "20px", marginBottom: "20px"}} variant="outlined" size="small">balance: {currentBalance} <SVG src={near} style={{height:"10px", width:"10px", marginLeft:"10px"}}></SVG></Button>}
        </div>
        { isSignedIn && <>
        <NewTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList}/>
        <CurrentTaskList currentTaskList={currentTaskList} setCurrentTaskList={setCurrentTaskList} setCurrentBalance={setCurrentBalance} currentBalance={currentBalance} />
        <TimerComponent expiryTimestamp={time}/>
        <Spotify_api />
        </>}
      </div>
  </div>
  );
}

export default App;
