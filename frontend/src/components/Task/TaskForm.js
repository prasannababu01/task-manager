import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchTask(id);
    }
  }, [id]);

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/update/${taskId}`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}});
      console.log(response)
      setFormData({
        title: response.data.title,
        description: response.data.description || '',
        dueDate: response.data.dueDate ? response.data.dueDate.substring(0, 10) : '', // Extracting date part only
      });
    } catch (err) {
      setError(err.response.data.message || 'An error occurred while fetching task data.');
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = id ? `http://localhost:5000/api/tasks/${id}` : 'http://localhost:5000/api/tasks';
      const method = id ? 'PUT' : 'POST';
      const response = await axios({
        method,
        url,
        data: {...formData,user:localStorage.getItem("user")},
        headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
      });
      navigate('/tasks'); // Redirect to task list page after submission
    } catch (err) {
      setError(err.response.data.message || 'An error occurred while submitting the task.');
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        <button type="submit">{id ? 'Update' : 'Submit'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskForm;
