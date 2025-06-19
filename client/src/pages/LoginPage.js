import React, { useState } from 'react';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { phone_number, password });
    localStorage.setItem('token', data.token);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
