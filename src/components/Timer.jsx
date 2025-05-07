import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timer.css';

function Timer() {
  // Timer modes and their durations in minutes
  const TIMER_MODES = {
    POMODORO: { name: 'Pomodoro', minutes: 25 },
    SHORT_BREAK: { name: 'Short Break', minutes: 5 },
    LONG_BREAK: { name: 'Long Break', minutes: 15 }
  };

  const [currentMode, setCurrentMode] = useState(TIMER_MODES.POMODORO);
  const [timeLeft, setTimeLeft] = useState(currentMode.minutes * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [currentSession, setCurrentSession] = useState(1);
  const intervalRef = useRef(null);

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(currentMode.minutes * 60);
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [currentMode]);

  // Timer countdown logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      
      // Handle timer completion based on current mode
      if (currentMode.name === TIMER_MODES.POMODORO.name) {
        // After Pomodoro, decide which break to take
        if (currentSession % 4 === 0) {
          setCurrentMode(TIMER_MODES.LONG_BREAK);
        } else {
          setCurrentMode(TIMER_MODES.SHORT_BREAK);
        }
        setCurrentSession(prev => prev + 1);
      } else {
        // After a break, go back to Pomodoro
        setCurrentMode(TIMER_MODES.POMODORO);
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, currentMode, currentSession]);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Toggle timer start/pause
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Change timer mode
  const changeMode = (mode) => {
    if (isActive) {
      if (window.confirm('The timer is still running. Are you sure you want to switch?')) {
        setCurrentMode(mode);
      }
    } else {
      setCurrentMode(mode);
    }
  };

  return (
    <div className="timer-container">
      <div className="timer-tabs">
        <button 
          className={`timer-tab ${currentMode.name === TIMER_MODES.POMODORO.name ? 'active' : ''}`}
          onClick={() => changeMode(TIMER_MODES.POMODORO)}
        >
          Pomodoro
        </button>
        <button 
          className={`timer-tab ${currentMode.name === TIMER_MODES.SHORT_BREAK.name ? 'active' : ''}`}
          onClick={() => changeMode(TIMER_MODES.SHORT_BREAK)}
        >
          Short Break
        </button>
        <button 
          className={`timer-tab ${currentMode.name === TIMER_MODES.LONG_BREAK.name ? 'active' : ''}`}
          onClick={() => changeMode(TIMER_MODES.LONG_BREAK)}
        >
          Long Break
        </button>
      </div>
      
      <div className="timer-display">
        {formatTime()}
      </div>
      
      <button className="timer-button" onClick={toggleTimer}>
        {isActive ? 'PAUSE' : 'START'}
      </button>
      
      <div className="timer-info">
        <p>#{currentSession}</p>
        <p>Time to focus!</p>
      </div>
    </div>
  );
}

export default Timer;