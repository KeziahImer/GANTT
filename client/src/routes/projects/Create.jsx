import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { isAuthenticated } from '../Login';

const Create = () => {
  const [args, setArgs] = useState({});

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setArgs({
      ...args,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const { userId } = await jwtDecode(
        window.localStorage.getItem('authToken')
      );
      const argus = {
        ...args,
        userId
      };
      await axios.post('http://localhost:8000/api/projects/create', argus);
    } catch (error) {
      return error;
    }
    return null;
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
      <h1>Ici tu peux créer un projet.</h1>
      <FormControl>
        <div>
          <TextField
            id="name"
            label="Name"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="start"
            type="date"
            name="start"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField id="end" type="date" name="end" onChange={handleChange} />
        </div>
        <div>
          <br />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Créer ce projet
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Create;
