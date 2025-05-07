import React, { useState } from 'react';
import '../styles/Tasks.css';
import AddTask from './AddTask';
import TaskItem from './TaskItem';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setIsAddingTask(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Tasks</h2>
        <button className="tasks-menu-button">⋮</button>
      </div>
      
      <div className="tasks-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={toggleTaskCompletion} 
            onDelete={deleteTask}
          />
        ))}
      </div>
      
      {isAddingTask ? (
        <AddTask onAddTask={addTask} onCancel={() => setIsAddingTask(false)} />
      ) : (
        <button className="add-task-button" onClick={() => setIsAddingTask(true)}>
          <span className="add-icon">+</span> Add Task
        </button>
      )}
    </div>
  );
}

export default Tasks;