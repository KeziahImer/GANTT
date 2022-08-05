import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl } from '@material-ui/core';
import axios from 'axios';

const sendData = async (credentials) => {
  try {
    await axios.post('http://localhost:8000/api/auth/register', credentials);
  } catch (error) {
    return error;
  }
  return null;
};

const Register = () => {
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
      await sendData(credentials);
      navigate('/login');
    } catch (error) {
      return error;
    }
    return null;
  };

  return (
    <div>
      <h1>Register</h1>
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
            S&#39;inscrire
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Register;
