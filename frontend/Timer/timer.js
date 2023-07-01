import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import './timer.css';

function TimerComponent({ expiryTimestamp }) {
  const [duration, setDuration] = useState(300);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const updateTimer = (newDuration) => {
    if (!isRunning) {
      const currentTime = new Date();
      currentTime.setSeconds(currentTime.getSeconds() + newDuration);
      restart(currentTime);
    }
    setDuration(newDuration);
  };

  const incrementDuration = () => {
    updateTimer(duration + 300);
  };

  const decrementDuration = () => {
    const newDuration = Math.max(duration - 300, 0);
    updateTimer(newDuration);
  };

  const handleRestart = () => {
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + duration);
    restart(currentTime);
  };

  return (
    <div className="timer-container">
      <h1 className="timer-title">Timer</h1>
      <div className="timer-display">
        <span>{hours.toString().padStart(2, '0')}</span>:
        <span>{minutes.toString().padStart(2, '0')}</span>:
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
      <div className="timer-button-container">
        <button className="timer-button" onClick={incrementDuration}>+5 min</button>
        <button className="timer-button" onClick={decrementDuration}>-5 min</button>
      </div>
      <p className="timer-status">{isRunning ? 'Running' : 'Not running'}</p>
      <div className="timer-actions">
        <button className="timer-button" onClick={start}>Start</button>
        <button className="timer-button" onClick={pause}>Pause</button>
        <button className="timer-button" onClick={resume}>Resume</button>
        <button className="timer-button" onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default TimerComponent;
