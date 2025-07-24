import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timer.css';

const DEFAULT_COLORS = ['#ba4949', '#397097', '#4c6cb3', '#38858a', '#d8815c', '#b968c7', '#333333', '#f87070', '#70f3f8', '#f7f3b0'];

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

  // Music player state
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Color palette state
  const [bgColor, setBgColor] = useState('#ba4949');
  const [showColorPicker, setShowColorPicker] = useState(false);

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

  // Dynamically load all mp3 files in public/music
  useEffect(() => {
    // Since we can't read the filesystem from the browser, hardcode the list for now
    setAudioFiles([
      '/music/mixkit-hip-hop-02-738.mp3',
      '/music/mixkit-sun-and-his-daughter-580.mp3',
      '/music/SF-cum.mp3',
    ]);
  }, []);

  // Play/pause logic
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Move to next track on end, loop to first
  const handleTrackEnd = () => {
    setCurrentTrack((prev) => (prev + 1) % audioFiles.length);
    setIsPlaying(true);
  };

  // Controls
  const playPause = () => {
    setIsPlaying((p) => !p);
  };
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % audioFiles.length);
    setIsPlaying(true);
  };
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + audioFiles.length) % audioFiles.length);
    setIsPlaying(true);
  };

  // Color palette logic
  const handleColorSelect = (color) => {
    setBgColor(color);
    setShowColorPicker(false);
    document.querySelector('.app').style.backgroundColor = color;
  };

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
      
      <button className={`timer-button${!isActive ? ' start' : ''}`} onClick={toggleTimer}>
        {isActive ? 'PAUSE' : 'START'}
      </button>
      
      <div className="timer-info">
        <p>#{currentSession}</p>
        <p>Time to focus!</p>
      </div>

      {/* Bottom bar with two boxes */}
      <div className="timer-bottom-bar">
        {/* Music Player Box */}
        <div className="music-player-box">
          <div className="music-player">
            <button className="music-btn" aria-label="Previous" onClick={prevTrack}>
              <span className="music-icon">⏮️</span>
            </button>
            <button className="music-btn play-btn premium-play-btn" aria-label="Play/Pause" onClick={playPause}>
              <span className="music-icon">{isPlaying ? '⏸️' : <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#ba4949"/><polygon points="11,9 21,14 11,19" fill="white"/></svg>}</span>
            </button>
            <button className="music-btn" aria-label="Next" onClick={nextTrack}>
              <span className="music-icon">⏭️</span>
            </button>
            <audio
              ref={audioRef}
              src={audioFiles[currentTrack]}
              onEnded={handleTrackEnd}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        {/* Color Palette Box */}
        <div className="color-palette-box">
          <button
            className="color-swatch"
            style={{ backgroundColor: bgColor }}
            onClick={() => setShowColorPicker((v) => !v)}
            aria-label="Choose background color"
          />
          {showColorPicker && (
            <div className="color-picker-disk">
              {DEFAULT_COLORS.map((color, idx) => (
                <button
                  key={color}
                  className="color-picker-dot"
                  style={{ backgroundColor: color, transform: `rotate(${(360 / DEFAULT_COLORS.length) * idx}deg) translate(70px) rotate(-${(360 / DEFAULT_COLORS.length) * idx}deg)` }}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;