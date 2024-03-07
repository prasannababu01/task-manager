// components/Auth/Signup.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let navigate=useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      // Handle successful signup, e.g., redirect user to login page
      navigate("/login")
      console.log(response.data); // Assuming the response contains token or user data
    } catch (err) {
      setError(err.response.data.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="enter name" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        
        <button type="submit">Sign up</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
