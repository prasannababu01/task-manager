import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import Nav from '../../Nav';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${localStorage.getItem('user')}`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
      // Separate tasks based on completion status
      const incompleteTasks = response.data.filter(task => !task.completed);
      const completedTasks = response.data.filter(task => task.completed);
      setTasks(incompleteTasks);
      setCompletedTasks(completedTasks);
    } catch (err) {
      setError(err.response.data.message || 'Failed to fetch tasks');
    }
  };

  const handleUpdate = (taskId) => {
    // Redirect user to the task update page with the task ID as a URL parameter
    navigate(`/tasks/${taskId}/edit`);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
      // Update tasks list after successful deletion
      fetchTasks();
    } catch (err) {
      setError(err.response.data.message || 'Failed to delete task');
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`,{ completed: true },{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
      // Update tasks list after successful completion
      fetchTasks();
    } catch (err) {
      setError(err.response.data.message || 'Failed to mark task as completed');
    }
  };

  return (
    <div>
      <Nav/>
      <h2>Tasks</h2>
      <button onClick={()=>navigate("/tasks/new")}>Add a Task</button>
      <h3>Incomplete Tasks</h3>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={() => handleUpdate(task._id)}>Update</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
          <button onClick={() => handleComplete(task._id)}>Completed</button>
        </div>
      ))}
      <h3>Completed Tasks</h3>
      {completedTasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskList;
