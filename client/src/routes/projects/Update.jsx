import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { isAuthenticated } from '../Login';

const Update = () => {
  const [args, setArgs] = useState({
    oldname: '',
    newname: '',
    newstart: '',
    newend: ''
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setArgs({
      ...args,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/projects/update', args);
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
      <h1>Ici tu peux modifier un projet.</h1>
      <p>
        <i>Tous les champs doivent être remplis.</i>
      </p>
      <FormControl>
        <div>
          <TextField
            id="oldname"
            label="Old Name"
            type="text"
            name="oldname"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="newname"
            label="New Name"
            type="text"
            name="newname"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="newstart"
            type="date"
            name="newstart"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="newend"
            type="date"
            name="newend"
            onChange={handleChange}
          />
        </div>
        <div>
          <br />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Modifier le projet
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Update;
