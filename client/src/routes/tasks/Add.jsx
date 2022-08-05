import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { isAuthenticated } from '../Login';

const Add = () => {
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
      await axios.post('http://localhost:8000/api/projects/addtask', args);
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
      <h1>Ici tu peux ajouter une tâche à un projet.</h1>
      <FormControl>
        <div>
          <TextField
            id="project_name"
            label="Project Name"
            type="text"
            name="project_name"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="task_name"
            label="Task Name"
            type="text"
            name="task_name"
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
            Ajouter cette tâche sur ce projet
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default Add;
