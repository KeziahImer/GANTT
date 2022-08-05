import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl } from '@material-ui/core';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const authenticate = async (credentials) => {
  const res = await axios.post(
    'http://localhost:8000/api/auth/login',
    credentials
  );
  const data = res.data;
  window.localStorage.setItem('authToken', data.token);
  axios.defaults.headers.Authorization = `Bearer ${data.token}`;
};

const isAuthenticated = () => {
  const token = window.localStorage.getItem('authToken');
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return true;
    }
  }
  return false;
};

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await authenticate(credentials);
      navigate('/profile');
    } catch (error) {
      return error;
    }
    return null;
  };

  return (
    <div>
      <h1>Login</h1>
      <FormControl>
        <div>
          <TextField
            id="email"
            label="Email"
            type="text"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <br />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Se connecter
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export { isAuthenticated };
export default Login;
