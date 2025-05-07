import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task-item">
      <div className="task-content">
        <label className="task-checkbox">
          <input 
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="checkmark"></span>
        </label>
        <div className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.name}
        </div>
      </div>
      <div className="task-actions">
        <span className="task-est">{task.estimatedPomodoros} est</span>
        <button className="task-delete" onClick={() => onDelete(task.id)}>
          ×
        </button>
      </div>
    </div>
  );
}

export default TaskItem;