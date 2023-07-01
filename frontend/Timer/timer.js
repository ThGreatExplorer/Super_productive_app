import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

function TimerComponent({ expiryTimestamp }) {
  const [duration, setDuration] = useState(300);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const incrementDuration = () => {
    setDuration((prevDuration) => {
      const newDuration = prevDuration + 300;
      if (!isRunning) {
        // Update the timer if it's not running
        const currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() + newDuration);
        restart(currentTime);
      }
      return newDuration;
    });
  };

  const decrementDuration = () => {
    setDuration((prevDuration) => {
      const newDuration = Math.max(prevDuration - 300, 0);
      if (!isRunning) {
        // Update the timer if it's not running
        const currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() + newDuration);
        restart(currentTime);
      }
      return newDuration;
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Timer</h1>
      <div style={{ fontSize: '60px' }}>
        <span>{hours.toString().padStart(2, '0')}</span>:
        <span>{minutes.toString().padStart(2, '0')}</span>:
        <span>{seconds.toString().padStart(2, '0')}</span>
      </div>
      <div>
        <button onClick={incrementDuration}>+5 min</button>
        <button onClick={decrementDuration}>-5 min</button>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts the timer with the updated duration
          const currentTime = new Date();
          currentTime.setSeconds(currentTime.getSeconds() + duration);
          restart(currentTime);
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default TimerComponent;
