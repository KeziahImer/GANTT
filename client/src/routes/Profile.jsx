import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, TextField, Button } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { isAuthenticated } from './Login';

const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState([]);

  const token = window.localStorage.getItem('authToken');
  if (token) {
    setUserId(jwtDecode(token));
  }

  const [credentials, setCredentials] = useState({
    id: userId,
    password: ''
  });

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/profile', credentials);
      navigate('/');
    } catch (error) {
      return error;
    }
    return null;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/profile/${userId}`);
      window.localStorage.removeItem('authToken');
      navigate('/');
    } catch (error) {
      return error;
    }
    return null;
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('authToken');
      navigate('/');
    } catch (error) {
      return error;
    }
    return null;
  };

  const handleChange = ({ currentTarget }) => {
    const value = currentTarget.value;
    setCredentials({
      ...credentials,
      password: value
    });
  };

  if (!isAuthenticated()) {
    return (
      <div>
        <h1>
          Tu n&#39;es pas authentifié ! Connecte toi avant de pouvoir accéder à
          cette page.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Ici tu peux te déconnecter, modifier ton compte ou le supprimer.</h1>
      <FormControl>
        <TextField
          id="password"
          label="New Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <div>
          <br />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Modifier le mot de passe
          </Button>
          <br />
          <br />
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Supprimer le compte
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Profile;
