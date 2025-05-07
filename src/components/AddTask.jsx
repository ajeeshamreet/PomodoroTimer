import React, { useState } from 'react';

function AddTask({ onAddTask, onCancel }) {
  
  sconst [taskName, setTaskName] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask({
        name: taskName,
        estimatedPomodoros,
        notes
      });
    }
  };

  const decrementPomodoros = () => {
    if (estimatedPomodoros > 1) {
      setEstimatedPomodoros(estimatedPomodoros - 1);
    }
  };

  return (
    <div className="add-task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="What are you working on?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="form-group">
          <label>Est Pomodoros</label>
          <div className="pomodoro-counter">
            <button type="button" onClick={decrementPomodoros}>-</button>
            <input
              type="number"
              min="1"
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(parseInt(e.target.value) || 1)}
            />
            <button type="button" onClick={() => setEstimatedPomodoros(estimatedPomodoros + 1)}>+</button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;